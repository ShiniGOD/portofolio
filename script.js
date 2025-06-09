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

        // Script bot
        const chatMessages = document.getElementById('chat-messages');
        const userInput = document.getElementById('user-input');
        const sendBtn = document.getElementById('send-btn');
        const typingIndicator = document.getElementById('typing-indicator');
        const chatbotToggle = document.getElementById('chatbot-toggle');
        const chatbotContainer = document.getElementById('chatbot-container');
        const closeChat = document.getElementById('close-chat');

        // Toggle chatbot visibility
        chatbotToggle.addEventListener('click', () => {
            chatbotContainer.classList.toggle('active');
        });

        closeChat.addEventListener('click', () => {
            chatbotContainer.classList.remove('active');
        });

        // Percakapan
        const responseGroups = [
            {
                triggers: ['halo', 'hai', 'hei', 'p', 'oi', 'bro', 'sis'],
                responses: [
                    "Halo! Ada yang bisa saya bantu? 😊",
                    "Hai! Hari ini mau tanya apa?",
                    "Hei! Langsung saja, apa kebutuhan Anda?",
                    "Halo! Senang bisa membantu Anda hari ini 🌟"
                ]
            },
            {
                triggers: ['apa kabar', 'kabarmu', 'gimana', 'kabar'],
                responses: [
                    "Alhamdulillah baik! Anda bagaimana? 😇",
                    "Saya bot jadi selalu siap membantu! 💪",
                    "Sedang semangat nih, ada yang bisa dibantu? 🚀"
                ]
            },
            {
                triggers: ['terima kasih', 'makasih', 'trims', 'thanks', 'tengkyu'],
                responses: [
                    "Sama-sama! Senang bisa membantu 😊",
                    "Jangan sungkan untuk bertanya lagi ya!",
                    "Dengan senang hati! 👍"
                ]
            },
            {
                triggers: ['bantuan', 'tolong', 'help', 'bantu'],
                responses: [
                    "Tentu! Coba jelaskan kebutuhan Anda...",
                    "Saya siap membantu. Apa yang Anda butuhkan?",
                    "Ceritakan masalah Anda, saya akan coba bantu 🤔"
                ]
            },
            {
                triggers: ['portfolio', 'proyek', 'project', 'karya'],
                responses: [
                    "Anda bisa melihat proyek saya di bagian Projects di atas!",
                    "Scroll ke bagian Projects untuk melihat karya-karya saya.",
                    "Saya punya beberapa proyek menarik di bagian Projects portfolio ini."
                ]
            },
            {
                triggers: ['skill', 'kemampuan', 'keahlian'],
                responses: [
                    "Skill utama saya ada di bagian Skills. Coba lihat ya!",
                    "Saya menguasai HTML, CSS, JavaScript, Python, C++, dan C. Lihat detailnya di bagian Skills.",
                    "Scroll ke atas ke bagian Skills untuk melihat kemampuan teknis saya."
                ]
            }
        ];

        const defaultResponses = [
            "Maaf saya belum paham, bisa dijelaskan dengan cara lain?",
            "Wah pertanyaan menarik! Bisa diperjelas maksudnya?",
            "Sepertinya saya perlu belajar lagi nih 😅",
            "Coba gunakan kata kunci yang berbeda ya..."
        ];

        // typo check
        function processInput(text) {
            return text.toLowerCase()
                .replace(/[^a-z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ ]/g, ' ')
                .replace(/\b(bg|dng|yg|tdk|gmn|brp|sblm)\b/g, match => ({
                    'bg': 'bang', 'dng': 'dengan', 'yg': 'yang', 
                    'tdk': 'tidak', 'gmn': 'gimana', 'brp': 'berapa',
                    'sblm': 'sebelum'
                }[match]))
                .replace(/\s+/g, ' ')
                .trim();
        }

        function findBestResponse(processedText) {
            // Priority 1: Jika sama
            for (const group of responseGroups) {
                for (const trigger of group.triggers) {
                    if (processedText.includes(trigger)) {
                        return group.responses[Math.floor(Math.random() * group.responses.length)];
                    }
                }
            }

            // Priority 2: awal kata yang cocok
            for (const group of responseGroups) {
                for (const trigger of group.triggers) {
                    if (processedText.includes(trigger.substring(0, 3))) {
                        return group.responses[Math.floor(Math.random() * group.responses.length)];
                    }
                }
            }

            // Priority 3: Default response
            return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
        }

        function addMessage(text, isUser = false) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
            messageDiv.textContent = text;
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        async function handleUserInput() {
            const rawInput = userInput.value.trim();
            if (!rawInput) return;

            addMessage(rawInput, true);
            userInput.value = '';
            
            typingIndicator.style.display = 'block';
            
            await new Promise(resolve => setTimeout(resolve, 800));
            
            typingIndicator.style.display = 'none';
            const processedText = processInput(rawInput);
            const response = findBestResponse(processedText);
            addMessage(response);
        }

        // Event pendengar
        sendBtn.addEventListener('click', handleUserInput);
        userInput.addEventListener('keypress', e => e.key === 'Enter' && handleUserInput());

        // Initial setup
        setTimeout(() => {
            addMessage("Coba ketik:");
            addMessage("- 'Halo' 👋");
            addMessage("- 'Apa kabar?' 😊");
            addMessage("- 'Butuh bantuan' 🆘");
            addMessage("- 'Skill apa yang kamu miliki?' 💻");
        }, 1000);