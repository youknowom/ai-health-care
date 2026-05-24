//ai health doctor
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import { SessionDetail } from "../medical-agent/[sessionId]/page";
import { SessionDetail } from "@/types/session";
import { Button } from "@/components/ui/button";
import moment from "moment";
import { DoctorAgent } from "./DoctorAgentCard";
import { IconChevronDown } from "@tabler/icons-react";
import ViewReportDialog from "./ViewReportDialog";

type Props = {
  historyList: SessionDetail[] | SessionDetail; // Accept array or single object
};

function HistoryTable({ historyList }: Props) {
  const [showAll, setShowAll] = useState(false);

  // Ensure historyList is always an array
  const historyArray: SessionDetail[] = Array.isArray(historyList)
    ? historyList
    : historyList
      ? [historyList]
      : [];

  // Sort by createdOn descending
  const sortedHistory = [...historyArray].sort(
    (a, b) => new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime(),
  );

  // Show only 5 initially
  const visibleRecords = showAll ? sortedHistory : sortedHistory.slice(0, 5);

  return (
    <div>
      <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
        Previous Consultation Reports
      </h3>

      {historyArray.length === 0 ? (
        <p className="text-gray-500 text-sm">No consultation history found.</p>
      ) : (
        <>
          {/* Responsive scroll wrapper */}
          <div
            className="w-full overflow-x-auto -mx-0 rounded-xl"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            <Table className="min-w-[520px]">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px] sm:w-[300px]">
                    AI Medical Specialist
                  </TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Description
                  </TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {visibleRecords.map((record: SessionDetail) => {
                  let doctor: DoctorAgent | null = record.selectedDoctor as any;
                  if (typeof doctor === "string") {
                    try {
                      doctor = JSON.parse(doctor);
                    } catch {
                      doctor = null;
                    }
                  }

                  return (
                    <TableRow key={record.sessionId}>
                      <TableCell className="font-medium text-sm">
                        {doctor?.specialist ?? "N/A"}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-sm max-w-[200px] truncate">
                        {record.notes}
                      </TableCell>
                      <TableCell className="text-xs sm:text-sm whitespace-nowrap">
                        {moment(new Date(record.createdOn)).fromNow()}
                      </TableCell>
                      <TableCell className="text-right">
                        <ViewReportDialog record={record} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {historyArray.length > 5 && (
            <div className="flex justify-center mt-4">
              {/* <button
                aria-label={showAll ? "Show less" : "View more"}
                onClick={() => setShowAll(!showAll)}
                className="flex items-center gap-1 text-blue-600 focus:outline-none cursor-pointer"
              >
                {showAll ? "Show Less" : "View More"}
                <IconChevronDown
                  className={`transition-transform duration-300 ${
                    showAll ? "rotate-180" : ""
                  }`}
                  size={20}
                />
              </button> */}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default HistoryTable;
