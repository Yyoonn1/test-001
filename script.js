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

    // --- Tab Switching Logic ---
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.dataset.tab;

            tabContents.forEach(content => {
                content.classList.remove('active');
            });
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
            });

            document.getElementById(targetTab).classList.add('active');
            button.classList.add('active');
        });
    });

    // --- Teachable Machine Dog-face vs. Cat-face Test ---
    // Important: Replace "YOUR_TEACHABLE_MACHINE_MODEL_URL" with your actual model URL from Teachable Machine.
    // Example: "https://teachablemachine.withgoogle.com/models/abcdefg/"
    const URL = "YOUR_TEACHABLE_MACHINE_MODEL_URL"; // User to replace this
    let model, maxPredictions;

    const uploadedImageElement = document.getElementById('uploadedImage');
    const labelContainer = document.getElementById('label-container');
    const imageUpload = document.getElementById('imageUpload');

    const uploadButton = document.getElementById('uploadButton');
    const classifyButton = document.getElementById('classifyButton');

    // Event Listeners for the new feature
    uploadButton.addEventListener('click', () => imageUpload.click());
    imageUpload.addEventListener('change', handleImageUpload);
    classifyButton.addEventListener('click', predict);

    // Initial setup
    init();

    async function init() {
        if (URL === "YOUR_TEACHABLE_MACHINE_MODEL_URL") {
            labelContainer.innerHTML = '<p style="color:red;">Teachable Machine 모델 URL을 입력해주세요. (script.js 파일)</p>';
            classifyButton.style.display = 'none';
            return;
        }

        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

        try {
            model = await tmImage.load(modelURL, metadataURL);
            maxPredictions = model.getTotalClasses();
            labelContainer.innerHTML = ''; // Clear initial placeholder
            classifyButton.style.display = 'inline-block';
            for (let i = 0; i < maxPredictions; i++) {
                labelContainer.appendChild(document.createElement("div"));
            }
            console.log("Teachable Machine model loaded.");
        } catch (error) {
            console.error("Failed to load Teachable Machine model:", error);
            labelContainer.innerHTML = '<p style="color:red;">모델 로딩 실패. 콘솔을 확인해주세요.</p>';
            classifyButton.style.display = 'none';
        }
    }

    async function handleImageUpload(event) {
        labelContainer.innerHTML = '<p class="placeholder">결과를 기다리는 중...</p>';

        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            uploadedImageElement.src = e.target.result;
            uploadedImageElement.style.display = 'block';
            classifyButton.style.display = 'inline-block';
            labelContainer.innerHTML = '<p class="placeholder">분류하기 버튼을 눌러주세요.</p>';
        };
        reader.readAsDataURL(file);
    }

    async function predict() {
        if (!model) {
            labelContainer.innerHTML = '<p style="color:red;">모델이 로드되지 않았습니다.</p>';
            return;
        }

        if (uploadedImageElement.style.display !== 'block' || !uploadedImageElement.src) {
            labelContainer.innerHTML = '<p style="color:red;">분류할 이미지가 없습니다. 사진을 업로드해주세요.</p>';
            return;
        }
        
        labelContainer.innerHTML = '분류 중...';

        const prediction = await model.predict(uploadedImageElement);
        
        // Sort predictions by probability
        prediction.sort((a, b) => b.probability - a.probability);

        labelContainer.innerHTML = '';
        for (let i = 0; i < maxPredictions; i++) {
            const classPrediction = prediction[i].className + ": " + prediction[i].probability.toFixed(2);
            const probability = (prediction[i].probability * 100).toFixed(1);

            const predictionDiv = document.createElement("div");
            predictionDiv.className = 'prediction-item';
            predictionDiv.innerHTML = `${prediction[i].className}: ${probability}%`;

            const progressBar = document.createElement('div');
            progressBar.className = 'probability-bar';
            const progressBarFill = document.createElement('div');
            progressBarFill.className = 'probability-fill';
            progressBarFill.style.width = `${probability}%`;
            progressBarFill.textContent = `${probability}%`; // Text inside the bar
            progressBar.appendChild(progressBarFill);

            labelContainer.appendChild(predictionDiv);
            labelContainer.appendChild(progressBar);
        }
    }
});