import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { SquarePen, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import axios from 'axios'
import endpoint from "@/connection/connection";
import useAuthStore from "@/store/authStore";
import { formatBirth, formatSchedule, formatDateTimeLocal } from "@/utils/dataFormatter";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

function StudentApplication() {
  const [openDialog, setOpenDialog] = useState(false)
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [applicationToDelete, setApplicationToDelete] = useState(null);

  const store = useAuthStore()
  const currentUser = store.currentUser

  const [applications, setApplications] = useState([])
  const [requests, setGoodMoralRequests] = useState([])

  const getApplications = async () => {
    try {
      const res = await axios.get(`${endpoint()}/idcard-application`)

      if(res.data !== 'No applications found'){
        setApplications(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getRequests = async () => {
    try {
      const res = await axios.get(`${endpoint()}/good-moral-requests`)

      if(res.data !== 'No requests found'){
        setGoodMoralRequests(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getApplications()
    getRequests()
  }, [])
  
  const [userApplications, setUserApplications] = useState([])

  const filterUserApp = () => {
    const userApp = applications.filter((app) => app.userId === currentUser._id)

    setUserApplications(userApp)
  }
  useEffect(() => {
    filterUserApp()
  }, [applications])

  const [formData, setFormData] = useState({
    idNumber: "",
    fullName: "",
    courseYear: "",
    address: "",
    number: "",
    birthday: "",
    guardianName: "",
    guardianContact: "",
    scheduleDate: "",
    userId: currentUser?._id
  })

  const handleFormChange = (e) => {
    const { value, name } = e.target

    setFormData((prev) => (
      {
        ...prev,
        [name]: value
      }
    ))
  }

  const handleUpdateFormChange = (e) => {
    const { value, name } = e.target;
    setSelectedApplication((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)

  const submitForm = async (e) => {
    e.preventDefault()
    
    // logic to check if id number is in correct format
    if (formData.idNumber) {
      const idFormat = /^\d{4}-\d{4}-K$/; 
      if (!idFormat.test(formData.idNumber)) {
        setErr("Invalid ID format. Expected: YYYY-XXXX-K")
        return;
      }
    }

    // login to check if contact num is valid phone number
    if (formData.number) {
      const idFormat = /^\+63[89]\d{9}$/; 
      if (!idFormat.test(formData.number)) {
        setErr("Invalid number format. Expected: +639XXXXXXXXX")
        return;
      }
    }

    // login to check if contact num is valid phone number
    if (formData.guardianContact) {
      const idFormat = /^\+63[89]\d{9}$/; 
      if (!idFormat.test(formData.guardianContact)) {
        setErr("Invalid guardian number format. Expected: +639XXXXXXXXX")
        return;
      }
    }

    // logic to check if the schedule date is working days and time
    if(formData.scheduleDate){
      const selectedDateTime = new Date(formData.scheduleDate);
      const day = selectedDateTime.getDay(); 
      const hours = selectedDateTime.getHours();

      if (day === 0 || day === 6) {
        setErr("Weekends are not allowed!");
        setFormData((prev) => (
          {
            ...prev,
            scheduleDate: ''
          }
        ));
        return;
      }
  
      if (!((hours >= 8 && hours < 12) || (hours >= 13 && hours < 17))) {
        setErr("You can only select times between 08:00-12:00 and 13:00-17:00.");
        setFormData((prev) => (
          {
            ...prev,
            scheduleDate: ''
          }
        ));
        return;
      }

      // Check if the selected time slot is already full
      const morningApplications = applications.filter(app => {
        const appDate = new Date(app.scheduleDate);
        return appDate.getDate() === selectedDateTime.getDate() &&
               appDate.getMonth() === selectedDateTime.getMonth() &&
               appDate.getFullYear() === selectedDateTime.getFullYear() &&
               appDate.getHours() >= 8 && appDate.getHours() < 12;
      });
  
      const afternoonApplications = applications.filter(app => {
        const appDate = new Date(app.scheduleDate);
        return appDate.getDate() === selectedDateTime.getDate() &&
               appDate.getMonth() === selectedDateTime.getMonth() &&
               appDate.getFullYear() === selectedDateTime.getFullYear() &&
               appDate.getHours() >= 13 && appDate.getHours() < 17;
      });

      const morningRequests = requests.filter(req => {
        const reqDate = new Date(req.selectedDate);
        return reqDate.getDate() === selectedDateTime.getDate() &&
               reqDate.getMonth() === selectedDateTime.getMonth() &&
               reqDate.getFullYear() === selectedDateTime.getFullYear() &&
               reqDate.getHours() >= 8 && reqDate.getHours() < 12;
      });
  
      const afternoonRequests = requests.filter(req => {
        const reqDate = new Date(req.selectedDate);
        return reqDate.getDate() === selectedDateTime.getDate() &&
               reqDate.getMonth() === selectedDateTime.getMonth() &&
               reqDate.getFullYear() === selectedDateTime.getFullYear() &&
               reqDate.getHours() >= 13 && reqDate.getHours() < 17;
      });

      const morningData = morningApplications.length + morningRequests.length
      const afternoonData = afternoonApplications.length + afternoonRequests.length
  
      if ((hours >= 8 && hours < 12 && morningData >= 30) ||
          (hours >= 13 && hours < 17 && afternoonData >= 30)) {
        setErr("Selected time slot is full. Please choose a different time.");
        setFormData((prev) => ({
          ...prev,
          scheduleDate: ''
        }));
        return;
      }
    }

    try {
      setLoading(true)
      const res = await axios.post(`${endpoint()}/idcard-application`, formData)

      if(res.data === 'Application submitted.') {
        getApplications()
        setOpenDialog(false)
        toast('Student ID Card Application submitted', {
          description: 'You will receive an SMS notification once your application is approved.',
          descriptionClassName: "!text-gray-500"
        })
      }else{
        setErr(res.data)
      }
    } catch (error) {
      setErr(error.message)
    } finally {
      setLoading(false)
    }
  }

  const submitUpdateForm = async (e) => {
    e.preventDefault();
    await updateApplication(selectedApplication._id, selectedApplication);
    setOpenUpdateDialog(false);
  };

  const updateApplication = async (applicationId, updatedData) => {
    try {
      setLoading(true)
      const res = await axios.put(`${endpoint()}/idcard-application/${applicationId}`, updatedData);
      if (res.data === 'Application updated.') {
        getApplications()
        toast('Application updated successfully', {
          description: 'Your application has been updated.',
          descriptionClassName: "!text-gray-500"
        });
      } else {
        setErr(res.data);
      }
    } catch (error) {
      setErr(error.message);
    } finally {
      setLoading(false)
    }
  };

  const deleteApplication = async (applicationId) => {
    try {
      const res = await axios.delete(`${endpoint()}/idcard-application/${applicationId}`);
      if (res.data === 'Application deleted.') {
        setUserApplications((prev) => prev.filter(app => app._id !== applicationId));
        toast('Application deleted successfully', {
          description: 'Your application has been deleted.',
          descriptionClassName: "!text-gray-500"
        });
      } else {
        setErr(res.data);
      }
    } catch (error) {
      setErr(error.message);
    }
  };

  const confirmDeleteApplication = (applicationId) => {
    setApplicationToDelete(applicationId);
    setOpenDeleteDialog(true);
  };

  const handleDeleteApplication = async () => {
    if (applicationToDelete) {
      await deleteApplication(applicationToDelete);
      setOpenDeleteDialog(false);
      setApplicationToDelete(null);
    }
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const month = `0${d.getMonth() + 1}`.slice(-2);
    const day = `0${d.getDate()}`.slice(-2);
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  };
  
  return ( 
    <>
      <div className="mb-10 w-full flex justify-between items-center">
        <h1 className="font-medium text-lg uppercase">Student ID Card Applications</h1>
        {/* dialog for adding */}
        <Dialog open={openDialog} onOpenChange={(isOpen) => setOpenDialog(isOpen)}>
          <DialogTrigger asChild>
            <Button variant='primary' onClick={() => setOpenDialog(true)}>Apply for student ID Card</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-xl">
            <DialogHeader>
              <DialogTitle>Apply for student ID Card</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            {err && <p className="bg-red-500 text-white pl-2 py-1 rounded text-sm">{err}</p>}
            <form onSubmit={submitForm} className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="idNumber">ID Number</Label>
                <Input id="idNumber" name='idNumber' type="text" onChange={handleFormChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" name="fullName" type="text" onChange={handleFormChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="courseYear">Course & Year Level</Label>
                <Input id="courseYear" name="courseYear" type="text" onChange={handleFormChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Home Address</Label>
                <Input id="address" name="address" type="text" onChange={handleFormChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactNumber">Contact Number</Label>
                <Input id="contactNumber" name="number" type="text" onChange={handleFormChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="birthday">Birthday</Label>
                <Input id="birthday" name="birthday" type="date" onChange={handleFormChange} required />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="guardianName">Guardian/Person to contact in case of emergency</Label>
                <Input id="guardianName" name="guardianName" type="text" onChange={handleFormChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="guardianContact">Guardian contact number</Label>
                <Input id="guardianContact" name="guardianContact" type="text" onChange={handleFormChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="scheduleDate">Preferred schedule date</Label>
                <Input id="scheduleDate" name="scheduleDate" type="datetime-local" value={formData.scheduleDate} onChange={handleFormChange} required />
              </div>
              <DialogFooter className="col-span-2">
                {!loading ? (
                  <Button type="submit" variant="primary">Submit Application</Button>
                ) : (
                  <Button type="submit" variant="primary" className="animate-pulse" disabled>Submitting Application</Button>
                )}
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* table */}
      <Card className="p-5 shadow-none">
        <Table>
          <TableCaption>
            List of student applications requests.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID Number</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Course/Year</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Contact Number</TableHead>
              <TableHead>Birthday</TableHead>
              <TableHead>Guardian Name</TableHead>
              <TableHead>Guardian Contact</TableHead>
              <TableHead>Schedule Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Claimed</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userApplications.length ?  userApplications.map((application, index) => (
              <TableRow key={index}>
                <TableCell>{application.idNumber}</TableCell>
                <TableCell>{application.fullName}</TableCell>
                <TableCell>{application.courseYear}</TableCell>
                <TableCell>{application.address}</TableCell>
                <TableCell>{application.number}</TableCell>
                <TableCell>{formatBirth(application.birthday)}</TableCell>
                <TableCell>{application.guardianName}</TableCell>
                <TableCell>{application.guardianContact}</TableCell>
                <TableCell>{formatSchedule(application.scheduleDate)}</TableCell>
                <TableCell>
                  <Badge variant={application.status === 'approved' ? 'approved' : 'pending'}>{application.status}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={application.claimed ? 'approved' : 'pending'}>{application.claimed ? 'Yes' : 'No'}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center gap-x-1">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <SquarePen className="cursor-pointer" size={17} color="orange" onClick={() => { setSelectedApplication(application); setOpenUpdateDialog(true); }} />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Edit Application</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Trash className="cursor-pointer" size={17} color="red" onClick={() => confirmDeleteApplication(application._id)} />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Delete Application</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableCell>
              </TableRow>
            )) : <TableRow className='h-20'><TableCell colSpan={11} className='text-center'>No applications to show</TableCell></TableRow>}
          </TableBody>
        </Table>
      </Card>

      {/* alert for deleting */}
      <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this application? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpenDeleteDialog(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={handleDeleteApplication}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* dialog for updating */}
      <Dialog open={openUpdateDialog} onOpenChange={(isOpen) => setOpenUpdateDialog(isOpen)}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Update Application</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          {err && <p className="bg-red-500 text-white pl-2 py-1 rounded text-sm">{err}</p>}
          <form onSubmit={submitUpdateForm} className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="idNumber">ID Number</Label>
              <Input id="idNumber" name='idNumber' type="text" value={selectedApplication?.idNumber} onChange={handleUpdateFormChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" name="fullName" type="text" value={selectedApplication?.fullName} onChange={handleUpdateFormChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="courseYear">Course & Year Level</Label>
              <Input id="courseYear" name="courseYear" type="text" value={selectedApplication?.courseYear} onChange={handleUpdateFormChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Home Address</Label>
              <Input id="address" name="address" type="text" value={selectedApplication?.address} onChange={handleUpdateFormChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactNumber">Contact Number</Label>
              <Input id="contactNumber" name="number" type="text" value={selectedApplication?.number} onChange={handleUpdateFormChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="birthday">Birthday</Label>
              <Input id="birthday" name="birthday" type="date" value={selectedApplication?.birthday ? formatDate(selectedApplication.birthday) : ''} onChange={handleUpdateFormChange} required />
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="guardianName">Guardian/Person to contact in case of emergency</Label>
              <Input id="guardianName" name="guardianName" type="text" value={selectedApplication?.guardianName} onChange={handleUpdateFormChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="guardianContact">Guardian contact number</Label>
              <Input id="guardianContact" name="guardianContact" type="text" value={selectedApplication?.guardianContact} onChange={handleUpdateFormChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="scheduleDate">Preferred schedule date</Label>
              <Input id="scheduleDate" name="scheduleDate" type="datetime-local" value={selectedApplication?.scheduleDate ? formatDateTimeLocal(selectedApplication.scheduleDate) : ''} onChange={handleUpdateFormChange} required />
            </div>
            <DialogFooter className="col-span-2">
              {!loading ? (
                <Button type="submit" variant="primary">Update Application</Button>
              ) : (
                <Button type="submit" variant="primary" className="animate-pulse" disabled>Updating Application</Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default StudentApplication;
