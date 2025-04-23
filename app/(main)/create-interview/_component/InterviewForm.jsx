"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import Link from "next/link";

const interviewTypes = [
  { label: "Technical", value: "technical" },
  { label: "Behavioral", value: "behavioral" },
  { label: "Experience", value: "experience" },
  { label: "Problem Solving", value: "problem-solving" },
  { label: "Leadership", value: "leadership" },
];

export default function InterviewForm({
  handleGenerate,
  toggleType,
  selectedTypes,
  loading,
  setFormData,
  formData,
}) {
  return (
    <div className=" mx-auto p-6  space-y-6">
      <div>
        <label className="block font-medium mb-1">Job Position</label>
        <Input
          onChange={(e) => {
            setFormData({ ...formData, jobPosition: e.target.value });
          }}
          placeholder="e.g. Senior Frontend Developer"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Job Description</label>
        <Textarea
          onChange={(e) => {
            setFormData({ ...formData, jobDescription: e.target.value });
          }}
          placeholder="Enter detailed job description..."
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Interview Duration</label>
        <Select
          onValueChange={(e) => {
            console.log('e: ', e);
            setFormData({ ...formData, duration: e });
          }}
          defaultValue="15"
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="15">15 minutes</SelectItem>
            <SelectItem value="30">30 minutes</SelectItem>
            <SelectItem value="45">45 minutes</SelectItem>
            <SelectItem value="60">60 minutes</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block font-medium mb-2">Interview Types</label>
        <div className="flex flex-wrap gap-2">
          {interviewTypes.map((type) => (
            <Badge
              key={type.value}
              variant={
                selectedTypes.includes(type.value) ? "default" : "outline"
              }
              className="cursor-pointer"
              onClick={() => toggleType(type.value)}
            >
              {type.label}
            </Badge>
          ))}
        </div>
      </div>

      {loading && (
        <div className="text-blue-600 text-sm mt-2">
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            Generating Interview Questions
          </div>
          <p className="text-xs mt-1 text-gray-500">
            Our AI is crafting personalized questions based on your
            requirements...
          </p>
        </div>
      )}

      <div className="flex justify-end gap-2">
       <Link href={"/dashboard"} className=" cursor-pointer" > <Button variant="outline">Cancel</Button></Link>
        <Button className={ " cursor-pointer" } onClick={handleGenerate} disabled={loading}>
          Generate Questions →
        </Button>
      </div>
    </div>
  );
}
