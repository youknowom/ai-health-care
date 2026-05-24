//ai health doctor
"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IconArrowRight, IconPlus } from "@tabler/icons-react";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import DoctorAgentCard, { DoctorAgent } from "./DoctorAgentCard";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import SuggestedDoctorCard from "./SuggestedDoctorCard";
import { useRouter } from "next/navigation";

function AddNewSessionDialog() {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [suggestedDoctors, setSuggestedDoctors] = useState<DoctorAgent[]>();
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorAgent>();
  const router = useRouter();

  const handleNextClick = async () => {
    if (!note.trim()) {
      toast.error("Please describe your symptoms first.");
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.post("/api/suggest-doctors", {
        notes: note,
      });
      setSuggestedDoctors(data.message);
      toast.success("Doctor suggestions loaded!");
      // Play success sound safely
      try {
        new Audio("/success.wav").play();
      } catch {}
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Failed to get suggestions. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      // Reset state when dialog closes
      setNote("");
      setSuggestedDoctors(undefined);
      setSelectedDoctor(undefined);
      setLoading(false);
    }
  };

  const onStartConsultation = async () => {
    if (!selectedDoctor) {
      toast.error("Please select a doctor first.");
      return;
    }
    setLoading(true);
    try {
      const result = await axios.post("/api/session-chat", {
        notes: note,
        selectedDoctor,
      });

      if (!result.data?.sessionId) throw new Error("No session ID returned");

      setOpen(false);
      router.push(`/dashboard/medical-agent/${result.data.sessionId}`);
    } catch (error) {
      console.error("❌ Failed to start session:", error);
      toast.error("Failed to start session. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="gap-2 cursor-pointer">
          <IconPlus size={16} />
          Start New Consultation
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>New Consultation Session</DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          {/* Step 1 — Symptoms */}
          {!suggestedDoctors && (
            <>
              <p className="text-sm text-neutral-500">
                Describe your symptoms or health concern so we can suggest the
                right specialist.
              </p>
              <Textarea
                placeholder="e.g. I have been experiencing chest pain, shortness of breath, and dizziness for the past 2 days..."
                className="min-h-[120px] resize-none"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                disabled={loading}
              />
              <div className="flex justify-end">
                <Button
                  onClick={handleNextClick}
                  disabled={loading || !note.trim()}
                  className="gap-2 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Finding
                      Doctors…
                    </>
                  ) : (
                    <>
                      <IconArrowRight size={16} /> Find Doctors
                    </>
                  )}
                </Button>
              </div>
            </>
          )}

          {/* Step 2 — Choose doctor */}
          {suggestedDoctors && (
            <>
              <p className="text-sm text-neutral-500 mb-3">
                Select a specialist for your consultation:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {suggestedDoctors.map((doc, i) => (
                  <SuggestedDoctorCard
                    key={i}
                    doctorAgent={doc}
                    selectedDoctor={selectedDoctor as DoctorAgent}
                    setSelectedDoctor={setSelectedDoctor}
                  />
                ))}
              </div>

              <div className="flex justify-between mt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSuggestedDoctors(undefined);
                    setSelectedDoctor(undefined);
                  }}
                  disabled={loading}
                >
                  ← Back
                </Button>
                <Button
                  onClick={onStartConsultation}
                  disabled={!selectedDoctor || loading}
                  className="gap-2 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Starting…
                    </>
                  ) : (
                    <>
                      Start Consultation <IconArrowRight size={16} />
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AddNewSessionDialog;
