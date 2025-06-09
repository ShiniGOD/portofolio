// Current year for footer
document.getElementById('year').textContent = new Date().getFullYear();

// Tab functionality
document.querySelectorAll('.tab-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Show corresponding content
        const tabId = button.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// Form submission
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Terima kasih! Pesan Anda telah dikirim. Saya akan segera menghubungi Anda.');
    this.reset();
});

// Chatbot Script
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const typingIndicator = document.getElementById('typing-indicator');
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotContainer = document.getElementById('chatbot-container');
const closeChat = document.getElementById('close-chat');
const suggestionChips = document.querySelectorAll('.chip');

// Conversation context and memory
let conversationContext = {
    lastTopic: null,
    lastInteraction: new Date(),
    userName: null
};

// Enhanced response system with Indonesian slang support and context awareness
const responseGroups = [
    {
        triggers: ['halo', 'hai', 'hei', 'p', 'oi', 'bro', 'sis', 'assalamualaikum'],
        responses: [
            "Halo! Ada yang bisa saya bantu? 😊",
            "Hai! Hari ini mau tanya apa?",
            "Hei! Langsung saja, apa kebutuhan Anda?",
            "Halo! Senang bisa membantu Anda hari ini 🌟"
        ]
    },
    {
        triggers: ['apa kabar', 'kabarmu', 'gimana', 'kabar', 'gimana kabar'],
        responses: [
            "Alhamdulillah baik! Anda bagaimana? 😇",
            "Saya bot jadi selalu siap membantu! 💪",
            "Sedang semangat nih, ada yang bisa dibantu? 🚀"
        ]
    },
    {
        triggers: ['terima kasih', 'makasih', 'trims', 'thanks', 'tengkyu', 'thx'],
        responses: [
            "Sama-sama! Senang bisa membantu 😊",
            "Jangan sungkan untuk bertanya lagi ya!",
            "Dengan senang hati! 👍",
            "Sama-sama! Kalau ada pertanyaan lagi, saya siap membantu."
        ]
    },
    {
        triggers: ['bantuan', 'tolong', 'help', 'bantu', 'minta tolong'],
        responses: [
            "Tentu! Coba jelaskan kebutuhan Anda...",
            "Saya siap membantu. Apa yang Anda butuhkan?",
            "Ceritakan masalah Anda, saya akan coba bantu 🤔",
            "Silakan tanyakan apa saja tentang portofolio ini."
        ]
    },
    {
        triggers: ['portfolio', 'proyek', 'project', 'karya', 'aplikasi', 'program'],
        responses: [
            "Saya punya beberapa proyek menarik:<br>1. Web App<br>2. Pygames<br>3. C/C++ Applications<br>Mau tahu lebih detail yang mana?",
            "Anda bisa melihat proyek saya di bagian Projects di atas! Atau tanya langsung ke saya.",
            "Proyek saya meliputi pengembangan web, game Python, dan aplikasi C/C++. Tertarik yang mana?"
        ],
        setContext: 'projects'
    },
    {
        triggers: ['skill', 'kemampuan', 'keahlian', 'expertise', 'bisa apa'],
        responses: [
            "Skill utama saya:<br>- HTML/CSS: 95%<br>- JavaScript: 60%<br>- Python: 45%<br>- C++: 70%<br>- C: 70%<br>Lebih detail bisa lihat di bagian Skills!",
            "Saya menguasai HTML, CSS, JavaScript, Python, C++, dan C. Skill lengkapnya ada di bagian Skills portofolio.",
            "Kemampuan teknis saya meliputi frontend development dan bahasa pemrograman sistem. Detailnya ada di atas ya!"
        ],
        setContext: 'skills'
    },
    {
        triggers: ['pendidikan', 'sekolah', 'kuliah', 'lulusan', 'education', 'study'],
        responses: [
            "Saya lulusan SMA 2 Tanjungpinang (2021-2024). Saat ini sedang mempersiapkan untuk melanjutkan pendidikan di bidang komputer.",
            "Saya baru lulus SMA dan sedang mempertimbangkan pilihan untuk kuliah di bidang IT atau komputer.",
            "Latar belakang pendidikan saya SMA, tapi saya banyak belajar pemrograman secara otodidak."
        ],
        setContext: 'education'
    },
    {
        triggers: ['pengalaman', 'kerja', 'experience', 'kerjaan', 'riwayat kerja'],
        responses: [
            "Pengalaman saya meliputi:<br>- Pengembangan game Roblox (2019)<br>- Aplikasi Python (2022)<br>- Belajar mandiri berbagai bahasa pemrograman<br>Detailnya ada di bagian Experience!",
            "Saya punya pengalaman dalam pengembangan game, aplikasi Python, dan web development. Lihat bagian Experience untuk lebih lengkap."
        ],
        setContext: 'experience'
    },
    {
        triggers: ['kontak', 'hubungi', 'contact', 'email', 'sosmed', 'whatsapp', 'telepon'],
        responses: [
            "Anda bisa menghubungi saya melalui form di bagian Contact. Atau lewat sosial media:<br>- GitHub<br>- LinkedIn<br>- Twitter<br>- Instagram",
            "Silakan gunakan form kontak di bagian bawah halaman ini. Atau kunjungi sosial media saya!",
            "Untuk komunikasi lebih lanjut, silakan isi form kontak. Saya akan segera merespon."
        ],
        setContext: 'contact'
    },
    {
        triggers: ['nama', 'siapa nama', 'panggil', 'namamu'],
        responses: [
            "Saya adalah asisten virtual dikembangkan Jonatan. Siap membantu Anda!",
            "Nama saya Asisten Portofolio Jonatan. Ada yang bisa saya bantu?",
            "Saya bot asisten untuk portofolio Jonatan Eldo Kusuma. Senang berkenalan!"
        ]
    },
    {
        triggers: ['bye', 'dadah', 'sampai jumpa', 'selamat tinggal', 'quit', 'exit'],
        responses: [
            "Terima kasih! Sampai jumpa lagi 👋",
            "Senang bisa membantu. Jangan ragu kembali jika ada pertanyaan!",
            "Sampai bertemu lagi! Semoga harimu menyenangkan 😊"
        ]
    }
];

