type Task = {
    id: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    level: number;
    dateRange?: string;
    institution?: string;
    dependencies: string[];
    subtasks: Array<{
        id: string;
        title: string;
        description: string;
        status: string;
        priority: string;
        tools?: string[];
    }>;
    tools?: string[];
};

export const portfolioData = {
    name: "ABK OVI",
    title: "Assistant Manager - HR, Standard MH Group",
    image: "/assets/profile-abk-ovi.svg",
    resume: "/assets/pdf/ABK-OVI-Profile.pdf",
    tagline: "Human resources professional focused on HR operations, compensation and benefits, and team leadership.",

    bio: {
        short: "Assistant Manager - HR with experience across HR operations, compensation and benefits, and people management.",
        long: `I am an HR professional based in Bangladesh with a steady track record in human resources administration, compensation and benefits, and team leadership. Over the course of my career, I have focused on building reliable people processes, supporting employee needs, and contributing to a positive workplace culture.

I value disciplined work, clear communication, and measurable results. From corporate HR and administration to senior HR execution and my current role in HR management, I have continued to grow through responsibility, consistency, and a commitment to professional improvement.`,
    },

    socials: {
        github: "",
        linkedin: "https://www.linkedin.com/in/abk-ovi-368403174",
        facebook: "",
        twitter: "",
        email: "abdullah.ovi99@gmail.com",
    },

    education: [
        {
            degree: "Master of Business Administration",
            field: "Human Resources Management / Personnel Administration",
            institution: "Daffodil International University",
            location: "Bangladesh",
            year: "2022 - 2023",
            description: "Graduate study focused on modern HR practices and personnel administration.",
        },
        {
            degree: "Bachelor of Business Administration",
            field: "Human Resources Management",
            institution: "Daffodil International University",
            location: "Bangladesh",
            year: "2013 - 2017",
            description: "Undergraduate degree in human resources management and business administration.",
        },
        {
            degree: "Higher Secondary Certificate",
            field: "Business/Commerce",
            institution: "Comilla Victoria College",
            location: "Bangladesh",
            year: "2011 - 2012",
            description: "Business and commerce background.",
        },
        {
            degree: "Secondary School Certificate",
            field: "Science",
            institution: "Comilla Residential School and College",
            location: "Bangladesh",
            year: "2009 - 2010",
            description: "General science education.",
        },
    ],

    experience: [
        {
            role: "Assistant Manager - Human Resources",
            institution: "Standard MH Group",
            year: "2024 - Present",
            description: "Leading HR operations and supporting compensation and benefits administration in a managerial role.",
        },
        {
            role: "Sr. Executive - HR",
            institution: "DIRD Group",
            year: "2022 - 2024",
            description: "Managed HR execution, employee administration, and internal coordination across teams.",
        },
        {
            role: "Executive - Corporate HR & Admin",
            institution: "Mahmud Group",
            year: "2018 - 2022",
            description: "Handled corporate HR and administrative responsibilities with a focus on consistency and service.",
        },
    ],

    researchProjects: [
        {
            title: "HR Operations Improvement",
            year: 2026,
            description: "Process-focused HR administration work centered on employee records, coordination, and reliable service delivery.",
            skills: ["HR Operations", "Compensation & Benefits", "Reporting", "Leadership"],
        },
    ],

    skills: {
        languages: {
            native: ["Bengali"],
            fluent: ["English"],
        },
        coding: ["MS Excel", "MS Word", "MS PowerPoint", "Google Workspace"],
        technical: [
            "HR Operations",
            "Compensation & Benefits",
            "Employee Relations",
            "Payroll Coordination",
            "Documentation",
            "Reporting",
        ],
        softSkills: [
            "Leadership",
            "Communication",
            "Team Coordination",
            "Problem Solving",
            "Adaptability",
        ],
        expertise: [
            "HR Operations",
            "Compensation & Benefits",
            "Employee Administration",
            "Organizational Support",
            "Professional Documentation",
        ],
    },

    achievements: [],
    extracurriculars: [],
    trainings: [],
    interests: ["Leadership", "People Development", "Professional Growth", "Reading"],
    researchInterests: [
        "Human Resource Management",
        "Compensation Planning",
        "Employee Engagement",
        "Organizational Development",
    ],

    roadmap: [
        {
            id: "edu-1",
            title: "Master of Business Administration",
            description: "Graduate study in Human Resources Management / Personnel Administration",
            status: "completed",
            priority: "high",
            level: 1,
            dateRange: "2022 - 2023",
            institution: "Daffodil International University",
            dependencies: [],
            subtasks: [
                {
                    id: "edu-1-1",
                    title: "HR Management",
                    description: "Graduate-level study focused on people strategy and workforce administration",
                    status: "completed",
                    priority: "high",
                    tools: ["HRM", "Management"],
                },
                {
                    id: "edu-1-2",
                    title: "Personnel Administration",
                    description: "Understanding core HR systems, compliance, and employee support",
                    status: "completed",
                    priority: "medium",
                    tools: ["Administration", "Compliance"],
                },
            ],
        },
        {
            id: "edu-2",
            title: "Bachelor of Business Administration",
            description: "Undergraduate foundation in Human Resources Management",
            status: "completed",
            priority: "high",
            level: 0,
            dateRange: "2013 - 2017",
            institution: "Daffodil International University",
            dependencies: [],
            subtasks: [
                {
                    id: "edu-2-1",
                    title: "Human Resources Management",
                    description: "Core concepts in recruitment, administration, and workforce support",
                    status: "completed",
                    priority: "high",
                    tools: ["HRM", "Business"],
                },
                {
                    id: "edu-2-2",
                    title: "Business Administration",
                    description: "Broad business knowledge supporting leadership and operations",
                    status: "completed",
                    priority: "high",
                    tools: ["Management", "Operations"],
                },
                {
                    id: "edu-2-3",
                    title: "Organizational Skills",
                    description: "Team coordination and professional communication",
                    status: "completed",
                    priority: "high",
                    tools: ["Communication", "Leadership"],
                },
            ],
        },
        {
            id: "edu-3",
            title: "Higher Secondary Certificate",
            description: "Business/Commerce background at Comilla Victoria College",
            status: "completed",
            priority: "medium",
            level: 0,
            dateRange: "2011 - 2012",
            institution: "Comilla Victoria College",
            dependencies: [],
            subtasks: [
                {
                    id: "edu-3-1",
                    title: "Business Studies",
                    description: "Foundational commerce and organizational learning",
                    status: "completed",
                    priority: "high",
                },
            ],
        },
    ],

    skillsRoadmap: [
        {
            id: "skill-1",
            title: "HR Operations & Administration",
            description: "Core coordination and record-keeping tasks that keep people processes running smoothly.",
            status: "completed",
            priority: "high",
            level: 0,
            dependencies: [],
            subtasks: [],
            tools: ["Employee Records", "Onboarding", "Attendance", "Reporting"],
        },
        {
            id: "skill-2",
            title: "Compensation & Benefits",
            description: "Experience supporting payroll-related coordination, benefits administration, and HR policy execution.",
            status: "completed",
            priority: "high",
            level: 0,
            dependencies: [],
            subtasks: [],
            tools: ["Payroll Coordination", "Benefits", "Policy", "Compliance"],
        },
        {
            id: "skill-3",
            title: "Leadership & Communication",
            description: "People-focused strengths used to lead teams, coordinate work, and maintain clarity.",
            status: "completed",
            priority: "medium",
            level: 0,
            dependencies: [],
            subtasks: [],
            tools: ["Leadership", "Communication", "Teamwork", "Problem Solving", "Adaptability"],
        },
    ],

    experienceRoadmap: [
        {
            id: "exp-1",
            title: "Assistant Manager - Human Resources",
            institution: "Standard MH Group",
            dateRange: "2024 - Present",
            description: "Leading HR operations and supporting compensation and benefits administration in a managerial role.",
            status: "in-progress",
            priority: "high",
            level: 0,
            dependencies: [],
            subtasks: [
                {
                    id: "exp-1-1",
                    title: "HR Operations",
                    description: "Managing day-to-day human resources coordination",
                    status: "completed",
                    priority: "medium",
                    tools: ["Administration", "Reporting"],
                },
                {
                    id: "exp-1-2",
                    title: "Employee Support",
                    description: "Supporting people processes with clarity and accountability",
                    status: "in-progress",
                    priority: "high",
                    tools: ["Communication", "Coordination"],
                },
            ],
        },
        {
            id: "exp-2",
            title: "Sr. Executive - HR",
            institution: "DIRD Group",
            dateRange: "2022 - 2024",
            description: "Managed HR execution, employee administration, and internal coordination across teams.",
            status: "completed",
            priority: "high",
            level: 0,
            dependencies: [],
            subtasks: [],
        },
        {
            id: "exp-3",
            title: "Executive - Corporate HR & Admin",
            institution: "Mahmud Group",
            dateRange: "2018 - 2022",
            description: "Handled corporate HR and administrative responsibilities with a focus on consistency and service.",
            status: "completed",
            priority: "high",
            level: 0,
            dependencies: [],
            subtasks: [],
        },
    ],

    awardsRoadmap: [] as Task[],
};