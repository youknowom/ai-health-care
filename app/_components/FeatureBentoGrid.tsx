//ai health doctor
"use client";
import { cn } from "@/lib/utils";
import React from "react";
import {
  IconBrain,
  IconChartDots3,
  IconFile,
  IconPhoto,
  IconStethoscope,
} from "@tabler/icons-react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

export function FeatureBentoGrid() {
  return (
    <BentoGrid className="max-w-6xl mx-auto">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={cn(item.className)}
          icon={item.icon}
        />
      ))}
    </BentoGrid>
  );
}

// NLP Symptom Extraction
const SkeletonOne = () => {
  return (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 p-4 flex-col space-y-3">
      <div className="flex flex-row rounded-lg border border-purple-200 dark:border-purple-800 p-3 items-center space-x-2 bg-white dark:bg-gray-900">
        <div className="h-6 w-6 rounded-full bg-purple-500 shrink-0" />
        <div className="w-full bg-purple-100 dark:bg-purple-900 h-3 rounded" />
      </div>
      <div className="flex flex-row rounded-lg border border-purple-200 dark:border-purple-800 p-3 items-center space-x-2 w-3/4 ml-auto bg-white dark:bg-gray-900">
        <div className="w-full bg-purple-100 dark:bg-purple-900 h-3 rounded" />
        <div className="h-6 w-6 rounded-full bg-purple-500 shrink-0" />
      </div>
      <div className="flex flex-row rounded-lg border border-purple-200 dark:border-purple-800 p-3 items-center space-x-2 bg-white dark:bg-gray-900">
        <div className="h-6 w-6 rounded-full bg-purple-500 shrink-0" />
        <div className="w-full bg-purple-100 dark:bg-purple-900 h-3 rounded" />
      </div>
    </div>
  );
};

// Disease Prediction
const SkeletonTwo = () => {
  const predictions = [85, 65, 40];

  return (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-lg bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30 p-4 flex-col space-y-3">
      {predictions.map((width, i) => (
        <div key={i} className="space-y-1">
          <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
            <span>Disease {i + 1}</span>
            <span>{width}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              style={{ width: `${width}%` }}
              className={`h-2 rounded-full ${
                width > 70
                  ? "bg-green-500"
                  : width > 50
                    ? "bg-yellow-500"
                    : "bg-gray-400"
              }`}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

// OCR Report Analysis
const SkeletonThree = () => {
  return (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-lg bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <IconFile className="w-16 h-16 text-orange-300 dark:text-orange-700" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-orange-500 animate-pulse" />
    </div>
  );
};

// X-ray AI Analysis
const SkeletonFour = () => {
  return (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-lg bg-gray-800 dark:bg-gray-900 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border-2 border-red-500 rounded">
        <div className="absolute -top-6 left-0 text-xs bg-red-500 text-white px-2 py-1 rounded">
          87% Pneumonia
        </div>
      </div>
    </div>
  );
};

// Medical Advice
const SkeletonFive = () => {
  return (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 p-4 flex-col space-y-2">
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 rounded-full bg-blue-500" />
        <div className="w-3/4 h-2 bg-blue-200 dark:bg-blue-900 rounded" />
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 rounded-full bg-blue-500" />
        <div className="w-2/3 h-2 bg-blue-200 dark:bg-blue-900 rounded" />
      </div>
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 rounded-full bg-blue-500" />
        <div className="w-4/5 h-2 bg-blue-200 dark:bg-blue-900 rounded" />
      </div>
    </div>
  );
};

const items = [
  {
    title: "NLP Symptom Extraction",
    description:
      "BioBERT extracts medical entities from natural language with 98% accuracy",
    header: <SkeletonOne />,
    className: "md:col-span-2",
    icon: <IconBrain className="h-4 w-4 text-purple-600" />,
  },
  {
    title: "Disease Prediction",
    description: "ML models predict possible diseases with confidence scores",
    header: <SkeletonTwo />,
    className: "md:col-span-1",
    icon: <IconChartDots3 className="h-4 w-4 text-green-600" />,
  },
  {
    title: "OCR Report Analysis",
    description: "Extract lab values from medical reports automatically",
    header: <SkeletonThree />,
    className: "md:col-span-1",
    icon: <IconFile className="h-4 w-4 text-orange-600" />,
  },
  {
    title: "X-ray AI Analysis",
    description: "CNN detects pneumonia and abnormalities in chest X-rays",
    header: <SkeletonFour />,
    className: "md:col-span-2",
    icon: <IconPhoto className="h-4 w-4 text-red-600" />,
  },
  {
    title: "Smart Recommendations",
    description: "Personalized medical advice and doctor suggestions",
    header: <SkeletonFive />,
    className: "md:col-span-3",
    icon: <IconStethoscope className="h-4 w-4 text-blue-600" />,
  },
];
