//ai health doctor
"use client";

import { Mic, Brain, BarChart3, CheckCircle } from "lucide-react";

const steps = [
  {
    number: 1,
    title: "Input Symptoms",
    description: "Voice, text, or upload medical reports & X-rays",
    icon: Mic,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    number: 2,
    title: "AI Analysis",
    description: "BioBERT extracts symptoms, ML models analyze data",
    icon: Brain,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    number: 3,
    title: "Get Predictions",
    description: "Disease predictions, report analysis, X-ray results",
    icon: BarChart3,
    gradient: "from-emerald-500 to-green-500",
  },
  {
    number: 4,
    title: "Take Action",
    description: "Medical advice, doctor recommendations, treatment guidance",
    icon: CheckCircle,
    gradient: "from-orange-500 to-amber-500",
  },
];

export default function HowItWorksFlow() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          How It Works
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Our AI-powered platform guides you through a comprehensive medical
          analysis
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
        {/* Connection Line (Desktop) */}
        <div className="hidden lg:block absolute top-14 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-300 via-purple-300 via-emerald-300 to-orange-300 dark:from-blue-700 dark:via-purple-700 dark:via-emerald-700 dark:to-orange-700 -z-10" />

        {steps.map((step) => (
          <StepCard key={step.number} step={step} />
        ))}
      </div>
    </div>
  );
}

function StepCard({ step }: { step: (typeof steps)[0] }) {
  const Icon = step.icon;

  return (
    <div className="relative flex flex-col items-center text-center group">
      {/* Step Number */}
      <div
        className={`w-14 h-14 rounded-full bg-gradient-to-br ${step.gradient} text-white flex items-center justify-center text-xl font-bold mb-4 shadow-lg group-hover:scale-110 transition-transform relative z-10`}
      >
        {step.number}
      </div>

      {/* Icon */}
      <div className="w-16 h-16 mb-4 rounded-xl bg-white dark:bg-gray-800 shadow-md flex items-center justify-center border border-gray-200 dark:border-gray-700 group-hover:shadow-lg transition-shadow">
        <Icon className="w-8 h-8 text-gray-700 dark:text-gray-300" />
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {step.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        {step.description}
      </p>
    </div>
  );
}
