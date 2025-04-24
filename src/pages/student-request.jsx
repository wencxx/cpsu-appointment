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
import { formatSchedule, formatDateTimeLocal } from "@/utils/dataFormatter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
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

function StudentRequest() {
  const  [openDialog, setOpenDialog] = useState(false)
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [requestToDelete, setRequestToDelete] = useState(null);

  const store = useAuthStore()
  const currentUser = store.currentUser

  const [requests, setGoodMoralRequests] = useState([])
  const [applications, setApplications] = useState([])

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

  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = `0${now.getMonth() + 1}`.slice(-2);
    const date = `0${now.getDate()}`.slice(-2);
    const hours = `0${now.getHours()}`.slice(-2);
    const minutes = `0${now.getMinutes()}`.slice(-2);
    return `${year}-${month}-${date}T${hours}:${minutes}`;
  };

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

  useEffect(() => {
    getRequests()
    getApplications()
  }, [])
  
  const [userGoodMoral, setUserGoodMoralRequests] = useState([])

  const filterUserGoodMoral = () => {
    const userGoodMoral = requests.filter((req) => req.userId === currentUser._id)

    setUserGoodMoralRequests(userGoodMoral)
  }

  useEffect(() => {
    filterUserGoodMoral()
  }, [requests])

  const [formData, setFormData] = useState({
    orNumber: "",
    fullName: "",
    number: "+639",
    courseYear: "",
    gender: "",
    syGraduated: "",
    syCurrentlyEnrolled: "",
    purpose: "",
    selectedDate: "",
    userId: currentUser?._id
  })

  const handleFormChange = (e) => {
    const { value, name } = e.target

    if ((name === "number" ) && !value.startsWith("+639")) {
      return;
    }

    setFormData((prev) => (
      {
        ...prev,
        [name]: value
      }
    ))
  }

  const handleUpdateFormChange = (e) => {
    const { value, name } = e.target;

    if ((name === "number" ) && !value.startsWith("+63")) {
      return;
    }

    setSelectedRequest((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)

  const submitForm = async (e) => {
    e.preventDefault()
    
    // login to check if contact num is valid phone number
    if (formData.number) {
      const idFormat = /^\+63[89]\d{9}$/; 
      if (!idFormat.test(formData.number)) {
        setErr("Invalid number format. Expected: +639XXXXXXXXX")
        return;
      }
    }

    // logic to check if the schedule date is working days and time
    if(formData.selectedDate){
      const selectedDateTime = new Date(formData.selectedDate);
      const day = selectedDateTime.getDay(); 
      const hours = selectedDateTime.getHours();

      if (day === 0 || day === 6) {
        setErr("Weekends are not allowed!");
        setFormData((prev) => (
          {
            ...prev,
            selectedDate: ''
          }
        ));
        return;
      }
  
      if (!((hours >= 8 && hours < 12) || (hours >= 13 && hours < 17))) {
        setErr("You can only select times between 08:00-12:00 and 13:00-17:00.");
        setFormData((prev) => (
          {
            ...prev,
            selectedDate: ''
          }
        ));
        return;
      }

      // Check if the selected time slot is already full
      const morningRequests = requests.filter(req => {
        const reqDate = new Date(req.selectedDate);
        return reqDate.getUTCDate() === selectedDateTime.getUTCDate() &&
               reqDate.getUTCMonth() === selectedDateTime.getUTCMonth() &&
               reqDate.getUTCFullYear() === selectedDateTime.getUTCFullYear() &&
               reqDate.getUTCHours() >= 8 && reqDate.getUTCHours() < 12;
      });
  
      const afternoonRequests = requests.filter(req => {
        const reqDate = new Date(req.selectedDate);
        return reqDate.getUTCDate() === selectedDateTime.getUTCDate() &&
               reqDate.getUTCMonth() === selectedDateTime.getUTCMonth() &&
               reqDate.getUTCFullYear() === selectedDateTime.getUTCFullYear() &&
               reqDate.getUTCHours() >= 13 && reqDate.getUTCHours() < 17;
      });

      const morningApplications = applications.filter(app => {
        const appDate = new Date(app.scheduleDate);
        return appDate.getUTCDate() === selectedDateTime.getUTCDate() &&
               appDate.getUTCMonth() === selectedDateTime.getUTCMonth() &&
               appDate.getUTCFullYear() === selectedDateTime.getUTCFullYear() &&
               appDate.getUTCHours() >= 8 && appDate.getUTCHours() < 12;
      });
  
      const afternoonApplications = applications.filter(app => {
        const appDate = new Date(app.scheduleDate);
        return appDate.getUTCDate() === selectedDateTime.getUTCDate() &&
               appDate.getUTCMonth() === selectedDateTime.getUTCMonth() &&
               appDate.getUTCFullYear() === selectedDateTime.getUTCFullYear() &&
               appDate.getUTCHours() >= 13 && appDate.getUTCHours() < 17;
      });

      const morningData = morningApplications.length + morningRequests.length
      const afternoonData = afternoonApplications.length + afternoonRequests.length
  
      if ((hours >= 8 && hours < 12 && morningData >= 30) ||
          (hours >= 13 && hours < 17 && afternoonData >= 30)) {
        setErr("Selected time slot is full. Please choose a different time.");
        setFormData((prev) => ({
          ...prev,
          selectedDate: ''
        }));
        return;
      }
    }

    try {
      setLoading(true)
      const res = await axios.post(`${endpoint()}/good-moral-requests`, formData)

      if(res.data === 'Requests submitted.') {
        getRequests()
        setOpenDialog(false)
        toast('Good moral certificate request submitted', {
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
    await updateRequest(selectedRequest._id, selectedRequest);
    setOpenUpdateDialog(false);
  };

  const updateRequest = async (requestId, updatedData) => {
    try {
      const res = await axios.put(`${endpoint()}/good-moral-requests/${requestId}`, updatedData);
      if (res.data === 'Request updated.') {
        getRequests()
        toast('Application updated successfully', {
          description: 'Your requests has been updated.',
          descriptionClassName: "!text-gray-500"
        });
      } else {
        setErr(res.data);
      }
    } catch (error) {
      setErr(error.message);
    }
  };

  const deleteRequest = async (requestId) => {
    try {
      const res = await axios.delete(`${endpoint()}/good-moral-requests/${requestId}`);
      if (res.data === 'Request deleted.') {
        setUserGoodMoralRequests((prev) => prev.filter(app => app._id !== requestId));
        toast('Request deleted successfully', {
          description: 'Your request has been deleted.',
          descriptionClassName: "!text-gray-500"
        });
      } else {
        setErr(res.data);
      }
    } catch (error) {
      setErr(error.message);
    }
  };

  const confirmDeleteRequest = (requestId) => {
    setRequestToDelete(requestId);
    setOpenDeleteDialog(true);
  };

  const handleDeleteApplication = async () => {
    if (requestToDelete) {
      await deleteRequest(requestToDelete);
      setOpenDeleteDialog(false);
      setRequestToDelete(null);
    }
  };
  
  return ( 
    <>
      <div className="mb-10 w-full flex justify-between items-center">
        <h1 className="font-medium text-lg uppercase">Student Good Moral Certificate Requests</h1>
        {/* dialog for adding */}
        <Dialog open={openDialog} onOpenChange={(isOpen) => setOpenDialog(isOpen)}>
          <DialogTrigger asChild>
            <Button variant='primary' onClick={() => setOpenDialog(true)}>Request Good Moral</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-xl">
            <DialogHeader>
              <DialogTitle>Apply for student ID Card</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            {err && <p className="bg-red-500 text-white pl-2 py-1 rounded text-sm">{err}</p>}
            <form onSubmit={submitForm} className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="orNumber">OR Number</Label>
                <Input id="orNumber" name='orNumber' type="text" onChange={handleFormChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" name="fullName" type="text" onChange={handleFormChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select id="gender" name="gender" value={formData.gender} onValueChange={(value) => (setFormData((prev) => ({ ...prev, gender: value })))} required>
                  <SelectTrigger className="!w-full">
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="courseYear">Course & Year Level</Label>
                <Input id="courseYear" name="courseYear" type="text" onChange={handleFormChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="number">Contact Number</Label>
                <Input id="number" name="number" type="text" value={formData.number} onChange={handleFormChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="syGraduated">SY Graduated</Label>
                <Input id="syGraduated" name="syGraduated" type="text" onChange={handleFormChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="syCurrentlyEnrolled">SY Currently Enrolled</Label>
                <Input id="syCurrentlyEnrolled" name="syCurrentlyEnrolled" type="text" onChange={handleFormChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="selectedDate">Select date</Label>
                <Input id="selectedDate" name="selectedDate" type="datetime-local" min={getCurrentDateTime()} value={formData.scheduleDate} onChange={handleFormChange} required />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="purpose">Purpose</Label>
                <Textarea id="purpose" name="purpose" onChange={handleFormChange} required/>
              </div>
              <DialogFooter className="col-span-2">
                {!loading ? (
                  <Button type="submit" variant="primary">Submit Requests</Button>
                ) : (
                  <Button type="submit" variant="primary" className="animate-pulse" disabled>Submitting Requests</Button>
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
            List of student good moral requests.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>OR Number</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Course/Year</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Contact Number</TableHead>
              <TableHead>S.Y Graduated</TableHead>
              <TableHead>S.Y Currently Enrolled</TableHead>
              <TableHead>Purpose</TableHead>
              <TableHead>Selected Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Claimed</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userGoodMoral.length ? userGoodMoral.map((request, index) => (
              <TableRow key={index}>
                <TableCell>{request.orNumber}</TableCell>
                <TableCell>{request.fullName}</TableCell>
                <TableCell>{request.courseYear}</TableCell>
                <TableCell>{request.gender}</TableCell>
                <TableCell>{request.number}</TableCell>
                <TableCell>{request.syGraduated}</TableCell>
                <TableCell>{request.syCurrentlyEnrolled}</TableCell>
                <TableCell>{request.purpose}</TableCell>
                <TableCell>{formatSchedule(request.selectedDate)}</TableCell>
                <TableCell>
                  <Badge variant={request.status === 'approved' ? 'approved' : 'pending'}>{request.status}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={request.claimed ? 'approved' : 'pending'}>{request.claimed ? 'Yes' : 'No'}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center gap-x-1">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <SquarePen className="cursor-pointer" size={17} color="orange" onClick={() => { setSelectedRequest(request); setOpenUpdateDialog(true); }} />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Edit Request</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Trash className="cursor-pointer" size={17} color="red" onClick={() => confirmDeleteRequest(request._id)} />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Delete Request</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableCell>
              </TableRow>
            )) : <TableRow><TableCell colSpan={10} className='text-center h-20'>No requests to show</TableCell></TableRow>}
          </TableBody>
        </Table>
      </Card>
            
      {/* alert for deleting */}
      <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this request? This action cannot be undone.
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
                <Label htmlFor="orNumber">OR Number</Label>
                <Input id="orNumber" name='orNumber' type="text" value={selectedRequest?.orNumber} onChange={handleUpdateFormChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" name="fullName" type="text" value={selectedRequest?.fullName} onChange={handleUpdateFormChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select id="gender" name="gender" value={selectedRequest?.gender} onValueChange={(value) => (setSelectedRequest((prev) => ({ ...prev, gender: value })))} required>
                  <SelectTrigger className="!w-full">
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="courseYear">Course & Year Level</Label>
                <Input id="courseYear" name="courseYear" type="text" value={selectedRequest?.courseYear} onChange={handleUpdateFormChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="number">Contact Number</Label>
                <Input id="number" name="number" type="text" value={selectedRequest?.number} onChange={handleUpdateFormChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="syGraduated">SY Graduated</Label>
                <Input id="syGraduated" name="syGraduated" type="text" value={selectedRequest?.syGraduated} onChange={handleUpdateFormChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="syCurrentlyEnrolled">SY Currently Enrolled</Label>
                <Input id="syCurrentlyEnrolled" name="syCurrentlyEnrolled" type="text" value={selectedRequest?.syCurrentlyEnrolled} onChange={handleUpdateFormChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="selectedDate">Select date</Label>
                <Input id="selectedDate" name="selectedDate" type="datetime-local" value={selectedRequest?.selectedDate ? formatDateTimeLocal(selectedRequest.selectedDate) : ''} onChange={handleUpdateFormChange} required />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="purpose">Purpose</Label>
                <Textarea id="purpose" name="purpose" value={selectedRequest?.purpose} onChange={handleUpdateFormChange} required/>
              </div>
            <DialogFooter className="col-span-2">
              {!loading ? (
                <Button type="submit" variant="primary">Update Request</Button>
              ) : (
                <Button type="submit" variant="primary" className="animate-pulse" disabled>Updating Request</Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default StudentRequest;
