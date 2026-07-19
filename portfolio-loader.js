// Default portfolio data
const defaultData = {
    hero: {
        title: "Chigoziem David Okereke",
        tagline: "Data Analyst | Web Developer | Excel Expert",
        description: "Transforming data into actionable insights and building beautiful web experiences"
    },
    about: "I'm a passionate data analyst and web developer with expertise in Excel, data entry, and web development. Recently completed secondary school and eager to build a career leveraging my skills. I love working with data to uncover patterns, create visualizations, and deliver actionable business intelligence. When I'm not analyzing data, I'm building responsive, user-friendly websites.",
    profilePicture: "",
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
    fetch('portfolio-data.json')
        .then(response => response.json())
        .then(data => {
            // Update hero section
            const heroTitle = document.getElementById('heroTitle');
            const heroTagline = document.getElementById('heroTagline');
            const heroDescription = document.getElementById('heroDescription');
            
            if (heroTitle) heroTitle.textContent = data.hero.title;
            if (heroTagline) heroTagline.textContent = data.hero.tagline;
            if (heroDescription) heroDescription.textContent = data.hero.description;
            
            // Update profile picture if exists
            const profilePic = document.getElementById('profilePic');
            if (profilePic && (data.profilePicture || localStorage.getItem('profilePicture'))) {
                profilePic.innerHTML = `<img src="${data.profilePicture || localStorage.getItem('profilePicture')}" alt="Profile Picture" style="width: 200px; height: 200px; border-radius: 10px; margin-bottom: 20px; display: block;">`;
            }
            
            // Update about section
            const aboutText = document.getElementById('aboutText');
            if (aboutText) aboutText.textContent = data.about;
            
            // Update skills section
            const skillsGrid = document.getElementById('skillsGrid');
            if (skillsGrid) {
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
            }
            
            // Update projects section
            const projectsGrid = document.getElementById('projectsGrid');
            if (projectsGrid) {
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
            }
            
            // Update contact section
            const contactMethods = document.getElementById('contactMethods');
            if (contactMethods) {
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
            }
        })
        .catch(err => {
            console.log('Using default data');
            // Fallback to default data
            const heroTitle = document.getElementById('heroTitle');
            if (heroTitle) heroTitle.textContent = defaultData.hero.title;
        });
});
