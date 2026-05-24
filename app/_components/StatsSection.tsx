//ai health doctor
"use client";

import { Target, Brain, Users, FileText, Activity } from "lucide-react";

const stats = [
  {
    icon: Target,
    value: "98%",
    label: "Symptom Extraction Accuracy",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Brain,
    value: "50+",
    label: "Diseases Detected",
    gradient: "from-emerald-500 to-green-500",
  },
  {
    icon: Users,
    value: "10",
    label: "Specialist Doctors",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: FileText,
    value: "1000+",
    label: "Reports Analyzed",
    gradient: "from-orange-500 to-amber-500",
  },
  {
    icon: Activity,
    value: "95%",
    label: "X-ray Detection Rate",
    gradient: "from-rose-500 to-red-500",
  },
];

export default function StatsSection() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-16 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-950/20 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Proven Accuracy
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Our AI-powered platform delivers medical-grade accuracy across all
          features
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>
    </div>
  );
}

function StatCard({ stat }: { stat: (typeof stats)[0] }) {
  const Icon = stat.icon;

  return (
    <div className="text-center group">
      <div
        className={`w-14 h-14 mx-auto mb-3 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
      >
        <Icon className="w-7 h-7 text-white" />
      </div>

      <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-2">
        {stat.value}
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400 leading-tight">
        {stat.label}
      </p>
    </div>
  );
}
