    <script>
        // Multi-language Support
        const translations = {
            ko: {
                // Navigation
                nav_home: "Home",
                nav_solutions: "솔루션",
                nav_who_we_are: "회사 소개",
                nav_transformation: "AI Transformation",
                nav_dtg: "AI DTG",
                nav_dashboard: "AI Dashboard",
                nav_solutions_status: "솔루션 현황",
                nav_company: "회사 개요",
                nav_team: "우리 팀",
                nav_timeline: "개발 타임라인",
                nav_certifications: "인증 및 수상",
                nav_tech_diff: "기술적 차별화",
                hero_subtitle: "World-Class AI Transformation Platform",
                hero_description: "노후 화물차를 첨단 AI 차량으로 변환하는 세계 최고의 통합 솔루션<br>AI 기반 안전 향상과 국제표준 탄소 측정 및 감축 시스템",
                btn_explore: "Explore Products",
                btn_transformation: "AI Transformation",
                transformation_label: "AI TRANSFORMATION",
                transformation_title: "노후 화물차의 AI Transformation (AX)",
                transformation_description: "최첨단 AI 기술로 기존 화물차를 스마트 차량으로 업그레이드하여<br>운전자 안전과 환경 보호를 동시에 실현합니다",
                safety_title: "AI 기반 운전자 및 화물 안전 향상",
                safety_description: "실시간 AI 추론을 통해 운전자의 피로도, 졸음, 주의 산만을 감지하고<br>즉각적인 경고를 제공합니다. 화물 상태를 지속적으로 모니터링하여<br>사고를 예방하고 안전한 운송을 보장합니다.",
                carbon_title: "AI 기반 국제표준 탄소 측정 및 감축",
                carbon_description: "ISO 14064 국제표준을 준수하는 정밀한 탄소 배출량 측정 시스템으로<br>실시간 탄소 배출을 모니터링하고, AI 최적화를 통해 연료 효율을<br>극대화하여 탄소 배출을 효과적으로 감축합니다.",
                dtg_label: "AI HARDWARE",
                dtg_title: "GLEC AI DTG",
                dtg_description: "차세대 AI 디지털운행기록장치로 운전자의 안전과 차량 효율성을<br>실시간으로 모니터링하고 최적화합니다",
                ai_inference_title: "실시간 AI 추론 시스템",
                ai_inference_description: "고정밀 센서와 엣지 AI 컴퓨팅으로 즉각적인 위험 감지와 대응이 가능합니다.<br>운전자의 상태, 도로 상황, 화물 상태를 실시간으로 분석하여<br>사고를 예방하고 안전한 운행을 보장합니다.",
                "5g_cloud_title": "5G 연결 & 클라우드 통합",
                "5g_cloud_description": "초고속 5G 네트워크를 통해 실시간 데이터를 클라우드로 전송하고<br>빅데이터 분석을 통한 인사이트를 제공합니다. 차량 관제 센터와<br>실시간으로 연동되어 즉각적인 대응이 가능합니다.",
                dashboard_label: "AI SOFTWARE",
                dashboard_title: "GLEC AI Dashboard",
                dashboard_description: "통합 AI 대시보드 시스템으로 차량 운행 데이터를 실시간으로<br>시각화하고 분석하여 최적의 운송 효율을 제공합니다",
                data_visualization_title: "실시간 데이터 시각화",
                data_visualization_description: "직관적인 인터페이스로 운전자와 관리자가 모든 정보를 한눈에 파악할 수 있습니다.<br>차량 위치, 운행 경로, 연료 소비, 탄소 배출량 등 모든 데이터를<br>실시간으로 모니터링하고 분석합니다.",
                voice_agent_title: "AI 음성 대화 에이전트",
                voice_agent_description: "실시간 AI 음성 인식 및 대화 시스템으로 운전자에게 즉각적인 긴급 안전 경보를<br>제공합니다. 위험 상황 감지 시 음성으로 경고하여 사고율을 20% 이상 감소시키고,<br>운전자와의 자연스러운 대화를 통해 안전 운행을 지원합니다.",
                // Technology Section
                technology_label: "핵심 기술",
                technology_title: "최첨단 AI & API 기술",
                technology_description: "세계 최고 수준의 AI 기술과 국제표준 탄소 측정 API<br>혁신을 통한 지속가능한 물류 구현",
                glec_ai_title: "GLEC AI - 20B LLM 실시간 추론 엔진",
                ai_safety_badge: "AI 안전",
                // CES 2026 Section
                nav_technology: "CORE TECHNOLOGY",
                nav_contact: "연락처",
                nav_ces2026: "CES 2026",
                ces_title: "CES 2026에서 만나요",
                ces_subtitle: "AI 운송의 미래를 경험하세요",
                ces_description: "세계에서 가장 영향력 있는 기술 이벤트에서 GLEC을 만나보세요. 혁신적인 AI DTG 솔루션을 발견하고 첨단 인공지능으로 운송업계를 어떻게 변화시키고 있는지 확인해보세요.",
                ces_dates_label: "일정",
                ces_dates_value: "2026년 1월 6-9일",
                ces_location_label: "장소",
                ces_location_value: "네바다주 라스베가스",
                ces_venue_label: "회장",
                ces_venue_value: "유레카 홀",
                ces_booth_label: "부스",
                ces_booth_value: "곧 방문 예정",
                ces_invitation_title: "CES 2026 초대장 받기",
                ces_email_label: "이메일 주소",
                ces_email_placeholder: "CES 2026 초대장을 받을 이메일을 입력하세요",
                ces_submit_btn: "초대장 요청",
                // Company Overview
                company_label: "회사 소개",
                company_title: "회사 개요",
                founded_label: "설립",
                founded_detail: "스타트업",
                location_label: "위치",
                location_value: "대한민국",
                location_detail: "서울 본사",
                specialization_label: "전문 분야",
                specialization_value: "녹색 물류",
                specialization_detail: "ISO-14083",
                vision_title: "비전",
                vision_text: "녹색 물류 서비스 구축을 지원할 국내 유일 '물류 국제표준 테크 기업'",
                mission_title: "미션",
                mission_text: "국제표준 기반 기술과 컨설팅을 통해 지속가능물류 생태계를 구축하고 탄소 선순환 구조를 완성합니다",
                values_title: "핵심 가치",
                value_standards: "국제 표준",
                value_standards_desc: "ISO-14083 준수 솔루션",
                value_innovation: "혁신",
                value_innovation_desc: "AI 탑재 차세대 DTG",
                value_sustainability: "지속가능성",
                value_sustainability_desc: "녹색 물류 전환",
                value_partnership: "파트너십",
                value_partnership_desc: "글로벌 협력 네트워크",
                // Solutions Section
                solutions_label: "솔루션",
                solutions_title: "솔루션 및 개발 현황",
                solutions_description: "개발 중인 최첨단 녹색 물류 솔루션",
                status_development: "개발 중",
                status_active: "서비스 중",
                launch_march_2026: "출시: 2026년 3월",
                efuel_title: "이퓨얼",
                efuel_subtitle: "화물차 탄소배출량 모니터링 솔루션",
                tips_program: "🏆 TIPS R&D 지원사업 2024",
                efuel_feature_1: "실시간 탄소 배출량 모니터링",
                efuel_feature_2: "Scope 3 배출량 관리",
                efuel_feature_3: "ISO-14083 국제표준 준수",
                efuel_feature_4: "WMS/TMS 시스템 연동",
                efuel_feature_5: "CDP, SBT, CBAM 자동 보고",
                dtg_subtitle_full: "디지털 운행기록장치",
                env_program: "🏆 환경기술사업화 지원사업 2025",
                dtg_feature_1: "차세대 차량 운행기록장치",
                dtg_feature_2: "LTE 기반 자동 데이터 수집",
                dtg_feature_3: "실시간 탄소배출량 측정",
                dtg_feature_4: "터치 스마트 디스플레이",
                dtg_feature_5: "Qualcomm SC200E AP (8GB RAM + 32GB HDD)",
                api_subtitle: "물류 탄소 계산 API",
                api_feature_1: "탄소 계산용 48개 API",
                api_feature_2: "0.5초 응답 속도",
                api_feature_3: "ISO-14083 표준 엔진",
                api_feature_4: "화주/운송사 시스템 연동",
                api_feature_5: "모든 운송 수단 지원",
                // Certifications Section
                cert_label: "성과",
                cert_title: "정부 지원 및 인증",
                govt_funding_title: "정부 지원 및 수상",
                cert_tips: "TIPS R&D 지원사업",
                cert_tips_desc: "중소벤처기업부",
                cert_logistics: "물류 스타트업",
                cert_logistics_desc: "국토교통부",
                cert_data: "데이터사업자",
                cert_data_desc: "과학기술정보통신부",
                cert_env: "환경기술사업화 지원사업",
                cert_env_desc: "한국환경산업기술원",
                cert_opinet: "오피넷 스타트업",
                cert_opinet_desc: "스타트업 지정",
                tech_achievements_title: "기술 성과",
                patents_filed: "특허 출원",
                patents_registered: "특허 등록",
                copyright: "저작권 등록",
                iso_translation: "ISO-14083 한글 번역본",
                wtw_research: "한국형 WTW 배출계수 R&D",
                // Timeline Section
                timeline_label: "로드맵",
                timeline_title: "개발 타임라인",
                timeline_description: "설립부터 녹색 물류 혁신까지의 여정",
                timeline_2023_title: "GLEC Inc. 설립",
                timeline_2023_desc: "대한민국 물류 탄소 전문 기술 스타트업으로 설립",
                timeline_2023_highlight1: "🏢 회사 설립",
                timeline_2023_highlight2: "🎯 비전 수립",
                timeline_2024_title: "TIPS R&D 지원사업 선정",
                timeline_2024_desc: "중소벤처기업부 TIPS R&D 지원사업 선정",
                timeline_2024_highlight1: "🏆 TIPS R&D 지원사업",
                timeline_2024_highlight2: "🌱 이퓨얼 개발 착수",
                timeline_2024_highlight3: "🚀 다수 인증 획득",
                timeline_2025_title: "환경기술사업화 지원사업 선정",
                timeline_2025_desc: "한국환경산업기술원 환경기술사업화 지원사업 선정",
                timeline_2025_highlight1: "🏆 환경기술사업화 지원사업",
                timeline_2025_highlight2: "🚛 GLEC DTG 개발 착수",
                timeline_2026_title: "제품 출시",
                timeline_2026_desc: "이퓨얼 및 GLEC DTG 솔루션 공식 출시",
                timeline_2026_highlight1: "🎉 이퓨얼 출시 (2026년 3월)",
                timeline_2026_highlight2: "🎉 GLEC DTG 출시 (2026년 3월)",
                timeline_2026_highlight3: "🌍 시장 진입",
                timeline_status_development: "개발 단계",
                // Technical Differentiation Section
                tech_diff_label: "기술",
                tech_diff_title: "기술적 차별성",
                tech_diff_description: "녹색 물류 기술에서의 경쟁 우위",
                tech_badge_iso: "국제 표준",
                tech_iso_title: "ISO-14083 국제 표준",
                tech_iso_desc: "ISO-14083 국제표준을 준수하는 국내 유일의 물류 탄소배출량 계산 솔루션",
                tech_iso_feature1: "국경 간 물류를 위한 글로벌 표준 준수",
                tech_iso_feature2: "공식 ISO-14083 한글 번역 기여",
                tech_iso_feature3: "WTW (Well-to-Wheel) 분석 역량",
                tech_iso_feature4: "CDP, SBT, CBAM 보고 자동화",
                tech_badge_ai: "AI 혁신",
                tech_ai_title: "AI 탑재 디지털 운행기록장치",
                tech_ai_desc: "안전 및 탄소 모니터링을 위한 AI 통합 차세대 DTG",
                tech_ai_feature1: "실시간 AI 추론 (운전자 피로도, 졸음 감지)",
                tech_ai_feature2: "Qualcomm SC200E 칩셋 엣지 컴퓨팅",
                tech_ai_feature3: "동시 탄소배출량 측정",
                tech_ai_feature4: "5G/LTE 클라우드 동기화",
                tech_badge_performance: "고성능",
                tech_perf_title: "실시간 탄소 모니터링",
                tech_perf_desc: "정밀한 탄소 계산과 초고속 API 응답",
                tech_perf_feature1: "평균 0.5초 API 응답 시간",
                tech_perf_feature2: "48개 이상의 전문 탄소 계산 API",
                tech_perf_feature3: "실시간 WMS/TMS 연동",
                tech_perf_feature4: "모든 운송 수단 지원 (도로, 해상, 항공, 철도)",
                tech_badge_govt: "정부 지원",
                tech_govt_title: "정부 R&D 지원",
                tech_govt_desc: "다수의 정부 프로그램을 통해 검증된 기술",
                tech_govt_feature1: "TIPS R&D 지원사업 (중소벤처기업부)",
                tech_govt_feature2: "환경기술사업화 지원사업 (KEITI)",
                tech_govt_feature3: "특허 출원 8건 이상, 등록 1건",
                tech_govt_feature4: "데이터사업자 인증",
                tech_badge_research: "R&D 리더십",
                tech_research_title: "한국형 WTW 배출계수",
                tech_research_desc: "한국형 배출계수 분야의 선도적 연구",
                tech_research_feature1: "한국형 WTW 배출계수 R&D",
                tech_research_feature2: "현지화된 탄소 계산 정확도",
                tech_research_feature3: "표준 관련 정부 협력",
                tech_research_feature4: "학술 연구 파트너십",
                tech_badge_integration: "완전 통합",
                tech_integration_title: "End-to-End 솔루션",
                tech_integration_desc: "측정부터 보고까지 완전한 탄소 관리",
                tech_integration_feature1: "하드웨어 (DTG) + 소프트웨어 (eFuel + API)",
                tech_integration_feature2: "데이터 수집부터 국제 보고까지",
                tech_integration_feature3: "화주 및 운송사 플랫폼 통합",
                tech_integration_feature4: "클라우드 기반 중앙 관리",
                // Team Section
                team_label: "우리 팀",
                team_title: "팀 구성",
                team_description: "녹색 물류 혁신을 주도하는 전문가 팀",
                team_stat_members: "팀원",
                team_stat_experience: "평균 경력 (년)",
                team_stat_phds: "박사",
                team_stat_dedicated: "녹색 물류 전담",
                team_leadership: "리더십",
                role_ceo: "대표이사",
                role_ceo_1: "전략 방향 및 비전",
                role_ceo_2: "정부 관계 및 파트너십",
                role_ceo_3: "사업 개발",
                role_cto: "기술이사",
                role_cto_1: "기술 전략 및 R&D",
                role_cto_2: "ISO-14083 준수 감독",
                role_cto_3: "기술 아키텍처",
                team_rd: "연구 개발",
                role_carbon: "탄소배출 전문가",
                role_carbon_1: "WTW 배출계수 연구",
                role_carbon_2: "ISO-14083 알고리즘 개발",
                role_carbon_3: "탄소 계산 엔진",
                role_ai: "AI 엔지니어",
                role_ai_1: "AI 추론 모델 개발",
                role_ai_2: "엣지 컴퓨팅 최적화",
                role_ai_3: "운전자 안전 AI 시스템",
                role_hw: "하드웨어 엔지니어",
                role_hw_1: "DTG 하드웨어 설계",
                role_hw_2: "센서 통합",
                role_hw_3: "제조 및 품질 관리",
                team_software: "소프트웨어 개발",
                role_backend: "백엔드 개발자",
                role_backend_1: "탄소 API 개발",
                role_backend_2: "클라우드 인프라",
                role_backend_3: "데이터베이스 아키텍처",
                role_frontend: "프론트엔드 개발자",
                role_frontend_1: "이퓨얼 대시보드 개발",
                role_frontend_2: "실시간 데이터 시각화",
                role_frontend_3: "UX/UI 디자인 구현",
                team_expertise_title: "집단 전문성",
                expertise_iso: "ISO-14083 국제 표준",
                expertise_ai: "AI 및 머신러닝",
                expertise_carbon: "탄소배출량 계산",
                expertise_logistics: "물류 및 운송",
                expertise_iot: "IoT 및 임베디드 시스템",
                expertise_cloud: "클라우드 아키텍처",
                expertise_hardware: "하드웨어 설계 및 제조",
                expertise_govt: "정부 R&D 프로그램"
            },
            en: {
                nav_home: "Home",
                nav_solutions: "Our Solutions",
                nav_who_we_are: "Who We Are",
                nav_transformation: "AI Transformation",
                nav_dtg: "AI DTG",
                nav_dashboard: "AI Dashboard",
                nav_solutions_status: "Solutions Status",
                nav_company: "Company Overview",
                nav_team: "Our Team",
                nav_timeline: "Development Timeline",
                nav_certifications: "Certifications & Awards",
                nav_tech_diff: "Technical Differentiation",
                hero_subtitle: "World-Class AI Transformation Platform",
                hero_description: "World's leading integrated solution for transforming old freight trucks into advanced AI vehicles<br>AI-based safety enhancement and international standard carbon measurement and reduction system",
                btn_explore: "Explore Products",
                btn_transformation: "AI Transformation",
                transformation_label: "AI TRANSFORMATION",
                transformation_title: "AI Transformation (AX) for Old Freight Trucks",
                transformation_description: "Upgrade existing freight trucks to smart vehicles with cutting-edge AI technology<br>Simultaneously achieve driver safety and environmental protection",
                safety_title: "AI-Based Driver and Cargo Safety Enhancement",
                safety_description: "Detect driver fatigue, drowsiness, and distraction through real-time AI inference<br>and provide immediate alerts. Continuously monitor cargo status to<br>prevent accidents and ensure safe transportation.",
                carbon_title: "AI-Based International Standard Carbon Measurement and Reduction",
                carbon_description: "Precise carbon emission measurement system complying with ISO 14064 international standards<br>Monitor real-time carbon emissions and maximize fuel efficiency through AI optimization<br>to effectively reduce carbon emissions.",
                dtg_label: "AI HARDWARE",
                dtg_title: "GLEC AI DTG",
                dtg_description: "Next-generation AI digital tachograph that monitors and optimizes<br>driver safety and vehicle efficiency in real-time",
                ai_inference_title: "Real-time AI Inference System",
                ai_inference_description: "Immediate risk detection and response possible with high-precision sensors and edge AI computing.<br>Real-time analysis of driver status, road conditions, and cargo status<br>to prevent accidents and ensure safe operation.",
                "5g_cloud_title": "5G Connectivity & Cloud Integration",
                "5g_cloud_description": "Transmit real-time data to the cloud through ultra-high-speed 5G network<br>and provide insights through big data analysis. Real-time integration with vehicle control center<br>enables immediate response.",
                dashboard_label: "AI SOFTWARE",
                dashboard_title: "GLEC AI Dashboard",
                dashboard_description: "Integrated AI dashboard system that visualizes and analyzes<br>vehicle operation data in real-time to provide optimal transportation efficiency",
                data_visualization_title: "Real-time Data Visualization",
                data_visualization_description: "Intuitive interface allows drivers and managers to grasp all information at a glance.<br>Monitor and analyze all data including vehicle location, route, fuel consumption,<br>carbon emissions in real-time.",
                voice_agent_title: "AI Voice Conversational Agent",
                voice_agent_description: "Real-time AI voice recognition and conversation system provides immediate emergency safety alerts<br>to drivers. Voice warnings during hazardous situations reduce accident rates by over 20%,<br>supporting safe driving through natural conversations with drivers.",
                // Technology Section
                technology_label: "Core Technology",
                technology_title: "Cutting-Edge AI & API Technology",
                technology_description: "World-leading AI technology and international standard carbon measurement API<br>Creating sustainable logistics through innovation",
                glec_ai_title: "GLEC AI - 20B LLM Real-time Inference Engine",
                ai_safety_badge: "AI Safety",
                // CES 2026 Section
                nav_technology: "CORE TECHNOLOGY",
                nav_contact: "Contact",
                nav_ces2026: "CES 2026",
                ces_title: "Meet Us at CES 2026",
                ces_subtitle: "Experience the Future of AI Transportation",
                ces_description: "Join GLEC at the world's most influential tech event. Discover our innovative AI DTG solutions and see how we're transforming the transportation industry with cutting-edge artificial intelligence.",
                ces_dates_label: "Dates",
                ces_dates_value: "January 6-9, 2026",
                ces_location_label: "Location",
                ces_location_value: "Las Vegas, Nevada",
                ces_venue_label: "Venue",
                ces_venue_value: "Eureka Hall",
                ces_booth_label: "Booth",
                ces_booth_value: "Visit Us Soon",
                ces_invitation_title: "Get Your CES 2026 Invitation",
                ces_email_label: "Your Email Address",
                ces_email_placeholder: "Enter your email to receive CES 2026 invitation",
                ces_submit_btn: "Request Invitation",
                // Company Overview
                company_label: "ABOUT US",
                company_title: "Company Overview",
                founded_label: "Founded",
                founded_detail: "Startup",
                location_label: "Location",
                location_value: "South Korea",
                location_detail: "Seoul HQ",
                specialization_label: "Specialization",
                specialization_value: "Green Logistics",
                specialization_detail: "ISO-14083",
                vision_title: "Our Vision",
                vision_text: "Korea's only logistics international standard tech company supporting green logistics services",
                mission_title: "Our Mission",
                mission_text: "Building a sustainable logistics ecosystem and establishing a carbon circulation structure through international standard-based technology and consulting",
                values_title: "Core Values",
                value_standards: "International Standards",
                value_standards_desc: "ISO-14083 compliant solutions",
                value_innovation: "Innovation",
                value_innovation_desc: "Next-gen DTG with AI capabilities",
                value_sustainability: "Sustainability",
                value_sustainability_desc: "Green logistics transformation",
                value_partnership: "Partnership",
                value_partnership_desc: "Global collaboration network",
                // Solutions Section
                solutions_label: "OUR SOLUTIONS",
                solutions_title: "Solutions & Development Status",
                solutions_description: "Cutting-edge green logistics solutions under development",
                status_development: "Under Development",
                status_active: "In Service",
                launch_march_2026: "Launch: March 2026",
                efuel_title: "eFuel",
                efuel_subtitle: "Freight Carbon Monitoring Solution",
                tips_program: "🏆 TIPS R&D Program 2024",
                efuel_feature_1: "Real-time carbon emission monitoring",
                efuel_feature_2: "Scope 3 emissions management",
                efuel_feature_3: "ISO-14083 standard compliance",
                efuel_feature_4: "WMS/TMS system integration",
                efuel_feature_5: "Automated CDP, SBT, CBAM reporting",
                dtg_subtitle_full: "Digital Tachograph",
                env_program: "🏆 Environmental Tech Program 2025",
                dtg_feature_1: "Next-gen vehicle operation recorder",
                dtg_feature_2: "LTE-based automatic data collection",
                dtg_feature_3: "Real-time carbon emission measurement",
                dtg_feature_4: "Touch smart display interface",
                dtg_feature_5: "Qualcomm SC200E AP (8GB RAM + 32GB HDD)",
                api_subtitle: "Logistics Carbon Calculation API",
                api_feature_1: "48 APIs for carbon calculation",
                api_feature_2: "0.5 second response time",
                api_feature_3: "ISO-14083 standard engine",
                api_feature_4: "Shipper/carrier system integration",
                api_feature_5: "Supports all transport modes",
                // Certifications Section
                cert_label: "ACHIEVEMENTS",
                cert_title: "Government Support & Certifications",
                govt_funding_title: "Government Funding & Awards",
                cert_tips: "TIPS R&D Program",
                cert_tips_desc: "Ministry of SMEs and Startups",
                cert_logistics: "Logistics Startup",
                cert_logistics_desc: "Ministry of Land, Infrastructure and Transport",
                cert_data: "Data Business Operator",
                cert_data_desc: "Ministry of Science and ICT",
                cert_env: "Environmental Tech Program",
                cert_env_desc: "Korea Environmental Industry & Technology Institute",
                cert_opinet: "O'Pinnet Startup",
                cert_opinet_desc: "Startup Designation",
                tech_achievements_title: "Technical Achievements",
                patents_filed: "Patents Filed",
                patents_registered: "Patent Registered",
                copyright: "Copyright Registered",
                iso_translation: "ISO-14083 Korean Translation",
                wtw_research: "Korea WTW Emission Factor R&D",
                // Timeline Section
                timeline_label: "ROADMAP",
                timeline_title: "Development Timeline",
                timeline_description: "Our journey from foundation to innovation in green logistics",
                timeline_2023_title: "GLEC Inc. Founded",
                timeline_2023_desc: "Established as Korea's specialized logistics carbon tech startup",
                timeline_2023_highlight1: "🏢 Company Establishment",
                timeline_2023_highlight2: "🎯 Vision Setting",
                timeline_2024_title: "TIPS R&D Program Selection",
                timeline_2024_desc: "Selected by Ministry of SMEs and Startups for TIPS R&D Program",
                timeline_2024_highlight1: "🏆 TIPS R&D Program",
                timeline_2024_highlight2: "🌱 eFuel Development Started",
                timeline_2024_highlight3: "🚀 Multiple Certifications",
                timeline_2025_title: "Environmental Tech Program Selection",
                timeline_2025_desc: "Selected by Korea Environmental Industry & Technology Institute",
                timeline_2025_highlight1: "🏆 Environmental Tech Program",
                timeline_2025_highlight2: "🚛 GLEC DTG Development Started",
                timeline_2026_title: "Product Launch",
                timeline_2026_desc: "Official launch of eFuel and GLEC DTG solutions",
                timeline_2026_highlight1: "🎉 eFuel Launch (March 2026)",
                timeline_2026_highlight2: "🎉 GLEC DTG Launch (March 2026)",
                timeline_2026_highlight3: "🌍 Market Entry",
                timeline_status_development: "Development Phase",
                // Technical Differentiation Section
                tech_diff_label: "TECHNOLOGY",
                tech_diff_title: "Technical Differentiation",
                tech_diff_description: "Our competitive advantages in green logistics technology",
                tech_badge_iso: "INTERNATIONAL STANDARD",
                tech_iso_title: "ISO-14083 International Standard",
                tech_iso_desc: "Korea's only logistics carbon emission calculation solution complying with ISO-14083 international standard",
                tech_iso_feature1: "Global standard compliance for cross-border logistics",
                tech_iso_feature2: "Official ISO-14083 Korean translation contributor",
                tech_iso_feature3: "Well-to-Wheel (WTW) analysis capability",
                tech_iso_feature4: "CDP, SBT, CBAM reporting automation",
                tech_badge_ai: "AI INNOVATION",
                tech_ai_title: "AI-Powered Digital Tachograph",
                tech_ai_desc: "Next-generation DTG with integrated AI for safety and carbon monitoring",
                tech_ai_feature1: "Real-time AI inference (driver fatigue, drowsiness detection)",
                tech_ai_feature2: "Edge computing with Qualcomm SC200E chipset",
                tech_ai_feature3: "Simultaneous carbon emission measurement",
                tech_ai_feature4: "5G/LTE cloud synchronization",
                tech_badge_performance: "HIGH PERFORMANCE",
                tech_perf_title: "Real-time Carbon Monitoring",
                tech_perf_desc: "Ultra-fast API response with precision carbon calculation",
                tech_perf_feature1: "0.5 second average API response time",
                tech_perf_feature2: "48+ specialized carbon calculation APIs",
                tech_perf_feature3: "Real-time WMS/TMS integration",
                tech_perf_feature4: "All transport modes supported (road, sea, air, rail)",
                tech_badge_govt: "GOVERNMENT BACKED",
                tech_govt_title: "Government-Backed R&D",
                tech_govt_desc: "Validated technology through multiple government programs",
                tech_govt_feature1: "TIPS R&D Program (Ministry of SMEs)",
                tech_govt_feature2: "Environmental Tech Program (KEITI)",
                tech_govt_feature3: "8+ patents filed, 1 registered",
                tech_govt_feature4: "Data business operator certification",
                tech_badge_research: "R&D LEADERSHIP",
                tech_research_title: "Korea WTW Emission Factor",
                tech_research_desc: "Pioneering research in Korea-specific emission factors",
                tech_research_feature1: "Korea WTW emission factor R&D",
                tech_research_feature2: "Localized carbon calculation accuracy",
                tech_research_feature3: "Government collaboration on standards",
                tech_research_feature4: "Academic research partnerships",
                tech_badge_integration: "FULL INTEGRATION",
                tech_integration_title: "End-to-End Solution",
                tech_integration_desc: "Complete carbon management from measurement to reporting",
                tech_integration_feature1: "Hardware (DTG) + Software (eFuel + API)",
                tech_integration_feature2: "Data collection to international reporting",
                tech_integration_feature3: "Shipper & carrier platform integration",
                tech_integration_feature4: "Cloud-based centralized management",
                // Team Section
                team_label: "OUR TEAM",
                team_title: "Team Composition",
                team_description: "Expert team driving green logistics innovation",
                team_stat_members: "Team Members",
                team_stat_experience: "Years Avg. Experience",
                team_stat_phds: "PhDs",
                team_stat_dedicated: "Dedicated to Green Logistics",
                team_leadership: "Leadership",
                role_ceo: "CEO",
                role_ceo_1: "Strategic direction & vision",
                role_ceo_2: "Government relations & partnerships",
                role_ceo_3: "Business development",
                role_cto: "CTO",
                role_cto_1: "Technology strategy & R&D",
                role_cto_2: "ISO-14083 compliance oversight",
                role_cto_3: "Technical architecture",
                team_rd: "Research & Development",
                role_carbon: "Carbon Emission Specialist",
                role_carbon_1: "WTW emission factor research",
                role_carbon_2: "ISO-14083 algorithm development",
                role_carbon_3: "Carbon calculation engine",
                role_ai: "AI Engineer",
                role_ai_1: "AI inference model development",
                role_ai_2: "Edge computing optimization",
                role_ai_3: "Driver safety AI systems",
                role_hw: "Hardware Engineer",
                role_hw_1: "DTG hardware design",
                role_hw_2: "Sensor integration",
                role_hw_3: "Manufacturing & quality control",
                team_software: "Software Development",
                role_backend: "Backend Developer",
                role_backend_1: "Carbon API development",
                role_backend_2: "Cloud infrastructure",
                role_backend_3: "Database architecture",
                role_frontend: "Frontend Developer",
                role_frontend_1: "eFuel dashboard development",
                role_frontend_2: "Real-time data visualization",
                role_frontend_3: "UX/UI design implementation",
                team_expertise_title: "Collective Expertise",
                expertise_iso: "ISO-14083 International Standards",
                expertise_ai: "AI & Machine Learning",
                expertise_carbon: "Carbon Emission Calculation",
                expertise_logistics: "Logistics & Transportation",
                expertise_iot: "IoT & Embedded Systems",
                expertise_cloud: "Cloud Architecture",
                expertise_hardware: "Hardware Design & Manufacturing",
                expertise_govt: "Government R&D Programs"
            },
            zh: {
                nav_home: "主页",
                nav_solutions: "解决方案",
                nav_who_we_are: "关于我们",
                nav_transformation: "AI 转换",
                nav_dtg: "AI DTG",
                nav_dashboard: "AI 仪表板",
                nav_solutions_status: "解决方案状态",
                nav_company: "公司概况",
                nav_team: "我们的团队",
                nav_timeline: "发展历程",
                nav_certifications: "认证与奖项",
                nav_tech_diff: "技术差异化",
                hero_subtitle: "世界级AI转型平台",
                hero_description: "将老旧货车转换为先进AI车辆的世界领先综合解决方案<br>基于AI的安全提升和国际标准碳测量及减排系统",
                btn_explore: "探索产品",
                btn_transformation: "AI 转换",
                transformation_label: "AI 转换",
                transformation_title: "老旧货车的AI转换 (AX)",
                transformation_description: "利用尖端AI技术将现有货车升级为智能车辆<br>同时实现驾驶员安全和环境保护",
                safety_title: "基于AI的驾驶员和货物安全提升",
                safety_description: "通过实时AI推理检测驾驶员疲劳、困倦和分心<br>并提供即时警报。持续监控货物状态<br>预防事故并确保安全运输。",
                carbon_title: "基于AI的国际标准碳测量和减排",
                carbon_description: "符合ISO 14064国际标准的精密碳排放测量系统<br>实时监控碳排放，通过AI优化最大化燃油效率<br>有效减少碳排放。",
                dtg_label: "AI 硬件",
                dtg_title: "GLEC AI DTG",
                dtg_description: "下一代AI数字行车记录仪，实时监控和优化<br>驾驶员安全和车辆效率",
                ai_inference_title: "实时AI推理系统",
                ai_inference_description: "高精度传感器和边缘AI计算实现即时风险检测和响应。<br>实时分析驾驶员状态、道路状况和货物状态<br>预防事故并确保安全运行。",
                "5g_cloud_title": "5G连接和云集成",
                "5g_cloud_description": "通过超高速5G网络将实时数据传输到云端<br>并通过大数据分析提供洞察。与车辆控制中心<br>实时集成，实现即时响应。",
                dashboard_label: "AI 软件",
                dashboard_title: "GLEC AI 仪表板",
                dashboard_description: "集成AI仪表板系统，实时可视化和分析<br>车辆运行数据，提供最佳运输效率",
                data_visualization_title: "实时数据可视化",
                data_visualization_description: "直观界面让驾驶员和管理员一目了然地掌握所有信息。<br>实时监控和分析包括车辆位置、路线、燃油消耗、<br>碳排放在内的所有数据。",
                voice_agent_title: "AI语音对话代理",
                voice_agent_description: "实时AI语音识别和对话系统为驾驶员提供即时紧急安全警报。<br>危险情况下的语音警告可将事故率降低20%以上，<br>通过与驾驶员的自然对话支持安全驾驶。",
                // Technology Section
                technology_label: "核心技术",
                technology_title: "尖端AI与API技术",
                technology_description: "世界领先的AI技术与国际标准碳测量API<br>通过创新实现可持续物流",
                glec_ai_title: "GLEC AI - 200亿参数LLM实时推理引擎",
                ai_safety_badge: "AI安全",
                // CES 2026 Section
                nav_technology: "CORE TECHNOLOGY",
                nav_contact: "联系我们",
                nav_ces2026: "CES 2026",
                ces_title: "CES 2026见面会",
                ces_subtitle: "体验AI运输的未来",
                ces_description: "在世界最具影响力的科技盛会中与GLEC相遇。发现我们创新的AI DTG解决方案，了解我们如何通过尖端人工智能技术变革运输行业。",
                ces_dates_label: "日期",
                ces_dates_value: "2026年1月6-9日",
                ces_location_label: "地点",
                ces_location_value: "内华达州拉斯维加斯",
                ces_venue_label: "场馆",
                ces_venue_value: "尤里卡大厅",
                ces_booth_label: "展位",
                ces_booth_value: "敬请期待",
                ces_invitation_title: "获取CES 2026邀请函",
                ces_email_label: "您的邮箱地址",
                ces_email_placeholder: "输入邮箱地址以接收CES 2026邀请函",
                ces_submit_btn: "申请邀请函",
                // Company Overview
                company_label: "关于我们",
                company_title: "公司概况",
                founded_label: "成立时间",
                founded_detail: "初创企业",
                location_label: "地点",
                location_value: "韩国",
                location_detail: "首尔总部",
                specialization_label: "专业领域",
                specialization_value: "绿色物流",
                specialization_detail: "ISO-14083",
                vision_title: "愿景",
                vision_text: "韩国唯一支持绿色物流服务的物流国际标准技术公司",
                mission_title: "使命",
                mission_text: "通过基于国际标准的技术和咨询，构建可持续物流生态系统，完善碳循环结构",
                values_title: "核心价值观",
                value_standards: "国际标准",
                value_standards_desc: "符合ISO-14083的解决方案",
                value_innovation: "创新",
                value_innovation_desc: "配备AI的下一代DTG",
                value_sustainability: "可持续性",
                value_sustainability_desc: "绿色物流转型",
                value_partnership: "合作伙伴",
                value_partnership_desc: "全球合作网络",
                // Solutions Section
                solutions_label: "解决方案",
                solutions_title: "解决方案及开发现状",
                solutions_description: "开发中的尖端绿色物流解决方案",
                status_development: "开发中",
                status_active: "服务中",
                launch_march_2026: "发布: 2026年3月",
                efuel_title: "eFuel",
                efuel_subtitle: "货运碳监测解决方案",
                tips_program: "🏆 TIPS研发计划 2024",
                efuel_feature_1: "实时碳排放监测",
                efuel_feature_2: "Scope 3排放管理",
                efuel_feature_3: "符合ISO-14083标准",
                efuel_feature_4: "WMS/TMS系统集成",
                efuel_feature_5: "CDP、SBT、CBAM自动报告",
                dtg_subtitle_full: "数字式行车记录仪",
                env_program: "🏆 环境技术计划 2025",
                dtg_feature_1: "下一代车辆运行记录仪",
                dtg_feature_2: "基于LTE的自动数据采集",
                dtg_feature_3: "实时碳排放测量",
                dtg_feature_4: "触摸智能显示屏",
                dtg_feature_5: "Qualcomm SC200E AP (8GB RAM + 32GB HDD)",
                api_subtitle: "物流碳计算API",
                api_feature_1: "用于碳计算的48个API",
                api_feature_2: "0.5秒响应时间",
                api_feature_3: "ISO-14083标准引擎",
                api_feature_4: "托运人/承运人系统集成",
                api_feature_5: "支持所有运输方式",
                // Certifications Section
                cert_label: "成就",
                cert_title: "政府支持与认证",
                govt_funding_title: "政府资助与奖项",
                cert_tips: "TIPS研发计划",
                cert_tips_desc: "中小企业和创业部",
                cert_logistics: "物流初创企业",
                cert_logistics_desc: "国土交通部",
                cert_data: "数据业务运营商",
                cert_data_desc: "科学技术信息通信部",
                cert_env: "环境技术计划",
                cert_env_desc: "韩国环境产业技术院",
                cert_opinet: "O'Pinnet初创企业",
                cert_opinet_desc: "初创企业指定",
                tech_achievements_title: "技术成就",
                patents_filed: "专利申请",
                patents_registered: "专利注册",
                copyright: "版权注册",
                iso_translation: "ISO-14083韩文翻译",
                wtw_research: "韩国WTW排放因子研发",
                // Timeline Section
                timeline_label: "路线图",
                timeline_title: "发展时间表",
                timeline_description: "从创立到绿色物流创新的历程",
                timeline_2023_title: "GLEC Inc. 成立",
                timeline_2023_desc: "作为韩国专业物流碳技术初创企业成立",
                timeline_2023_highlight1: "🏢 公司成立",
                timeline_2023_highlight2: "🎯 愿景设定",
                timeline_2024_title: "入选TIPS研发项目",
                timeline_2024_desc: "入选中小企业部TIPS研发支持项目",
                timeline_2024_highlight1: "🏆 TIPS研发项目",
                timeline_2024_highlight2: "🌱 eFuel开发启动",
                timeline_2024_highlight3: "🚀 多项认证",
                timeline_2025_title: "入选环境技术商业化项目",
                timeline_2025_desc: "入选韩国环境产业技术院环境技术商业化支持项目",
                timeline_2025_highlight1: "🏆 环境技术项目",
                timeline_2025_highlight2: "🚛 GLEC DTG开发启动",
                timeline_2026_title: "产品发布",
                timeline_2026_desc: "eFuel和GLEC DTG解决方案正式发布",
                timeline_2026_highlight1: "🎉 eFuel发布（2026年3月）",
                timeline_2026_highlight2: "🎉 GLEC DTG发布（2026年3月）",
                timeline_2026_highlight3: "🌍 市场进入",
                timeline_status_development: "开发阶段",
                // Technical Differentiation Section
                tech_diff_label: "技术",
                tech_diff_title: "技术差异化",
                tech_diff_description: "我们在绿色物流技术方面的竞争优势",
                tech_badge_iso: "国际标准",
                tech_iso_title: "ISO-14083国际标准",
                tech_iso_desc: "韩国唯一符合ISO-14083国际标准的物流碳排放计算解决方案",
                tech_iso_feature1: "跨境物流全球标准合规",
                tech_iso_feature2: "官方ISO-14083韩文翻译贡献者",
                tech_iso_feature3: "WTW（油井到车轮）分析能力",
                tech_iso_feature4: "CDP、SBT、CBAM报告自动化",
                tech_badge_ai: "AI创新",
                tech_ai_title: "AI驱动的数字行车记录仪",
                tech_ai_desc: "集成AI的下一代DTG，用于安全和碳监控",
                tech_ai_feature1: "实时AI推理（驾驶员疲劳、困倦检测）",
                tech_ai_feature2: "Qualcomm SC200E芯片组边缘计算",
                tech_ai_feature3: "同步碳排放测量",
                tech_ai_feature4: "5G/LTE云同步",
                tech_badge_performance: "高性能",
                tech_perf_title: "实时碳监控",
                tech_perf_desc: "精确碳计算的超快API响应",
                tech_perf_feature1: "平均0.5秒API响应时间",
                tech_perf_feature2: "48个以上专业碳计算API",
                tech_perf_feature3: "实时WMS/TMS集成",
                tech_perf_feature4: "支持所有运输模式（公路、海运、航空、铁路）",
                tech_badge_govt: "政府支持",
                tech_govt_title: "政府支持的研发",
                tech_govt_desc: "通过多个政府项目验证的技术",
                tech_govt_feature1: "TIPS研发项目（中小企业部）",
                tech_govt_feature2: "环境技术项目（KEITI）",
                tech_govt_feature3: "申请专利8项以上，注册1项",
                tech_govt_feature4: "数据业务运营商认证",
                tech_badge_research: "研发领导力",
                tech_research_title: "韩国WTW排放因子",
                tech_research_desc: "韩国特定排放因子的开创性研究",
                tech_research_feature1: "韩国WTW排放因子研发",
                tech_research_feature2: "本地化碳计算精度",
                tech_research_feature3: "标准方面的政府合作",
                tech_research_feature4: "学术研究伙伴关系",
                tech_badge_integration: "完全集成",
                tech_integration_title: "端到端解决方案",
                tech_integration_desc: "从测量到报告的完整碳管理",
                tech_integration_feature1: "硬件（DTG）+软件（eFuel + API）",
                tech_integration_feature2: "数据收集到国际报告",
                tech_integration_feature3: "托运人和承运人平台集成",
                tech_integration_feature4: "基于云的集中管理",
                // Team Section
                team_label: "我们的团队",
                team_title: "团队组成",
                team_description: "推动绿色物流创新的专家团队",
                team_stat_members: "团队成员",
                team_stat_experience: "平均经验年限",
                team_stat_phds: "博士",
                team_stat_dedicated: "专注于绿色物流",
                team_leadership: "领导团队",
                role_ceo: "首席执行官",
                role_ceo_1: "战略方向和愿景",
                role_ceo_2: "政府关系和合作伙伴关系",
                role_ceo_3: "业务发展",
                role_cto: "首席技术官",
                role_cto_1: "技术战略和研发",
                role_cto_2: "ISO-14083合规监督",
                role_cto_3: "技术架构",
                team_rd: "研究与开发",
                role_carbon: "碳排放专家",
                role_carbon_1: "WTW排放因子研究",
                role_carbon_2: "ISO-14083算法开发",
                role_carbon_3: "碳计算引擎",
                role_ai: "AI工程师",
                role_ai_1: "AI推理模型开发",
                role_ai_2: "边缘计算优化",
                role_ai_3: "驾驶员安全AI系统",
                role_hw: "硬件工程师",
                role_hw_1: "DTG硬件设计",
                role_hw_2: "传感器集成",
                role_hw_3: "制造和质量控制",
                team_software: "软件开发",
                role_backend: "后端开发人员",
                role_backend_1: "碳API开发",
                role_backend_2: "云基础设施",
                role_backend_3: "数据库架构",
                role_frontend: "前端开发人员",
                role_frontend_1: "eFuel仪表板开发",
                role_frontend_2: "实时数据可视化",
                role_frontend_3: "UX/UI设计实现",
                team_expertise_title: "集体专业知识",
                expertise_iso: "ISO-14083国际标准",
                expertise_ai: "AI和机器学习",
                expertise_carbon: "碳排放计算",
                expertise_logistics: "物流和运输",
                expertise_iot: "物联网和嵌入式系统",
                expertise_cloud: "云架构",
                expertise_hardware: "硬件设计和制造",
                expertise_govt: "政府研发项目"
            }
        };
        
        let currentLang = 'en';

        // Initialize immediately - script is at end of body
        (function() {
            console.log('🚀 Initializing language selector...');

            const languageButton = document.getElementById('languageButton');
            const languageDropdown = document.getElementById('languageDropdown');
            const languageOptions = document.querySelectorAll('.language-option');
            const currentLanguageSpan = document.getElementById('currentLanguage');

            if (!languageButton || !languageDropdown || !currentLanguageSpan) {
                console.error('❌ Language selector elements not found!');
                return;
            }

            console.log('✅ All elements found:', {
                button: !!languageButton,
                dropdown: !!languageDropdown,
                options: languageOptions.length,
                span: !!currentLanguageSpan
            });

            // Toggle dropdown
            languageButton.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();

                const isActive = languageDropdown.classList.contains('active');
                console.log('🔘 Button clicked! Currently active:', isActive);

                if (isActive) {
                    languageDropdown.classList.remove('active');
                    console.log('🔽 Dropdown closed');
                } else {
                    languageDropdown.classList.add('active');
                    console.log('🔼 Dropdown opened');
                }
            });

            // Handle language selection
            languageOptions.forEach(option => {
                option.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();

                    const lang = this.getAttribute('data-lang');
                    const text = this.textContent.trim();

                    console.log('🌐 Language selected:', lang, text);

                    // Update display
                    currentLanguageSpan.textContent = text;
                    currentLang = lang;

                    // Update active states
                    languageOptions.forEach(opt => opt.classList.remove('active'));
                    this.classList.add('active');

                    // Translate page
                    translatePage(lang);

                    // Close dropdown
                    languageDropdown.classList.remove('active');

                    console.log('✅ Translation complete for:', lang);
                });
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', function(e) {
                if (!languageButton.contains(e.target) && !languageDropdown.contains(e.target)) {
                    if (languageDropdown.classList.contains('active')) {
                        languageDropdown.classList.remove('active');
                        console.log('🔽 Dropdown closed (outside click)');
                    }
                }
            });

            console.log('✅ Language selector initialized successfully!');
        })();
        
        // Translation function
        function translatePage(lang) {
            const elements = document.querySelectorAll('[data-translate]');
            elements.forEach(element => {
                const key = element.getAttribute('data-translate');
                if (translations[lang] && translations[lang][key]) {
                    element.innerHTML = translations[lang][key];
                }
            });
        }
        
        // Auto-play all videos on page load
        window.addEventListener('load', () => {
            const allVideos = document.querySelectorAll('.transformation-video, .dtg-video, .dashboard-video');
            allVideos.forEach(video => {
                video.play().catch(function(error) {
                    console.log('Auto-play was prevented:', error);
                });
            });
        });
        
        // Smooth Scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // Navbar Scroll Effect
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                navbar.style.background = 'rgba(0, 0, 0, 0.98)';
                navbar.style.backdropFilter = 'blur(30px)';
            } else {
                navbar.style.background = 'linear-gradient(180deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.8) 100%)';
                navbar.style.backdropFilter = 'blur(20px)';
            }
            
            lastScroll = currentScroll;
        });
        
        
        // Intersection Observer for Animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observe all feature cards and product cards
        document.querySelectorAll('.feature-card, .product-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
            observer.observe(card);
        });
        
        // Auto-play transformation video when in viewport
        const videoObserverOptions = {
            threshold: 0.5,
            rootMargin: '0px'
        };
        
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const video = entry.target;
                if (entry.isIntersecting) {
                    video.play().catch(function(error) {
                        console.log('Video auto-play prevented:', error);
                    });
                } else {
                    video.pause();
                }
            });
        }, videoObserverOptions);
        
        // Observe all videos for auto-play
        const allVideos = document.querySelectorAll('.transformation-video, .dtg-video, .dashboard-video');
        allVideos.forEach(video => {
            videoObserver.observe(video);
        });
        
        // Parallax Effect for Hero Video
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroVideo = document.querySelector('.hero-video-container');
            if (heroVideo && scrolled < window.innerHeight) {
                heroVideo.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });
        
        // Dynamic Text Glow Effect
        const glowingText = document.querySelector('.glowing-text');
        if (glowingText) {
            setInterval(() => {
                const hue = Math.random() * 360;
                glowingText.style.filter = `drop-shadow(0 0 20px hsl(${hue}, 100%, 50%))`;
            }, 3000);
        }
        
        // Performance Optimization - Lazy Load Videos
        const videos = document.querySelectorAll('video[data-src]');
        const lazyVideoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const video = entry.target;
                    video.src = video.dataset.src;
                    video.load();
                    lazyVideoObserver.unobserve(video);
                }
            });
        });

        videos.forEach(video => {
            lazyVideoObserver.observe(video);
        });

        // CES 2026 Invitation Form Handler
        window.addEventListener('load', function() {
            const cesForm = document.getElementById('cesInvitationForm');
            const cesPopup = document.getElementById('cesPopup');

            if (cesForm && cesPopup) {
                cesForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    console.log('Form submitted');

                    const email = document.getElementById('cesEmail').value;
                    console.log('Email:', email);

                    if (email) {
                        // Show success popup first
                        console.log('Showing popup');
                        cesPopup.style.display = 'block';

                        // Create mailto link
                        const subject = encodeURIComponent('CES 2026 Invitation Request from GLEC Website');
                        const body = encodeURIComponent(`Hello GLEC Team,

I would like to request an invitation to meet GLEC at CES 2026.

My email address: ${email}
Date requested: ${new Date().toLocaleDateString()}

Please send me the details about your booth location and meeting schedule.

Thank you!`);

                        const mailtoLink = `mailto:contact@glec.io?subject=${subject}&body=${body}`;

                        // Open mailto with delay
                        setTimeout(() => {
                            window.location.href = mailtoLink;
                        }, 1000);

                        // Reset form
                        cesForm.reset();
                    }
                });
            } else {
                console.log('Form or popup not found');
            }
        });

        // Close popup function
        function closeCesPopup() {
            document.getElementById('cesPopup').style.display = 'none';
        }

        // Close popup when clicking outside
        const cesPopupElement = document.getElementById('cesPopup');
        if (cesPopupElement) {
            cesPopupElement.addEventListener('click', function(e) {
                if (e.target === this) {
                    closeCesPopup();
                }
            });
        }
    </script>
