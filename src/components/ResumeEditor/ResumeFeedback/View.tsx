"use client";
import { Resume, ResumeReviewStatus } from "@/interfaces/Resume";
import { Button, Modal } from "flowbite-react";
import React from "react";
import ClickableDiv from "../miniComponents/ClickableDiv";

function customTimeFormat(inputTime: string) {
  // Convert the input time string to a Date object
  const dateTimeObj = new Date(
    inputTime.replace(/(\d{2})\/(\d{2})\/(\d{4}), (\d{2}):(\d{2}):(\d{2})/, "$3-$2-$1T$4:$5:$6")
  );

  // Get time in 12-hour format with AM or PM
  const time12Hour = dateTimeObj.toLocaleString("en-US", { hour: "numeric", minute: "numeric", hour12: true });

  // Get month name
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthName = monthNames[dateTimeObj.getMonth()];

  // Get year
  const year = dateTimeObj.getFullYear();

  return { time: time12Hour, month: monthName, year: year };
}

function ViewFeedback({ resume }: { resume: Resume }) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  return resume?.meta?.reviewStatus === ResumeReviewStatus.CHANGESREQUESTED ||
    resume?.meta?.reviewStatus === ResumeReviewStatus.REQUESTED ? (
    <div className="flex flex-col gap-2 items-center">
      {resume?.meta?.reviewStatus === ResumeReviewStatus.CHANGESREQUESTED && (
        <span className="text-red-500 text-left w-full">Changes Requested</span>
      )}
      <ClickableDiv onClick={() => setIsOpen(true)} label="View Feedback" />
      <Modal show={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Header>Feedback</Modal.Header>
        <Modal.Body className="text-black">
          <div className="flex flex-col gap-2">
            {resume?.meta?.feedbacks.map((feedback) => (
              <div key={feedback._id} className="flex flex-col gap-2">
                <div className="font-semibold">{feedback?.by?.name}</div>
                <div>{feedback.text}</div>
                {feedback.videoUrl && (
                  <div className="flex flex-col gap-2">
                    <div className="font-semibold">
                      <span className="mr-2">Video URL</span>
                      <a href={feedback.videoUrl} target="_blank" rel="noreferrer" className="text-blue-500">
                        Open in new tab
                      </a>
                    </div>
                    <video controls src={feedback.videoUrl} className="w-full" />
                  </div>
                )}
                <p className="text-gray-400">
                  {
                    customTimeFormat(
                      new Date(feedback.createdAt).toLocaleString(undefined, { timeZone: "Asia/Kolkata" })
                    ).time
                  }
                  ,{" "}
                  {
                    customTimeFormat(
                      new Date(feedback.createdAt).toLocaleString(undefined, { timeZone: "Asia/Kolkata" })
                    ).month
                  }{" "}
                  {
                    customTimeFormat(
                      new Date(feedback.createdAt).toLocaleString(undefined, { timeZone: "Asia/Kolkata" })
                    ).year
                  }
                </p>
              </div>
            ))}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  ) : (
    <></>
  );
}

export default ViewFeedback;
