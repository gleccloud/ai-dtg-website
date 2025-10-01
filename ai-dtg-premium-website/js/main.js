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
        "lte_cloud_title": "LTE 연결 & 클라우드 통합",
        "lte_cloud_description": "초고속 LTE 네트워크를 통해 실시간 데이터를 클라우드로 전송하고<br>빅데이터 분석을 통한 인사이트를 제공합니다. 차량 관제 센터와<br>실시간으로 연동되어 즉각적인 대응이 가능합니다.",
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
        glec_ai_card1_title: "20B 파라미터 LLM",
        glec_ai_card1_desc: "사고 다발 지역 데이터셋(날씨, 시간, 위치 패턴)의 임베디드 가중치를 활용한 실시간 추론을 위한 4비트 양자화",
        glec_ai_card2_title: "실시간 데이터 통합",
        glec_ai_card2_desc: "CAN 프로토콜 데이터, GPS 추적, 실시간 교통 사고 및 혼잡 정보를 실시간 임베딩 가중치로 처리",
        glec_ai_card3_title: "차량 컨텍스트 프로토콜 (VCP)",
        glec_ai_card3_desc: "아날로그 트럭 센서를 위한 독자적인 데이터 통합 표준으로, 레거시 차량 시스템의 확장 임베딩 가중치 활성화",
        glec_ai_card4_title: "긴급도 기반 추론",
        glec_ai_card4_desc: "차등 민감도로 안전과 탄소 감축을 우선시하는 컨텍스트 인식 AI, 실시간 음성 에이전트를 통해 전달",
        glec_ai_stat1: "사고 감소",
        glec_ai_stat2: "파라미터",
        glec_ai_stat3: "응답 시간",
        glec_api_title: "GLEC API - ISO-14083 탄소 측정 플랫폼",
        carbon_neutral_badge: "탄소 중립",
        glec_api_card1_title: "ISO-14083 표준",
        glec_api_card1_desc: "글로벌 규정 준수를 위한 국제 화물 탄소 배출 측정 표준의 완전한 API 구현",
        glec_api_card2_title: "실시간 정량화",
        glec_api_card2_desc: "운전자의 친환경 운전 인식 및 행동 수정을 가능하게 하는 즉각적인 탄소 발자국 계산",
        glec_api_card3_title: "공급망 리포팅",
        glec_api_card3_desc: "규제 준수 및 지속가능성 이니셔티브를 위한 엔터프라이즈급 탄소 배출 리포팅",
        glec_api_card4_title: "탄소 크레딧 인프라",
        glec_api_card4_desc: "운송 탄소 크레딧 발행을 위한 핵심 플랫폼으로, 배출 감축의 수익화 가능",
        glec_api_integration_title: "원활한 DTG 통합",
        glec_api_integration_desc: "GLEC API는 GLEC DTG 하드웨어와 완벽하게 조화를 이루며, 지속가능한 물류 혁신을 위한 포괄적인 생태계를 구축합니다. 차량의 실시간 데이터가 API를 통해 흐르며, 운전자와 차량 관리자 모두에게 실행 가능한 인사이트를 제공합니다.",
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
        launch_jan_2026: "출시: 2026년 1월",
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
        tech_ai_feature4: "LTE 클라우드 동기화",
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
        team_stat_phds: "전문 네트워크",
        team_stat_dedicated: "녹색 물류 전담",
        team_leadership: "리더십",
        role_ceo_kevin: "공동대표이사 (기술총괄)",
        role_ceo_kevin_name: "강덕호 (Kevin)",
        role_ceo_kevin_1: "13년 기술 창업 경험",
        role_ceo_kevin_2: "IPO 준비, M&A EXIT 경험",
        role_ceo_kevin_3: "2016 스위스 ETH Cybathlon 로봇올림픽 한국 국가대표",
        role_ceo_stella: "공동대표이사 (운영총괄)",
        role_ceo_stella_name: "김은우 (Stella)",
        role_ceo_stella_1: "12년 조직 운영 및 전략 전문가",
        role_ceo_stella_2: "KAIST ESG KEEP School 수료",
        role_ceo_stella_3: "SFC Korea 심의위원회 위원",
        role_cto_brian: "기술이사 (CTO)",
        role_cto_brian_name: "김지원 (Brian)",
        role_cto_brian_1: "IoT 장비 개발 리드",
        role_cto_brian_2: "하드웨어 및 펌웨어 아키텍처",
        role_cto_brian_3: "R&D 연구소장",
        team_rd: "연구 개발",
        role_carbon: "IoT 장비 리드",
        role_carbon_name: "김지원",
        role_carbon_1: "IoT 장비 개발",
        role_carbon_2: "하드웨어 통합",
        role_carbon_3: "센서 기술 R&D",
        role_ai: "프론트엔드 개발자",
        role_ai_name: "심준",
        role_ai_1: "대시보드 UI/UX 개발",
        role_ai_2: "실시간 데이터 시각화",
        role_ai_3: "고객 대면 애플리케이션",
        role_hw: "백엔드 개발자",
        role_hw_name: "김영재",
        role_hw_1: "B2B 물류/ERP 개발",
        role_hw_2: "API 인프라",
        role_hw_3: "시니어 백엔드 개발자",
        team_additional: "추가 팀원",
        role_backend_bang: "백엔드 개발자",
        role_backend_bang_name: "방아현",
        role_backend_bang_1: "시니어 백엔드 개발자",
        role_backend_bang_2: "API 개발",
        role_backend_bang_3: "시스템 아키텍처",
        role_service: "서비스 기획",
        role_service_name: "지재원",
        role_service_1: "서비스 기획 및 전략",
        role_service_2: "제품 관리",
        role_service_3: "고객 경험 디자인",
        team_expertise_title: "전문 네트워크 및 전문성",
        expertise_inha: "인하대학교 물류학부 교수진 (고문)",
        expertise_kila: "한국통합물류협회 네트워크",
        expertise_keep: "KAIST ESG C-레벨 KEEP 프로그램 수료",
        expertise_iso: "ISO-14083 국제 표준",
        expertise_ai: "AI 및 머신러닝",
        expertise_carbon: "탄소배출량 계산",
        expertise_logistics: "물류 및 운송",
        expertise_iot: "IoT 및 임베디드 시스템",
        // Contact Page
        contact_title: "GLEC 연락하기",
        contact_description: "AI 기술로 차량을 혁신할 준비가 되셨나요? 지금 문의하세요.",
        contact_name_label: "이름",
        contact_name_placeholder: "이름을 입력하세요",
        contact_email_label: "이메일 주소",
        contact_email_placeholder: "이메일을 입력하세요",
        contact_company_label: "회사명",
        contact_company_placeholder: "회사명을 입력하세요",
        contact_message_label: "메시지",
        contact_message_placeholder: "문의 내용을 입력하세요",
        contact_submit_btn: "메시지 보내기",
        contact_company_info: "회사 정보",
        // CTA Section
        cta_title: "차량을 혁신할 준비가 되셨나요?",
        cta_description: "AI 기반 운송 혁명에 동참하세요. GLEC AI DTG 솔루션으로 세계 최고 수준의 안전성, 효율성, 환경적 이점을 경험하세요. 지금 문의하여 디지털 혁신 여정을 시작하세요.",
        cta_btn_start: "지금 시작하기",
        cta_btn_solutions: "솔루션 보기",
        // Footer
        footer_logo: "GLEC AI DTG 솔루션",
        footer_email_label: "이메일:",
        footer_business_label: "사업자 번호:",
        footer_address_label: "주소:",
        footer_address: "대한민국 인천광역시 연수구 컨벤시아대로 204 인천스타트업파크 1동 315호",
        footer_text: "© 2024 GLEC. All rights reserved. | AI로 운송을 혁신합니다",
        problems_label: "산업 과제",
        problems_title: "물류 산업의 핵심 문제점",
        problems_description: "물류 산업은 탄소 감축과 안전 개선을 가로막는 중대한 문제들에 직면해 있습니다",
        problem1_title: "데이터 수집 불가능",
        problem1_desc: "지입 계약 구조로 인해 물류기업은 협조를 거부하는 화물차주로부터 화물차 데이터를 수집할 수 없어 탄소배출량 계산이 불가능합니다",
        problem1_impact_label: "영향:",
        problem1_impact: "탄소 데이터 없음 = 배출 감축 불가",
        problem2_title: "예방 불가능한 안전 사고",
        problem2_desc: "실시간 모니터링 시스템 부재로 운전자 피로도와 졸음을 감지할 수 없어 매년 막대한 화물 피해와 인명 사고가 발생합니다",
        problem2_impact_label: "영향:",
        problem2_impact: "연간 수십억원의 화물 피해",
        problem3_title: "부당한 탄소 배분",
        problem3_desc: "물류기업들이 ISO-14083 표준 대신 매출 비율로 배출량을 안분하여, 프리미엄 서비스 제공업체는 톤킬로미터당 배출량이 부풀려져 탄소 손해가 발생합니다",
        problem3_impact_label: "영향:",
        problem3_impact: "불공정 경쟁 & 탄소 불평등",
        solutions_glec_label: "글렉 솔루션",
        solutions_glec_title: "글렉이 문제를 해결하는 방법",
        solutions_glec_description: "데이터 수집, 안전 모니터링, 공정한 탄소 계산을 위한 종합 솔루션",
        solution_badge: "솔루션",
        solution_premium_badge: "ISO-14083 표준",
        solution1_title: "글렉 운행기록장치 (DTG)",
        solution1_desc: "운전자 협조 없이 자동 데이터 수집이 가능한 LTE 통신 기반 법적 준수 장치",
        solution1_feature1: "LTE를 통한 실시간 자동 데이터 수집",
        solution1_feature2: "운전자 피로도 & 졸음 AI 감지",
        solution1_feature3: "운행별 탄소배출량 측정",
        solution1_solves: "문제 #1 & #2 해결",
        solution2_title: "글렉 화물차 탄소배출량 관제 서비스",
        solution2_desc: "DTG 데이터와 LTE 통신을 활용한 실시간 차량 모니터링 및 탄소배출 관제 서비스",
        solution2_feature1: "실시간 차량 상태 모니터링",
        solution2_feature2: "운행별 탄소배출량 추적",
        solution2_feature3: "운전자 안전 경보 시스템",
        solution2_solves: "문제 #1 & #2 해결",
        solution3_title: "Carbon API Console",
        solution3_desc: "ISO-14083 준수 탄소 계산 API로 물류기업 전산을 국제표준으로 업그레이드",
        solution3_feature1: "48개 이상의 ISO-14083 표준 API",
        solution3_feature2: "실시간 계산을 위한 0.5초 응답 시간",
        solution3_feature3: "공정한 톤킬로미터 기반 배출량 배분",
        solution3_solves: "문제 #3 해결",
        solves_label: "해결:"
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
        "lte_cloud_title": "LTE Connectivity & Cloud Integration",
        "lte_cloud_description": "Transmit real-time data to the cloud through ultra-high-speed LTE network<br>and provide insights through big data analysis. Real-time integration with vehicle control center<br>enables immediate response.",
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
        glec_ai_card1_title: "20B Parameter LLM",
        glec_ai_card1_desc: "4-bit quantization for real-time inference with embedded weights from accident-prone area datasets (weather, time, location patterns)",
        glec_ai_card2_title: "Real-time Data Integration",
        glec_ai_card2_desc: "CAN Protocol data, GPS tracking, live traffic incidents, and congestion information processed as real-time embedding weights",
        glec_ai_card3_title: "Vehicle Context Protocol (VCP)",
        glec_ai_card3_desc: "Proprietary data integration standard for analog truck sensors, enabling extended embedding weights from legacy vehicle systems",
        glec_ai_card4_title: "Urgency-based Inference",
        glec_ai_card4_desc: "Context-aware AI that prioritizes safety and carbon reduction with differential sensitivity, delivered through real-time voice agent",
        glec_ai_stat1: "Accident Reduction",
        glec_ai_stat2: "Parameters",
        glec_ai_stat3: "Response Time",
        glec_api_title: "GLEC API - ISO-14083 Carbon Measurement Platform",
        carbon_neutral_badge: "CARBON NEUTRAL",
        glec_api_card1_title: "ISO-14083 Standard",
        glec_api_card1_desc: "Complete API implementation of international freight carbon emission measurement standard for global compliance",
        glec_api_card2_title: "Real-time Quantification",
        glec_api_card2_desc: "Instant carbon footprint calculation enabling eco-driving awareness and behavior modification for drivers",
        glec_api_card3_title: "Supply Chain Reporting",
        glec_api_card3_desc: "Enterprise-grade carbon emission reporting for regulatory compliance and sustainability initiatives",
        glec_api_card4_title: "Carbon Credit Infrastructure",
        glec_api_card4_desc: "Core platform for transport carbon credit issuance, enabling monetization of emission reductions",
        glec_api_integration_title: "Seamless DTG Integration",
        glec_api_integration_desc: "GLEC API works in perfect harmony with GLEC DTG hardware, creating a comprehensive ecosystem for sustainable logistics transformation. Real-time data from vehicles flows through our API, providing actionable insights for both drivers and fleet managers.",
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
        launch_jan_2026: "Launch: January 2026",
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
        tech_ai_feature4: "LTE cloud synchronization",
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
        team_stat_phds: "Professional Network",
        team_stat_dedicated: "Dedicated to Green Logistics",
        team_leadership: "Leadership",
        role_ceo_kevin: "Co-CEO (Technology)",
        role_ceo_kevin_name: "Kevin Kang",
        role_ceo_kevin_1: "13 years tech startup experience",
        role_ceo_kevin_2: "IPO preparation, M&A EXIT experience",
        role_ceo_kevin_3: "2016 Swiss ETH Cybathlon Robot Olympics Korean national team",
        role_ceo_stella: "Co-CEO (Operations)",
        role_ceo_stella_name: "Stella Kim",
        role_ceo_stella_1: "12 years organizational operations & strategy expert",
        role_ceo_stella_2: "KAIST ESG KEEP School graduate",
        role_ceo_stella_3: "SFC Korea Committee member",
        role_cto_brian: "CTO (Chief Technology Officer)",
        role_cto_brian_name: "Brian Kim",
        role_cto_brian_1: "IoT device development lead",
        role_cto_brian_2: "Hardware & firmware architecture",
        role_cto_brian_3: "R&D lab director",
        team_rd: "Research & Development",
        role_carbon: "IoT Device Lead",
        role_carbon_name: "Kim Ji-won",
        role_carbon_1: "IoT device development",
        role_carbon_2: "Hardware integration",
        role_carbon_3: "Sensor technology R&D",
        role_ai: "Frontend Developer",
        role_ai_name: "Shim Jun",
        role_ai_1: "Dashboard UI/UX development",
        role_ai_2: "Real-time data visualization",
        role_ai_3: "Customer-facing applications",
        role_hw: "Backend Developer",
        role_hw_name: "Kim Young-jae",
        role_hw_1: "B2B logistics/ERP development",
        role_hw_2: "API infrastructure",
        role_hw_3: "Senior backend developer",
        team_additional: "Additional Team Members",
        role_backend_bang: "Backend Developer",
        role_backend_bang_name: "Bang Ah-hyun",
        role_backend_bang_1: "Senior backend developer",
        role_backend_bang_2: "API development",
        role_backend_bang_3: "System architecture",
        role_service: "Service Planning",
        role_service_name: "Ji Jae-won",
        role_service_1: "Service planning & strategy",
        role_service_2: "Product management",
        role_service_3: "Customer experience design",
        team_expertise_title: "Professional Network & Expertise",
        expertise_inha: "Inha University Logistics Professors (Advisors)",
        expertise_kila: "Korea Integrated Logistics Association Network",
        expertise_keep: "KAIST ESG C-Level KEEP Program Graduate",
        expertise_iso: "ISO-14083 International Standards",
        expertise_ai: "AI & Machine Learning",
        expertise_carbon: "Carbon Emission Calculation",
        expertise_logistics: "Logistics & Transportation",
        expertise_iot: "IoT & Embedded Systems",
        // Contact Page
        contact_title: "Contact GLEC",
        contact_description: "Ready to transform your fleet with AI technology? Get in touch with us today.",
        contact_name_label: "Your Name",
        contact_name_placeholder: "Enter your name",
        contact_email_label: "Email Address",
        contact_email_placeholder: "Enter your email",
        contact_company_label: "Company Name",
        contact_company_placeholder: "Enter your company name",
        contact_message_label: "Message",
        contact_message_placeholder: "Tell us about your inquiry",
        contact_submit_btn: "Send Message",
        contact_company_info: "Company Information",
        // CTA Section
        cta_title: "Ready to Transform Your Fleet?",
        cta_description: "Join the AI revolution in transportation. Experience world-class safety, efficiency, and environmental benefits with GLEC AI DTG solutions. Contact us today to start your digital transformation journey.",
        cta_btn_start: "Get Started Today",
        cta_btn_solutions: "View Solutions",
        // Footer
        footer_logo: "GLEC AI DTG SOLUTIONS",
        footer_email_label: "Email:",
        footer_business_label: "Business Number:",
        footer_address_label: "Address:",
        footer_address: "Incheon Startup Park, 315-ho, 204 Convensia-daero, Yeonsu-gu, Incheon, Republic of Korea",
        footer_text: "© 2024 GLEC. All rights reserved. | Transforming Transportation with AI",
        problems_label: "INDUSTRY CHALLENGES",
        problems_title: "Critical Problems in Logistics",
        problems_description: "The logistics industry faces critical challenges that hinder carbon reduction and safety improvements",
        problem1_title: "Data Collection Impossibility",
        problem1_desc: "Due to lease contract structures, logistics companies cannot collect truck data from owner-operators who refuse cooperation, making carbon emission calculation impossible",
        problem1_impact_label: "Impact:",
        problem1_impact: "No carbon data = No emission reduction",
        problem2_title: "Unpreventable Safety Accidents",
        problem2_desc: "Without real-time monitoring systems, driver fatigue and drowsiness cannot be detected, resulting in massive cargo damages and casualties every year",
        problem2_impact_label: "Impact:",
        problem2_impact: "Annual billions in cargo damage",
        problem3_title: "Unfair Carbon Allocation",
        problem3_desc: "Logistics companies allocate emissions by revenue ratio instead of using ISO-14083 standard, causing premium service providers to show inflated per-ton-km emissions, resulting in carbon loss",
        problem3_impact_label: "Impact:",
        problem3_impact: "Unfair competition & carbon injustice",
        solutions_glec_label: "GLEC SOLUTIONS",
        solutions_glec_title: "How GLEC Solves These Problems",
        solutions_glec_description: "Comprehensive solutions for data collection, safety monitoring, and fair carbon calculation",
        solution_badge: "SOLUTION",
        solution_premium_badge: "ISO-14083 STANDARD",
        solution1_title: "GLEC Tachograph (DTG)",
        solution1_desc: "Legal compliance device with LTE communication for automatic data collection without driver cooperation",
        solution1_feature1: "Real-time automatic data collection via LTE",
        solution1_feature2: "Driver fatigue & drowsiness AI detection",
        solution1_feature3: "Carbon emission measurement per trip",
        solution1_solves: "Problems #1 & #2",
        solution2_title: "GLEC Fleet Carbon Monitoring Service",
        solution2_desc: "Real-time fleet monitoring and carbon emission control service using DTG data and LTE communication",
        solution2_feature1: "Real-time vehicle status monitoring",
        solution2_feature2: "Trip-by-trip carbon emission tracking",
        solution2_feature3: "Driver safety alert system",
        solution2_solves: "Problems #1 & #2",
        solution3_title: "Carbon API Console",
        solution3_desc: "Upgrade logistics company systems to international standards with ISO-14083 compliant carbon calculation API",
        solution3_feature1: "48+ ISO-14083 standard APIs",
        solution3_feature2: "0.5 sec response time for real-time calculation",
        solution3_feature3: "Fair ton-km based emission allocation",
        solution3_solves: "Problem #3",
        solves_label: "Solves:"
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
        "lte_cloud_title": "LTE连接和云集成",
        "lte_cloud_description": "通过超高速LTE网络将实时数据传输到云端<br>并通过大数据分析提供洞察。与车辆控制中心<br>实时集成，实现即时响应。",
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
        glec_ai_card1_title: "200亿参数LLM",
        glec_ai_card1_desc: "采用4位量化进行实时推理，嵌入来自事故多发区域数据集的权重（天气、时间、位置模式）",
        glec_ai_card2_title: "实时数据集成",
        glec_ai_card2_desc: "CAN协议数据、GPS跟踪、实时交通事故和拥堵信息作为实时嵌入权重处理",
        glec_ai_card3_title: "车辆上下文协议 (VCP)",
        glec_ai_card3_desc: "模拟卡车传感器的专有数据集成标准，实现传统车辆系统的扩展嵌入权重",
        glec_ai_card4_title: "基于紧急程度的推理",
        glec_ai_card4_desc: "具有差异灵敏度的上下文感知AI，优先考虑安全和碳减排，通过实时语音代理传递",
        glec_ai_stat1: "事故减少",
        glec_ai_stat2: "参数",
        glec_ai_stat3: "响应时间",
        glec_api_title: "GLEC API - ISO-14083碳测量平台",
        carbon_neutral_badge: "碳中和",
        glec_api_card1_title: "ISO-14083标准",
        glec_api_card1_desc: "国际货运碳排放测量标准的完整API实现，满足全球合规要求",
        glec_api_card2_title: "实时量化",
        glec_api_card2_desc: "即时碳足迹计算，提高驾驶员的环保驾驶意识和行为改变",
        glec_api_card3_title: "供应链报告",
        glec_api_card3_desc: "企业级碳排放报告，用于监管合规和可持续发展计划",
        glec_api_card4_title: "碳信用基础设施",
        glec_api_card4_desc: "运输碳信用发行的核心平台，实现减排的货币化",
        glec_api_integration_title: "无缝DTG集成",
        glec_api_integration_desc: "GLEC API与GLEC DTG硬件完美配合，为可持续物流转型创建全面的生态系统。车辆的实时数据通过API流动，为驾驶员和车队管理者提供可操作的洞察。",
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
        launch_jan_2026: "发布: 2026年1月",
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
        tech_ai_feature4: "LTE云同步",
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
        team_stat_phds: "专业网络",
        team_stat_dedicated: "专注于绿色物流",
        team_leadership: "领导团队",
        role_ceo_kevin: "联合首席执行官（技术）",
        role_ceo_kevin_name: "姜德镐 (Kevin)",
        role_ceo_kevin_1: "13年科技创业经验",
        role_ceo_kevin_2: "IPO准备、M&A EXIT经验",
        role_ceo_kevin_3: "2016年瑞士ETH Cybathlon机器人奥运会韩国国家队",
        role_ceo_stella: "联合首席执行官（运营）",
        role_ceo_stella_name: "金恩宇 (Stella)",
        role_ceo_stella_1: "12年组织运营及战略专家",
        role_ceo_stella_2: "KAIST ESG KEEP School毕业",
        role_ceo_stella_3: "SFC Korea审议委员会委员",
        role_cto_brian: "技术总监 (CTO)",
        role_cto_brian_name: "金智元 (Brian)",
        role_cto_brian_1: "IoT设备开发负责人",
        role_cto_brian_2: "硬件及固件架构",
        role_cto_brian_3: "研发实验室主任",
        team_rd: "研究与开发",
        role_carbon: "IoT设备负责人",
        role_carbon_name: "金智元",
        role_carbon_1: "IoT设备开发",
        role_carbon_2: "硬件集成",
        role_carbon_3: "传感器技术研发",
        role_ai: "前端开发人员",
        role_ai_name: "沈俊",
        role_ai_1: "仪表板UI/UX开发",
        role_ai_2: "实时数据可视化",
        role_ai_3: "面向客户的应用程序",
        role_hw: "后端开发人员",
        role_hw_name: "金英宰",
        role_hw_1: "B2B物流/ERP开发",
        role_hw_2: "API基础设施",
        role_hw_3: "资深后端开发人员",
        team_additional: "附加团队成员",
        role_backend_bang: "后端开发人员",
        role_backend_bang_name: "方雅贤",
        role_backend_bang_1: "资深后端开发人员",
        role_backend_bang_2: "API开发",
        role_backend_bang_3: "系统架构",
        role_service: "服务企划",
        role_service_name: "池在元",
        role_service_1: "服务企划及战略",
        role_service_2: "产品管理",
        role_service_3: "客户体验设计",
        team_expertise_title: "专业网络及专业知识",
        expertise_inha: "仁荷大学物流学部教授团队（顾问）",
        expertise_kila: "韩国综合物流协会网络",
        expertise_keep: "KAIST ESG C级KEEP项目毕业",
        expertise_iso: "ISO-14083国际标准",
        expertise_ai: "AI和机器学习",
        expertise_carbon: "碳排放计算",
        expertise_logistics: "物流和运输",
        expertise_iot: "物联网和嵌入式系统",
        // Contact Page
        contact_title: "联系GLEC",
        contact_description: "准备好用AI技术改造您的车队了吗？今天就联系我们。",
        contact_name_label: "姓名",
        contact_name_placeholder: "输入您的姓名",
        contact_email_label: "电子邮件地址",
        contact_email_placeholder: "输入您的邮箱",
        contact_company_label: "公司名称",
        contact_company_placeholder: "输入您的公司名称",
        contact_message_label: "留言",
        contact_message_placeholder: "告诉我们您的咨询",
        contact_submit_btn: "发送消息",
        contact_company_info: "公司信息",
        // CTA Section
        cta_title: "准备好改造您的车队了吗？",
        cta_description: "加入AI运输革命。使用GLEC AI DTG解决方案体验世界级的安全性、效率和环境效益。立即联系我们，开启您的数字化转型之旅。",
        cta_btn_start: "立即开始",
        cta_btn_solutions: "查看解决方案",
        // Footer
        footer_logo: "GLEC AI DTG 解决方案",
        footer_email_label: "电子邮件:",
        footer_business_label: "商业登记号:",
        footer_address_label: "地址:",
        footer_address: "大韩民国仁川广域市延寿区Convensia大路204号 仁川创业园1栋315号",
        footer_text: "© 2024 GLEC. 保留所有权利 | 用AI改造运输业",
        problems_label: "行业挑战",
        problems_title: "物流业的关键问题",
        problems_description: "物流行业面临阻碍碳减排和安全改进的严峻挑战",
        problem1_title: "数据收集不可能",
        problem1_desc: "由于租赁合同结构，物流公司无法从拒绝合作的车主-运营商处收集卡车数据，导致碳排放计算不可能",
        problem1_impact_label: "影响：",
        problem1_impact: "无碳数据 = 无法减排",
        problem2_title: "无法预防的安全事故",
        problem2_desc: "由于缺乏实时监控系统，无法检测驾驶员疲劳和困倦，导致每年发生大量货物损失和人员伤亡",
        problem2_impact_label: "影响：",
        problem2_impact: "每年数十亿货物损失",
        problem3_title: "不公平的碳分配",
        problem3_desc: "物流公司按收入比例分配排放而非使用ISO-14083标准，导致优质服务提供商的吨公里排放量虚高，造成碳损失",
        problem3_impact_label: "影响：",
        problem3_impact: "不公平竞争 & 碳不公正",
        solutions_glec_label: "GLEC解决方案",
        solutions_glec_title: "GLEC如何解决这些问题",
        solutions_glec_description: "数据收集、安全监控和公平碳计算的综合解决方案",
        solution_badge: "解决方案",
        solution_premium_badge: "ISO-14083标准",
        solution1_title: "GLEC行车记录仪 (DTG)",
        solution1_desc: "无需驾驶员配合即可通过LTE通信自动收集数据的法律合规设备",
        solution1_feature1: "通过LTE实时自动数据收集",
        solution1_feature2: "驾驶员疲劳和困倦AI检测",
        solution1_feature3: "每次行程的碳排放测量",
        solution1_solves: "解决问题 #1 & #2",
        solution2_title: "GLEC车队碳排放监控服务",
        solution2_desc: "使用DTG数据和LTE通信的实时车队监控和碳排放控制服务",
        solution2_feature1: "实时车辆状态监控",
        solution2_feature2: "逐行程碳排放跟踪",
        solution2_feature3: "驾驶员安全警报系统",
        solution2_solves: "解决问题 #1 & #2",
        solution3_title: "Carbon API Console",
        solution3_desc: "通过符合ISO-14083的碳计算API将物流公司系统升级到国际标准",
        solution3_feature1: "48个以上ISO-14083标准API",
        solution3_feature2: "实时计算的0.5秒响应时间",
        solution3_feature3: "基于吨公里的公平排放分配",
        solution3_solves: "解决问题 #3",
        solves_label: "解决："
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

            // Save to localStorage for persistence across pages
            localStorage.setItem('preferredLanguage', lang);

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

    // Load saved language preference on page load
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && savedLang !== 'en') {
        console.log('📚 Loading saved language:', savedLang);
        currentLang = savedLang;

        // Update UI to show saved language
        const langMap = { en: 'English', ko: '한국어', zh: '中文' };
        currentLanguageSpan.textContent = langMap[savedLang] || 'English';

        // Update active state
        languageOptions.forEach(opt => {
            if (opt.getAttribute('data-lang') === savedLang) {
                opt.classList.add('active');
            } else {
                opt.classList.remove('active');
            }
        });

        // Apply translations
        translatePage(savedLang);
    }
})();

