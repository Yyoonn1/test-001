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
            languageLabel: "국가 선택:",
            langSouthKorea: "대한민국",
            langUnitedStates: "미국",
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
            languageLabel: "Select Country:",
            langSouthKorea: "South Korea",
            langUnitedStates: "United States",
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
            boy: [
                { name: "하준", meaning: "하늘처럼 높고 넓은 마음을 가지며, 지혜롭게 세상을 이끌어갈 아이", englishName: "Hajun", englishMeaning: "A child with a mind as high and vast as the sky, who will wisely lead the world." },
                { name: "도윤", meaning: "모든 길을 밝히는 빛처럼, 바르게 성장하여 주변에 긍정적인 영향을 주는 아이", englishName: "Doyun", englishMeaning: "Like a light that illuminates all paths, a child who will grow upright and positively influence those around them." },
                { name: "서준", meaning: "굳건한 의지로 목표를 향해 나아가며, 세상을 이롭게 할 아이", englishName: "Seojun", englishMeaning: "A child who will advance towards goals with firm resolve and benefit the world." },
                { name: "이준", meaning: "매사에 뛰어난 재능을 발휘하고, 항상 지혜롭게 판단하는 아이", englishName: "Ijun", englishMeaning: "A child who will display outstanding talent in all matters and always make wise judgments." },
                { name: "시우", meaning: "시간이 지날수록 더욱 빛나는 존재가 되어, 넓은 세상을 포용할 아이", englishName: "Shiwoo", englishMeaning: "A child who will become an increasingly radiant presence over time, embracing the vast world." },
                { name: "은우", meaning: "은은한 매력과 뛰어난 재능으로, 많은 사람에게 사랑받을 아이", englishName: "Eunwoo", englishMeaning: "A child with subtle charm and exceptional talent, who will be loved by many." },
                { name: "현우", meaning: "깊은 지혜와 뛰어난 능력을 겸비하여, 세상을 밝게 비출 아이", englishName: "Hyunwoo", englishMeaning: "A child possessing deep wisdom and outstanding abilities, who will brightly illuminate the world." },
                { name: "준우", meaning: "뛰어난 리더십과 따뜻한 마음으로, 주변을 이끌어갈 아이", englishName: "Junwoo", englishMeaning: "A child with excellent leadership and a warm heart, who will lead those around them." },
                { name: "건우", meaning: "튼튼한 몸과 건강한 정신으로, 모든 어려움을 극복할 아이", englishName: "Geonwoo", englishMeaning: "A child with a strong body and healthy mind, who will overcome all difficulties." },
                { name: "우진", meaning: "우아하고 진실된 마음으로, 항상 정의롭게 행동할 아이", englishName: "Woojin", englishMeaning: "A child with an elegant and truthful heart, who will always act righteously." }
            ],
            girl: [
                { name: "하윤", meaning: "하늘처럼 맑고 고운 마음으로, 주변을 밝히는 아이", englishName: "Hayun", englishMeaning: "A child with a clear and beautiful heart like the sky, who will brighten their surroundings." },
                { name: "서윤", meaning: "아름다운 향기처럼 널리 퍼지는 존재가 되어, 사랑받을 아이", englishName: "Seoyun", englishMeaning: "A child who will be loved, spreading like a beautiful fragrance." },
                { name: "지유", meaning: "지혜롭고 자유로운 영혼으로, 자신만의 길을 개척할 아이", englishName: "Jiyu", englishMeaning: "A child with a wise and free spirit, who will forge their own path." },
                { name: "서아", meaning: "평화롭고 온화한 성품으로, 세상을 따뜻하게 할 아이", englishName: "Seoah", englishMeaning: "A child with a peaceful and gentle nature, who will warm the world." },
                { name: "지아", meaning: "지혜와 아름다움을 겸비하여, 많은 사람에게 귀감이 될 아이", englishName: "Jia", englishMeaning: "A child possessing both wisdom and beauty, who will be an example to many." },
                { name: "하은", meaning: "하늘의 은총처럼 귀하게 여겨지며, 항상 감사하며 살아갈 아이", englishName: "Haeun", englishMeaning: "A child cherished like a blessing from heaven, who will always live with gratitude." },
                { name: "아린", meaning: "고귀하고 신비로운 매력으로, 모든 이에게 영감을 줄 아이", englishName: "Arin", englishMeaning: "A child with noble and mysterious charm, who will inspire everyone." },
                { name: "수아", meaning: "빼어난 아름다움과 밝은 기운으로, 주변을 행복하게 할 아이", englishName: "Sua", englishMeaning: "A child with outstanding beauty and bright energy, who will bring happiness to those around them." },
                { name: "서현", meaning: "현명하고 지혜로운 판단으로, 언제나 올바른 길을 선택할 아이", englishName: "Seohyun", englishMeaning: "A child with wise and discerning judgment, who will always choose the right path." },
                { name: "채원", meaning: "아름다운 꽃처럼 활짝 피어나, 세상에 긍정적인 에너지를 전할 아이", englishName: "Chaewon", englishMeaning: "A child who will bloom beautifully like a flower, spreading positive energy to the world." }
            ]
        },
        american: {
            boy: [
                { name: "James", meaning: "A classic name, signifying strength and tradition, for a child who will lead with integrity." },
                { name: "John", meaning: "Meaning 'God is gracious,' for a child who will bring joy and kindness to the world." },
                { name: "Robert", meaning: "A noble and bright name, for a child destined for fame and brilliance." },
                { name: "Michael", meaning: "Meaning 'who is like God,' for a child with a pure heart and strong spirit." },
                { name: "William", meaning: "A resolute protector, for a child who will be a pillar of strength for others." },
                { name: "David", meaning: "Meaning 'beloved,' for a child who will be cherished and inspire love in return." },
                { name: "Richard", meaning: "A powerful ruler, for a child with strong leadership qualities." },
                { name: "Joseph", meaning: "Meaning 'he will add,' for a child who will bring growth and abundance." },
                { name: "Thomas", meaning: "A twin, for a child who will be a loyal companion and friend." },
                { name: "Charles", meaning: "Meaning 'free man,' for a child with an independent and adventurous spirit." }
            ],
            girl: [
                { name: "Mary", meaning: "A timeless name, meaning 'star of the sea,' for a child who will guide and inspire." },
                { name: "Patricia", meaning: "Meaning 'noble,' for a child with grace and dignity." },
                { name: "Jennifer", meaning: "A fair spirit, for a child who will bring beauty and kindness." },
                { name: "Linda", meaning: "Meaning 'beautiful,' for a child whose inner and outer beauty will shine." },
                { name: "Elizabeth", meaning: "Meaning 'my God is abundance,' for a child blessed with richness of spirit." },
                { name: "Barbara", meaning: "A traveler from a foreign land, for a child with a curious and adventurous soul." },
                { name: "Susan", meaning: "A graceful lily, for a child who will grow with purity and elegance." },
                { name: "Jessica", meaning: "Meaning 'richness' or 'God beholds,' for a child with insight and prosperity." },
                { name: "Sarah", meaning: "A princess, for a child who will lead with charm and strength." },
                { name: "Karen", meaning: "Meaning 'pure,' for a child with an innocent heart and clear intentions." }
            ]
        },
        german: {
            boy: [
                { name: "Ben", meaning: "This name signifies a strong and wise leader." },
                { name: "Paul", meaning: "This name is for a child who will be humble and small, yet great in spirit." },
                { name: "Jonas", meaning: "This name means 'dove,' for a child who will bring peace." },
                { name: "Leon", meaning: "This name signifies a brave and courageous lion." },
                { name: "Finn", meaning: "This name means 'fair' or 'white,' for a child with a pure heart." },
                { name: "Elias", meaning: "This name means 'the Lord is my God,' for a child with strong faith." },
                { name: "Maximilian", meaning: "This name signifies the greatest, for a child destined for greatness." },
                { name: "Felix", meaning: "This name means 'lucky' or 'successful,' for a child with good fortune." },
                { name: "Noah", meaning: "This name means 'rest' or 'comfort,' for a child who will bring solace." },
                { name: "Luis", meaning: "This name signifies a famous warrior, for a child with a strong will." }
            ],
            girl: [
                { name: "Mia", meaning: "This name means 'mine' or 'bitter,' for a child who will be deeply loved." },
                { name: "Emma", meaning: "This name means 'universal,' for a child who will connect with everyone." },
                { name: "Hannah", meaning: "This name means 'grace,' for a child with elegance and charm." },
                { name: "Sophia", meaning: "This name means 'wisdom,' for a child with great intellect." },
                { name: "Anna", meaning: "This name means 'grace' or 'favor,' for a child who will be blessed." },
                { name: "Lena", meaning: "This name means 'light,' for a child who will illuminate the lives of others." },
                { name: "Emilia", meaning: "This name means 'rival,' for a child with a competitive spirit." },
                { name: "Marie", meaning: "This name means 'star of the sea,' for a child who will guide and inspire." },
                { name: "Lina", meaning: "This name means 'light' or 'tender,' for a child with a gentle spirit." },
                { name: "Lea", meaning: "This name means 'weary,' for a child who will find peace and rest." }
            ]
        },
        japanese: {
            boy: [
                { name: "Aoi", meaning: "This name signifies 'hollyhock' or 'blue,' for a child with a vibrant spirit." },
                { name: "Ren", meaning: "This name means 'lotus' or 'love,' for a child who will be pure and compassionate." },
                { name: "Haruto", meaning: "This name means 'spring' and 'fly,' for a child who will soar high with joy." },
                { name: "Yuma", meaning: "This name means 'leisure' and 'truth,' for a child who will live a life of peace and honesty." },
                { name: "Sota", meaning: "This name means 'suddenly' and 'great,' for a child with unexpected greatness." },
                { name: "Minato", meaning: "This name means 'harbor,' for a child who will be a safe haven for others." },
                { name: "Yuki", meaning: "This name means 'happiness' or 'snow,' for a child who brings joy and purity." },
                { name: "Kaito", meaning: "This name means 'ocean' and 'fly,' for a child with a vast and adventurous spirit." },
                { name: "Riku", meaning: "This name means 'land' or 'continent,' for a child who will be grounded and strong." },
                { name: "Hayato", meaning: "This name means 'falcon,' for a child who will be swift and decisive." }
            ],
            girl: [
                { name: "Himari", meaning: "This name means 'hollyhock' and 'good,' for a child who will be cheerful and bright like the sun." },
                { name: "Hina", meaning: "This name means 'good' or 'light,' for a child who will be radiant and lovely." },
                { name: "Yui", meaning: "This name means 'tie' or 'bind,' for a child who will connect people with love." },
                { name: "Sakura", meaning: "This name means 'cherry blossom,' for a child with delicate beauty and transient charm." },
                { name: "Rin", meaning: "This name means 'dignified' or 'severe,' for a child with inner strength and grace." },
                { name: "Mei", meaning: "This name means 'bud' or 'sprout,' for a child who will grow beautifully." },
                { name: "Yua", meaning: "This name means 'binding love,' for a child who will be deeply cherished." },
                { name: "Saki", meaning: "This name means 'blossom' or 'hope,' for a child who will bring forth new possibilities." },
                { name: "Akari", meaning: "This name means 'light' or 'brightness,' for a child who will illuminate the world." },
                { name: "Ichika", meaning: "This name means 'one thousand flowers,' for a child with diverse talents and beauty." }
            ]
        },
        chinese: {
            boy: [
                { name: "Wei", meaning: "This name signifies 'greatness' and 'power,' for a child destined for influence." },
                { name: "Fang", meaning: "This name means 'square' or 'upright,' for a child with integrity and honesty." },
                { name: "Min", meaning: "This name means 'clever' or 'sharp,' for a child with quick wit and intelligence." },
                { name: "Jian", meaning: "This name means 'establish' or 'build,' for a child who will create and achieve." },
                { name: "Hao", meaning: "This name means 'brave' or 'heroic,' for a child with courage and strength." },
                { name: "Cheng", meaning: "This name means 'accomplish' or 'succeed,' for a child who will achieve great things." },
                { name: "Zhi", meaning: "This name means 'wisdom' or 'knowledge,' for a child with deep understanding." },
                { name: "Liang", meaning: "This name means 'bright' or 'good,' for a child with a shining personality." },
                { name: "Yong", meaning: "This name means 'brave' or 'courageous,' for a child with an unyielding spirit." },
                { name: "Qiang", meaning: "This name means 'strong' or 'powerful,' for a child with immense inner strength." }
            ],
            girl: [
                { name: "Mei", meaning: "This name means 'beautiful,' for a child whose charm will captivate all." },
                { name: "Ling", meaning: "This name means 'spirit' or 'sound of jade,' for a child with a pure soul." },
                { name: "Jing", meaning: "This name means 'quiet' or 'still,' for a child with inner peace." },
                { name: "Yan", meaning: "This name means 'swallow' or 'beautiful,' for a child with grace and agility." },
                { name: "Huan", meaning: "This name means 'joy' or 'happy,' for a child who will bring delight." },
                { name: "Xiu", meaning: "This name means 'elegant' or 'graceful,' for a child with refined beauty." },
                { name: "Lan", meaning: "This name means 'orchid,' for a child with delicate beauty and strength." },
                { name: "Fang", meaning: "This name means 'fragrant,' for a child whose presence will be a sweet scent." },
                { name: "Qing", meaning: "This name means 'clear' or 'pure,' for a child with an unblemished spirit." },
                { name: "Ying", meaning: "This name means 'flower' or 'heroine,' for a child who will bloom brilliantly." }
            ]
        },
        spanish: {
            boy: [
                { name: "Santiago", meaning: "This name means 'Saint James,' for a child with a strong and devout spirit." },
                { name: "Mateo", meaning: "This name means 'gift of God,' for a child who is a blessing to all." },
                { name: "Sebastián", meaning: "This name means 'venerable,' for a child who will be respected and admired." },
                { name: "Leonardo", meaning: "This name means 'brave as a lion,' for a child with courage and artistic talent." },
                { name: "Matías", meaning: "This name means 'gift of God,' for a child who is a true present." },
                { name: "Diego", meaning: "This name means 'supplanter,' for a child who will overcome challenges." },
                { name: "Daniel", meaning: "This name means 'God is my judge,' for a child with strong moral compass." },
                { name: "Alejandro", meaning: "This name means 'defender of mankind,' for a child who will protect others." },
                { name: "Samuel", meaning: "This name means 'heard by God,' for a child who is divinely connected." },
                { name: "Benjamín", meaning: "This name means 'son of the right hand,' for a child who is fortunate and favored." }
            ],
            girl: [
                { name: "Sofía", meaning: "This name means 'wisdom,' for a child with deep understanding and insight." },
                { name: "Isabella", meaning: "This name means 'devoted to God,' for a child with strong faith." },
                { name: "Valentina", meaning: "This name means 'strong' or 'healthy,' for a child with vigor and spirit." },
                { name: "Camila", meaning: "This name means 'attendant at a sacrifice,' for a child with a noble heart." },
                { name: "Valeria", meaning: "This name means 'strength' or 'health,' for a child who is vibrant and robust." },
                { name: "Mariana", meaning: "This name is a blend of Mary and Ana, for a child with grace and purity." },
                { name: "Luciana", meaning: "This name means 'light,' for a child who will bring brightness and joy." },
                { name: "Daniela", meaning: "This name means 'God is my judge,' for a child with strong moral principles." },
                { name: "Sara", meaning: "This name means 'princess,' for a child with leadership and charm." },
                { name: "Victoria", meaning: "This name means 'victory,' for a child who will achieve triumph in life." }
            ]
        }
    };

    function generateName() {
        const genderDisplay = document.getElementById('genderDisplay');
        const nameDisplay = document.getElementById('nameDisplay');
        const meaningDisplay = document.getElementById('meaningDisplay'); // Get meaning display element
        const selectedLanguage = languageSelect.value;

        const names = namesByLanguage[selectedLanguage];
        const isBoy = Math.random() < 0.5; // 50% chance for boy or girl
        
        const genderText = isBoy ? translations[currentLang].congratsBoy : translations[currentLang].congratsGirl;
        
        const nameList = isBoy ? names.boy : names.girl;
        const randomNameObject = nameList[Math.floor(Math.random() * nameList.length)];
        let displayedName = randomNameObject.name;
        let displayedMeaning = randomNameObject.meaning;

        if (currentLang === 'en' && selectedLanguage === 'korean') {
            displayedName = randomNameObject.englishName || randomNameObject.name;
            displayedMeaning = randomNameObject.englishMeaning || randomNameObject.meaning;
        }

        genderDisplay.textContent = genderText;
        nameDisplay.textContent = displayedName;
        meaningDisplay.textContent = displayedMeaning;
        nameDisplay.classList.remove('name-placeholder'); // Remove placeholder class if it exists
        meaningDisplay.classList.remove('meaning-placeholder'); // Remove placeholder class if it exists
    }

    generateBtn.addEventListener('click', generateName);

    // Set initial language
    setLanguage(currentLang);
    generateName();
});