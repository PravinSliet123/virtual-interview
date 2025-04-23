'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Calendar, Video, Info } from "lucide-react";
import Image from "next/image";

export default function InterviewJoin() {
  return (
    <div className="max-w-md mx-auto p-6 space-y-6 bg-white shadow-lg rounded-2xl text-center">
      {/* Logo */}
      <h1 className="text-2xl font-bold text-blue-600">Alcruiter</h1>
      <p className="text-sm text-gray-500">AI-Powered Interview Platform</p>

      {/* Image */}
      <div className="flex justify-center">
        <Image
          src="/image/interview-illustration.png" // Replace with your actual path
          alt="Interview Illustration"
          width={240}
          height={240}
        />
      </div>

      {/* Interview Info */}
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">Full Stack Developer Interview</h2>
        <div className="flex justify-center gap-4 text-gray-500 text-sm">
          <span>🏢 Google Inc.</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            30 Minutes
          </span>
        </div>
      </div>

      {/* Name Input */}
      <Input placeholder="e.g., John Smith" className="text-sm" />

      {/* Notes */}
      <Card className="bg-blue-50 p-4 text-left space-y-2">
        <div className="flex items-center gap-2 font-medium text-blue-600">
          <Info className="w-4 h-4" />
          Before you begin
        </div>
        <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
          <li>Ensure you have a stable internet connection</li>
          <li>Test your camera and microphone</li>
          <li>Find a quiet place for the interview</li>
        </ul>
      </Card>

      {/* Action Buttons */}
      <div className="space-y-2">
        <Button className="w-full">
          <Video className="w-4 h-4 mr-2" />
          Join Interview
        </Button>
        <Button variant="outline" className="w-full text-sm">
          Test Audio & Video
        </Button>
      </div>
    </div>
  );
}
