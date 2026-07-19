// Admin password - CHANGE THIS to your own password!
const ADMIN_PASSWORD = "admin123";

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('adminLoggedIn') === 'true') {
        showDashboard();
        loadData();
    } else {
        showLogin();
    }
    
    // Allow Enter key to login
    document.getElementById('password')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') login();
    });
});

function login() {
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('errorMsg');
    
    if (password === ADMIN_PASSWORD) {
        localStorage.setItem('adminLoggedIn', 'true');
        errorMsg.textContent = '';
        showDashboard();
        loadData();
    } else {
        errorMsg.textContent = '❌ Incorrect password!';
    }
}

function logout() {
    localStorage.removeItem('adminLoggedIn');
    document.getElementById('password').value = '';
    showLogin();
}

function showLogin() {
    document.getElementById('loginContainer').classList.add('show');
    document.getElementById('adminDashboard').classList.remove('show');
}

function showDashboard() {
    document.getElementById('loginContainer').classList.remove('show');
    document.getElementById('adminDashboard').classList.add('show');
}

function loadData() {
    const data = JSON.parse(localStorage.getItem('portfolioData')) || getDefaultData();
    
    document.getElementById('heroTitle').value = data.hero.title;
    document.getElementById('heroTagline').value = data.hero.tagline;
    document.getElementById('heroDescription').value = data.hero.description;
    document.getElementById('aboutText').value = data.about;
    document.getElementById('email').value = data.contact.email;
    document.getElementById('github').value = data.contact.github;
    document.getElementById('linkedin').value = data.contact.linkedin;
    
    renderSkills(data.skills);
    renderProjects(data.projects);
}

function getDefaultData() {
    return {
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
}

function renderSkills(skills) {
    const container = document.getElementById('skillsContainer');
    container.innerHTML = '';
    
    skills.forEach((skill, idx) => {
        const skillDiv = document.createElement('div');
        skillDiv.className = 'item-list';
        skillDiv.innerHTML = `
            <div class="form-group">
                <label>Category ${idx + 1} Title:</label>
                <input type="text" class="skill-title" data-idx="${idx}" value="${skill.title}">
            </div>
            <div class="form-group">
                <label>Skills (one per line):</label>
                <textarea class="skill-items" data-idx="${idx}">${skill.items.join('\n')}</textarea>
            </div>
            <button class="save-btn" style="background: #e74c3c;" onclick="removeSkill(${idx})">Remove Category</button>
        `;
        container.appendChild(skillDiv);
    });
}

function renderProjects(projects) {
    const container = document.getElementById('projectsContainer');
    container.innerHTML = '';
    
    projects.forEach((proj, idx) => {
        const projDiv = document.createElement('div');
        projDiv.className = 'item-list';
        projDiv.innerHTML = `
            <div class="form-group">
                <label>Project ${idx + 1} Title:</label>
                <input type="text" class="project-title" data-idx="${idx}" value="${proj.title}">
            </div>
            <div class="form-group">
                <label>Description:</label>
                <textarea class="project-desc" data-idx="${idx}">${proj.description}</textarea>
            </div>
            <div class="form-group">
                <label>Tags (comma-separated):</label>
                <input type="text" class="project-tags" data-idx="${idx}" value="${proj.tags.join(', ')}">
            </div>
            <button class="save-btn" style="background: #e74c3c;" onclick="removeProject(${idx})">Remove Project</button>
        `;
        container.appendChild(projDiv);
    });
}

function addSkillCategory() {
    const data = JSON.parse(localStorage.getItem('portfolioData')) || getDefaultData();
    data.skills.push({
        title: "New Skill",
        items: ["Skill 1", "Skill 2"]
    });
    localStorage.setItem('portfolioData', JSON.stringify(data));
    renderSkills(data.skills);
}

function removeSkill(idx) {
    const data = JSON.parse(localStorage.getItem('portfolioData')) || getDefaultData();
    data.skills.splice(idx, 1);
    localStorage.setItem('portfolioData', JSON.stringify(data));
    renderSkills(data.skills);
}

function addProject() {
    const data = JSON.parse(localStorage.getItem('portfolioData')) || getDefaultData();
    data.projects.push({
        title: "New Project",
        description: "Project description",
        tags: ["Tag1", "Tag2"]
    });
    localStorage.setItem('portfolioData', JSON.stringify(data));
    renderProjects(data.projects);
}

function removeProject(idx) {
    const data = JSON.parse(localStorage.getItem('portfolioData')) || getDefaultData();
    data.projects.splice(idx, 1);
    localStorage.setItem('portfolioData', JSON.stringify(data));
    renderProjects(data.projects);
}

function saveChanges() {
    const data = {
        hero: {
            title: document.getElementById('heroTitle').value,
            tagline: document.getElementById('heroTagline').value,
            description: document.getElementById('heroDescription').value
        },
        about: document.getElementById('aboutText').value,
        contact: {
            email: document.getElementById('email').value,
            github: document.getElementById('github').value,
            linkedin: document.getElementById('linkedin').value
        },
        skills: [],
        projects: []
    };
    
    // Collect skills
    document.querySelectorAll('.skill-title').forEach((el) => {
        const idx = el.dataset.idx;
        const title = el.value;
        const items = document.querySelector(`.skill-items[data-idx="${idx}"]`).value
            .split('\n')
            .map(item => item.trim())
            .filter(item => item);
        data.skills.push({ title, items });
    });
    
    // Collect projects
    document.querySelectorAll('.project-title').forEach((el) => {
        const idx = el.dataset.idx;
        const title = el.value;
        const description = document.querySelector(`.project-desc[data-idx="${idx}"]`).value;
        const tags = document.querySelector(`.project-tags[data-idx="${idx}"]`).value
            .split(',')
            .map(tag => tag.trim())
            .filter(tag => tag);
        data.projects.push({ title, description, tags });
    });
    
    localStorage.setItem('portfolioData', JSON.stringify(data));
    
    // Show success message
    const msg = document.getElementById('successMsg');
    msg.style.display = 'block';
    setTimeout(() => {
        msg.style.display = 'none';
    }, 3000);
    
    alert('✅ Changes saved! Go back to your portfolio to see the updates.');
}
