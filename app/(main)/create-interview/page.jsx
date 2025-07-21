"use client";
import { Progress } from "@/components/ui/progress";
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
import { CheckCircle2, Copy, Clock, ListOrdered, Calendar } from "lucide-react";
import InterviewForm from "./_component/InterviewForm";
import InterviewSuccess from "./_component/InterviewSuccess";
import axios from "axios";
import { toast } from "sonner";
const interviewTypes = [
  { label: "Technical", value: "technical" },
  { label: "Behavioral", value: "behavioral" },
  { label: "Experience", value: "experience" },
  { label: "Problem Solving", value: "problem-solving" },
  { label: "Leadership", value: "leadership" },
];
function CreateInterview() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [questionList, setQuestionList] = useState([]);
  const [interview, setInterview] = useState({});
  const [formData, setFormData] = useState({
    jobPosition: "",
    jobDescription: "",
    duration: "",
    selectedTypes: [],
  });

  const handleGenerate = (values) => {
    setLoading(true);
    setFormData(values); // update formData with all values from Formik
    axios({
      method: "POST",
      url: "/api/generateInterview",
      data: {
        jobPosition: values.jobPosition,
        jobDescription: values.jobDescription,
        duration: values.duration,
        type: values.selectedTypes,
      },
    })
      .then((res) => {
        const FINAL_JSON = res.data.content
          .replace("```json", "")
          .replace("```", "");
        setQuestionList(FINAL_JSON);
        axios({
          url: "api/interview",
          method: "POST",
          data: {
            questions: JSON.parse(FINAL_JSON).interviewQuestions,
            duration: values.duration,
            jobPosition: values.jobPosition,
            jobDescription: values.jobDescription,
            interviewTypes: values.selectedTypes,
          },
        }).then((res) => {
          setInterview(res.data?.data);
          setStep(step + 1);
          setLoading(false);
        });
      })
      .catch((err) => {
        toast.error("Server Error");
        setLoading(false);
      });
  };
  return (
    <div className=" flex justify-center  mx-auto ">
      <div className="  w-full max-w-[60%]  border rounded-md  p-4 ">
        <Progress className={" w-full "} value={step * 33.333} />
        {step == 1 ? (
          <InterviewForm
            setFormData={setFormData}
            formData={formData}
            loading={loading}
            setLoading={setLoading}
            handleGenerate={handleGenerate}
          />
        ) : (
          <InterviewSuccess interview={interview} />
        )}
      </div>
    </div>
  );
}

export default CreateInterview;
