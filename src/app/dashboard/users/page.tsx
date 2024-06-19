"use client";
import { useGetUserList } from "@/hooks/admin/user";
import { Button, Select, Table, Tabs, TextInput } from "flowbite-react";
import Pagination from "@/components/common/Pagination";
import React, { useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { groupItemsBy } from "@/utils/array";
import { getResumeViewUrl } from "@/utils/url";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { CheckUserLoggedIn } from "@/middleware/checkAuth";

interface UserFilter {
  status?: string;
  q: string;
  skip: number;
  limit: number;
  searchInput?: string;
  userNames?: string;
}

const statusOptions = [
  { vaue: "requested", label: "requested" },
  { vaue: "changes-requested", label: "changes-requested" },
  { vaue: "approved", label: "approved" },
  { vaue: "rejected", label: "rejected" },
];

function UserListing() {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams();
  const searchRef = useRef<NodeJS.Timeout | null>();
  CheckUserLoggedIn();

  const filterForm = useForm<Pick<UserFilter, "q" | "status">>({
    defaultValues: { q: "" },
  });
  const [appliedFilter, setAppliedFilter] = React.useState<UserFilter>({
    status: undefined,
    q: "",
    skip: 0,
    limit: 10,
  });
  const [searchInput, setSearchInput] = useState<string>(searchParams.get("searchInput") || "");
  // const [userCodes, setUserCodes] = useState<string>("");
  const filters: UserFilter = { ...appliedFilter };
  if (searchParams.get("searchInput")) {
    filters.searchInput = searchParams.get("searchInput") || "";
  }
  if (searchParams.get("userNames") && searchParams.get("userNames") !== "") {
    filters.userNames = searchParams.get("userNames") || "";
  }
  const { data, isFetching } = useGetUserList(filters);
  const currentPage = Math.floor(appliedFilter.skip / appliedFilter.limit) + 1;
  const totalPages = Math.ceil((data?.total || 0) / appliedFilter.limit);
  const { register, handleSubmit } = filterForm;

  const resumesByUser = useMemo(() => {
    if (!data) {
      return {};
    }
    return groupItemsBy(data.resumes, "user");
  }, [data]);

  const onSubmit = (filter: Pick<UserFilter, "q">) => {
    setAppliedFilter({ ...appliedFilter, ...filter, skip: 0 });
  };

  const createQueryStringCalback = (name: string, value: string) => {
    const existingSearchParams = Object.fromEntries(searchParams.entries());
    const existingParamsArray: string[] = [];
    for (const key in existingSearchParams) {
      const params = new URLSearchParams();
      if (key !== name && value !== "") {
        params.set(key, existingSearchParams[key]);
        existingParamsArray.push(params.toString());
      }
    }
    const params = new URLSearchParams();
    value !== "" && params.set(name, value);
    existingParamsArray.push(params.toString());
    router.push(pathName + "?" + existingParamsArray.join("&"));
  };
  return (
    <div className="text-black container mx-auto py-2 mb-4 gap-4 flex flex-col">
      <form className="grid grid-cols-4 gap-2" onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          placeholder="Search by name or email"
          type="text"
          defaultValue={searchInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchInput(e.target.value);
            if (searchRef.current) {
              clearInterval(searchRef.current);
            }
            searchRef.current = setInterval(() => {
              createQueryStringCalback("searchInput", e.target.value);
            }, 600);
          }}
        />
        <textarea
          id="message"
          className="h-10 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Input student codes on a new line to filters multiple users"
          defaultValue={searchParams.get("userNames") || ""}
          onChange={(e) => {
            if (searchRef.current) {
              clearTimeout(searchRef.current);
            }
            searchRef.current = setInterval(() => {
              createQueryStringCalback("userNames", e.target.value);
            }, 2000);
          }}
        ></textarea>

        <Select
          onChange={(e) => {
            setAppliedFilter({
              ...appliedFilter,
              status: e.target.value,
              skip: 0,
            });
          }}
        >
          <option value="">All</option>
          {statusOptions.map((option) => (
            <option key={option.vaue} value={option.vaue}>
              {option.label}
            </option>
          ))}
        </Select>
      </form>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        total={data?.total || 0}
        limit={appliedFilter.limit}
        skip={appliedFilter.skip}
        onPageChange={(pageNumber) => {
          const skip = (pageNumber - 1) * appliedFilter.limit;
          setAppliedFilter({ ...appliedFilter, skip });
        }}
      />

      <div>
        <Table>
          <Table.Head>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Username</Table.HeadCell>
            <Table.HeadCell>Batch</Table.HeadCell>
            <Table.HeadCell>Resumes</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {data?.users.map((user) => (
              <Table.Row key={user._id}>
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.username}</Table.Cell>
                <Table.Cell>{user.batch}</Table.Cell>
                <Table.Cell>
                  {resumesByUser[user._id]?.map((resume) => (
                    <div key={resume._id}>
                      <a
                        className="hover:underline"
                        href={getResumeViewUrl(resume._id || "none", resume?.template?.name || "TwoColumnMinimal")}
                        target="_blank"
                      >
                        {resume.header}
                        {resume.meta?.reviewStatus === "requested" && (
                          <span className="text-red-500 ml-2">Changes Requested</span>
                        )}
                      </a>
                    </div>
                  ))}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}

export default UserListing;
