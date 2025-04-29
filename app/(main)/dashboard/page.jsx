"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Video,
  PhoneCall,
  Copy,
  Send,
  Facebook,
  Circle,
  Watch,
} from "lucide-react";
// import SaveUser from "./_component/SaveUser";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import Link from "next/link";
export default function Dashboard() {
  const [interviews, setInterviews] = useState([]);

  // const registerUser = () => {
  //   try {
  //     axios({
  //       url: "/api/register",
  //       method: "POST",
  //       data: {},
  //     }).then((res) => {
  //       toast.success(res?.data.message);
  //     });
  //   } catch (error) {
  //     toast.error(error.response?.data?.message);
  //   }
  // };
  const getAllInterviews = () => {
    try {
      axios({
        method: "GET",
        url: "api/interview",
      }).then((resp) => {
        setInterviews(resp.data?.data);
      });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    getAllInterviews();
  }, []);

  return (
    <div className="bg-gray-50">
      <main className="p-6 space-y-6">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <Video className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="font-semibold">Create New Interview</h3>
                <p className="text-sm text-muted-foreground">
                  Create AI interviews and schedule them with candidates
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <PhoneCall className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="font-semibold">Create Phone Screening Call</h3>
                <p className="text-sm text-muted-foreground">
                  Schedule phone screening calls with potential candidates
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <h4 className="text-lg font-semibold mb-4">
            Previously Created Interviews
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {interviews.map((item, index) => (
              <Card key={index}>
                <CardContent className="p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    {item.icon}
                    <span className="text-xs text-gray-500">{item.date}</span>
                  </div>
                  <h5 className="font-medium">{item?.jobPosition}</h5>
                  <p className="text-sm text-muted-foreground">
                    {item?.duration} Min
                  </p>
                  <div className="flex gap-2 pt-2">
                    <Button
                      onClick={() => {
                        navigator.clipboard.writeText(
                          window.location.host +
                            "/interview/" +
                            item?.interviewId
                        );
                        toast.success("Link copied successfully");
                      }}
                      variant="outline"
                      size="sm"
                      className="gap-1 cursor-pointer "
                    >
                      <Copy className="w-4 h-4" /> Copy Link
                    </Button>
                    <Link className="  cursor-pointer" href={`/interview/${item?.interviewId}`}>
                      {" "}
                      <Button size="sm" className="gap-1 cursor-pointer">
                        <Watch className="w-4 h-4" /> Start
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
