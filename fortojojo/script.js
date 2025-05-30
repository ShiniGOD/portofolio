// Update copyright year automatically
document.getElementById('year').textContent = new Date().getFullYear();

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 60,
            behavior: 'smooth'
        });
    });
});

// Form handling
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Here you would typically send the data to a server
    console.log('Form submitted:', { name, email, message });
    
    // Show success animation
    const button = this.querySelector('button');
    button.textContent = 'Message Sent!';
    button.style.backgroundColor = 'var(--success-color)';
    
    setTimeout(() => {
        button.textContent = 'Send Message';
        button.style.backgroundColor = 'var(--primary-color)';
        this.reset();
    }, 2000);
});

// Animation on scroll - for skills and other elements
window.addEventListener('scroll', function() {
    // Skill animations
    const skills = document.querySelectorAll('.skill-level');
    
    skills.forEach(skill => {
        const skillPosition = skill.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if(skillPosition < screenPosition) {
            switch(skill.className) {
                case 'skill-level html':
                    skill.style.width = '95%';
                    break;
                case 'skill-level js':
                    skill.style.width = '60%';
                    break;
                case 'skill-level python':
                    skill.style.width = '45%';
                    break;
                case 'skill-level cpp':
                    skill.style.width = '70%';
                    break;
                case 'skill-level c':
                    skill.style.width = '70%';
                    break;
            }
        }
    });
    
    // Portfolio item animations
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach((item, index) => {
        const itemPosition = item.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if(itemPosition < screenPosition) {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.5s ease-out';
    });
});

document.querySelectorAll('.tab-btn').forEach(button => {
    button.addEventListener('click', () => {
        const tabId = button.dataset.tab;
        const experienceSection = document.getElementById('experience');
        
        document.querySelectorAll('.tab-btn, .tab-content').forEach(element => {
            element.classList.remove('active');
        });
        
        button.classList.add('active');
        document.getElementById(tabId).classList.add('active');
        
        if(window.innerWidth < 768) {
            window.scrollTo({
                top: experienceSection.offsetTop - 60,
                behavior: 'smooth'
            });
        }
    });
});