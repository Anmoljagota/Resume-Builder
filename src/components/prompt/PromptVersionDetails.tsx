"use client";
import { PromptVersionInterface } from "@/interfaces/promptVersion";
import { Button } from "flowbite-react";
import Link from "next/link";
import React from "react";

interface Props {
  promptVersion: PromptVersionInterface;
}

function PromptVersionDetails({ promptVersion }: Props) {
  return (
    <div>
      <div className="flex justify-between gap-2">
        <div className="mb-2 block">
          <label className="text-white text-sm font-bold mb-2">
            Version
          </label>
          <div className="text-sm">{promptVersion.version}</div>
        </div>
      </div>
      <div className="mb-2 block">
        <label className="text-white text-sm font-bold mb-2">
          Description
        </label>
        <div className="text-sm">{promptVersion.versionDescription}</div>
      </div>
      <div className="mb-2 block">
        <label className="text-white text-sm font-bold mb-2">
          Published At
        </label>
        <div className="text-sm">{promptVersion.createdAt}</div>
      </div>
      <div className="mb-2 block">
        <label className="text-white text-sm font-bold mb-2">
          System Message
        </label>
        <div className="text-sm whitespace-pre-line bg-gray-100 rounded-md p-2">
          {promptVersion.systemMessage}
        </div>
      </div>

      <div className="mb-2 block">
        <label className="text-white text-sm font-bold mb-2">
          Variables
        </label>
        <div className="text-sm flex flex-col gap-2 bg-gray-100 p-2 rounded-md">
          {promptVersion.variables.map((variable) => (
            <div key={variable._id}>
              <span className="font-bold">{variable.name}</span>:{variable.type}
            </div>
          ))}
        </div>
        <div className="mb-2 block">
          <label className="text-white text-sm font-bold mb-2">
            Template
          </label>
          <div className="text-sm flex flex-col gap-2 bg-gray-100 p-2 rounded-md">
            {promptVersion.templateChunks?.map((chunk) => (
              <div key={chunk._id}>
                <span>
                  include if{" "}
                  <span className="font-bold">{chunk.includeIf}</span> exists
                </span>
                <div>{chunk.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PromptVersionDetails;
