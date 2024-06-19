import { PromptInterface } from "@/interfaces/prompt";
import { PromptVersionInterface } from "@/interfaces/promptVersion";
import { Badge, Button, Tooltip } from "flowbite-react";
import React from "react";
import PromptVersionDetails from "./PromptVersionDetails";
import Link from "next/link";

interface Props {
  prompt: PromptInterface;
  currentVersion?: PromptVersionInterface;
}

function PromptDetails({ prompt, currentVersion }: Props) {
  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-2">
        <div className="flex gap-2 items-center">
          <h1 className="text-2xl">{prompt.name}</h1>
          {currentVersion?.version ? (
            <Tooltip content={"Current version"}>
              <Badge color={"green"}>{currentVersion.version}</Badge>
            </Tooltip>
          ) : (
            <Badge color={"red"}>not yet published</Badge>
          )}
        </div>
        <div className="flex gap-2">
          <Link href={`/dashboard/prompts/${prompt._id}/edit`}>
            <Button color={"purple"} size={"sm"}>
              Edit
            </Button>
          </Link>
        </div>
      </div>
      <div className="mb-2">
        <div className="mb-2 block">
          <label className="text-white text-sm font-bold mb-2">
            Description
          </label>
          <div className="text-sm">{prompt.description}</div>
        </div>
      </div>
      <div className="border-t border-gray-200 pt-4 mt-4" />
      {currentVersion ? (
        <div>
          <h3 className="text-xl mb-2 font-bold">Current Version</h3>
          <PromptVersionDetails promptVersion={currentVersion} />
        </div>
      ) : (
        <div>Not yet published</div>
      )}
    </div>
  );
}

export default PromptDetails;
