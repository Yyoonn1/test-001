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
  const shareResultBtn = document.querySelector('.share-options .share-btn:nth-child(1)'); // First share button
  const compareFriendBtn = document.querySelector('.share-options .share-btn:nth-child(2)'); // Second share button
  const restartQuizBtn = document.getElementById('restart-quiz-btn');

  // Modal Elements
  const typeModal = document.getElementById('type-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalTypeName = document.getElementById('modal-type-name');
  const modalTypeDescription = document.getElementById('modal-type-description');
  const modalCompatibilityChart = document.getElementById('modal-compatibility-chart');
  const typeCards = document.querySelectorAll('.type-card');

  // --- Game State ---
  let currentQuestionIndex = 0;
  let userChoices = []; // 'A' or 'B'
  const TOTAL_QUESTIONS = 7;

  // --- Data: Questions (Updated for Korean Teenagers) ---
  const questions = [
    {
      q: "친구들과 놀러 갔는데, 갑자기 '인생네컷' 찍자고 한다면?",
      a: "귀찮아도 다 같이 찍는다 (친구들과의 추억이 중요)",
      b: "어색해서 못 찍겠다 (난 그런 거 못 해...)"
    },
    {
      q: "내 최애 아이돌이 사실은 '깻잎 논쟁' 옹호자다 vs. 내 최애 아이돌이 '민트초코' 평생 금지시켰다",
      a: "깻잎 논쟁 옹호 (취향은 존중해야지)",
      b: "민트초코 금지 (용서 못 할 죄악이다)"
    },
    {
      q: "'탕후루' 10개 먹고 배 터지기 vs. '마라탕' 1단계로 10번 먹기",
      a: "탕후루 10개 (달콤함은 포기 못 해)",
      b: "마라탕 1단계 10번 (맵찔이지만 마라는 사랑)"
    },
    {
      q: "친구가 갑자기 '어쩔티비'라고 시비를 건다면?",
      a: "나도 '저쩔티비'로 받아친다 (기싸움은 지지 않아)",
      b: "무시하고 갈 길 간다 (상대할 가치도 없음)"
    },
    {
      q: "무인도에 단 하나만 가져갈 수 있다면?",
      a: "무한 배터리 스마트폰 (심심하면 안 돼!)",
      b: "만능 맥가이버 칼 (생존이 우선이다)"
    },
    {
      q: "평생 '급식체'만 써야 한다면? (예: 반모방 어케 들어가냐)",
      a: "쌉가능 (유행에 뒤쳐질 수 없지)",
      b: "절대 불가 (내 언어를 지키겠어)"
    },
    {
      q: "내 연애사가 '네이버 웹툰'에 연재된다면? (선택 불가)",
      a: "개꿀잼 스토리로 웹툰 작가와 협의 (어차피 공개될 거라면 주인공은 나야나!)",
      b: "제발 평범하게 살게 해줘 (내 사생활은 소중해...)"
    }
  ];

  // --- Data: Core Types (Adjusted for mapping) ---
  const coreTypes = [
    {
      id: "righteous_fool",
      name: "정의로운 바보",
      description: "당신은 옳고 그름에 대한 확고한 신념을 가지고 있으며, 때로는 그 신념 때문에 손해를 감수하기도 합니다. 주변 사람들은 당신의 순수함과 정의감을 존경하지만, 가끔은 답답해하기도 합니다.",
      rarity: "20%",
      compatibility: { "정의로운 바보": "70%", "매력적인 악당": "30%", "극단적 생존주의자": "50%", "우유부단한 유령": "80%", "고독한 천재": "60%", "열정적인 선동가": "90%" }
    },
    {
      id: "indecisive_ghost",
      name: "우유부단한 유령",
      description: "당신은 어떤 것도 확실하게 결정하지 못하고 주변의 눈치를 살피는 경향이 있습니다. 갈등을 피하고 싶어 하지만, 결국 아무것도 결정하지 못해 모두를 답답하게 만들 때가 많습니다. 존재감이 희미해지기도 합니다.",
      rarity: "30%",
      compatibility: { "정의로운 바보": "80%", "매력적인 악당": "40%", "극단적 생존주의자": "60%", "우유부단한 유령": "70%", "고독한 천재": "50%", "열정적인 선동가": "70%" }
    },
    {
      id: "selfish_survivor",
      name: "극단적 생존주의자",
      description: "당신은 어떤 상황에서든 자신의 이익과 생존을 최우선으로 생각합니다. 냉정하고 현실적이며, 필요하다면 타인을 이용하는 것도 주저하지 않습니다. 겉으로는 차가워 보이지만, 누구보다도 강한 생존 본능을 가지고 있습니다.",
      rarity: "25%",
      compatibility: { "정의로운 바보": "50%", "매력적인 악당": "80%", "극단적 생존주의자": "60%", "우유부단한 유령": "60%", "고독한 천재": "70%", "열정적인 선동가": "40%" }
    },
    {
      id: "charismatic_villain",
      name: "매력적인 악당",
      description: "당신은 타고난 카리스마와 뛰어난 언변으로 사람들을 현혹합니다. 자신의 목표를 위해서라면 수단과 방법을 가리지 않지만, 그 과정마저도 매력적으로 보이게 만드는 재주가 있습니다. 많은 사람이 당신을 따르지만, 그만큼 위험하기도 합니다.",
      rarity: "15%",
      compatibility: { "정의로운 바보": "30%", "매력적인 악당": "90%", "극단적 생존주의자": "80%", "우유부단한 유령": "40%", "고독한 천재": "70%", "열정적인 선동가": "60%" }
    },
    {
      id: "lonely_genius",
      name: "고독한 천재",
      description: "당신은 남들이 보지 못하는 것을 보고, 남들이 생각지 못한 것을 생각해내는 비범한 능력을 가지고 있습니다. 하지만 그만큼 타인과의 공감대가 부족하고, 종종 외로움을 느끼기도 합니다. 당신의 천재성은 때로 빛이 나지만, 때로는 그림자처럼 당신을 덮칩니다.",
      rarity: "8%",
      compatibility: { "정의로운 바보": "60%", "매력적인 악당": "70%", "극단적 생존주의자": "70%", "우유부단한 유령": "50%", "고독한 천재": "80%", "열정적인 선동가": "50%" }
    },
    {
      id: "passionate_agitator",
      name: "열정적인 선동가",
      description: "당신은 불의를 참지 못하며, 자신의 신념을 강력하게 주장하고 타인을 설득하는 데 능숙합니다. 당신의 열정은 사람들을 움직이는 힘이 있지만, 때로는 과도한 확신이 독이 되기도 합니다. 당신은 세상을 바꾸고 싶어 하지만, 그 방식이 모두에게 통용되지는 않습니다.",
      rarity: "7%",
      compatibility: { "정의로운 바보": "90%", "매력적인 악당": "60%", "극단적 생존주의자": "40%", "우유부단한 유령": "70%", "고독한 천재": "50%", "열정적인 선동가": "80%" }
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
    let bCount = userChoices.filter(choice => choice === 'B').length; // Not directly used in this simple mapping but good to have

    // Simplified mapping logic based on 'A' choices
    let finalType;
    if (aCount >= 6) {
      finalType = coreTypes.find(type => type.id === "charismatic_villain");
    } else if (aCount >= 4) {
      finalType = coreTypes.find(type => type.id === "selfish_survivor");
    } else if (aCount >= 2) {
      finalType = coreTypes.find(type => type.id === "indecisive_ghost");
    } else { // 0-1 A's
      finalType = coreTypes.find(type => type.id === "righteous_fool");
    }

    // Add some randomness for lonely_genius or passionate_agitator if no strong match
    if (!finalType || Math.random() < 0.2) { // 20% chance to assign rare types
        const rareTypes = coreTypes.filter(type => type.id === "lonely_genius" || type.id === "passionate_agitator");
        finalType = rareTypes[Math.floor(Math.random() * rareTypes.length)];
    }
    
    // Ensure a type is always assigned
    if (!finalType) finalType = coreTypes[Math.floor(Math.random() * coreTypes.length)];

    displayResult(finalType);
  }

  function displayResult(type) {
    resultTypeEl.textContent = type.name;
    resultDescriptionEl.textContent = type.description;
    resultRarityEl.textContent = type.rarity;

    // Display compatibility with a random other type for now, or a specific "rival"
    const otherTypes = coreTypes.filter(t => t.name !== type.name);
    const randomOtherType = otherTypes[Math.floor(Math.random() * otherTypes.length)];
    const compatibilityScore = type.compatibility[randomOtherType.name];
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
    const originalHeroText = "AI가 당신의 본성을 폭로합니다.";
    titleElement.classList.remove('animation-done');
    titleElement.innerText = '';
    let heroTextIndexRestart = 0;
    function typeWriterRestart() {
      if (heroTextIndexRestart < originalHeroText.length) {
        titleElement.innerHTML += originalHeroText.charAt(heroTextIndexRestart);
        heroTextIndexRestart++;
        setTimeout(typeWriterRestart, 100);
      } else {
        titleElement.classList.add('animation-done');
      }
    }
    setTimeout(typeWriterRestart, 500);
  }

  // --- Modal Functions ---
  function openTypeModal(typeId) {
    const type = coreTypes.find(t => t.id === typeId);
    if (!type) return;

    modalTypeName.textContent = type.name;
    modalTypeDescription.textContent = type.description;
    
    modalCompatibilityChart.innerHTML = '<h4>다른 타입과의 궁합</h4>';
    for (const otherTypeName in type.compatibility) {
      const compatItem = document.createElement('div');
      compatItem.classList.add('compat-item');
      compatItem.textContent = `${otherTypeName}: ${type.compatibility[otherTypeName]}`;
      modalCompatibilityChart.appendChild(compatItem);
    }

    typeModal.classList.remove('hidden');
  }

  function closeTypeModal() {
    typeModal.classList.add('hidden');
  }

  // --- Share Function ---
  async function shareResult(type) {
      const shareText = `내 코어 타입은 '${type.name}'이야! 🤯 "${type.description}"\n너의 타입은 뭐야? 여기서 확인해봐! ${window.location.href}`;
      const shareData = {
          title: '밸런스 게임 AI - 나의 코어 타입은?',
          text: shareText,
          url: window.location.href,
      };

      try {
          if (navigator.share) {
              await navigator.share(shareData);
              console.log('Share successful');
          } else {
              await navigator.clipboard.writeText(shareText);
              alert('결과가 클립보드에 복사되었습니다!');
              console.log('Copied to clipboard');
          }
      } catch (err) {
          console.error('Share failed:', err);
      }
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
  
  shareResultBtn.addEventListener('click', () => shareResult(coreTypes.find(t => t.name === resultTypeEl.textContent)));
  // The 'compare friend' button can be hooked up to another function for premium/future use

  modalCloseBtn.addEventListener('click', closeTypeModal);
  typeModal.addEventListener('click', (e) => {
    if (e.target === typeModal) { // Close when clicking outside content
      closeTypeModal();
    }
  });

  typeCards.forEach(card => {
    card.addEventListener('click', () => {
      // Get the type name from the card's text content
      const typeName = card.textContent.trim();
      // Find the corresponding type ID
      const type = coreTypes.find(t => t.name === typeName);
      if (type) {
        openTypeModal(type.id);
      }
    });
  });


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
