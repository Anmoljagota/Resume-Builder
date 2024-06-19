export const templateNamesEnum = {
    ProfessionalEdge: "professional-edge",
    SimplyMinial: "simply-minimal",
    TwoColumnMinimal: "two-column-minimal",
    ClassicElegance:"classic-elegance",
    SmartStart:"smart-start",
    ClassicProffessional: "classic-proffessional",
    CrispCanvas:"crisp-canvas",
    ModernMilestone:"modern-milestone"
}
export const templatePaths = [templateNamesEnum.ProfessionalEdge, templateNamesEnum.SimplyMinial, templateNamesEnum.TwoColumnMinimal];
export const defaultTemplateConfigs = [
    {
        name: templateNamesEnum.ProfessionalEdge,
        sections: {
            ProfileInformation: {
                position: "full",
            },
            ContactInformation: {
                position: "full",
            },
            ProfessionalSummary: {
                position: "left",
            },
            Education: { position: "right" },
            Experience: { position: "right" },
            Projects: { position: "left" },
            Achievements: { position: "left" },
            Interests: { position: "left" },
            Certifications: { position: "left" },
            TechnicalSkills: { position: "left" },
            SoftSkills: { position: "right" },
        },
    },
]
