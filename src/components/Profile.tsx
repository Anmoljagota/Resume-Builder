"use client";
import React, { useEffect } from "react";
import { UserProfile } from "@/utils/interfaces";
import { templatePaths } from "@/utils/resumeTemplates";
import { useRouter } from "next/navigation";
import { handleResumeDownload } from "@/utils/handleResumeDownload";
import { executeOptimizeResumePrompt } from "@/apis/prompt";
import { data } from "autoprefixer";
import { createGPTTemplateBody } from "@/utils/createGPTTemplateBody";
import { toast } from "react-toastify";
import { Button, Spinner } from "flowbite-react";
import '../globals.css';
interface Props {
    profile: UserProfile;
}
const Profile = ({ profile }: Props) => {
    const [loading, setLoading] = React.useState(false);
    const [loadingOptimizeResume, setLoadingOptimizeResume] =
        React.useState(false);
    const handlePromptExecution = async (profileId) => {
        const {
            responsibilities,
            requirements,
            professionalSummary,
            technicalSkills,
            projectsJsonData,
        } = createGPTTemplateBody(profile);
        const body = {
            variables: [
                {
                    name: "responsibilities",
                    value: responsibilities,
                },
                {
                    name: "requirements",
                    value: requirements,
                },
                {
                    name: "professionalSummary",
                    value: professionalSummary,
                },
                {
                    name: "technicalSkills",
                    value: technicalSkills,
                },
                {
                    name: "projects",
                    value: projectsJsonData,
                },
            ],
            version: 5,
        };
        setLoadingOptimizeResume(true);
        try {
            const response = await executeOptimizeResumePrompt(
                "649c3adf4fbe9b4043bf6ad3",
                profile._id,
                body
            );
            setLoadingOptimizeResume(false);

            toast.success("Resume optimized successfully");
        } catch (e) {
            setLoadingOptimizeResume(false);
            toast.error("Resume optimization failed");
        }
    };
    const router = useRouter();
    return (
        <div className="border border-[#6c6b6e8a] p-[24px] rounded-[16px]">
            <div className="flex gap-[16px]">
                <button
                    className="mb-[16px] w-fit bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                        localStorage.removeItem("updatedFormValues");
                        router.push(`/profile?profileId=${profile._id}`);
                    }}
                >
                    Clone Resume
                </button>
                <button
                    className="mb-[16px] w-fit bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                        localStorage.removeItem("updatedFormValues");
                        router.push(
                            `/profile?profileId=${profile._id}&isEdit=true&showConfig=true`
                        );
                    }}
                >
                    View/Edit Resume
                </button>

                <Button
                    style={{
                        display: "inline-block",
                    }}
                    onClick={() => {
                        if (!loadingOptimizeResume) {
                            handlePromptExecution(profile._id);
                        }
                    }}
                >
                    {loadingOptimizeResume && <Spinner aria-label="Spinner button" />}
                    {loadingOptimizeResume ? (
                        <span className="pl-3">Please wait...</span>
                    ) : (
                        <span className="pl-3"> Optimize Resume</span>
                    )}
                </Button>

            </div>
            <h1>Resume Label: {profile?.label || "NA"}</h1>
            <h1>{profile?.name}</h1>
            <h1>{profile?.contact?.email}</h1>
            {
                <div className="pt-[24px] grid gap-[16px]">
                    {templatePaths.map((templatePath) => {
                        return (
                            <div>
                                <button
                                    className="mb-[16px] w-fit bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => {
                                        router.push(`/profile/${profile._id}/${templatePath}`);
                                    }}
                                >
                                    Preview {templatePath} Resume
                                </button>
                                {/* <button
                            className='ml-[16px] mb-[16px] w-fit bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                            onClick={() => {
                                router.push(`/profile/${profile._id}/${templatePath}?isEdit=true`)
                            }}>Edit {templatePath} Resume</button> */}

                                <Button
                                    style={{
                                        display: "inline-block",
                                        marginLeft: "16px",
                                    }}
                                    onClick={() => {
                                        if (!loading) {
                                handleResumeDownload({
                                    templatePath,
                                    profileId: profile._id,
                                    setLoading,
                                });
                                        }
                                    }}
                                >
                                    {loading && <Spinner aria-label="Spinner button" />}
                                    {loading ? (
                                        <span className="pl-3">Please wait...</span>
                                    ) : (
                                        <span className="pl-3"> Download as PDF</span>
                                    )}
                                </Button>
                            </div>
                        );
                    })}
                </div>
            }
        </div>
    );
};

export default Profile;
