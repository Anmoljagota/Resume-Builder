import { PromptInterface } from "@/interfaces/prompt";
import { Button, Table } from "flowbite-react";
import ButtonGroup from "flowbite-react/lib/esm/components/Button/ButtonGroup";
import Link from "next/link";
import React from "react";

function PromptList({ prompts }: { prompts: PromptInterface[] }) {
  return (
    <div>
      <Table>
        <Table.Head>
          <Table.HeadCell>Actions</Table.HeadCell>
          <Table.HeadCell>Prompt Name</Table.HeadCell>
          <Table.HeadCell>Created At</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {prompts.map((prompt) => (
            <Table.Row key={prompt._id}>
              <Table.Cell>
                <div className="flex gap-2">
                  <Link href={`/dashboard/prompts/${prompt._id}/edit`}>
                    <Button size={"sm"} color={"gray"}>
                      Edit
                    </Button>
                  </Link>
                  <Link href={`/dashboard/prompts/${prompt._id}/view`}>
                    <Button size="sm" color="gray">
                      View
                    </Button>
                  </Link>
                </div>
              </Table.Cell>
              <Table.Cell>{prompt.name}</Table.Cell>
              <Table.Cell>{prompt.createdAt}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default PromptList;
