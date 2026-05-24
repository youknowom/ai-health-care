//ai health doctor
"use client";

import { AIDoctorAgents } from "@/shared/list";
import React from "react";
import DoctorAgentCard from "./DoctorAgentCard";
import { motion } from "framer-motion";
import { Stethoscope } from "lucide-react";

function DoctorsAgentList() {
  return (
    <div className="mt-20">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0, transition: { duration: 0.55 } }}
        viewport={{ once: true }}
        className="mb-10"
      >
        <div className="flex items-center gap-2 mb-3">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.14em]"
            style={{ background: "#EAEAE7", color: "#01751eff" }}
          >
            <Stethoscope className="w-3.5 h-3.5" />
            Specialist Agents
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-neutral-950 tracking-[-0.025em]">
          All Specialist Doctors Are Here to Help You
        </h2>
        <p className="mt-2 sm:mt-3 text-neutral-500 text-sm sm:text-base max-w-xl">
          Choose a specialist AI agent to begin your consultation.
        </p>
      </motion.div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 min-[480px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {AIDoctorAgents.map((doctor, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.4, delay: index * 0.05 },
            }}
            viewport={{ once: true }}
          >
            <DoctorAgentCard doctorAgent={doctor} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default DoctorsAgentList;
