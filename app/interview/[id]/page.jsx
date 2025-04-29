"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Calendar, Video, Info } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useInterview } from "@/context/useInterview";
import { toast } from "sonner";

export default function InterviewJoin() {
  const [interview, setInterview] = useState();

  const { id } = useParams();
  const setNameFun = useInterview((state) => state.setNameFun);

  const [name, setName] = useState("");

  const router = useRouter();
  const getAllInterviews = () => {
    try {
      axios({
        method: "GET",
        url: `/api/interview/${id}`,
      }).then((resp) => {
        setInterview(resp.data?.data);
      });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    id && getAllInterviews();
  }, [id]);
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
        <h2 className="text-lg font-semibold">
          {interview?.jobPosition} Interview
        </h2>
        <div className="flex justify-center gap-4 text-gray-500 text-sm">
          {/* <span>🏢 Google Inc.</span> */}
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {interview?.duration} Minutes
          </span>
        </div>
      </div>
      <input
        value={name}
        placeholder="e.g., John Smith"
        className=" px-2 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] w-full rounded-md border outline-none min-h-[40px] "
        type="text"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />

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
        <Button
          onClick={() => {
            if (!interview) toast.warning("please wait we are loading");
            if (name?.length > 0) {
              setNameFun({ name: name });
              router.push(`/interview/room/${interview?.interviewId}`);
            }
          }}
          className="w-full cursor-pointer"
        >
          <Video className="w-4 h-4 mr-2" />
          Join Interview
        </Button>
        <Button variant="outline" className="w-full text-sm cursor-pointer ">
          Test Audio & Video
        </Button>
      </div>
    </div>
  );
}
