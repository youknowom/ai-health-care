//ai health doctor
"use client";

import { Check, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const features = [
    { name: "Voice Consultation", free: "Limited", premium: "Unlimited" },
    { name: "General Physician Access", free: true, premium: true },
    { name: "All 10 Specialist Doctors", free: true, premium: true },
    { name: "BioBERT Symptom Extraction", free: true, premium: true },
    { name: "ML Disease Prediction", free: true, premium: true },
    { name: "OCR Report Analysis", free: true, premium: true },
    { name: "X-ray AI Analysis", free: true, premium: true },
    { name: "Advanced Medical Advice", free: true, premium: true },
    { name: "Priority Support", free: false, premium: true },
];

export default function PricingComparison() {
    return (
        <div className="w-full max-w-5xl mx-auto px-4 py-16">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    Simple, Transparent Pricing
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    All features are currently free for academic use
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Free Tier */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
                    <div className="text-center mb-6">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            Free Tier
                        </h3>
                        <div className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-2">
                            $0
                            <span className="text-lg font-normal text-gray-500">/month</span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400">
                            Perfect for trying out our platform
                        </p>
                    </div>

                    <ul className="space-y-3 mb-8">
                        {features.map((feature, index) => {
                            const value = feature.free;
                            const isBoolean = typeof value === "boolean";

                            return (
                                <li key={index} className="flex items-center gap-3">
                                    {isBoolean ? (
                                        value ? (
                                            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shrink-0">
                                                <Check className="w-3 h-3 text-white" />
                                            </div>
                                        ) : (
                                            <X className="w-5 h-5 text-gray-300 shrink-0" />
                                        )
                                    ) : (
                                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shrink-0">
                                            <Check className="w-3 h-3 text-white" />
                                        </div>
                                    )}
                                    <span className={`text-sm ${!isBoolean || value ? "text-gray-700 dark:text-gray-300" : "text-gray-400 dark:text-gray-600"}`}>
                                        {feature.name}
                                        {!isBoolean && value && (
                                            <span className="ml-2 text-xs text-gray-500">
                                                ({value})
                                            </span>
                                        )}
                                    </span>
                                </li>
                            );
                        })}
                    </ul>

                    <Link href="/sign-up" className="block">
                        <Button variant="outline" className="w-full border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500 transition-all py-6 text-base font-semibold">
                            Get Started Free
                        </Button>
                    </Link>
                </div>

                {/* Premium Tier */}
                <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 rounded-2xl p-8 shadow-2xl overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                    {/* Popular Badge */}
                    <div className="absolute top-6 right-6 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">
                        RECOMMENDED
                    </div>

                    <div className="relative text-center mb-6">
                        <h3 className="text-2xl font-bold text-white mb-2">
                            Premium
                        </h3>
                        <div className="text-5xl font-bold text-white mb-2">
                            $49
                            <span className="text-lg font-normal text-blue-100">/month</span>
                        </div>
                        <p className="text-blue-100">
                            Full access with priority support
                        </p>
                    </div>

                    <ul className="relative space-y-3 mb-8">
                        {features.map((feature, index) => {
                            const value = feature.premium;
                            const isBoolean = typeof value === "boolean";

                            return (
                                <li key={index} className="flex items-center gap-3">
                                    {isBoolean ? (
                                        value ? (
                                            <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center shrink-0">
                                                <Check className="w-3 h-3 text-blue-600" />
                                            </div>
                                        ) : (
                                            <X className="w-5 h-5 text-blue-300 shrink-0" />
                                        )
                                    ) : (
                                        <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center shrink-0">
                                            <Check className="w-3 h-3 text-blue-600" />
                                        </div>
                                    )}
                                    <span className="text-sm text-white font-medium">
                                        {feature.name}
                                        {!isBoolean && value && (
                                            <span className="ml-2 text-xs text-blue-200">
                                                ({value})
                                            </span>
                                        )}
                                    </span>
                                </li>
                            );
                        })}
                    </ul>

                    <Link href="/sign-up" className="block relative">
                        <Button className="w-full bg-white text-blue-700 hover:bg-blue-50 font-semibold py-6 text-base shadow-lg">
                            Upgrade to Premium →
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
