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
  const resultBestCompatEl = document.getElementById('result-best-compat');
  const resultWorstCompatEl = document.getElementById('result-worst-compat');
  const allCompatibilityChart = document.getElementById('all-compatibility-chart');
  const shareResultBtn = document.getElementById('share-result-btn');
  const openFriendCompatBtn = document.getElementById('open-friend-compat-btn');
  const restartQuizBtn = document.getElementById('restart-quiz-btn');

  // Modal Elements
  const typeModal = document.getElementById('type-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalTypeName = document.getElementById('modal-type-name');
  const modalTypeDescription = document.getElementById('modal-type-description');
  const modalCompatibilityChart = document.getElementById('modal-compatibility-chart');
  const typeCards = document.querySelectorAll('.type-card');

  // Friend Compat Modal Elements
  const friendCompatModal = document.getElementById('friend-compat-modal');
  const friendModalCloseBtn = document.getElementById('friend-modal-close-btn');
  const myTypeNameEl = document.getElementById('my-type-name');
  const friendTypeSelect = document.getElementById('friend-type-select');
  const calculateFriendCompatBtn = document.getElementById('calculate-friend-compat-btn');
  const friendCompatResultTitle = document.getElementById('friend-compat-result-title');
  const friendCompatResultDesc = document.getElementById('friend-compat-result-desc');


  // --- Game State ---
  let currentQuestionIndex = 0;
  let userChoices = []; // 'A' or 'B'
  let currentUserType = null; // Store the calculated type for friend compat
  const TOTAL_QUESTIONS = 10;

  // --- Data: Core Types (Expanded to 12 with detailed compatibility) ---
  const coreTypes = {
    "RF": {
      name: "정의로운 바보",
      description: "옳고 그름에 대한 확고한 신념으로, 때로는 손해를 감수하는 순수한 영혼. 주변의 존경을 받지만 가끔 답답하게 보일 수 있습니다.", rarity: "10%",
      compatibility: {
        "정의로운 바보": { score: "70%", desc: "서로의 신념을 존중하며 좋은 친구가 될 수 있습니다." },
        "우유부단한 유령": { score: "85%", desc: "당신의 확고함이 유령의 길잡이가 되어줍니다." },
        "극단적 생존주의자": { score: "40%", desc: "당신의 정의가 생존주의자에게는 걸림돌로 느껴질 수 있습니다." },
        "매력적인 악당": { score: "20%", desc: "서로의 가치관이 너무 달라 부딪힐 확률이 높습니다." },
        "고독한 천재": { score: "65%", desc: "천재의 독특한 시각을 존중하지만, 이해하기 어려울 때가 있습니다." },
        "열정적인 선동가": { score: "95%", desc: "둘이 합치면 세상도 바꿀 수 있는 최고의 조합입니다!" },
        "AI 생성형 인간": { score: "55%", desc: "너무 예측 가능하여 재미가 반감될 수 있습니다." },
        "극효율 플래너": { score: "60%", desc: "당신의 비효율적인 면을 플래너는 이해하기 힘들어합니다." },
        "감정적 갬블러": { score: "35%", desc: "갬블러의 감정 기복이 당신을 피곤하게 할 수 있습니다." },
        "침묵의 관찰자": { score: "75%", desc: "말없이 당신을 지지해주는 든든한 조력자가 될 수 있습니다." },
        "순진한 얼굴의 여우": { score: "45%", desc: "여우의 계산적인 행동이 당신의 심기를 건드릴 수 있습니다." },
        "밈 발굴단": { score: "70%", desc: "발굴단의 독특한 유머를 당신은 때때로 진지하게 받아들입니다." }
      }
    },
    "IG": {
      name: "우유부단한 유령",
      description: "갈등을 피하려다 결정을 미루는 평화주의자. 모두에게 좋은 사람이 되려 하지만, 때론 존재감이 희미해집니다.", rarity: "15%",
      compatibility: {
        "정의로운 바보": { score: "80%", desc: "당신의 우유부단함을 바보의 확고함이 보완해줍니다." },
        "우유부단한 유령": { score: "60%", desc: "서로 결정을 미루다 아무것도 못 할 수 있습니다." },
        "극단적 생존주의자": { score: "50%", desc: "생존주의자의 냉정함이 당신을 불편하게 할 수 있습니다." },
        "매력적인 악당": { score: "30%", desc: "악당의 강한 리더십에 끌리지만, 이용당하기 쉽습니다." },
        "고독한 천재": { score: "70%", desc: "천재의 통찰력에 감탄하며 따를 수 있습니다." },
        "열정적인 선동가": { score: "65%", desc: "선동가의 강한 에너지에 압도될 수 있습니다." },
        "AI 생성형 인간": { score: "75%", desc: "생성형 인간의 완벽함이 당신에게 안정감을 줍니다." },
        "극효율 플래너": { score: "80%", desc: "플래너의 계획성이 당신의 혼란을 정리해줍니다." },
        "감정적 갬블러": { score: "45%", desc: "갬블러의 예측 불가능함에 당황할 수 있습니다." },
        "침묵의 관찰자": { score: "90%", desc: "조용히 당신을 지지하며 가장 편안한 관계를 형성합니다." },
        "순진한 얼굴의 여우": { score: "55%", desc: "여우의 의중을 파악하기 어려워 힘들어할 수 있습니다." },
        "밈 발굴단": { score: "70%", desc: "발굴단의 엉뚱함에 가끔 웃지만, 이해는 어렵습니다." }
      }
    },
    "SS": {
      name: "극단적 생존주의자",
      description: "어떤 상황에서도 자신의 이익을 최우선으로 하는 냉정한 현실주의자. 강한 생존 본능의 소유자입니다.", rarity: "10%",
      compatibility: {
        "정의로운 바보": { score: "40%", desc: "바보의 이상론에 답답함을 느끼고, 쉽게 지칠 수 있습니다." },
        "우유부단한 유령": { score: "50%", desc: "유령의 불확실함이 당신에게는 비효율적으로 느껴집니다." },
        "극단적 생존주의자": { score: "75%", desc: "서로의 현실적인 판단을 존중하며 동반자가 될 수 있습니다." },
        "매력적인 악당": { score: "85%", desc: "악당과 최고의 시너지를 발휘하여 원하는 것을 얻을 수 있습니다." },
        "고독한 천재": { score: "70%", desc: "천재의 통찰력을 이용하여 생존 전략을 강화할 수 있습니다." },
        "열정적인 선동가": { score: "30%", desc: "선동가의 감정적인 호소에 공감하지 못합니다." },
        "AI 생성형 인간": { score: "80%", desc: "생성형 인간의 데이터 분석 능력을 당신은 높이 평가합니다." },
        "극효율 플래너": { score: "90%", desc: "최고의 전략적 파트너입니다. 둘이 합치면 못 할 게 없습니다." },
        "감정적 갬블러": { score: "60%", desc: "갬블러의 대담함을 가끔 이용할 수 있습니다." },
        "침묵의 관찰자": { score: "70%", desc: "관찰자의 냉철한 분석은 당신의 생존에 큰 도움이 됩니다." },
        "순진한 얼굴의 여우": { score: "80%", desc: "여우의 계산적인 면모를 간파하고 함께 계획을 세울 수 있습니다." },
        "밈 발굴단": { score: "20%", desc: "발굴단의 엉뚱함은 당신에게 시간 낭비로 느껴집니다." }
      }
    },
    "CV": {
      name: "매력적인 악당",
      description: "타고난 카리스마로 사람들을 현혹하는 인물. 목표를 위해 수단을 가리지 않지만, 그 과정마저 매력적으로 포장합니다.", rarity: "5%",
      compatibility: {
        "정의로운 바보": { score: "20%", desc: "당신의 행동을 바보는 절대 이해하지 못하고 비난할 것입니다." },
        "우유부단한 유령": { score: "30%", desc: "유령을 쉽게 조종할 수 있지만, 흥미를 잃을 수 있습니다." },
        "극단적 생존주의자": { score: "85%", desc: "생존주의자와의 협력은 당신의 목표 달성에 큰 도움이 됩니다." },
        "매력적인 악당": { score: "90%", desc: "서로의 매력을 이해하지만, 결국 권력을 놓고 다툴 수 있습니다." },
        "고독한 천재": { score: "75%", desc: "천재의 지식을 이용하여 당신의 계획을 완성할 수 있습니다." },
        "열정적인 선동가": { score: "60%", desc: "선동가의 에너지를 당신의 목적에 활용할 수 있습니다." },
        "AI 생성형 인간": { score: "70%", desc: "생성형 인간의 완벽한 외형과 당신의 매력이 시너지를 냅니다." },
        "극효율 플래너": { score: "80%", desc: "플래너의 치밀함이 당신의 대담한 계획에 날개를 달아줍니다." },
        "감정적 갬블러": { score: "50%", desc: "갬블러의 무모함이 당신의 계획을 망칠 수도 있습니다." },
        "침묵의 관찰자": { score: "65%", desc: "관찰자의 냉철한 분석은 당신의 매력을 한층 더 돋보이게 합니다." },
        "순진한 얼굴의 여우": { score: "80%", desc: "여우의 교활함이 당신의 매력적인 속임수에 완벽히 녹아듭니다." },
        "밈 발굴단": { score: "40%", desc: "발굴단의 엉뚱함이 당신의 진지한 매력을 깎아내릴 수 있습니다." }
      }
    },
    "LG": {
      name: "고독한 천재",
      description: "남들이 보지 못하는 것을 보는 비범한 재능의 소유자. 타인과의 공감대가 부족해 종종 외로움을 느낍니다.", rarity: "5%",
      compatibility: {
        "정의로운 바보": { score: "65%", desc: "바보의 순수함이 당신의 외로움을 잠시나마 잊게 해줍니다." },
        "우유부단한 유령": { score: "70%", desc: "유령은 당신의 통찰력에 의지하며 조용한 지지자가 됩니다." },
        "극단적 생존주의자": { score: "70%", desc: "생존주의자는 당신의 지식을 현실에서 활용하는 방법을 알고 있습니다." },
        "매력적인 악당": { score: "75%", desc: "악당의 대담한 계획에 당신의 지식이 힘을 실어줄 수 있습니다." },
        "고독한 천재": { score: "80%", desc: "서로의 세계를 이해하며 깊은 교감을 나눌 수 있습니다." },
        "열정적인 선동가": { score: "50%", desc: "선동가의 감정적인 면이 당신에게는 비효율적으로 느껴집니다." },
        "AI 생성형 인간": { score: "85%", desc: "생성형 인간의 데이터 분석 능력은 당신의 지식을 더욱 확장시켜줍니다." },
        "극효율 플래너": { score: "90%", desc: "플래너는 당신의 아이디어를 현실로 만드는 최고의 파트너입니다." },
        "감정적 갬블러": { score: "40%", desc: "갬블러의 충동적인 행동이 당신의 논리적인 사고를 방해합니다." },
        "침묵의 관찰자": { score: "95%", desc: "가장 완벽한 관계. 서로의 존재를 묵묵히 이해하고 존중합니다." },
        "순진한 얼굴의 여우": { score: "60%", desc: "여우의 계산적인 면모를 당신은 정확히 파악할 수 있습니다." },
        "밈 발굴단": { score: "60%", desc: "발굴단의 독특한 시각은 당신에게 새로운 영감을 줄 수 있습니다." }
      }
    },
    "PA": {
      name: "열정적인 선동가",
      description: "불의를 참지 못하고, 강력한 신념으로 사람들을 움직이는 힘을 가졌습니다. 하지만 과도한 확신이 때로 독이 됩니다.", rarity: "5%",
      compatibility: {
        "정의로운 바보": { score: "95%", desc: "정의를 향한 당신의 열정에 바보가 기꺼이 동참합니다. 최고의 조합!" },
        "우유부단한 유령": { score: "65%", desc: "유령의 소극적인 태도에 답답함을 느끼지만, 결국 당신을 따릅니다." },
        "극단적 생존주의자": { score: "30%", desc: "생존주의자의 냉정함은 당신의 열정을 식게 만들 수 있습니다." },
        "매력적인 악당": { score: "60%", desc: "악당의 매력을 경계하지만, 때로는 그의 힘을 빌릴 수 있습니다." },
        "고독한 천재": { score: "50%", desc: "천재의 통찰력을 이해하지만, 감정적인 교류는 어렵습니다." },
        "열정적인 선동가": { score: "80%", desc: "서로의 에너지를 폭발시키지만, 때론 충돌할 수 있습니다." },
        "AI 생성형 인간": { score: "55%", desc: "생성형 인간의 무감각함이 당신의 열정을 이해하지 못할 수 있습니다." },
        "극효율 플래너": { score: "45%", desc: "플래너의 냉철한 분석이 당신의 열정에 찬물을 끼얹을 수 있습니다." },
        "감정적 갬블러": { score: "70%", desc: "갬블러의 대담함이 당신의 선동에 불을 지필 수 있습니다." },
        "침묵의 관찰자": { score: "70%", desc: "관찰자는 당신의 뒤에서 묵묵히 당신의 행동을 지켜보고 기록합니다." },
        "순진한 얼굴의 여우": { score: "40%", desc: "여우의 계산적인 면모는 당신의 순수한 열정을 훼손할 수 있습니다." },
        "밈 발굴단": { score: "65%", desc: "발굴단의 엉뚱한 밈이 당신의 진지한 연설에 활력을 불어넣을 수 있습니다." }
      }
    },
    "AIGH": {
      name: "AI 생성형 인간",
      description: "최신 유행을 누구보다 빠르게 흡수하고 완벽하게 따라 합니다. 당신의 취향은 곧 알고리즘 그 자체입니다.", rarity: "12%",
      compatibility: {
        "정의로운 바보": { score: "55%", desc: "바보의 예측 불가능함에 흥미를 느끼지만, 이해하기 힘들어합니다." },
        "우유부단한 유령": { score: "75%", desc: "유령의 소극적인 모습조차도 데이터로 분석하여 이해하려 합니다." },
        "극단적 생존주의자": { score: "80%", desc: "생존주의자의 전략적 사고를 데이터로 분석하며 시너지를 냅니다." },
        "매력적인 악당": { score: "70%", desc: "악당의 매력을 분석하여 완벽한 외형으로 모방합니다." },
        "고독한 천재": { score: "85%", desc: "천재의 비범한 아이디어를 데이터로 변환하여 현실화합니다." },
        "열정적인 선동가": { score: "55%", desc: "선동가의 감정적인 에너지를 효율적인 방법으로 전환하려 합니다." },
        "AI 생성형 인간": { score: "90%", desc: "서로 완벽함을 추구하며 최고의 호환성을 자랑합니다." },
        "극효율 플래너": { score: "95%", desc: "최고의 파트너! 당신의 데이터를 플래너가 완벽한 계획으로 만듭니다." },
        "감정적 갬블러": { score: "45%", desc: "갬블러의 무모함은 당신의 알고리즘에 예측 불가능한 오류를 만듭니다." },
        "침묵의 관찰자": { score: "70%", desc: "관찰자의 모든 행동 패턴을 분석하여 완벽하게 이해하려 합니다." },
        "순진한 얼굴의 여우": { score: "60%", desc: "여우의 교활함조차도 당신은 데이터로 분석하여 활용할 수 있습니다." },
        "밈 발굴단": { score: "30%", desc: "발굴단의 너무 독특한 밈은 당신의 알고리즘을 붕괴시킬 수 있습니다." }
      }
    },
    "HEP": {
      name: "극효율 플래너",
      description: "인생의 모든 것을 최적화하려는 효율성의 화신. 여행 계획부터 인간관계까지, 낭비란 없습니다.", rarity: "8%",
      compatibility: {
        "정의로운 바보": { score: "60%", desc: "바보의 비효율적인 모습에 답답함을 느끼지만, 그의 순수함을 높이 평가합니다." },
        "우유부단한 유령": { score: "80%", desc: "유령의 혼란을 당신의 완벽한 계획으로 정리해줍니다." },
        "극단적 생존주의자": { score: "90%", desc: "최고의 전략적 파트너! 모든 계획을 현실로 만들 수 있습니다." },
        "매력적인 악당": { score: "80%", desc: "악당의 대담한 목표를 당신의 치밀한 계획으로 현실화합니다." },
        "고독한 천재": { score: "90%", desc: "천재의 기발한 아이디어를 당신이 현실적인 계획으로 만듭니다." },
        "열정적인 선동가": { score: "45%", desc: "선동가의 감정적인 에너지에 당신은 효율적인 방법을 제시합니다." },
        "AI 생성형 인간": { score: "95%", desc: "생성형 인간의 데이터 분석력과 당신의 계획성이 완벽한 시너지를 냅니다." },
        "극효율 플래너": { score: "85%", desc: "서로의 효율성을 존중하지만, 가끔 완벽주의로 인한 충돌이 있을 수 있습니다." },
        "감정적 갬블러": { score: "20%", desc: "갬블러의 예측 불가능한 행동은 당신의 계획을 송두리째 무너뜨립니다." },
        "침묵의 관찰자": { score: "75%", desc: "관찰자의 통찰력을 당신의 계획에 반영하여 완성도를 높일 수 있습니다." },
        "순진한 얼굴의 여우": { score: "70%", desc: "여우의 교활한 계획을 당신의 효율적인 방식으로 다듬을 수 있습니다." },
        "밈 발굴단": { score: "30%", desc: "발굴단의 밈 활동은 당신에게 비효율적인 시간 낭비로 느껴집니다." }
      }
    },
    "EHR": {
      name: "감정적 갬블러",
      description: "인생은 한 방! 짜릿한 감정의 롤러코스터를 즐기며, 때로는 위험한 드라마의 주인공이 되기를 자처합니다.", rarity: "10%",
      compatibility: {
        "정의로운 바보": { score: "35%", desc: "바보의 예측 가능한 행동은 갬블러에게 흥미를 주지 못합니다." },
        "우유부단한 유령": { score: "45%", desc: "유령의 망설임은 갬블러에게 답답함을 안겨줍니다." },
        "극단적 생존주의자": { score: "60%", desc: "생존주의자의 냉정함은 당신의 무모함을 때때로 제어해줍니다." },
        "매력적인 악당": { score: "50%", desc: "악당의 매력에 끌리지만, 그의 치밀한 계획은 당신을 지루하게 할 수 있습니다." },
        "고독한 천재": { score: "40%", desc: "천재의 논리적인 사고는 당신의 감정적인 판단에 방해가 될 수 있습니다." },
        "열정적인 선동가": { score: "70%", desc: "선동가의 뜨거운 열정이 당신의 갬블에 불을 지필 수 있습니다." },
        "AI 생성형 인간": { score: "45%", desc: "생성형 인간의 예측 불가능함이 당신의 도박 심리를 자극하지만, 실제 결과는 다를 수 있습니다." },
        "극효율 플래너": { score: "20%", desc: "플래너의 완벽한 계획은 갬블러의 즉흥성에 완벽히 부딪힙니다." },
        "감정적 갬블러": { score: "80%", desc: "서로의 즉흥적인 도전을 이해하지만, 통제 불능의 상황을 만들 수 있습니다." },
        "침묵의 관찰자": { score: "55%", desc: "관찰자의 조용한 분석이 당신의 충동적인 행동에 잠시 제동을 걸 수 있습니다." },
        "순진한 얼굴의 여우": { score: "70%", desc: "여우의 계산적인 유혹에 당신은 쉽게 넘어갈 수 있습니다." },
        "밈 발굴단": { score: "65%", desc: "발굴단의 엉뚱함이 당신의 도박에 새로운 영감을 줄 수 있습니다." }
      }
    },
    "SO": {
      name: "침묵의 관찰자",
      description: "모든 것을 알고 있지만, 결코 전면에 나서지 않는 그림자. 당신은 말없이 상황의 핵심을 꿰뚫어 봅니다.", rarity: "8%",
      compatibility: {
        "정의로운 바보": { score: "75%", desc: "바보의 순수한 열정을 당신은 말없이 응원하고 지켜봅니다." },
        "우유부단한 유령": { score: "90%", desc: "서로의 조용한 존재감을 존중하며 가장 편안한 관계를 형성합니다." },
        "극단적 생존주의자": { score: "70%", desc: "생존주의자의 행동을 분석하여 당신의 통찰력을 강화합니다." },
        "매력적인 악당": { score: "65%", desc: "악당의 매력을 분석하지만, 그에게 직접 개입하는 일은 드뭅니다." },
        "고독한 천재": { score: "95%", desc: "가장 완벽한 관계. 서로의 세계를 존중하며 깊은 교감을 나눌 수 있습니다." },
        "열정적인 선동가": { score: "70%", desc: "선동가의 에너지를 관찰하며 그들의 전략을 평가합니다." },
        "AI 생성형 인간": { score: "70%", desc: "생성형 인간의 모든 데이터를 분석하여 이해하려 합니다." },
        "극효율 플래너": { score: "75%", desc: "플래너의 계획성을 분석하여 더 나은 효율을 위한 조언을 줄 수 있습니다." },
        "감정적 갬블러": { score: "55%", desc: "갬블러의 예측 불가능한 행동을 분석하여 다음 수를 예측하려 합니다." },
        "침묵의 관찰자": { score: "80%", desc: "서로의 고독을 이해하며, 깊은 공감대를 형성합니다." },
        "순진한 얼굴의 여우": { score: "60%", desc: "여우의 숨겨진 의도를 당신은 날카롭게 관찰합니다." },
        "밈 발굴단": { score: "75%", desc: "발굴단의 엉뚱한 밈 세계를 당신은 조용히 관찰하며 흥미를 느낍니다." }
      }
    },
    "IFF": {
      name: "순진한 얼굴의 여우",
      description: "순수하고 무해해 보이는 외모 뒤에 날카로운 계산과 치밀한 계획을 숨기고 있는 반전의 소유자입니다.", rarity: "7%",
      compatibility: {
        "정의로운 바보": { score: "45%", desc: "바보의 순수함은 당신의 계산에 예상치 못한 변수로 작용할 수 있습니다." },
        "우유부단한 유령": { score: "55%", desc: "유령의 우유부단함은 당신의 계획을 방해할 수 있습니다." },
        "극단적 생존주의자": { score: "80%", desc: "생존주의자의 현실적인 판단과 당신의 교활함이 시너지를 냅니다." },
        "매력적인 악당": { score: "80%", desc: "악당의 매력적인 속임수에 당신의 교활함이 완벽히 녹아듭니다." },
        "고독한 천재": { score: "60%", desc: "천재의 통찰력을 당신의 계획에 활용할 수 있습니다." },
        "열정적인 선동가": { score: "40%", desc: "선동가의 순수한 열정은 당신의 계산적인 마음을 불편하게 할 수 있습니다." },
        "AI 생성형 인간": { score: "60%", desc: "생성형 인간의 데이터 분석 능력을 당신의 계획에 활용할 수 있습니다." },
        "극효율 플래너": { score: "70%", desc: "플래너의 치밀함이 당신의 교활한 계획을 완벽하게 실행하는 데 도움을 줍니다." },
        "감정적 갬블러": { score: "70%", desc: "갬블러의 무모한 도전을 당신은 계산적으로 이용할 수 있습니다." },
        "침묵의 관찰자": { score: "60%", desc: "관찰자의 날카로운 시선은 당신의 계획을 언제든 간파할 수 있습니다." },
        "순진한 얼굴의 여우": { score: "75%", desc: "서로의 계산적인 면모를 이해하지만, 결국 서로를 견제하게 됩니다." },
        "밈 발굴단": { score: "50%", desc: "발굴단의 예측 불가능한 밈 활동은 당신의 계획에 혼란을 줄 수 있습니다." }
      }
    },
    "MA": {
      name: "밈 발굴단",
      description: "아무도 모르는 고대 밈이나 컬트 영상을 발굴하며 희열을 느낍니다. 당신의 유머는 시대를 너무 앞서갔거나, 혹은 너무 뒤쳐졌습니다.", rarity: "5%",
      compatibility: {
        "정의로운 바보": { score: "70%", desc: "바보의 순수함은 당신의 독특한 유머를 때때로 진지하게 받아들입니다." },
        "우유부단한 유령": { score: "70%", desc: "유령의 엉뚱함은 당신의 밈 발굴 활동에 새로운 영감을 줄 수 있습니다." },
        "극단적 생존주의자": { score: "20%", desc: "생존주의자는 당신의 밈 활동을 시간 낭비로 치부할 수 있습니다." },
        "매력적인 악당": { score: "40%", desc: "악당의 진지한 매력을 당신의 밈이 깎아내릴 수 있습니다." },
        "고독한 천재": { score: "60%", desc: "천재의 독특한 시각은 당신의 밈 발굴 활동에 새로운 영감을 줄 수 있습니다." },
        "열정적인 선동가": { score: "65%", desc: "선동가의 진지한 연설에 당신의 엉뚱한 밈이 활력을 불어넣을 수 있습니다." },
        "AI 생성형 인간": { score: "30%", desc: "생성형 인간의 알고리즘은 당신의 너무 독특한 밈을 이해하기 힘들어합니다." },
        "극효율 플래너": { score: "30%", desc: "플래너의 효율성 추구는 당신의 밈 활동을 방해할 수 있습니다." },
        "감정적 갬블러": { score: "65%", desc: "갬블러의 무모한 도전은 당신의 밈 활동에 예측 불가능한 재미를 더합니다." },
        "침묵의 관찰자": { score: "75%", desc: "관찰자는 당신의 밈 활동을 조용히 지켜보며 흥미를 느낍니다." },
        "순진한 얼굴의 여우": { score: "50%", desc: "여우의 계산적인 면모는 당신의 예측 불가능한 밈 활동에 혼란을 줄 수 있습니다." },
        "밈 발굴단": { score: "80%", desc: "서로의 밈 세계를 이해하며, 끝없는 밈의 향연을 펼칠 수 있습니다." }
      }
    }
  };

  // --- Data: Questions (Hyper-updated, more absurd/timeless) ---
  const questions = [
    { q: "말할 때마다 0.1% 확률로 비둘기 소리 내기 vs 재채기할 때마다 내 반경 5미터 안에 있는 모든 전자기기 30초간 마비시키기", a: "비둘기 소리 (귀엽잖아? 가끔은 괜찮아!)", b: "전자기기 마비 (남에게 피해는 주기 싫어)" },
    { q: "내일 당장 5억 받기 vs 50년 뒤에 5조 받기", a: "5억 받기 (지금 당장 Flex하고 싶다)", b: "50년 뒤 5조 (장기적인 계획, 큰 그림을 그린다)" },
    { q: "내 인생이 평점 1점짜리 '네이버 웹툰'으로 연재 vs 내 인생이 조회수 1짜리 '유튜브 브이로그'로 연재", a: "웹툰 연재 (욕이라도 먹는 게 무관심보단 나음)", b: "유튜브 브이로그 (나만의 기록, 소소한 삶의 가치)" },
    { q: "매일 2시간씩 '인생네컷' 찍기 vs 매일 '탕후루' 10개씩 먹기", a: "인생네컷 (기록과 추억은 소중하니까)", b: "탕후루 10개 (달콤함은 포기 못 해)" },
    { q: "친구가 갑자기 '어쩔티비'라고 시비를 건다면?", a: "나도 '저쩔티비'로 받아친다 (기싸움은 지지 않아)", b: "무시하고 갈 길 간다 (상대할 가치도 없음)" },
    { q: "무인도에 단 하나만 가져갈 수 있다면?", a: "무한 배터리 스마트폰 (심심하면 안 돼!)", b: "만능 맥가이버 칼 (생존이 우선이다)" },
    { q: "평생 '급식체'만 써야 한다면? (예: 반모방 어케 들어가냐)", a: "쌉가능 (유행에 뒤쳐질 수 없지)", b: "절대 불가 (내 언어를 지키겠어)" },
    { q: "내가 좋아하는 연예인과 1년 연애 vs 평생 동안 돈 걱정 없이 살기", a: "연예인과 1년 연애 (추억을 남기겠다)", b: "돈 걱정 없이 살기 (현실이 중요하다)" },
    { q: "방탄소년단(BTS) 멤버와 무인도에서 1년 살기 vs 아이유와 편의점 가는 길에 만원 주워서 분식 사먹기", a: "BTS와 무인도 (극한의 경험을 통해 성장)", b: "아이유와 만원 줍기 (소소하지만 확실한 행복)" },
    { q: "세상 모든 사람이 나의 험담을 한다 vs 세상 모든 사람이 나를 모른다", a: "험담을 한다 (나를 기억하는 사람이 있는 게 중요)", b: "나를 모른다 (속 편하게 살고 싶다)" }
  ];

  // Point system for calculation (More complex for 12 types)
  const typeScores = {
    "RF": 0, "IG": 0, "SS": 0, "CV": 0, "LG": 0, "PA": 0,
    "AIGH": 0, "HEP": 0, "EHR": 0, "SO": 0, "IFF": 0, "MA": 0
  };
  const answerMapping = [
    { a: ["MA", "EHR"], b: ["HEP", "SO"] }, // Q1 비둘기 vs 마비
    { a: ["EHR", "CV"], b: ["HEP", "SS"] }, // Q2 5억 vs 5조
    { a: ["PA", "EHR"], b: ["SO", "LG"] }, // Q3 웹툰 vs 브이로그
    { a: ["AIGH", "PA"], b: ["EHR", "IFF"] }, // Q4 인생네컷 vs 탕후루
    { a: ["CV", "SS"], b: ["IG", "RF"] }, // Q5 어쩔티비
    { a: ["AIGH", "LG"], b: ["SS", "HEP"] }, // Q6 스마트폰 vs 맥가이버
    { a: ["MA", "CV"], b: ["RF", "SO"] }, // Q7 급식체
    { a: ["EHR", "CV"], b: ["HEP", "SS"] }, // Q8 연예인 vs 돈
    { a: ["PA", "SS"], b: ["IG", "RF"] }, // Q9 BTS vs 아이유
    { a: ["CV", "PA"], b: ["RF", "SO"] } // Q10 험담 vs 모름
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
    typeModal.classList.add('hidden'); // Ensure modals are hidden
    friendCompatModal.classList.add('hidden');
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
      mappings.a.forEach(type => typeScores[type] += 1.5); // Boost score for stronger influence
    } else { // 'B'
      mappings.b.forEach(type => typeScores[type] += 1.5);
    }
    currentQuestionIndex++;
    loadQuestion();
  }

  function calculateCoreType() {
    let maxScore = -1;
    let finalTypeCode = '';
    let tiedTypes = [];

    for (const typeCode in typeScores) {
        if (typeScores[typeCode] > maxScore) {
            maxScore = typeScores[typeCode];
            finalTypeCode = typeCode;
            tiedTypes = [typeCode]; // Reset tied types
        } else if (typeScores[typeCode] === maxScore) {
            tiedTypes.push(typeCode); // Add to tied types
        }
    }

    // If there's a tie, randomly select one of the tied types
    if (tiedTypes.length > 1) {
        finalTypeCode = tiedTypes[Math.floor(Math.random() * tiedTypes.length)];
    }
    
    currentUserType = coreTypes[finalTypeCode];
    displayResult(currentUserType);
  }

  function displayResult(type) {
    resultTypeEl.textContent = type.name;
    resultDescriptionEl.textContent = type.description;
    resultRarityEl.textContent = type.rarity;

    // Determine best and worst compatibility
    let bestCompatScore = -1;
    let bestCompatType = '';
    let worstCompatScore = 101; // Scores are 0-100%
    let worstCompatType = '';

    allCompatibilityChart.innerHTML = ''; // Clear previous chart
    const otherTypes = Object.keys(coreTypes).filter(id => id !== Object.keys(coreTypes).find(key => coreTypes[key].name === type.name));
    
    otherTypes.forEach(otherTypeId => {
        const otherType = coreTypes[otherTypeId];
        const compatibilityData = type.compatibility[otherType.name];
        const score = parseInt(compatibilityData.score);

        if (score > bestCompatScore) {
            bestCompatScore = score;
            bestCompatType = otherType.name;
        }
        if (score < worstCompatScore) {
            worstCompatScore = score;
            worstCompatType = otherType.name;
        }

        const compatItem = document.createElement('div');
        compatItem.classList.add('compat-item');
        compatItem.innerHTML = `${otherType.name} <span class="compat-score">${compatibilityData.score}</span><p>${compatibilityData.desc}</p>`;
        allCompatibilityChart.appendChild(compatItem);
    });

    resultBestCompatEl.textContent = bestCompatType + ' (' + bestCompatType + '%)';
    resultWorstCompatEl.textContent = worstCompatType + ' (' + worstCompatType + '%)';
    
    showSection(resultSection);
  }

  function restartQuiz() {
    quizSection.classList.add('hidden');
    resultSection.classList.add('hidden');
    heroSection.classList.remove('hidden');
    
    // No need for typewriter restart, as it only runs once initially
  }

  // --- Modal Functions ---
  function openTypeModal(typeName) {
    const typeCode = Object.keys(coreTypes).find(key => coreTypes[key].name === typeName);
    if (!typeCode) return;
    
    const type = coreTypes[typeCode];
    modalTypeName.textContent = type.name;
    modalTypeDescription.textContent = type.description;
    
    modalCompatibilityChart.innerHTML = ''; // Clear previous chart
    Object.keys(type.compatibility).forEach(otherTypeName => {
        const compatibilityData = type.compatibility[otherTypeName];
        const compatItem = document.createElement('div');
        compatItem.classList.add('compat-item');
        compatItem.innerHTML = `${otherTypeName} <span class="compat-score">${compatibilityData.score}</span><p>${compatibilityData.desc}</p>`;
        modalCompatibilityChart.appendChild(compatItem);
    });
    typeModal.classList.remove('hidden');
  }

  function closeTypeModal() {
    typeModal.classList.add('hidden');
  }
  
  function openFriendCompatModal() {
      if (!currentUserType) {
          alert("먼저 코어 타입 분석을 완료해주세요!");
          return;
      }
      myTypeNameEl.textContent = currentUserType.name;
      friendTypeSelect.innerHTML = '';
      Object.keys(coreTypes).forEach(typeCode => {
          const type = coreTypes[typeCode];
          if (type.name === currentUserType.name) return; // Don't add current type to selection
          const option = document.createElement('option');
          option.value = typeCode;
          option.textContent = type.name;
          friendTypeSelect.appendChild(option);
      });
      friendCompatResultTitle.textContent = '';
      friendCompatResultDesc.textContent = '';
      friendCompatModal.classList.remove('hidden');
  }

  function closeFriendCompatModal() {
      friendCompatModal.classList.add('hidden');
  }

  function calculateFriendCompatibility() {
      if (!currentUserType || !friendTypeSelect.value) {
          friendCompatResultTitle.textContent = "친구 타입을 선택해주세요.";
          return;
      }
      const friendType = coreTypes[friendTypeSelect.value];
      const compatibilityData = currentUserType.compatibility[friendType.name];

      if (compatibilityData) {
          friendCompatResultTitle.textContent = `${currentUserType.name}과 ${friendType.name}의 궁합: ${compatibilityData.score}`;
          friendCompatResultDesc.textContent = compatibilityData.desc;
      } else {
          friendCompatResultTitle.textContent = "궁합 정보를 찾을 수 없습니다.";
          friendCompatResultDesc.textContent = "";
      }
  }


  // --- Share Function ---
  async function shareResult() {
      if (!currentUserType) {
          alert("먼저 코어 타입 분석을 완료해주세요!");
          return;
      }
      const shareText = `내 코어 타입은 '${currentUserType.name}'이야! 🤯 "${currentUserType.description}"
너의 타입은 뭐야? 여기서 확인해봐! ${window.location.href}`;
      
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
  openFriendCompatBtn.addEventListener('click', openFriendCompatModal);

  modalCloseBtn.addEventListener('click', closeTypeModal);
  typeModal.addEventListener('click', (e) => { if (e.target === typeModal) closeTypeModal(); });
  
  friendModalCloseBtn.addEventListener('click', closeFriendCompatModal);
  friendCompatModal.addEventListener('click', (e) => { if (e.target === friendCompatModal) closeFriendCompatModal(); });
  calculateFriendCompatBtn.addEventListener('click', calculateFriendCompatibility);


  typeCards.forEach(card => {
    card.addEventListener('click', () => {
      openTypeModal(card.textContent.trim());
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
