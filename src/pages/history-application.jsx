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

const approveApplications = [
  {
    id: 1,
    idNumber: "2021-0572-K",
    fullName: "Wency Baterna",
    courseYear: "BSIT 4",
    address: "La Castellana",
    number: "09638806212",
    birthday: "2001-04-09",
    guardianName: "Rochelle Raniola",
    guardianContact: "09563990365",
    scheduleDate: "2025-01-30",
    status: "Approve",
  },
];

function HistoryApplication() {
  return (
    <>
      <div className="mb-10 w-full flex justify-between">
        <h1 className="font-medium text-lg">Student ID Card History</h1>
      </div>
      <Table>
        <TableCaption>
          Student ID card applications history.
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
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {approveApplications.map((application) => (
            <TableRow key={application.id}>
              <TableCell>{application.idNumber}</TableCell>
              <TableCell>{application.fullName}</TableCell>
              <TableCell>{application.courseYear}</TableCell>
              <TableCell>{application.address}</TableCell>
              <TableCell>{application.number}</TableCell>
              <TableCell>{application.birthday}</TableCell>
              <TableCell>{application.guardianName}</TableCell>
              <TableCell>{application.guardianContact}</TableCell>
              <TableCell>{application.scheduleDate}</TableCell>
              <TableCell>
                <Badge variant="approved">{application.status}</Badge>
              </TableCell>
              <TableCell>
                <div className="flex justify-center gap-x-1">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <SquarePen className="cursor-pointer" size={17} color="orange" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Edit Application</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Trash className="cursor-pointer" size={17} color="red" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Delete Application</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default HistoryApplication;
