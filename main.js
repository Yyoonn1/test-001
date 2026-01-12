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
  const shareResultBtn = document.querySelector('.share-options .share-btn:nth-child(1)');
  const restartQuizBtn = document.getElementById('restart-quiz-btn');
  const typeModal = document.getElementById('type-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalTypeName = document.getElementById('modal-type-name');
  const modalTypeDescription = document.getElementById('modal-type-description');
  const modalCompatibilityChart = document.getElementById('modal-compatibility-chart');
  const typeCards = document.querySelectorAll('.type-card');

  // --- Game State ---
  let currentQuestionIndex = 0;
  let userChoices = [];
  const TOTAL_QUESTIONS = 10;

  // --- Data: Core Types (Expanded to 12) ---
  const coreTypes = {
    "RF": { name: "정의로운 바보", description: "옳고 그름에 대한 확고한 신념으로, 때로는 손해를 감수하는 순수한 영혼. 주변의 존경을 받지만 가끔 답답하게 보일 수 있습니다.", rarity: "10%" },
    "IG": { name: "우유부단한 유령", description: "갈등을 피하려다 결정을 미루는 평화주의자. 모두에게 좋은 사람이 되려 하지만, 때론 존재감이 희미해집니다.", rarity: "15%" },
    "SS": { name: "극단적 생존주의자", description: "어떤 상황에서도 자신의 이익을 최우선으로 하는 냉정한 현실주의자. 강한 생존 본능의 소유자입니다.", rarity: "10%" },
    "CV": { name: "매력적인 악당", description: "타고난 카리스마로 사람들을 현혹하는 인물. 목표를 위해 수단을 가리지 않지만, 그 과정마저 매력적으로 포장합니다.", rarity: "5%" },
    "LG": { name: "고독한 천재", description: "남들이 보지 못하는 것을 보는 비범한 재능의 소유자. 타인과의 공감대가 부족해 종종 외로움을 느낍니다.", rarity: "5%" },
    "PA": { name: "열정적인 선동가", description: "불의를 참지 못하고, 강력한 신념으로 사람들을 움직이는 힘을 가졌습니다. 하지만 과도한 확신이 때로 독이 됩니다.", rarity: "5%" },
    "AIGH": { name: "AI 생성형 인간", description: "최신 유행을 누구보다 빠르게 흡수하고 완벽하게 따라 합니다. 당신의 취향은 곧 알고리즘 그 자체입니다.", rarity: "12%" },
    "HEP": { name: "극효율 플래너", description: "인생의 모든 것을 최적화하려는 효율성의 화신. 여행 계획부터 인간관계까지, 낭비란 없습니다.", rarity: "8%" },
    "EHR": { name: "감정적 갬블러", description: "인생은 한 방! 짜릿한 감정의 롤러코스터를 즐기며, 때로는 위험한 드라마의 주인공이 되기를 자처합니다.", rarity: "10%" },
    "SO": { name: "침묵의 관찰자", description: "모든 것을 알고 있지만, 결코 전면에 나서지 않는 그림자. 당신은 말없이 상황의 핵심을 꿰뚫어 봅니다.", rarity: "8%" },
    "IFF": { name: "순진한 얼굴의 여우", description: "순수하고 무해해 보이는 외모 뒤에 날카로운 계산과 치밀한 계획을 숨기고 있는 반전의 소유자입니다.", rarity: "7%" },
    "MA": { name: "밈 발굴단", description: "아무도 모르는 고대 밈이나 컬트 영상을 발굴하며 희열을 느낍니다. 당신의 유머는 시대를 너무 앞서갔거나, 혹은 너무 뒤쳐졌습니다.", rarity: "5%" }
  };

  // --- Data: Questions (Hyper-updated for 2024/2025) ---
  const questions = [
    { q: "친구가 갑자기 유행 지난 '~공주' 말투를 쓴다면?", a: "나도 바로 '~~왕자'로 받아쳐준다 (티키타카)", b: "정색하며 '그게 언젯적 거냐'고 묻는다 (유행 분석)" },
    { q: "내 모든 일상이 '스토리'에 박제되기 vs 내 모든 '흑역사'가 '알고리즘 추천'에 뜨기", a: "스토리 박제 (사생활보단 현재의 관심이 중요)", b: "알고리즘 추천 (지나간 흑역사는 웃어넘길 수 있음)" },
    { q: "평생 'AI 프로필 사진'만 프사로 쓰기 vs 평생 'AI 커버댄스 챌린지'만 하기", a: "AI 프사 쓰기 (보여지는 모습이 완벽하다면 OK)", b: "AI 커버댄스 하기 (과정에 참여하는 게 더 재밌음)" },
    { q: "약과 할매니얼 디저트 평생 먹기 vs 탕후루 평생 먹기", a: "약과 (전통의 맛, 힙스터 감성)", b: "탕후루 (트렌드의 정점, 짜릿한 단맛)" },
    { q: "팀플에서 조용한 빌런 되기 vs 시끄러운 트롤 되기", a: "조용한 빌런 (아무도 모르게 내 몫만 챙김)", b: "시끄러운 트롤 (의견은 내지만 결과는 책임 안 짐)" },
    { q: "내 통장 잔고 실시간으로 전국민에게 공개 vs 내 스마트폰 검색 기록 실시간으로 전국민에게 공개", a: "통장 잔고 공개 (차라리 당당하게 가난을 증명)", b: "검색 기록 공개 (내 취향과 생각은 숨길 수 없음)" },
    { q: "10년 전 유행했던 싸이월드 감성으로 SNS 다시 하기 vs 10년 뒤 유행할 메타버스 SNS 미리 하기", a: "싸이월드 감성 (이미 아는 맛, 편안함)", b: "메타버스 SNS (새로운 것, 앞서나가는 느낌)" },
    { q: "내 최애 유튜버가 갑자기 '사과영상' 올림 vs 내 최애 유튜버가 갑자기 '뒷광고' 논란 터짐", a: "사과영상 (잘못은 인정하는 게 먼저)", b: "뒷광고 논란 (들키지만 않았다면 괜찮았을지도...)" },
    { q: "모르는 사람이랑 '엘리베이터' 3시간 같이 타기 vs 모르는 사람이랑 '디코' 3시간 하기", a: "엘리베이터 (어색한 침묵이 차라리 편함)", b: "디코 (온라인에선 내가 인싸가 될 수 있음)" },
    { q: "내 인생이 평점 1점짜리 '네이버 웹툰'으로 연재 vs 내 인생이 조회수 1짜리 '유튜브 브이로그'로 연재", a: "웹툰 연재 (욕이라도 먹는 게 무관심보단 나음)", b: "브이로그 연재 (나만의 기록, 소소한 삶의 가치)" }
  ];

  // Point system for calculation
  const typeScores = { "RF": 0, "IG": 0, "SS": 0, "CV": 0, "LG": 0, "PA": 0, "AIGH": 0, "HEP": 0, "EHR": 0, "SO": 0, "IFF": 0, "MA": 0 };
  const answerMapping = [
    { a: ["PA", "AIGH"], b: ["SO", "HEP"] }, // Q1
    { a: ["EHR", "PA"], b: ["SS", "SO"] },   // Q2
    { a: ["IFF", "CV"], b: ["AIGH", "PA"] }, // Q3
    { a: ["AIGH", "EHR"], b: ["MA", "LG"] }, // Q4
    { a: ["SS", "IFF"], b: ["CV", "PA"] },   // Q5
    { a: ["EHR", "CV"], b: ["IG", "SS"] },   // Q6
    { a: ["MA", "LG"], b: ["HEP", "AIGH"] }, // Q7
    { a: ["RF", "IG"], b: ["SS", "CV"] },   // Q8
    { a: ["SO", "LG"], b: ["AIGH", "PA"] }, // Q9
    { a: ["EHR", "CV"], b: ["RF", "SO"] }    // Q10
  ];

  // --- Functions ---

  function startQuiz() {
    Object.keys(typeScores).forEach(key => typeScores[key] = 0);
    currentQuestionIndex = 0;
    userChoices = [];
    showSection(quizSection);
    loadQuestion();
  }
  
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
    const mappings = answerMapping[currentQuestionIndex];
    if (choice === 'A') {
      mappings.a.forEach(type => typeScores[type]++);
    } else { // 'B'
      mappings.b.forEach(type => typeScores[type]++);
    }
    currentQuestionIndex++;
    loadQuestion();
  }

  function calculateCoreType() {
    let maxScore = -1;
    let finalTypeCode = '';
    for(const type in typeScores) {
        if(typeScores[type] > maxScore) {
            maxScore = typeScores[type];
            finalTypeCode = type;
        }
    }
    // Simple tie-breaking: pick the first one found
    const finalType = coreTypes[finalTypeCode];
    displayResult(finalType);
  }

  function displayResult(type) {
    resultTypeEl.textContent = type.name;
    resultDescriptionEl.textContent = type.description;
    resultRarityEl.textContent = type.rarity;
    
    // For now, just show a generic compatibility message.
    resultCompatibilityEl.textContent = "친구와 궁합보기 기능 (프리미엄)";
    
    showSection(resultSection);
  }

  function restartQuiz() {
    // Hide all dynamic sections and show hero
    quizSection.classList.add('hidden');
    resultSection.classList.add('hidden');
    heroSection.classList.remove('hidden');
    
    // No need for typewriter restart, as the page is not reloaded.
    // User can just click start again.
  }

  // --- Modal Functions ---
  function openTypeModal(typeName) {
      const typeCode = Object.keys(coreTypes).find(key => coreTypes[key].name === typeName);
      if(!typeCode) return;
      
      const type = coreTypes[typeCode];
      modalTypeName.textContent = type.name;
      modalTypeDescription.textContent = type.description;
      modalCompatibilityChart.innerHTML = `<h4>희귀도: ${type.rarity}</h4>`;
      typeModal.classList.remove('hidden');
  }

  function closeTypeModal() {
    typeModal.classList.add('hidden');
  }

  // --- Share Function ---
  async function shareResult() {
      const typeName = resultTypeEl.textContent;
      const shareText = `내 코어 타입은 '${typeName}'이야! 🤯 너의 타입은 뭐야? 여기서 확인해봐! ${window.location.href}`;
      
      try {
          if (navigator.share) {
              await navigator.share({ title: '밸런스 게임 AI - 나의 코어 타입은?', text: shareText });
          } else {
              await navigator.clipboard.writeText(shareText);
              alert('결과가 클립보드에 복사되었습니다!');
          }
      } catch (err) {
          console.error('Share failed:', err);
          alert('공유에 실패했습니다.');
      }
  }

  // --- Event Listeners ---
  startQuizBtn.addEventListener('click', (e) => { e.preventDefault(); startQuiz(); });
  optionABtn.addEventListener('click', () => handleAnswer('A'));
  optionBBtn.addEventListener('click', () => handleAnswer('B'));
  restartQuizBtn.addEventListener('click', restartQuiz);
  shareResultBtn.addEventListener('click', shareResult);
  modalCloseBtn.addEventListener('click', closeTypeModal);
  typeModal.addEventListener('click', (e) => { if (e.target === typeModal) closeTypeModal(); });
  typeCards.forEach(card => {
    card.addEventListener('click', () => {
      openTypeModal(card.textContent.trim());
    });
  });

  // Remove typewriter effect as per new design
  const titleElement = document.getElementById('hero-title');
  titleElement.classList.add('animation-done');

});