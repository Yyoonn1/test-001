document.addEventListener('DOMContentLoaded', () => {
  // --- UI Elements ---
  const heroSection = document.getElementById('hero-section');
  const quizSection = document.getElementById('quiz-section');
  const resultSection = document.getElementById('result-section');

  const startQuizBtn = document.getElementById('start-quiz-btn');
  const questionText = document.getElementById('question-text');
  const optionABtn = document.getElementById('option-a');
  const optionBBtn = document.getElementById('option-b');
  const quizProgressBar = document.getElementById('quiz-progress');

  const resultTypeEl = document.getElementById('result-type');
  const resultDescriptionEl = document.getElementById('result-description');
  const resultRarityEl = document.getElementById('result-rarity');
  const resultCompatibilityEl = document.getElementById('result-compatibility');
  const restartQuizBtn = document.getElementById('restart-quiz-btn');

  // --- Game State ---
  let currentQuestionIndex = 0;
  let userChoices = []; // 'A' or 'B'
  const TOTAL_QUESTIONS = 7;

  // --- Data: Questions ---
  const questions = [
    {
      q: "평생 단 한 가지 음식만 먹어야 한다면?",
      a: "치킨",
      b: "떡볶이"
    },
    {
      q: "세상 모든 사람이 나의 험담을 한다 vs. 세상 모든 사람이 나를 모른다",
      a: "험담을 한다 (나를 기억하는 사람이 있는 게 중요)",
      b: "나를 모른다 (속 편하게 살고 싶다)"
    },
    {
      q: "10년 동안 먹고 싶은 것 다 먹지만 살 100kg 찌기 vs. 10년 동안 닭가슴살만 먹고 살 유지",
      a: "살 100kg 찌기 (먹는 행복이 최고)",
      b: "닭가슴살만 먹기 (자기 관리가 중요)"
    },
    {
      q: "평생 여름만 살기 vs. 평생 겨울만 살기",
      a: "평생 여름 (활기찬 것이 좋다)",
      b: "평생 겨울 (따뜻하게 지낼 수 있다)"
    },
    {
      q: "내가 낸 문제만 맞출 수 있는 퀴즈 천재 vs. 내가 낸 문제만 틀리는 퀴즈 바보",
      a: "퀴즈 천재 (내가 우월하다는 기분)",
      b: "퀴즈 바보 (상대를 배려하는 마음)"
    },
    {
      q: "갑자기 100억 받기 vs. 월 100만원씩 평생 받기",
      a: "100억 받기 (한방이 최고)",
      b: "월 100만원씩 평생 받기 (안정적인 삶이 최고)"
    },
    {
      q: "내가 좋아하는 연예인과 1년 연애 vs. 평생 동안 돈 걱정 없이 살기",
      a: "연예인과 1년 연애 (추억을 남기겠다)",
      b: "돈 걱정 없이 살기 (현실이 중요하다)"
    }
  ];

  // --- Data: Core Types ---
  // Each core type has a name, description, rarity, and compatibility scores
  // Mapping logic: A count -> Core Type
  const coreTypes = [
    {
      id: "righteous_fool",
      name: "정의로운 바보",
      description: "당신은 옳고 그름에 대한 확고한 신념을 가지고 있으며, 때로는 그 신념 때문에 손해를 감수하기도 합니다. 주변 사람들은 당신의 순수함과 정의감을 존경하지만, 가끔은 답답해하기도 합니다.",
      rarity: "20%",
      compatibility: {
        "righteous_fool": "70%", "charismatic_villain": "30%", "selfish_survivor": "50%", "indecisive_ghost": "80%", "lonely_genius": "60%", "passionate_agitator": "90%"
      }
    },
    {
      id: "indecisive_ghost",
      name: "우유부단한 유령",
      description: "당신은 어떤 것도 확실하게 결정하지 못하고 주변의 눈치를 살피는 경향이 있습니다. 갈등을 피하고 싶어 하지만, 결국 아무것도 결정하지 못해 모두를 답답하게 만들 때가 많습니다. 존재감이 희미해지기도 합니다.",
      rarity: "30%",
      compatibility: {
        "righteous_fool": "80%", "charismatic_villain": "40%", "selfish_survivor": "60%", "indecisive_ghost": "70%", "lonely_genius": "50%", "passionate_agitator": "70%"
      }
    },
    {
      id: "selfish_survivor",
      name: "극단적 생존주의자",
      description: "당신은 어떤 상황에서든 자신의 이익과 생존을 최우선으로 생각합니다. 냉정하고 현실적이며, 필요하다면 타인을 이용하는 것도 주저하지 않습니다. 겉으로는 차가워 보이지만, 누구보다도 강한 생존 본능을 가지고 있습니다.",
      rarity: "25%",
      compatibility: {
        "righteous_fool": "50%", "charismatic_villain": "80%", "selfish_survivor": "60%", "indecisive_ghost": "60%", "lonely_genius": "70%", "passionate_agitator": "40%"
      }
    },
    {
      id: "charismatic_villain",
      name: "매력적인 악당",
      description: "당신은 타고난 카리스마와 뛰어난 언변으로 사람들을 현혹합니다. 자신의 목표를 위해서라면 수단과 방법을 가리지 않지만, 그 과정마저도 매력적으로 보이게 만드는 재주가 있습니다. 많은 사람이 당신을 따르지만, 그만큼 위험하기도 합니다.",
      rarity: "15%",
      compatibility: {
        "righteous_fool": "30%", "charismatic_villain": "90%", "selfish_survivor": "80%", "indecisive_ghost": "40%", "lonely_genius": "70%", "passionate_agitator": "60%"
      }
    },
    {
      id: "lonely_genius",
      name: "고독한 천재",
      description: "당신은 남들이 보지 못하는 것을 보고, 남들이 생각지 못한 것을 생각해내는 비범한 능력을 가지고 있습니다. 하지만 그만큼 타인과의 공감대가 부족하고, 종종 외로움을 느끼기도 합니다. 당신의 천재성은 때로 빛이 나지만, 때로는 그림자처럼 당신을 덮칩니다.",
      rarity: "8%",
      compatibility: {
        "righteous_fool": "60%", "charismatic_villain": "70%", "selfish_survivor": "70%", "indecisive_ghost": "50%", "lonely_genius": "80%", "passionate_agitator": "50%"
      }
    },
    {
      id: "passionate_agitator",
      name: "열정적인 선동가",
      description: "당신은 불의를 참지 못하며, 자신의 신념을 강력하게 주장하고 타인을 설득하는 데 능숙합니다. 당신의 열정은 사람들을 움직이는 힘이 있지만, 때로는 과도한 확신이 독이 되기도 합니다. 당신은 세상을 바꾸고 싶어 하지만, 그 방식이 모두에게 통용되지는 않습니다.",
      rarity: "7%",
      compatibility: {
        "righteous_fool": "90%", "charismatic_villain": "60%", "selfish_survivor": "40%", "indecisive_ghost": "70%", "lonely_genius": "50%", "passionate_agitator": "80%"
      }
    }
  ];

  // --- Functions ---

  function showSection(section) {
    heroSection.classList.add('hidden');
    quizSection.classList.add('hidden');
    resultSection.classList.add('hidden');
    section.classList.remove('hidden');
  }

  function updateProgressBar() {
    const progress = ((currentQuestionIndex) / TOTAL_QUESTIONS) * 100;
    quizProgressBar.style.width = `${progress}%`;
  }

  function loadQuestion() {
    if (currentQuestionIndex < TOTAL_QUESTIONS) {
      const qData = questions[currentQuestionIndex];
      questionText.textContent = qData.q;
      optionABtn.textContent = qData.a;
      optionBBtn.textContent = qData.b;
      updateProgressBar();
    } else {
      calculateCoreType();
    }
  }

  function handleAnswer(choice) {
    userChoices.push(choice);
    currentQuestionIndex++;
    loadQuestion();
  }

  function calculateCoreType() {
    let aCount = userChoices.filter(choice => choice === 'A').length;
    let bCount = userChoices.filter(choice => choice === 'B').length;

    let finalType;
    if (aCount >= 6) { // Mostly A
      finalType = coreTypes.find(type => type.id === "charismatic_villain");
    } else if (aCount >= 4) { // More A
      finalType = coreTypes.find(type => type.id === "selfish_survivor");
    } else if (aCount >= 3 && bCount >= 3) { // Balanced
      finalType = coreTypes.find(type => type.id === "indecisive_ghost");
    } else if (bCount >= 4) { // More B
      finalType = coreTypes.find(type => type.id === "righteous_fool");
    } else { // Mostly B, or for other patterns, assign a default
        // This is a simplified mapping. A more complex one would consider specific patterns.
        const typesByRarity = coreTypes.sort((a,b) => parseInt(a.rarity) - parseInt(b.rarity));
        finalType = typesByRarity[Math.floor(Math.random() * typesByRarity.length)];
    }

    displayResult(finalType);
  }

  function displayResult(type) {
    resultTypeEl.textContent = type.name;
    resultDescriptionEl.textContent = type.description;
    resultRarityEl.textContent = type.rarity;

    // Display compatibility with a random other type for now
    const otherTypes = coreTypes.filter(t => t.id !== type.id);
    const randomOtherType = otherTypes[Math.floor(Math.random() * otherTypes.length)];
    const compatibilityScore = type.compatibility[randomOtherType.id];
    resultCompatibilityEl.textContent = `${randomOtherType.name}과 ${compatibilityScore}`;
    
    showSection(resultSection);
  }

  function restartQuiz() {
    currentQuestionIndex = 0;
    userChoices = [];
    heroSection.classList.remove('hidden'); // Show hero again to restart the typing anim
    quizSection.classList.add('hidden');
    resultSection.classList.add('hidden');
    
    // Restart typing animation
    const titleElement = document.getElementById('hero-title');
    const originalText = "AI가 당신의 본성을 폭로합니다."; // Hardcode for restart
    titleElement.classList.remove('animation-done');
    titleElement.innerText = '';
    let i = 0;
    function typeWriterRestart() {
      if (i < originalText.length) {
        titleElement.innerHTML += originalText.charAt(i);
        i++;
        setTimeout(typeWriterRestart, 100); // Adjust typing speed here
      } else {
        titleElement.classList.add('animation-done');
      }
    }
    setTimeout(typeWriterRestart, 500);
  }

  // --- Event Listeners ---
  startQuizBtn.addEventListener('click', (e) => {
    e.preventDefault();
    currentQuestionIndex = 0;
    userChoices = [];
    showSection(quizSection);
    loadQuestion();
  });

  optionABtn.addEventListener('click', () => handleAnswer('A'));
  optionBBtn.addEventListener('click', () => handleAnswer('B'));
  restartQuizBtn.addEventListener('click', restartQuiz);

  // --- Initial Setup (Typewriter Effect) ---
  const titleElement = document.getElementById('hero-title');
  const originalHeroText = titleElement.innerText;
  let heroTextIndex = 0;
  
  titleElement.innerText = '';

  function typeWriterInitial() {
    if (heroTextIndex < originalHeroText.length) {
      titleElement.innerHTML += originalHeroText.charAt(heroTextIndex);
      heroTextIndex++;
      setTimeout(typeWriterInitial, 100); // Adjust typing speed here
    } else {
      titleElement.classList.add('animation-done');
    }
  }

  // Start the initial typing animation after a short delay
  setTimeout(typeWriterInitial, 500);
});