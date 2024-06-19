import { UserProfile } from "./interfaces";

export const createGPTTemplateBody = (profile: UserProfile) => {
    // const generalDescription = `I have created a resume but need your 
    // expertise and knowledge to make it more 
    // professional according to a particular job 
    // description. 
    // Below is the job description and data 
    // I have in my resume as of now.`;

    // const jobDescriptionHeader = `Job Description:`;
    // const responsibilitiesHeader = `Responsibilities:`;
    const responsibilities = profile.jobDescription
        .map((item) => {
            if (item.type === "responsibility") {
                return `- ${item.value}`;
            }
        })
        .join("\n");
    // const requirementsHeader = `Requirements:`;
    const requirements = profile.jobDescription
        .map((item) => {
            if (item.type === "requirement") {
                return `- ${item.value}`;
            }
        })
        .join("\n")
    // const resumeDataHeader = `Resume Data is as follows:`;
    // const professionalSummaryHeader = `Professional Summary:`;
    const professionalSummary = profile.professionalSummary;
    // const technicalSkillsHeader = `Technical Skills: (level number denotes the knowledge i have in that particular skill. 10 is the highest, 1 is lowest)`;
    const technicalSkills = profile.technicalSkills
        .map((item) => {
            return `- name=${item.name} : level=${item.level}`;
        })
        .join("\n");

    // const projectsHeader = `Projects i have worked on:`;
    const projectsJsonData = JSON.stringify(profile.projects, null, 2);
    // const explainationHeader = `Now i want you to provide me with the following data:`;
    // const explanationPoint1 = `1. Project Highlights for each project: You must for each project, Use the features array of my projects and give a highlights array such that each element in array must be in html format and the important words must be highlighted in bold.`;
    // const explanationPoint2 = `2. Professional Summary: Start with a powerful adjective. Mention a few relevant technical skills and soft skills for the role. Keep the summary 3-4 sentences long. Use professional and impressive language. Use keywords to meet the industry standards.
    // Do not use the words 'I, me, my'. Do not use any pronouns.`;
    // const explanationPoint3 = `3. Reordered Technical Skills array: Reorder the technical skills array according to the Job Description so that most important skills are on the top. Please remove any irrelevant Skills.`;
    // const explanationPoint4 = `4. Reordered Projects array: Reorder the projects array according to the Job Description so that most important projects are on the top. Please remove any irrelevant Projects.`;

    // compbine all the above data with new lines for readability
    return {
        responsibilities,
        requirements,
        professionalSummary,
        technicalSkills,
        projectsJsonData,
    }
};
