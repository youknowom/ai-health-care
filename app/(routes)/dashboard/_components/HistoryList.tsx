//ai health doctor
"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import AddNewSessionDialog from "./AddNewSessionDialog";
import axios from "axios";
import HistoryTable from "./HistoryTable";
import { SessionDetail } from "@/types/session";
import { motion } from "framer-motion";
import { CalendarX } from "lucide-react";

const HistoryList = () => {
  const [historyList, setHistoryList] = useState<SessionDetail[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getHistoryList = async () => {
    try {
      const result = await axios.get("/api/session-chat?sessionId=all");
      setHistoryList(Array.isArray(result.data) ? result.data : []);
    } catch (error) {
      console.error("Failed to fetch history list", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getHistoryList();
  }, []);

  return (
    <div>
      {isLoading ? (
        // Skeleton loader
        <div className="space-y-2 animate-pulse">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-12 rounded-xl bg-green-100/60" />
          ))}
        </div>
      ) : historyList.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
          className="flex items-center flex-col justify-center py-16 px-8 rounded-[2rem] border-2 border-dashed border-neutral-300"
          style={{ background: "#f0fdf4" }}
        >
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
            style={{ background: "rgba(0,0,0,0.05)" }}
          >
            <Image
              src={"/medical-assistance.png"}
              alt="medical-assistance"
              width={60}
              height={60}
              className="opacity-80"
            />
          </div>
          <h2 className="font-semibold text-xl text-neutral-900 tracking-tight">
            No Recent Consultations
          </h2>
          <p className="text-neutral-500 mt-2 text-sm text-center max-w-xs">
            It looks like you haven&apos;t consulted with any doctors yet.
          </p>
          <div className="mt-7">
            <AddNewSessionDialog />
          </div>
        </motion.div>
      ) : (
        <HistoryTable historyList={historyList} />
      )}
    </div>
  );
};

export default HistoryList;
