import { generateResumeUrl } from "@/apis/resume";

export const handleResumeDownload = async ({ templatePath, profileId, setLoading }: any) => {
    setLoading(true);
    try {
        const response = await generateResumeUrl({
            id: profileId,
            templateId: templatePath
        })

        const url = window.URL.createObjectURL(new Blob([response.data]));

        const link = document.createElement('a');
        link.href = url;
        // create pdf name using id and templatepath
        link.setAttribute('download', `${profileId}-${templatePath}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setLoading(false);
        return true; // Indicate successful download if necessary
    }
    catch (error) {
        setLoading(false);
        // Handle error if necessary
        console.error(error);
        return false; // Indicate failed download if necessary
    }
}