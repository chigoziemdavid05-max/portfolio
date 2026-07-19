// Admin password - CHANGE THIS to your own password!
let ADMIN_PASSWORD = "admin123";

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('adminLoggedIn') === 'true') {
        showDashboard();
        loadData();
        loadProfilePic();
    } else {
        showLogin();
    }
    
    // Allow Enter key to login
    document.getElementById('password')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') login();
    });

    // Profile picture preview
    document.getElementById('profilePic')?.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const preview = document.getElementById('profilePreview');
                preview.innerHTML = `<img src="${event.target.result}" alt="Profile Preview">`;
                // Store in localStorage
                localStorage.setItem('profilePicture', event.target.result);
            };
            reader.readAsDataURL(file);
        }
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
        loadProfilePic();
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

function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active class from all buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(tabName).classList.add('active');
    
    // Add active class to clicked button
    event.target.classList.add('active');
}

function loadData() {
    fetch('portfolio-data.json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('heroTitle').value = data.hero.title;
            document.getElementById('heroTagline').value = data.hero.tagline;
            document.getElementById('heroDescription').value = data.hero.description;
            document.getElementById('aboutText').value = data.about;
            document.getElementById('email').value = data.contact.email;
            document.getElementById('github').value = data.contact.github;
            document.getElementById('linkedin').value = data.contact.linkedin;
            
            renderSkills(data.skills);
            renderProjects(data.projects);
        })
        .catch(err => console.log('Using default data'));
}

function loadProfilePic() {
    const pic = localStorage.getItem('profilePicture');
    if (pic) {
        const preview = document.getElementById('profilePreview');
        preview.innerHTML = `<img src="${pic}" alt="Profile Picture">`;
    }
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
    fetch('portfolio-data.json')
        .then(response => response.json())
        .then(data => {
            data.skills.push({
                title: "New Skill",
                items: ["Skill 1", "Skill 2"]
            });
            renderSkills(data.skills);
        });
}

function removeSkill(idx) {
    fetch('portfolio-data.json')
        .then(response => response.json())
        .then(data => {
            data.skills.splice(idx, 1);
            renderSkills(data.skills);
        });
}

function addProject() {
    fetch('portfolio-data.json')
        .then(response => response.json())
        .then(data => {
            data.projects.push({
                title: "New Project",
                description: "Project description",
                tags: ["Tag1", "Tag2"]
            });
            renderProjects(data.projects);
        });
}

function removeProject(idx) {
    fetch('portfolio-data.json')
        .then(response => response.json())
        .then(data => {
            data.projects.splice(idx, 1);
            renderProjects(data.projects);
        });
}

function changePassword() {
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const warningMsg = document.getElementById('warningMsg');

    // Validate current password
    if (currentPassword !== ADMIN_PASSWORD) {
        warningMsg.textContent = '❌ Current password is incorrect!';
        warningMsg.style.display = 'block';
        setTimeout(() => warningMsg.style.display = 'none', 3000);
        return;
    }

    // Validate new password
    if (newPassword.length < 6) {
        warningMsg.textContent = '⚠️ New password must be at least 6 characters!';
        warningMsg.style.display = 'block';
        setTimeout(() => warningMsg.style.display = 'none', 3000);
        return;
    }

    // Check if passwords match
    if (newPassword !== confirmPassword) {
        warningMsg.textContent = '❌ New passwords do not match!';
        warningMsg.style.display = 'block';
        setTimeout(() => warningMsg.style.display = 'none', 3000);
        return;
    }

    // Update password in memory (this is temporary for this session)
    ADMIN_PASSWORD = newPassword;
    
    // Show success message
    const successMsg = document.getElementById('successMsg');
    successMsg.style.display = 'block';
    setTimeout(() => successMsg.style.display = 'none', 3000);

    // Clear form
    document.getElementById('currentPassword').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmPassword').value = '';

    // Important instruction
    alert(`✅ Password changed in this session!\n\n⚠️ IMPORTANT:\nYour new password is: ${newPassword}\n\n📋 To make this permanent:\n1. Go to your portfolio repo on GitHub\n2. Edit the "admin.js" file\n3. Find: const ADMIN_PASSWORD = "admin123";\n4. Replace with: const ADMIN_PASSWORD = "${newPassword}";\n5. Commit the changes\n\nWithout updating GitHub, the password will reset when you refresh!`);
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
    
    // Show success message
    const msg = document.getElementById('successMsg');
    msg.style.display = 'block';
    setTimeout(() => {
        msg.style.display = 'none';
    }, 3000);
    
    // Copy data to clipboard for manual GitHub update
    const dataStr = JSON.stringify(data, null, 2);
    
    alert('✅ Your changes are ready!\n\n📋 Data copied to clipboard.\n\n⚠️ IMPORTANT:\n1. Go to: https://github.com/chigoziemdavid05-max/portfolio\n2. Edit the "portfolio-data.json" file\n3. Replace the content with the data in your clipboard\n4. Commit the changes\n\n🎉 Then EVERYONE will see your updates!\n\n📸 Profile Picture: Check your browser - it\'s saved locally.');
    
    // Copy to clipboard
    navigator.clipboard.writeText(dataStr).then(() => {
        console.log('Data copied to clipboard');
    });
}
