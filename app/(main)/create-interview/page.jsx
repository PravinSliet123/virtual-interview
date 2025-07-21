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
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [questionList, setQuestionList] = useState([]);
  const [interview, setInterview] = useState({});
  console.log("questionList: ", questionList);
  const [formData, setFormData] = useState({
    jobPosition: "",
    jobDescription: "",
    duration: "",
    type: [],
  });
  const toggleType = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleGenerate = () => {
    try {
      setLoading(true);
      axios({
        method: "POST",
        url: "/api/generateInterview",
        data: {
          jobPosition: formData.jobPosition,
          jobDescription: formData.jobDescription,
          duration: formData.duration,
          type: selectedTypes,
        },
      })
        .then((res) => {
          const FINAL_JSON = res.data.content
            .replace("```json", "")
            .replace("```", "");
          console.log("FINAL_JSON: ", JSON.parse(FINAL_JSON).interviewQuestions);
          setQuestionList(FINAL_JSON);

          axios({
            url: "api/interview",
            method: "POST",
            data: {
              questions: JSON.parse(FINAL_JSON).interviewQuestions,
              duration: formData.duration,
              jobPosition: formData.jobPosition,
              jobDescription: formData.jobDescription,
              interviewTypes: selectedTypes,
            },
          }).then((res) => {
            console.log("res: ", res);
            setInterview(res.data?.data);
            setStep(step + 1);
            setLoading(false);
          });
        })
        .catch((err) => {
          console.log("err: ", err);
          toast.error("Sever Errro");
          setLoading(false);
        })
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <div
      className=" flex justify-center  mx-auto 
      "
    >
      <div className="  w-full max-w-[60%]  border rounded-md  p-4 ">
        <Progress className={" w-full "} value={step * 33.333} />
        {step == 1 ? (
          <InterviewForm
            setFormData={setFormData}
            formData={formData}
            loading={loading}
            setLoading={setLoading}
            selectedTypes={selectedTypes}
            toggleType={toggleType}
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
