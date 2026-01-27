document.addEventListener('DOMContentLoaded', () => {
    // Existing Naming Service and Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const generateBtn = document.getElementById('generateBtn');
    const languageSelect = document.getElementById('language');

    // Load saved theme, default to dark
    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light-mode');
    } else {
        // Ensure dark mode is applied by default if no preference or 'dark' is saved
        body.classList.remove('light-mode');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode'); // Toggle light-mode class

        // Save preference
        if (body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.setItem('theme', 'dark');
        }
    });

    const namesByLanguage = {
        korean: {
            boy: ["하준", "도윤", "서준", "이준", "시우", "은우", "현우", "준우", "건우", "우진", "민준", "지호", "예준", "유준", "로운", "지우", "하진", "준서", "도현", "태윤"],
            girl: ["하윤", "서윤", "지유", "서아", "지아", "하은", "아린", "수아", "서현", "채원", "아윤", "은서", "예린", "윤슬", "다은", "예나", "시아", "수민", "하율", "지은"]
        },
        american: {
            boy: ["James", "John", "Robert", "Michael", "William", "David", "Richard", "Joseph", "Thomas", "Charles"],
            girl: ["Mary", "Patricia", "Jennifer", "Linda", "Elizabeth", "Barbara", "Susan", "Jessica", "Sarah", "Karen"]
        },
        german: {
            boy: ["Ben", "Paul", "Jonas", "Leon", "Finn", "Elias", "Maximilian", "Felix", "Noah", "Luis"],
            girl: ["Mia", "Emma", "Hannah", "Sophia", "Anna", "Lena", "Emilia", "Marie", "Lina", "Lea"]
        },
        japanese: {
            boy: ["Aoi", "Ren", "Haruto", "Yuma", "Sota", "Minato", "Yuki", "Kaito", "Riku", "Hayato"],
            girl: ["Himari", "Hina", "Yui", "Sakura", "Rin", "Mei", "Yua", "Saki", "Akari", "Ichika"]
        },
        chinese: {
            boy: ["Wei", "Fang", "Min", "Jian", "Hao", "Cheng", "Zhi", "Liang", "Yong", "Qiang"],
            girl: ["Mei", "Ling", "Jing", "Yan", "Huan", "Xiu", "Lan", "Fang", "Qing", "Ying"]
        },
        spanish: {
            boy: ["Santiago", "Mateo", "Sebastián", "Leonardo", "Matías", "Diego", "Daniel", "Alejandro", "Samuel", "Benjamín"],
            girl: ["Sofía", "Isabella", "Valentina", "Camila", "Valeria", "Mariana", "Luciana", "Daniela", "Sara", "Victoria"]
        }
    };

    function generateName() {
        const genderDisplay = document.getElementById('genderDisplay');
        const nameDisplay = document.getElementById('nameDisplay');
        const selectedLanguage = languageSelect.value;

        const names = namesByLanguage[selectedLanguage];
        const isBoy = Math.random() < 0.5; // 50% chance for boy or girl
        const gender = isBoy ? '아들' : '딸';
        const nameList = isBoy ? names.boy : names.girl;
        const randomName = nameList[Math.floor(Math.random() * nameList.length)];

        genderDisplay.textContent = `축하합니다! ${gender}입니다!`;
        nameDisplay.textContent = randomName;
        nameDisplay.classList.remove('name-placeholder'); // Remove placeholder class if it exists
    }

    generateBtn.addEventListener('click', generateName);
});