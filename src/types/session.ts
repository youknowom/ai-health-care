//ai health doctor
// /types/session.ts
type DoctorAgent = {
  id: number;
  specialist: string;
  description: string;
  image: string;
  voiceId?: string;
  agentPrompt: string;
  subscriptionRequired: boolean;
};

export type SessionDetail = {
  id: number;
  notes: string;
  sessionId: string;
  report: object;
  selectedDoctor: DoctorAgent;
  createdOn: string;
};
// ... rest of your types
export type Message = {
  role: string;
  text: string;
};
