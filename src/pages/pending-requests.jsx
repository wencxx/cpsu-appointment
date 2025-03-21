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

const approveGoodMoral = [
  {
    id: 1,
    orNumber: "2021-0572-K",
    fullName: "Wency Baterna",
    courseYear: "BSIT 4",
    gender: "Male",
    syGraduated: "2025",
    syEnrolled: "2001",
    purpose: "Exam",
    scheduleDate: "2025-01-30",
    status: "Pending",
  },
];

function PendingRequests() {
  return (
    <>
      <div className="mb-10 w-full flex justify-between">
        <h1 className="font-medium text-lg">List of Pending Good Moral Requests</h1>
      </div>
      <Table>
        <TableCaption>
          list of pending good moral requests.
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
          {approveGoodMoral.map((goodMoral) => (
            <TableRow key={goodMoral.id}>
              <TableCell>{goodMoral.orNumber}</TableCell>
              <TableCell>{goodMoral.fullName}</TableCell>
              <TableCell>{goodMoral.courseYear}</TableCell>
              <TableCell>{goodMoral.gender}</TableCell>
              <TableCell>{goodMoral.syGraduated}</TableCell>
              <TableCell>{goodMoral.syEnrolled}</TableCell>
              <TableCell>{goodMoral.purpose}</TableCell>
              <TableCell>{goodMoral.scheduleDate}</TableCell>
              <TableCell>
                <Badge variant="pending">{goodMoral.status}</Badge>
              </TableCell>
              <TableCell>
                <div className="flex justify-center gap-x-1">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Check className="cursor-pointer" size={17} color="green" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Approve Request</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
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

export default PendingRequests;
