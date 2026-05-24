//ai health doctor
import { DoctorAgent } from "../app/(routes)/dashboard/_components/DoctorAgentCard";

export type SessionDetail = {
  id: number;
  notes: string;
  sessionId: string;
  report: object;
  selectedDoctor: DoctorAgent;
  createdOn: string;
};

export type Message = {
  role: string;
  text: string;
};
