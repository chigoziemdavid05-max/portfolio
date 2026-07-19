// Default portfolio data
const defaultData = {
    hero: {
        title: "Chigoziem David Okereke",
        tagline: "Data Analyst | Web Developer | Excel Expert",
        description: "Transforming data into actionable insights and building beautiful web experiences"
    },
    about: "I'm a passionate data analyst and web developer with expertise in Excel, data entry, and web development. Recently completed secondary school and eager to build a career leveraging my skills. I love working with data to uncover patterns, create visualizations, and deliver actionable business intelligence. When I'm not analyzing data, I'm building responsive, user-friendly websites.",
    skills: [
        {
            title: "Data Analysis",
            items: ["Excel (Advanced)", "Data Entry & Validation", "Data Visualization", "Statistical Analysis"]
        },
        {
            title: "Web Development",
            items: ["HTML & CSS", "JavaScript", "Responsive Design", "Web Fundamentals"]
        },
        {
            title: "Tools & Technologies",
            items: ["Microsoft Excel", "Git & GitHub", "VS Code", "Browser DevTools"]
        }
    ],
    projects: [
        {
            title: "Sales Data Analysis Dashboard",
            description: "Advanced Excel analysis of quarterly sales data with pivot tables, charts, and automated reporting. Identified key trends and revenue opportunities.",
            tags: ["Excel", "Data Analysis"]
        },
        {
            title: "Customer Database Project",
            description: "Organized and validated customer data entry across multiple spreadsheets. Created data cleaning procedures and quality assurance protocols.",
            tags: ["Data Entry", "Excel"]
        },
        {
            title: "Personal Portfolio Website",
            description: "Built this responsive portfolio website to showcase skills and projects. Clean, modern design with smooth navigation and mobile optimization.",
            tags: ["HTML/CSS", "JavaScript", "Web Design"]
        },
        {
            title: "Inventory Analysis",
            description: "Created comprehensive inventory tracking system with Excel formulas. Implemented automated alerts for low stock levels and usage patterns.",
            tags: ["Excel", "Automation"]
        }
    ],
    contact: {
        email: "chigoziemokereke05@gmail.com",
        github: "@chigoziemdavid05-max",
        linkedin: ""
    }
};

// Load portfolio data when page loads
document.addEventListener('DOMContentLoaded', () => {
    const data = JSON.parse(localStorage.getItem('portfolioData')) || defaultData;
    
    // Update hero section
    document.getElementById('heroTitle').textContent = data.hero.title;
    document.getElementById('heroTagline').textContent = data.hero.tagline;
    document.getElementById('heroDescription').textContent = data.hero.description;
    
    // Update about section
    document.getElementById('aboutText').textContent = data.about;
    
    // Update skills section
    const skillsGrid = document.getElementById('skillsGrid');
    skillsGrid.innerHTML = '';
    data.skills.forEach(skill => {
        const skillCard = document.createElement('div');
        skillCard.className = 'skill-card';
        skillCard.innerHTML = `
            <h3>${skill.title}</h3>
            <ul>
                ${skill.items.map(item => `<li>${item}</li>`).join('')}
            </ul>
        `;
        skillsGrid.appendChild(skillCard);
    });
    
    // Update projects section
    const projectsGrid = document.getElementById('projectsGrid');
    projectsGrid.innerHTML = '';
    data.projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tags">
                ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        `;
        projectsGrid.appendChild(projectCard);
    });
    
    // Update contact section
    const contactMethods = document.getElementById('contactMethods');
    contactMethods.innerHTML = `
        <a href="mailto:${data.contact.email}" class="contact-card">
            <h3>📧 Email</h3>
            <p>${data.contact.email}</p>
        </a>
        <a href="https://github.com/${data.contact.github.replace('@', '')}" class="contact-card">
            <h3>💻 GitHub</h3>
            <p>${data.contact.github}</p>
        </a>
        ${data.contact.linkedin ? `
        <a href="${data.contact.linkedin}" class="contact-card">
            <h3>💼 LinkedIn</h3>
            <p>Connect with me</p>
        </a>
        ` : ''}
    `;
});
