//ai health doctor
"use client";

import { useAuth } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

export type DoctorAgent = {
  id: number;
  specialist: string;
  description: string;
  image: string;
  voiceId?: string;
  agentPrompt: string;
  subscriptionRequired: boolean;
};

type Props = {
  doctorAgent: DoctorAgent;
};

function DoctorAgentCard({ doctorAgent }: Props) {
  const { has } = useAuth();
  //@ts-ignore
  const paidUser = has && has({ plan: "pro" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onStartConsultation = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/session-chat", {
        notes: "New Query",
        selectedDoctor: doctorAgent,
      });

      if (!result.data?.sessionId) throw new Error("No session ID returned");
      router.push(`/dashboard/medical-agent/${result.data.sessionId}`);
    } catch (error) {
      console.error("❌ Failed to start session:", error);
      toast.error("Failed to start session. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isLocked = !paidUser && doctorAgent.subscriptionRequired;

  return (
    <div
      className="group rounded-[1.5rem] overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
      style={{
        background: "#f0fdf4",
        boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 0 0 1px rgba(22,163,74,0.1)",
      }}
    >
      {/* Doctor image */}
      <div className="relative w-full h-48 overflow-hidden">
        {doctorAgent.subscriptionRequired && (
          <span
            className="absolute top-3 right-3 z-10 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
            style={{ background: "#111", color: "#fff" }}
          >
            Premium
          </span>
        )}
        <Image
          src={doctorAgent.image}
          alt={doctorAgent.specialist}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-semibold text-neutral-900 text-sm mb-1 tracking-tight">
          {doctorAgent.specialist}
        </h3>
        <p className="text-xs text-neutral-500 line-clamp-2 mb-5 leading-relaxed">
          {doctorAgent.description}
        </p>

        <button
          onClick={onStartConsultation}
          disabled={isLocked || loading}
          className="w-full flex items-center justify-between px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-200"
          style={
            isLocked
              ? { background: "rgba(0,0,0,0.06)", color: "#aaa", cursor: "not-allowed" }
              : {
                background: "#111",
                color: "#fff",
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.12)",
              }
          }
        >
          <span>{loading ? "Starting…" : isLocked ? "Premium Only" : "Start Consultation"}</span>
          {!isLocked && (
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          )}
        </button>
      </div>
    </div>
  );
}

export default DoctorAgentCard;
