"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, Copy, Clock, ListOrdered, Calendar } from "lucide-react";
import Link from "next/link";

export default function InterviewSuccess() {
  const interviewLink = "https://alcruiter.ai/interview/j8k9m2n3p4";

  const handleCopy = () => {
    navigator.clipboard.writeText(interviewLink);
  };

  return (
    <div className="mx-auto p-6 space-y-6 text-center">
      <div className="flex justify-center">
        <CheckCircle2 className="h-12 w-12 text-green-500" />
      </div>
      <h2 className="text-xl font-semibold">Your AI Interview is Ready!</h2>
      <p className="text-gray-500">
        Share this link with your candidates to start the interview process
      </p>

      {/* Link Box */}
      <div className="border rounded-xl p-4 space-y-3 text-left bg-gray-50">
        <div className="flex justify-between items-center">
          <p className="text-sm font-medium">Interview Link</p>
          <span className="text-xs text-gray-500">Valid for 30 days</span>
        </div>

        <div className="flex items-center gap-2">
          <Input readOnly value={interviewLink} className="flex-1 text-sm" />
          <Button onClick={handleCopy} size="sm">
            <Copy className="w-4 h-4 mr-1" />
            Copy Link
          </Button>
        </div>

        <div className="flex gap-4 text-sm text-gray-600 pt-2 border-t mt-2">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            30 Minutes
          </div>
          <div className="flex items-center gap-1">
            <ListOrdered className="w-4 h-4" />
            10 Questions
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            Expires: Nov 20, 2025
          </div>
        </div>
      </div>

      {/* Share Options */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-left">Share via</p>
        <div className="flex gap-4 justify-center">
          <Button variant="outline">📧 Email</Button>
          <Button variant="outline">💬 Slack</Button>
          <Button variant="outline">🟢 WhatsApp</Button>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-between pt-4 border-t">
        <Link href={"/dashboard"}><Button variant="outline">← Back to Dashboard</Button></Link>
        <Button>Create New Interview</Button>
      </div>
    </div>
  );
}
