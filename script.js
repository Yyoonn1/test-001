document.addEventListener('DOMContentLoaded', () => {
    // Language Toggle
    const langToggle = document.getElementById('langToggle');
    let currentLang = localStorage.getItem('lang') || 'ko';

    // Naming Service
    const generateBtn = document.getElementById('generateBtn');
    const languageSelect = document.getElementById('language');

    const translations = {
        ko: {
            pageTitle: "탱글이의 우리아이 작명소",
            title: "👶 탱글이의 우리아이 작명소 👶",
            navHome: "홈",
            navAbout: "소개",
            navPrivacy: "개인정보처리방침",
            languageLabel: "언어 선택:",
            langKorean: "한국어",
            langAmerican: "미국",
            langGerman: "독일",
            langJapanese: "일본",
            langChinese: "중국",
            langSpanish: "스페인",
            genderPlaceholder: "아이의 성별을 확인하고 이름을 지어보세요!",
            generateButton: "이름 생성하기",
            welcomeTitle: "'탱글이의 우리아이 작명소'에 오신 것을 환영합니다!",
            welcomeMessage: "'탱글이의 우리아이 작명소'는 곧 태어날 소중한 아기를 위한 특별한 이름을 찾는 부모님들을 위한 공간입니다. 이름은 한 사람의 인생에 큰 영향을 미치는 중요한 선물입니다. 저희는 전통적인 작명 원리와 현대적인 감각을 결합하여, 아름답고 의미 있는 이름을 추천해 드립니다.",
            howToTitle: "어떻게 좋은 이름을 지을 수 있을까요?",
            howToMessage: "좋은 이름은 부르기 쉽고, 듣기 좋으며, 긍정적인 의미를 담고 있어야 합니다. 또한, 아기의 성별과 가족의 가치관을 반영하는 것도 중요합니다. '탱글이의 우리아이 작명소'에서는 성별에 따라 다양한 이름 후보를 생성하여 부모님들의 선택을 돕습니다. '이름 생성하기' 버튼을 눌러 지금 바로 아기에게 어울리는 예쁜 이름들을 만나보세요.",
            importanceTitle: "이름의 중요성",
            importanceMessage: "이름은 단순한 호칭을 넘어, 한 사람의 정체성을 형성하고 미래를 열어주는 열쇠가 될 수 있습니다. 정성껏 지은 이름은 아기에게 주는 첫 번째이자 가장 소중한 선물이 될 것입니다. '탱글이의 우리아이 작명소'가 여러분의 특별한 선물 준비에 보탬이 되기를 바랍니다.",
            inquiryTitle: "🤝 의견/문의",
            formNameLabel: "성함/업체명",
            formNamePlaceholder: "성함 또는 업체명을 입력해주세요 (선택사항)",
            formEmailLabel: "이메일 주소",
            formEmailPlaceholder: "example@email.com",
            formMessageLabel: "문의 내용",
            formMessagePlaceholder: "의견 또는 문의하실 내용을 입력해주세요",
            formSubmitButton: "문의 보내기",
            footerNavHome: "홈",
            footerNavAbout: "소개",
            footerNavPrivacy: "개인정보처리방침",
            footerRights: "© 2026 탱글이의 우리아이 작명소. All Rights Reserved.",
            congratsBoy: "축하합니다! 아들입니다!",
            congratsGirl: "축하합니다! 딸입니다!",
            // About Page
            aboutPageTitle: "소개 - 탱글이의 우리아이 작명소",
            aboutSiteTitle: "사이트 소개",
            aboutSiteMessage: "'탱글이의 우리아이 작명소'는 예비 부모님들이 소중한 자녀의 이름을 짓는 데 도움을 드리고자 만들어진 웹사이트입니다. 저희는 이름이 한 사람의 인생에 얼마나 큰 의미와 영향을 가지는지 깊이 이해하고 있습니다. 따라서 누구나 쉽고 편리하게, 그러면서도 의미 있고 아름다운 이름을 찾을 수 있도록 돕는 것을 목표로 합니다.",
            ourVisionTitle: "저희의 비전",
            ourVisionMessage: "저희는 기술과 감성의 조화를 통해 작명 과정을 더욱 즐겁고 의미 있는 경험으로 만들고자 합니다. 단순히 이름을 생성하는 것을 넘어, 이름에 담긴 이야기와 가치를 공유하며 모든 가정이 행복한 첫걸음을 내딛는 데 기여하고 싶습니다.",
            creatorsTitle: "만든 사람들",
            creatorsMessage: "'탱글이의 우리아이 작명소'는 아이를 사랑하는 마음으로 모인 작은 팀에 의해 만들어졌습니다. 저희는 앞으로도 사용자 여러분의 목소리에 귀 기울이며, 더 좋은 서비스를 제공하기 위해 끊임없이 노력할 것입니다.",
            // Privacy Page
            privacyPageTitle: "개인정보처리방침 - 탱글이의 우리아이 작명소",
            privacyPolicyTitle: "개인정보처리방침",
            privacyLastModified: "최종 수정일: 2026년 1월 27일",
            privacySection1Title: "1. 총칙",
            privacySection1Content: "'탱글이의 우리아이 작명소'(이하 '사이트')는 사용자님의 개인정보를 중요시하며, '정보통신망 이용촉진 및 정보보호'에 관한 법률을 준수하고 있습니다. 본 사이트는 개인정보처리방침을 통하여 사용자님께서 제공하시는 개인정보가 어떠한 용도와 방식으로 이용되고 있으며, 개인정보보호를 위해 어떠한 조치가 취해지고 있는지 알려드립니다.",
            privacySection2Title: "2. 수집하는 개인정보 항목",
            privacySection2Content1: "본 사이트는 의견/문의 시 다음의 정보를 수집합니다.",
            privacySection2ListItem1: "수집 항목: 성함/업체명, 이메일 주소, 문의 내용",
            privacySection2ListItem2: "수집 방법: Formspree.io를 통한 양식 제출",
            privacySection2Content2: "또한, 서비스 이용 과정에서 아래와 같은 정보들이 자동으로 생성되어 수집될 수 있습니다.",
            privacySection2ListItem3: "IP 주소, 쿠키, 방문 일시, 서비스 이용 기록",
            privacySection3Title: "3. 개인정보의 수집 및 이용목적",
            privacySection3Content1: "사이트는 수집한 개인정보를 다음의 목적을 위해 활용합니다.",
            privacySection3ListItem1: "의견/문의에 대한 응답 및 원활한 의사소통 경로 확보",
            privacySection3ListItem2: "서비스 개선 및 통계 분석",
            privacySection4Title: "4. 개인정보의 보유 및 이용기간",
            privacySection4Content: "원칙적으로, 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 관계법령의 규정에 의하여 보존할 필요가 있는 경우 일정 기간 동안 개인정보를 보관할 수 있습니다.",
            privacySection5Title: "5. 광고에 대한 정보",
            privacySection5Content1: "본 사이트는 Google AdSense를 포함한 제3자 광고 서비스를 이용할 수 있습니다. 이러한 광고 서비스는 사용자에게 보다 관련성 높은 광고를 제공하기 위해 쿠키(cookie)를 사용할 수 있습니다.",
            privacySection5ListItem1: "Google AdSense는 DoubleClick DART 쿠키를 사용하여 사용자의 사이트 및 다른 사이트 방문 기록을 기반으로 광고를 게재합니다.",
            privacySection5ListItem2: "사용자는 Google 광고 및 콘텐츠 네트워크 개인정보보호정책을 방문하여 DART 쿠키 사용을 거부할 수 있습니다.",
            privacySection6Title: "6. 개인정보에 관한 민원서비스",
            privacySection6Content: "개인정보 처리에 관한 문의사항은 의견/문의 양식을 통해 연락주시기 바랍니다.",
        },
        en: {
            pageTitle: "Tangle's Baby Name Lab",
            title: "👶 Tangle's Baby Name Lab 👶",
            navHome: "Home",
            navAbout: "About",
            navPrivacy: "Privacy Policy",
            languageLabel: "Select Language:",
            langKorean: "Korean",
            langAmerican: "American",
            langGerman: "German",
            langJapanese: "Japanese",
            langChinese: "Chinese",
            langSpanish: "Spanish",
            genderPlaceholder: "Check the baby's gender and choose a name!",
            generateButton: "Generate Name",
            welcomeTitle: "Welcome to 'Tangle's Baby Name Lab'!",
            welcomeMessage: "'Tangle's Baby Name Lab' is a space for parents looking for a special name for their precious baby. A name is an important gift that has a great impact on a person's life. We combine traditional naming principles with a modern sense to recommend beautiful and meaningful names.",
            howToTitle: "How to Choose a Good Name",
            howToMessage: "A good name should be easy to call, pleasant to hear, and have a positive meaning. It is also important to reflect the baby's gender and family values. 'Tangle's Baby Name Lab' helps parents choose by generating various name candidates according to gender. Click the 'Generate Name' button to meet beautiful names that suit your baby right now.",
            importanceTitle: "The Importance of a Name",
            importanceMessage: "A name is more than just a title; it can be the key to forming one's identity and opening up the future. A name given with care will be the first and most precious gift you give to your baby. We hope 'Tangle's Baby Name Lab' can help you prepare your special gift.",
            inquiryTitle: "🤝 Suggestions/Inquiries",
            formNameLabel: "Name/Company Name",
            formNamePlaceholder: "Enter your name or company name (optional)",
            formEmailLabel: "Email Address",
            formEmailPlaceholder: "example@email.com",
            formMessageLabel: "Message",
            formMessagePlaceholder: "Enter your suggestions or inquiries",
            formSubmitButton: "Send Inquiry",
            footerNavHome: "Home",
            footerNavAbout: "About",
            footerNavPrivacy: "Privacy Policy",
            footerRights: "© 2026 Tangle's Baby Name Lab. All Rights Reserved.",
            congratsBoy: "Congratulations! It's a boy!",
            congratsGirl: "Congratulations! It's a girl!",
            // About Page
            aboutPageTitle: "About - Tangle's Baby Name Lab",
            aboutSiteTitle: "About the Site",
            aboutSiteMessage: "'Tangle's Baby Name Lab' is a website created to help prospective parents choose names for their precious children. We deeply understand how much meaning and influence a name has on a person's life. Therefore, our goal is to help everyone easily and conveniently find meaningful and beautiful names.",
            ourVisionTitle: "Our Vision",
            ourVisionMessage: "We aim to make the naming process a more enjoyable and meaningful experience through the harmony of technology and emotion. Beyond simply generating names, we want to contribute to all families taking a happy first step by sharing the stories and values contained in names.",
            creatorsTitle: "Our Team",
            creatorsMessage: "'Tangle's Baby Name Lab' was created by a small team united by a love for children. We will continue to listen to our users and strive to provide better services.",
            // Privacy Page
            privacyPageTitle: "Privacy Policy - Tangle's Baby Name Lab",
            privacyPolicyTitle: "Privacy Policy",
            privacyLastModified: "Last Modified: January 27, 2026",
            privacySection1Title: "1. General Provisions",
            privacySection1Content: "'Tangle's Baby Name Lab' (hereinafter referred to as 'the Site') values users' personal information and complies with the 'Act on Promotion of Information and Communications Network Utilization and Information Protection.' Through this privacy policy, we inform users about how personal information provided by them is used and what measures are being taken to protect it.",
            privacySection2Title: "2. Items of Personal Information Collected",
            privacySection2Content1: "The Site collects the following information when making suggestions/inquiries.",
            privacySection2ListItem1: "Collected items: Name/Company Name, Email Address, Inquiry Details",
            privacySection2ListItem2: "Collection method: Form submission via Formspree.io",
            privacySection2Content2: "In addition, the following information may be automatically generated and collected during the use of the service.",
            privacySection2ListItem3: "IP address, cookies, visit date and time, service usage records",
            privacySection3Title: "3. Purpose of Collection and Use of Personal Information",
            privacySection3Content1: "The Site uses collected personal information for the following purposes.",
            privacySection3ListItem1: "Response to suggestions/inquiries and securing smooth communication channels",
            privacySection3ListItem2: "Service improvement and statistical analysis",
            privacySection4Title: "4. Personal Information Retention and Use Period",
            privacySection4Content: "In principle, personal information is destroyed without delay once the purpose of collection and use has been achieved. However, if it is necessary to preserve personal information in accordance with relevant laws, it may be stored for a certain period.",
            privacySection5Title: "5. Information on Advertising",
            privacySection5Content1: "This site may use third-party advertising services, including Google AdSense. These advertising services may use cookies to provide users with more relevant advertisements.",
            privacySection5ListItem1: "Google AdSense uses DoubleClick DART cookies to serve ads based on users' visits to this site and other sites.",
            privacySection5ListItem2: "Users can opt out of the use of DART cookies by visiting the Google Ad and Content Network Privacy Policy.",
            privacySection6Title: "6. Customer Service for Personal Information",
            privacySection6Content: "For inquiries regarding the processing of personal information, please contact us through the suggestions/inquiries form.",
        }
    };

    function setLanguage(lang) {
        document.documentElement.lang = lang;
        const translation = translations[lang];
        document.querySelectorAll('[data-translate-key]').forEach(element => {
            const key = element.getAttribute('data-translate-key');
            if (translation[key]) {
                if (element.hasAttribute('placeholder')) {
                    element.placeholder = translation[key];
                } else if (element.tagName === 'TITLE') {
                    document.title = translation[key];
                }
                else {
                    element.textContent = translation[key];
                }
            }
        });
        // Update select option texts
        document.querySelectorAll('#language option').forEach(option => {
            const key = option.getAttribute('data-translate-key');
            if (translation[key]) {
                option.textContent = translation[key];
            }
        });
    }

    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'ko' ? 'en' : 'ko';
        localStorage.setItem('lang', currentLang);
        setLanguage(currentLang);
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
        
        const genderText = isBoy ? translations[currentLang].congratsBoy : translations[currentLang].congratsGirl;
        
        const nameList = isBoy ? names.boy : names.girl;
        const randomName = nameList[Math.floor(Math.random() * nameList.length)];

        genderDisplay.textContent = genderText;
        nameDisplay.textContent = randomName;
        nameDisplay.classList.remove('name-placeholder'); // Remove placeholder class if it exists
    }

    generateBtn.addEventListener('click', generateName);

    // Set initial language
    setLanguage(currentLang);
});