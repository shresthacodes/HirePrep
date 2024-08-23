"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Sparkle, Sparkles, WebcamIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";

function Interview({ params }) {
  const [interviewData, setInterviewData] = useState();
  const [webCamEnabled, setWebCamEnabled] = useState(false);
  useEffect(() => {
    console.log(params.interviewId);
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));

    setInterviewData(result[0]);
  };
  return (
    <div className="my-10 ">
      <h2 className="font-bold text-2xl text-[#d10a54] mb-10">
        Let's get Started
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 ">
        <div className="flex flex-col my-5 gap-5">
          <div className="flex flex-col p-5 rounded-lg border gap-5">
            <h2>
              <strong>Job Role: </strong>
              {interviewData?.jobPosition}
            </h2>
            <h2>
              <strong>Job Description/ Tech Stack: </strong>
              {interviewData?.jobDesc}
            </h2>
            <h2>
              <strong>Years of Experience: </strong>
              {interviewData?.jobExperience}
            </h2>
          </div>
          <div className="flex flex-col p-5 rounded-lg border gap-5 border-green-100 bg-green-100">
            <h2 className="flex gap-2 items-center text-green-700 text-justify">
              <Sparkles />
              <strong>General Information</strong>
            </h2>
            <h2 className="text-green-700">
              {process.env.NEXT_PUBLIC_INFORMATION}
            </h2>
          </div>
        </div>
        <div>
          {webCamEnabled ? (
            <Webcam
              onUserMedia={() => setWebCamEnabled(true)}
              onUserMediaError={() => setWebCamEnabled(false)}
              mirrored={true}
              style={{ width: 300, height: 300 }}
            />
          ) : (
            <>
              <WebcamIcon className="h-72 w-full p-20 my-7 bg-secondary rounded-lg border-spacing-8" />
              <Button
                onClick={() => setWebCamEnabled(true)}
                variant="outline"
                className="w-full hover:bg-[#000000] hover:text-gray-200  transition-all"
              >
                Enable your camera and Micropscope
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="flex justify-end items-end">
        <Button className=" bg-[#f8e5ec] text-gray-500 hover:text-gray-100 hover:bg-[#d10a54]">
          Start Interview
        </Button>
      </div>
    </div>
  );
}

export default Interview;
