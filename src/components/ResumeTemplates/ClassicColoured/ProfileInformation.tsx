import {
  MdsHeading7,
  MdsHeading8
} from "@/utils/components";
import React from "react";
import ResumeHeading from "../../ResumeComponents/ResumeHeading";
import { formatString } from "@/utils/formatString";
const ProfileInformation = ({ data, components }: any) => {
  return (
    <div>
      <div className="flex justify-center items-center">

    <ResumeHeading content={data?.name}  componentProperties={MdsHeading7} />
      </div>
      <div className="flex justify-center items-center">

    <ResumeHeading
        content={formatString(data.header)}
        componentProperties={MdsHeading8}
        
        />
        </div>
    </div>
  )
}
 
export default ProfileInformation
