//ai health doctor
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Brain, Activity, FileText, ScanLine, Lightbulb } from "lucide-react";

const features = [
  {
    id: 1,
    name: "Voice Consultation",
    icon: Lightbulb,
    color: "blue",
    description:
      "AI-powered voice medical consultations with specialist doctors",
    demo: "VoiceDemo",
  },
  {
    id: 2,
    name: "NLP Symptom Extraction",
    icon: Brain,
    color: "purple",
    description:
      "BioBERT extracts medical entities from your symptoms with 98% accuracy",
    demo: "NLPDemo",
  },
  {
    id: 3,
    name: "Disease Prediction",
    icon: Activity,
    color: "green",
    description: "ML predicts possible diseases with confidence scores",
    demo: "PredictionDemo",
  },
  {
    id: 4,
    name: "OCR Report Analysis",
    icon: FileText,
    color: "orange",
    description: "Extract lab values from medical reports automatically",
    demo: "OCRDemo",
  },
  {
    id: 5,
    name: "X-ray AI Analysis",
    icon: ScanLine,
    color: "red",
    description: "CNN detects pneumonia & abnormalities in chest X-rays",
    demo: "XrayDemo",
  },
];

export default function FeatureTabsDemo() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12">
      {/* Tab Navigation - Clean Design */}
      <div className="flex flex-wrap justify-center gap-2 mb-8 border-b border-gray-200 dark:border-gray-700 pb-2">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          const isActive = activeTab === index;
          return (
            <button
              key={feature.id}
              onClick={() => setActiveTab(index)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
                isActive
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{feature.name}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content - Clean Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          <div className="p-8">
            <div className="flex items-center gap-3 mb-4">
              {(() => {
                const Icon = features[activeTab].icon;
                return (
                  <div className="w-12 h-12 rounded-lg bg-blue-50 dark:bg-blue-950 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                );
              })()}
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {features[activeTab].name}
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              {features[activeTab].description}
            </p>

            {/* Feature Demo Area */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 min-h-[300px] flex items-center justify-center">
              {renderDemo(features[activeTab].demo)}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function renderDemo(demoType: string) {
  switch (demoType) {
    case "VoiceDemo":
      return <VoiceDemo />;
    case "NLPDemo":
      return <NLPDemo />;
    case "PredictionDemo":
      return <PredictionDemo />;
    case "OCRDemo":
      return <OCRDemo />;
    case "XrayDemo":
      return <XrayDemo />;
    default:
      return null;
  }
}

function VoiceDemo() {
  return (
    <div className="w-full text-center">
      <div className="relative inline-block">
        <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
          <Lightbulb className="w-10 h-10 text-blue-600 dark:text-blue-400" />
        </div>
      </div>
      <p className="mt-6 text-gray-700 dark:text-gray-300 font-medium">
        Voice consultation with AI doctor
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
        Real-time transcription & medical advice
      </p>
    </div>
  );
}

import React, { useState } from "react";

function NLPDemo() {
  const [input, setInput] = useState("");
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [listening, setListening] = useState(false);

  // Speech-to-text logic
  let recognition: any = null;
  if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
    const SpeechRecognition = (window as any).webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";
  }

  const handleMic = () => {
    if (!recognition) {
      setError("Speech recognition not supported in this browser.");
      return;
    }
    setError("");
    setListening(true);
    recognition.start();
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setListening(false);
    };
    recognition.onerror = (event: any) => {
      setError("Speech recognition error: " + event.error);
      setListening(false);
    };
    recognition.onend = () => {
      setListening(false);
    };
  };

  const handleExtract = async () => {
    setLoading(true);
    setError("");
    setSymptoms([]);
    try {
      const res = await fetch("/api/nlp-extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Extraction failed");
      setSymptoms(Array.isArray(data.entities) ? data.entities : []);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="bg-white dark:bg-gray-900 rounded-lg p-4 mb-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 mb-2">
          <textarea
            className="w-full rounded border border-purple-200 dark:border-purple-800 p-2 bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300"
            rows={3}
            placeholder="Describe your symptoms..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="button"
            onClick={handleMic}
            className={`ml-2 p-2 rounded-full border border-purple-300 dark:border-purple-700 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 ${listening ? "animate-pulse" : ""}`}
            title="Speak symptoms"
            disabled={listening}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 18.75v1.5m0 0h3.375m-3.375 0H8.625M12 3.75v9m0 0a3 3 0 01-3-3V9a3 3 0 016 0v.75a3 3 0 01-3 3z"
              />
            </svg>
          </button>
        </div>
        <button
          className="mt-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
          onClick={handleExtract}
          disabled={loading || !input.trim()}
        >
          {loading ? "Extracting..." : "Extract Symptoms"}
        </button>
      </div>
      <div className="space-y-2">
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Extracted Symptoms:
        </p>
        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
        <div className="flex flex-wrap gap-2">
          {symptoms.map((symptom, idx) => (
            <span
              key={symptom + idx}
              className="px-3 py-1.5 bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 rounded-lg text-sm font-medium border border-purple-200 dark:border-purple-800"
            >
              {symptom}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function PredictionDemo() {
  const diseases = [
    { name: "Viral Flu", confidence: 87 },
    { name: "Common Cold", confidence: 65 },
    { name: "Migraine", confidence: 42 },
  ];

  return (
    <div className="w-full space-y-4">
      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
        Predicted Diseases:
      </p>
      {diseases.map((disease) => (
        <div key={disease.name} className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              {disease.name}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {disease.confidence}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
            <div
              style={{ width: `${disease.confidence}%` }}
              className={`h-full ${
                disease.confidence > 70
                  ? "bg-green-500"
                  : disease.confidence > 50
                    ? "bg-yellow-500"
                    : "bg-gray-400"
              }`}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function OCRDemo() {
  const labValues = [
    { test: "Glucose", value: "95 mg/dL", status: "normal" },
    { test: "Cholesterol", value: "210 mg/dL", status: "warning" },
    { test: "Hemoglobin", value: "14.2 g/dL", status: "normal" },
  ];

  return (
    <div className="w-full">
      <div className="mb-4 text-center">
        <div className="inline-block px-4 py-2 bg-orange-50 dark:bg-orange-950 text-orange-700 dark:text-orange-300 rounded-lg text-sm border border-orange-200 dark:border-orange-800">
          📄 Scanning report...
        </div>
      </div>
      <div className="space-y-2">
        {labValues.map((item) => (
          <div
            key={item.test}
            className="flex justify-between items-center p-3 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700"
          >
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {item.test}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-gray-600 dark:text-gray-400">
                {item.value}
              </span>
              <span
                className={`text-xs px-2 py-1 rounded ${
                  item.status === "normal"
                    ? "bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800"
                    : "bg-yellow-50 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800"
                }`}
              >
                {item.status === "normal" ? "✓" : "⚠"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function XrayDemo() {
  return (
    <div className="w-full text-center">
      <div className="relative inline-block">
        <div className="w-48 h-48 bg-gray-800 dark:bg-gray-900 rounded-lg overflow-hidden relative border border-gray-700">
          <div className="absolute top-8 left-8 w-32 h-24 border-2 border-red-500 rounded">
            <span className="absolute -top-6 left-0 text-xs text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-950 px-2 py-1 rounded border border-red-200 dark:border-red-800">
              Pneumonia 87%
            </span>
          </div>
        </div>
      </div>
      <p className="mt-6 text-gray-700 dark:text-gray-300 font-medium">
        X-ray Analysis Complete
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
        Abnormality detected with 87% confidence
      </p>
    </div>
  );
}