const defaultResponses = [
    "Maaf saya belum paham, bisa dijelaskan dengan cara lain?",
    "Wah pertanyaan menarik! Bisa diperjelas maksudnya?",
    "Sepertinya saya perlu belajar lagi nih 😅",
    "Coba gunakan kata kunci yang berbeda ya...",
    "Maaf, saya belum bisa menjawab pertanyaan itu. Mungkin tentang portofolio, skill, atau proyek saya?"
];

// Improved message processing with typo tolerance
function processInput(text) {
    return text.toLowerCase()
        .replace(/[^a-z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ ]/g, ' ')
        .replace(/\b(bg|dng|yg|tdk|gmn|brp|sblm|km|kpn|skrg|klo|kyk|bgt|sgt|sy|gw|loe|lu|yg|aja|aj)\b/g, match => ({
            'bg': 'bang', 'dng': 'dengan', 'yg': 'yang', 
            'tdk': 'tidak', 'gmn': 'gimana', 'brp': 'berapa',
            'sblm': 'sebelum', 'km': 'kamu', 'kpn': 'kapan',
            'skrg': 'sekarang', 'klo': 'kalau', 'kyk': 'kayak',
            'bgt': 'banget', 'sgt': 'sangat', 'sy': 'saya',
            'gw': 'saya', 'loe': 'kamu', 'lu': 'kamu', 'aja': 'saja', 'aj': 'saja'
        }[match]))
        .replace(/\s+/g, ' ')
        .trim();
}

function getCurrentTime() {
    const now = new Date();
    return ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')};
}

function addMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = message ${isUser ? 'user-message' : 'bot-message'};
    
    // Add message content
    messageDiv.innerHTML = text;
    
    // Add timestamp
    const timeDiv = document.createElement('div');
    timeDiv.className = 'message-time';
    timeDiv.textContent = getCurrentTime();
    messageDiv.appendChild(timeDiv);
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function findBestResponse(processedText) {
    // Check for context-based responses first
    if (conversationContext.lastTopic) {
        switch(conversationContext.lastTopic) {
            case 'projects':
                if (processedText.includes('web') || processedText.includes('app')) {
                    return "Project Web App adalah aplikasi web responsif yang dibangun dengan HTML, CSS, dan JavaScript. Fiturnya termasuk interaksi real-time dan UI modern.";
                } else if (processedText.includes('pygame') || processedText.includes('python')) {
                    return "Project Pygames adalah game sederhana yang saya buat menggunakan modul Pygame di Python. Saya belajar tentang logika game, collision detection, dan AI sederhana.";
                } else if (processedText.includes('c') || processedText.includes('c++')) {
                    return "Project C/C++ adalah aplikasi konsol yang saya kembangkan untuk mempelajari konsep pemrograman dasar dan algoritma. Termasuk struktur data dan algoritma sorting.";
                }
                break;
            case 'skills':
                if (processedText.includes('html') || processedText.includes('css')) {
                    return "Saya sangat mahir dalam HTML/CSS (95%). Saya bisa membuat layout responsif, animasi CSS, dan design system yang konsisten.";
                } else if (processedText.includes('js') || processedText.includes('javascript')) {
                    return "JavaScript skill saya 60%. Saya bisa membuat interaksi DOM, fetch API, dan aplikasi single page sederhana.";
                } else if (processedText.includes('python')) {
                    return "Python skill saya 45%. Saya bisa membuat script automasi, game sederhana dengan Pygame, dan aplikasi CLI.";
                } else if (processedText.includes('c++') || processedText.includes('c')) {
                    return "C/C++ skill saya 70%. Saya memahami pointer, memory management, dan bisa membuat aplikasi console dengan fitur lengkap.";
                }
                break;
        }
    }

    // Check all triggers
    for (const group of responseGroups) {
        for (const trigger of group.triggers) {
            if (processedText.includes(trigger)) {
                // Set context if defined
                if (group.setContext) {
                    conversationContext.lastTopic = group.setContext;
                }
                
                return group.responses[Math.floor(Math.random() * group.responses.length)];
            }
        }
    }

    // Default response
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

async function handleUserInput() {
    const rawInput = userInput.value.trim();
    if (!rawInput) return;

    addMessage(rawInput, true);
    userInput.value = '';
    
    // Show typing indicator
    typingIndicator.style.display = 'block';
    
    // Simulate thinking time
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1000));
    
    // Hide typing indicator
    typingIndicator.style.display = 'none';
    
    // Process and respond
    const processedText = processInput(rawInput);
    const response = findBestResponse(processedText);
    addMessage(response);
    
    // Update context
    conversationContext.lastInteraction = new Date();
}

// Event handling
sendBtn.addEventListener('click', handleUserInput);
userInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') handleUserInput();
});

// Toggle chatbot visibility
chatbotToggle.addEventListener('click', () => {
    chatbotContainer.classList.toggle('active');
});

closeChat.addEventListener('click', () => {
    chatbotContainer.classList.remove('active');
});

// Suggestion chips
suggestionChips.forEach(chip => {
    chip.addEventListener('click', () => {
        const msg = chip.getAttribute('data-msg');
        userInput.value = msg;
        handleUserInput();
    });
});

// Initial setup
setTimeout(() => {
    addMessage("Coba tanyakan tentang:");
    addMessage("- 'Proyek apa yang kamu miliki?' 🚀");
    addMessage("- 'Apa saja skill kamu?' 💻");
    addMessage("- 'Bagaimana pengalaman pendidikanmu?' 🎓");
    addMessage("- 'Bagaimana cara menghubungi kamu?' 📱");
}, 1500);

// Animate skill bars when they come into view
const animateSkillBars = () => {
    const skillLevels = document.querySelectorAll('.skill-level');
    skillLevels.forEach(level => {
        const percent = level.getAttribute('data-percent');
        level.style.width = percent;
    });
};

// Initialize on load
window.addEventListener('load', () => {
    // Set current year
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Animate skill bars
    setTimeout(animateSkillBars, 500);
});