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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SquarePen, Trash } from "lucide-react";
import { Card } from "@/components/ui/card";
import axios from "axios";
import { useState, useEffect } from "react";
import endpoint from "@/connection/connection";
import { formatSchedule } from "@/utils/dataFormatter";

function ApproveRequests() {
  const [requests, setRequests] = useState([])

  const getRequests = async () => {
    try {
      const res = await axios.get(`${endpoint()}/approved-requests`)

      if(res.data !== 'No requests found'){
        setRequests(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getRequests()
  }, [])

  // update logic
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)

  const handleUpdateFormChange = (e) => {
    const { value, name } = e.target;
    setSelectedRequest((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitUpdateForm = async (e) => {
    e.preventDefault();
    await updateRequest(selectedRequest._id, selectedRequest);
    setOpenUpdateDialog(false);
  };

  const updateRequest = async (requestId, updatedData) => {
    try {
      const res = await axios.put(`${endpoint()}/good-moral-requests/${requestId}`, updatedData);
      if (res.data === 'Request updated.') {
        setRequests((prev) => prev.map(req => req._id === requestId ? { ...req, ...updatedData } : req));
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

  const formatDateTimeLocal = (date) => {
    const d = new Date(date);
    const month = `0${d.getMonth() + 1}`.slice(-2);
    const day = `0${d.getDate()}`.slice(-2);
    const year = d.getFullYear();
    const hours = `0${d.getHours()}`.slice(-2);
    const minutes = `0${d.getMinutes()}`.slice(-2);
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  // delete logic
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [requestToDelete, setRequestToDelete] = useState(null);

  const deleteRequest = async (requestId) => {
    try {
      const res = await axios.delete(`${endpoint()}/good-moral-requests/${requestId}`);
      if (res.data === 'Request deleted.') {
        setRequests((prev) => prev.filter(app => app._id !== requestId));
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
      <div className="mb-10 w-full flex justify-between">
        <h1 className="font-medium text-lg uppercase">List of Approve Good Moral Requests</h1>
      </div>
      <Card className="p-5 shadow-none">
        <Table>
          <TableCaption>
            list of approve good moral requests.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>O.R Number</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Course/Year</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>SY Graduated</TableHead>
              <TableHead>SY Enrolled</TableHead>
              <TableHead>Purpose</TableHead>
              <TableHead>Schedule Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.length ? 
              requests.map((req, index) => (
                <TableRow key={index}>
                  <TableCell>{req.orNumber}</TableCell>
                  <TableCell>{req.fullName}</TableCell>
                  <TableCell>{req.courseYear}</TableCell>
                  <TableCell>{req.gender}</TableCell>
                  <TableCell>{req.syGraduated}</TableCell>
                  <TableCell>{req.syCurrentlyEnrolled}</TableCell>
                  <TableCell>{req.purpose}</TableCell>
                  <TableCell>{formatSchedule(req.selectedDate)}</TableCell>
                  <TableCell>
                    <Badge variant="approved">{req.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center gap-x-1">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <SquarePen className="cursor-pointer" size={17} color="orange" onClick={() => { setSelectedRequest(req); setOpenUpdateDialog(true); }} />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Edit Application</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Trash className="cursor-pointer" size={17} color="red" onClick={() => confirmDeleteRequest(req._id)} />
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
            <TableRow><TableCell colSpan={10} className='h-20 text-center'>No requests to show.</TableCell></TableRow>
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

export default ApproveRequests;
