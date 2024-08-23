"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAIModel";
import { LoaderCircle } from "lucide-react";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/db";
import moment from "moment";
import { useRouter } from "next/navigation";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState();
  const [jobDesc, setJobDesc] = useState();
  const [jobExperience, setJobExperience] = useState();
  const [Loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const { user } = useUser();
  const router = useRouter();
  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(jobPosition, jobDesc, jobExperience);

    const InputPrompt =
      `Job position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}, ` +
      `Depends on Job Position, Job Description & Years of Experience give me ` +
      `${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} technical and behavioural HR interview questions along with answers in JSON format.` +
      `Give us question and answer fields in JSON`;

    try {
      const result = await chatSession.sendMessage(InputPrompt);

      const MockJsonResp = result.response
        .text()
        .replace("```json", "")
        .replace("```", "");

      console.log(JSON.parse(MockJsonResp));

      setJsonResponse(MockJsonResp);

      if (MockJsonResp) {
        const resp = await db
          .insert(MockInterview)
          .values({
            mockId: uuidv4(),
            jsonMockResp: MockJsonResp,
            jobPosition: jobPosition,
            jobDesc: jobDesc,
            jobExperience: jobExperience,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format("DD/MM/YYYY"),
          })
          .returning({ mockId: MockInterview.mockId });

        console.log("Insert ID:", resp);
        if (resp) {
          setOpenDialog(false);
          router.push("/dashboard/interview/" + resp[0]?.mockId);
        }
      } else {
        console.log("Error: MockJsonResp is empty");
      }
    } catch (error) {
      console.error("Error parsing or fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-[#f5f5f55f] hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="font-bold text-lg text-center">+ Add New</h2>
      </div>
      <Dialog open={openDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl ">
              Tell us about the job you're applying for?
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  <h2>
                    Could you please provide more details about the job role
                    you're applying for like Job Role, Description and Years of
                    Experience.
                  </h2>

                  <div className="mt-5 my-2 space-y-1">
                    <label className="font-semibold text-[#d10a54]">
                      Job Role
                    </label>
                    <Input
                      placeholder="Ex. Full Stack Developer, Product Manager, etc"
                      required
                      onChange={(event) => setJobPosition(event.target.value)}
                    />
                  </div>
                  <div className="my-2 space-y-1">
                    <label className="font-semibold text-[#d10a54]">
                      Job Description
                    </label>
                    <Textarea
                      placeholder="Give the Job Description"
                      required
                      onChange={(event) => setJobDesc(event.target.value)}
                    />
                  </div>
                  <div className="my-2 space-y-1">
                    <label className="font-semibold text-[#d10a54]">
                      Year of Experience
                    </label>
                    <Input
                      placeholder="Ex. 5"
                      max="50"
                      type="number"
                      required
                      onChange={(event) => setJobExperience(event.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-5 justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    className="hover:border hover:bg-[#d10a0a] hover:transition-all hover:text-white"
                    onClick={() => setOpenDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={Loading}
                    className="bg-[#0d0d0c] hover:border hover:bg-[#95ff00] hover:text-gray-800 hover:transition-all text-gray-300"
                  >
                    {Loading ? (
                      <>
                        <LoaderCircle className="animate-spin " />
                        'Generating Interview Questions...'
                      </>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
