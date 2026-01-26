document.addEventListener('DOMContentLoaded', () => {
    // Existing Naming Service and Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const generateBtn = document.getElementById('generateBtn');

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

    const boyNames = [
        "김하준", "김도윤", "김서준", "김이준", "김시우", "김은우", "김현우", "김준우", "김건우", "김우진",
        "김민준", "김지호", "김예준", "김유준", "김로운", "김지우", "김하진", "김준서", "김도현", "김태윤"
    ];
    const girlNames = [
        "김하윤", "김서윤", "김지유", "김서아", "김지아", "김하은", "김아린", "김수아", "김서현", "김채원",
        "김아윤", "김은서", "김예린", "김윤슬", "김다은", "김예나", "김시아", "김수민", "김하율", "김지은"
    ];

    function generateName() {
        const genderDisplay = document.getElementById('genderDisplay');
        const nameDisplay = document.getElementById('nameDisplay');

        const isBoy = Math.random() < 0.5; // 50% chance for boy or girl
        const gender = isBoy ? '아들' : '딸';
        const nameList = isBoy ? boyNames : girlNames;
        const randomName = nameList[Math.floor(Math.random() * nameList.length)];

        genderDisplay.textContent = `축하합니다! ${gender}입니다!`;
        nameDisplay.textContent = randomName;
        nameDisplay.classList.remove('name-placeholder'); // Remove placeholder class if it exists
    }

    generateBtn.addEventListener('click', generateName);
});