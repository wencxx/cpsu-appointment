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
import { SquarePen, Trash, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card";
import endpoint from "@/connection/connection";
import axios from 'axios'
import { formatBirth, formatSchedule, formatDateTimeLocal } from "@/utils/dataFormatter";
import { useEffect, useState } from "react";
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

function ApproveApplication() {
  const [applications, setApplications] = useState([])

  const getApplications = async () => {
    try {
      const res = await axios.get(`${endpoint()}/approved-application`)

      if(res.data !== 'No applications found'){
        setApplications(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getApplications()
  }, [])

  // update logic
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  const handleUpdateFormChange = (e) => {
    const { value, name } = e.target;
    setSelectedApplication((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitUpdateForm = async (e) => {
    e.preventDefault();
    await updateApplication(selectedApplication._id, selectedApplication);
    setOpenUpdateDialog(false);
  };

  const [err, setErr] = useState('')
  const [loading, setLoading] = useState('')

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

  const formatDate = (date) => {
    const d = new Date(date);
    const month = `0${d.getMonth() + 1}`.slice(-2);
    const day = `0${d.getDate()}`.slice(-2);
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  };

  // delete logic
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [applicationToDelete, setApplicationToDelete] = useState(null);

  const deleteApplication = async (applicationId) => {
    try {
      const res = await axios.delete(`${endpoint()}/idcard-application/${applicationId}`);
      if (res.data === 'Application deleted.') {
        setApplications((prev) => prev.filter(app => app._id !== applicationId));
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

   // claim logic
   const [openClaimDialog, setOpenClaimDialog] = useState(false);
   const [claimRequestId, setRequestId] = useState("");
 
   const confirmClaimRequest = (requestId) => {
     setOpenClaimDialog(true);
     setRequestId(requestId);
   };
 
   const handleClaimRequest = async () => {
     try {
       const res = await axios.put(
         `${endpoint()}/claim-application/${claimRequestId}`
       );
       if (res.data === "Request claimed.") {
          getApplications();
          toast("Request has been claimed");
       } else {
         setErr(res.data);
       }
     } catch (error) {
       setErr(error.message);
     }
   };
  return (
    <>
      <div className="mb-10 w-full flex justify-between">
        <h1 className="font-medium text-lg uppercase">List of Approve Student ID Card</h1>
      </div>
      <Card className="p-5 shadow-none">
        <Table>
          <TableCaption>
            list of approve student ID card applications.
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
            {applications ? 
            applications.map((application, index) => (
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
                  <Badge variant="approved">{application.status}</Badge>
                </TableCell>
                <TableCell>
                    <Badge variant={application.claimed ? "approved" : "pending"}>
                      {application.claimed ? "Yes" : "No"}
                    </Badge>
                  </TableCell>
                <TableCell>
                  <div className="flex justify-center gap-x-1">
                    {!application.claimed && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Check
                                className="cursor-pointer"
                                size={17}
                                color="green"
                                onClick={() => confirmClaimRequest(application._id)}
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Request Claimed</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
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
                          <Trash className="cursor-pointer" size={17} color="red"  onClick={() => confirmDeleteApplication(application._id)} />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Delete Application</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableCell>
              </TableRow>
            )) 
            : 
              <TableRow>
                <TableCell colSpan={11} className='h-20 text-center'>No applications to show.</TableCell>
              </TableRow>
            }
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

      
      {/* alert for claiming */}
      <AlertDialog open={openClaimDialog} onOpenChange={setOpenClaimDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to proceed? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpenClaimDialog(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={handleClaimRequest}
            >
              Claimed
            </AlertDialogAction>
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

export default ApproveApplication;
