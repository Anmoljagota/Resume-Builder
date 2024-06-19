const schema = {
    "type": "object",
    "properties": {
        "projectHighlights": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "projectName": {
                        "type": "string",
                        "description": "Name of the project"
                    },
                    "projectHighlights": {
                        "type": "array",
                        "items": {
                            "type": "text",
                            "description": "Highlights of the project in HTML format, bold the important words",
                            "format": "html"
                        }
                    }

                },
            },
        },
        "professionalSummary": {
            "type": "string",
            "description": "Professional summary",
            "format": "html"
        },
        "reorderedTechnicalSkills": {
            "type": "array",
            "items": {
                "type": "string",
                "description": "Technical skills"
            }
        },
        "reorderedProjects": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "projectName": {
                        "type": "string",
                        "description": "Name of the project"
                    },
                },
            }
        },
    },
    "required": ["projectHighlights", "professionalSummary", "reorderedTechnicalSkills", "reorderedProjects"]
}