// Translation function
function translatePage(lang) {
    // Translate text content
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.innerHTML = translations[lang][key];
        }
    });

    // Translate placeholders
    const placeholderElements = document.querySelectorAll('[data-translate-placeholder]');
    placeholderElements.forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        if (translations[lang] && translations[lang][key]) {
            element.setAttribute('placeholder', translations[lang][key]);
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
                // Show loading state
                const submitBtn = cesForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;

                // Send using EmailJS with sendForm
                emailjs.sendForm('service_8dmz5ca', 'template_ces_invitation', cesForm)
                    .then(function(response) {
                        console.log('SUCCESS!', response.status, response.text);
                        // Show success popup
                        cesPopup.style.display = 'block';
                        // Reset form
                        cesForm.reset();
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    }, function(error) {
                        console.log('FAILED...', error);
                        alert('Failed to send invitation request. Please try again or contact us directly at contact@glec.io');
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    });
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

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');
const navDropdowns = document.querySelectorAll('.nav-dropdown');

if (mobileMenuToggle && navMenu) {
    // Toggle mobile menu
    mobileMenuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Handle dropdown clicks in mobile
    navDropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        if (toggle) {
            toggle.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            });
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                navDropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        }
    });

    // Close mobile menu on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            navDropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
}

// Contact Form Handler with EmailJS
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Send using EmailJS with sendForm
        emailjs.sendForm('service_8dmz5ca', 'template_contact_form', contactForm)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                alert('Thank you! Your message has been sent successfully. We will get back to you soon.');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, function(error) {
                console.log('FAILED...', error);
                alert('Failed to send message. Please try again or contact us directly at contact@glec.io');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
    });
}
