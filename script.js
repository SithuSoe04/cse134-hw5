const PROJECTS_LOCAL_STORAGE_KEY = 'sithu_soe_local_projects';
const REMOTE_URL = 'https://api.jsonbin.io/v3/b/69315668d0ea881f40122451'; 

const projectsContainer = document.querySelector('.projects');
const statusMessage = document.getElementById('statusMessage');

function renderProjects(projects) {
    projectsContainer.innerHTML = '';
    
    if (!projects || projects.length === 0) {
        projectsContainer.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: var(--muted);">No projects found.</p>';
        return;
    }

    projects.forEach(project => {
        const card = document.createElement('project-card');
        
        card.setAttribute('title', project.title);
        card.setAttribute('role', project.role.startsWith('Role: ') ? project.role : `Role: ${project.role}`); 
        card.setAttribute('image', project.image || '/assets/placeholder.webp');
        card.setAttribute('image-small', project['image-small'] || project.image || '/assets/placeholder-small.webp');
        card.setAttribute('alt', project.alt || project.title);
        card.setAttribute('link', project.link || '#');
        card.setAttribute('link-text', project['link-text'] || 'View Project');

        if (project.description) {
            if (Array.isArray(project.description)) {
                card.innerHTML = project.description.join(''); 
            } else {
                card.innerHTML = project.description;
            }
        }

        projectsContainer.appendChild(card);
    });
}

const sampleLocalData = [
  {
    "title": "CSES Website",
    "role": "Full-Stack Developer",
    "image": "/assets/cses-home.webp",
    "image-small": "/assets/cses-home-small.webp",
    "alt": "CSES Home Page",
    "link": "https://csesucsd.com/",
    "link-text": "Visit CSES Website",
    "description": 
      "<p>A full-stack app for the Computer Science and Engineering Society (CSES).</p>" +
      "<ul>" +
      "<li>Collaborated with a team of eight developers to revamp the CSES website using React and Material-UI.</li>" +
      "<li>Contributed to UI design and feature development through pair programming and Agile workflows.</li>" +
      "<li>Improved user engagement by implementing interactive event listings and responsive layouts.</li>" +
      "</ul>"
  },
  {
    "title": "TQT Website",
    "role": "Full-Stack Developer",
    "image": "/assets/tqt-home.webp",
    "image-small": "/assets/tqt-home-small.webp",
    "alt": "TQT Home Page",
    "link": "https://tquantt.com/",
    "link-text": "Visit TQT Website",
    "description": 
      "<p>A full-stack app for Triton Quantitative Trading (TQT).</p>" +
      "<ul>" +
      "<li>Developed a secure membership platform using PostgreSQL for data management and authentication.</li>" +
      "<li>Implemented a blog page with a Markdown renderer to allow members to publish formatted research articles and updates.</li>" +
      "<li>Optimized frontend performance and site responsiveness across devices using React and TypeScript.</li>" +
      "</ul>"
  },
  {
    "title": "BURSA Website",
    "role": "Front-End Developer",
    "image": "/assets/bursa-home.webp",
    "image-small": "/assets/bursa-home-small.webp",
    "alt": "BURSA Home Page",
    "link": "https://bursaucsd.github.io/",
    "link-text": "Visit BURSA Website",
    "description": 
      "<p>A full-stack app for the Burmese Students Association (BURSA).</p>" +
      "<ul>" +
      "<li>Designed and developed the entire BURSA website using React and Material UI to create a responsive, user-friendly interface.</li>" +
      "<li>Ensured the website's functionality across different devices and screen sizes for optimal user experience.</li>" +
      "<li>Implemented the sections for Events, Meet the Team, and Contact Us, providing users with easy access to upcoming events, team information, and a way to get in touch with the organization.</li>" +
      "</ul>"
  },
  {
    "title": "GAMED",
    "role": "Front-End Developer",
    "image": "/assets/gamed-home.webp",
    "image-small": "/assets/gamed-home-small.webp",
    "alt": "GAMED Home Page",
    "link": "https://ucsdgamed.onrender.com/",
    "link-text": "Visit GAMED Website",
    "description": 
      "<p>A social platform designed for gamers to connect, form teams, and share experiences across different games and communities.</p>" +
      "<ul>" +
      "<li>Designed user-friendly interfaces and intuitive workflow for seamless user experience</li>" +
      "<li>Developed interactive player profiles and matchmaking features based on shared gaming interests.</li>" +
      "<li>Implemented a recommendation system to suggest potential teammates using activity data and player preferences.</li>" +
      "</ul>"
  }
];


if (!localStorage.getItem(PROJECTS_LOCAL_STORAGE_KEY)) {
    localStorage.setItem(PROJECTS_LOCAL_STORAGE_KEY, JSON.stringify(sampleLocalData));
} 

document.getElementById('loadLocal').addEventListener('click', () => {
    statusMessage.textContent = 'Loading local data...';
    statusMessage.style.display = 'block';
    try {
        const localDataString = localStorage.getItem(PROJECTS_LOCAL_STORAGE_KEY);
        if (localDataString) {
            const projects = JSON.parse(localDataString);
            renderProjects(projects);
            statusMessage.style.display = 'none';
        } else {
            renderProjects([]);
            statusMessage.textContent = 'No local data found.';
            statusMessage.style.display = 'block';
        }
    } catch (error) {
        console.error("Error loading local data:", error);
        projectsContainer.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: red;">Error parsing local storage data.</p>';
        statusMessage.style.display = 'none';
    }
});

document.getElementById('loadRemote').addEventListener('click', async () => {
    statusMessage.textContent = 'Loading remote data...';
    statusMessage.style.display = 'block';

    try {
        const response = await fetch(REMOTE_URL, {
            method: 'GET',
            headers: {
                'X-Master-Key': '$2a$10$fsNl9Up/6eYWopXj12q5YOOn6ZWVAUrAeGaQp2/b4riTV4J76.lOi', 
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        
        const remoteProjects = data.record; 
        renderProjects(remoteProjects);

        statusMessage.style.display = 'none';

    } catch (error) {
        console.error("Error fetching remote data:", error);
        projectsContainer.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: red;">Error fetching remote data. Check console for details, network, and API key.</p>';
        statusMessage.style.display = 'none';
    }
});