#!/usr/bin/env python3
"""
Multi-page Website Generator for GLEC AI DTG
Converts single-page website into 5 separate pages
"""

import re
from pathlib import Path

# Define base directory
BASE_DIR = Path(__file__).parent

# Read original index.html
with open(BASE_DIR / 'index.html', 'r', encoding='utf-8') as f:
    original_html = f.read()

# Extract sections using regex
def extract_section(html, start_id, end_pattern=None):
    """Extract HTML section by ID"""
    if end_pattern:
        pattern = rf'(<section[^>]*id="{start_id}"[^>]*>.*?)</section>\s*(?=<section|<footer|</body)'
    else:
        pattern = rf'<section[^>]*id="{start_id}"[^>]*>.*?</section>'
    match = re.search(pattern, html, re.DOTALL)
    return match.group(0) if match else ""

# Common HTML head
def get_html_head(title, description):
    return f'''<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title}</title>
    <meta name="description" content="{description}">

    <!-- Preconnect for Performance -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

    <!-- Premium Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">

    <!-- Shared Styles -->
    <link rel="stylesheet" href="css/shared-styles.css">
</head>
<body>
'''

# Common navigation
NAVIGATION = '''    <!-- Navigation -->
    <nav class="nav-container" id="navbar">
        <div class="nav-content">
            <a href="index.html" class="nav-logo">
                <span class="logo-text">GLEC</span>
            </a>
            <ul class="nav-menu">
                <li><a href="index.html" class="nav-link" data-translate="nav_home">Home</a></li>

                <!-- Our Solutions Dropdown -->
                <li class="nav-dropdown">
                    <a href="solutions.html" class="nav-link dropdown-toggle" data-translate="nav_solutions">
                        Our Solutions
                        <span class="dropdown-arrow">▼</span>
                    </a>
                    <ul class="dropdown-menu">
                        <li><a href="solutions.html#transformation" class="dropdown-link" data-translate="nav_transformation">AI Transformation</a></li>
                        <li><a href="solutions.html#ai-dtg" class="dropdown-link" data-translate="nav_dtg">AI DTG Hardware</a></li>
                        <li><a href="solutions.html#ai-dashboard" class="dropdown-link" data-translate="nav_dashboard">AI Dashboard</a></li>
                        <li><a href="solutions.html#technology" class="dropdown-link" data-translate="nav_technology">Core Technology</a></li>
                        <li><a href="solutions.html#solutions" class="dropdown-link" data-translate="nav_solutions_status">Solutions Status</a></li>
                    </ul>
                </li>

                <!-- Who We Are Dropdown -->
                <li class="nav-dropdown">
                    <a href="about.html" class="nav-link dropdown-toggle" data-translate="nav_who_we_are">
                        Who We Are
                        <span class="dropdown-arrow">▼</span>
                    </a>
                    <ul class="dropdown-menu">
                        <li><a href="about.html#company-overview" class="dropdown-link" data-translate="nav_company">Company Overview</a></li>
                        <li><a href="about.html#team" class="dropdown-link" data-translate="nav_team">Our Team</a></li>
                        <li><a href="about.html#timeline" class="dropdown-link" data-translate="nav_timeline">Development Timeline</a></li>
                        <li><a href="about.html#certifications" class="dropdown-link" data-translate="nav_certifications">Certifications & Awards</a></li>
                        <li><a href="about.html#tech-differentiation" class="dropdown-link" data-translate="nav_tech_diff">Technical Differentiation</a></li>
                    </ul>
                </li>

                <li><a href="ces2026.html" class="nav-link" data-translate="nav_ces2026">CES 2026</a></li>
                <li><a href="contact.html" class="nav-link" data-translate="nav_contact">Contact</a></li>
            </ul>

            <!-- Language Selector -->
            <div class="language-selector" id="languageSelector">
                <button class="language-button" id="languageButton" type="button">
                    <span id="currentLanguage">English</span>
                    <span>▼</span>
                </button>
                <div class="language-dropdown" id="languageDropdown">
                    <div class="language-option active" data-lang="en">English</div>
                    <div class="language-option" data-lang="ko">한국어</div>
                    <div class="language-option" data-lang="zh">中文</div>
                </div>
            </div>
        </div>
    </nav>
'''

# Common footer
FOOTER = '''    <!-- Footer -->
    <footer class="footer">
        <div class="footer-content">
            <div class="footer-logo">GLEC AI DTG SOLUTIONS</div>
            <p class="footer-text">
                © 2024 GLEC. All rights reserved. | Transforming Transportation with AI
            </p>
        </div>
    </footer>

    <!-- JavaScript -->
    <script src="js/main.js"></script>
</body>
</html>'''

# Extract hero section
hero_pattern = r'(<section class="hero-section"[^>]*>.*?</section>)'
hero_match = re.search(hero_pattern, original_html, re.DOTALL)
HERO_SECTION = hero_match.group(0) if hero_match else ""

# Extract CTA section
cta_pattern = r'(<section class="cta-section"[^>]*>.*?</section>)'
cta_match = re.search(cta_pattern, original_html, re.DOTALL)
CTA_SECTION = cta_match.group(0) if cta_match else ""

print("Generating pages...")

# 1. HOME PAGE (index.html)
home_html = get_html_head(
    "GLEC AI DTG - AI Transformation for Freight Trucks",
    "World's leading AI transformation platform for freight trucks with safety enhancement and carbon reduction"
)
home_html += NAVIGATION
home_html += "\n" + HERO_SECTION
home_html += "\n" + CTA_SECTION
home_html += "\n" + FOOTER

with open(BASE_DIR / 'index-new.html', 'w', encoding='utf-8') as f:
    f.write(home_html)
print("✓ Created index-new.html")

# 2. SOLUTIONS PAGE (solutions.html)
solutions_sections = [
    'transformation',
    'ai-dtg',
    'ai-dashboard',
    'technology',
    'solutions'
]

solutions_html = get_html_head(
    "Our Solutions - GLEC AI DTG Platform",
    "Comprehensive AI solutions for freight transformation including AI DTG hardware, dashboard software, and carbon monitoring"
)
solutions_html += NAVIGATION + "\n"

for section_id in solutions_sections:
    pattern = rf'<section[^>]*id="{section_id}"[^>]*>.*?</section>'
    match = re.search(pattern, original_html, re.DOTALL)
    if match:
        solutions_html += "\n    " + match.group(0) + "\n"

solutions_html += FOOTER

with open(BASE_DIR / 'solutions.html', 'w', encoding='utf-8') as f:
    f.write(solutions_html)
print("✓ Created solutions.html")

# 3. ABOUT PAGE (about.html)
about_sections = [
    'company-overview',
    'team',
    'timeline',
    'certifications',
    'tech-differentiation'
]

about_html = get_html_head(
    "Who We Are - GLEC Inc. Company Information",
    "Learn about GLEC's mission, team, achievements, and technical expertise in green logistics innovation"
)
about_html += NAVIGATION + "\n"

for section_id in about_sections:
    pattern = rf'<section[^>]*id="{section_id}"[^>]*>.*?</section>'
    match = re.search(pattern, original_html, re.DOTALL)
    if match:
        about_html += "\n    " + match.group(0) + "\n"

about_html += FOOTER

with open(BASE_DIR / 'about.html', 'w', encoding='utf-8') as f:
    f.write(about_html)
print("✓ Created about.html")

# 4. CES 2026 PAGE (ces2026.html)
ces_pattern = r'(<section class="ces-section"[^>]*>.*?</section>.*?<section class="ces-invitation-section"[^>]*>.*?</section>.*?<div class="ces-popup"[^>]*>.*?</div>)'
ces_match = re.search(ces_pattern, original_html, re.DOTALL)
CES_CONTENT = ces_match.group(0) if ces_match else ""

ces_html = get_html_head(
    "Meet Us at CES 2026 - GLEC AI DTG Exhibition",
    "Join GLEC at CES 2026 in Las Vegas. Experience the future of AI transportation technology"
)
ces_html += NAVIGATION
ces_html += "\n" + CES_CONTENT
ces_html += "\n" + FOOTER

with open(BASE_DIR / 'ces2026.html', 'w', encoding='utf-8') as f:
    f.write(ces_html)
print("✓ Created ces2026.html")

# 5. CONTACT PAGE (contact.html)
contact_html = get_html_head(
    "Contact Us - GLEC Inc.",
    "Get in touch with GLEC for inquiries about AI DTG solutions, partnerships, and demonstrations"
)
contact_html += NAVIGATION

# Create contact content
contact_content = '''
    <!-- Contact Section -->
    <section class="cta-section" id="contact">
        <div class="cta-content" style="text-align: left; max-width: 800px;">
            <h2 class="cta-title" style="text-align: center;">Contact GLEC</h2>
            <p class="cta-description" style="text-align: center;">
                Ready to transform your fleet with AI technology? Get in touch with us today.
            </p>

            <div class="ces-invitation-form" style="margin-top: 3rem;">
                <form id="contactForm">
                    <div class="ces-form-group">
                        <label for="contactName" class="ces-form-label">Your Name</label>
                        <input
                            type="text"
                            id="contactName"
                            name="name"
                            class="ces-form-input"
                            placeholder="Enter your name"
                            required
                        >
                    </div>

                    <div class="ces-form-group">
                        <label for="contactEmail" class="ces-form-label">Email Address</label>
                        <input
                            type="email"
                            id="contactEmail"
                            name="email"
                            class="ces-form-input"
                            placeholder="Enter your email"
                            required
                        >
                    </div>

                    <div class="ces-form-group">
                        <label for="contactCompany" class="ces-form-label">Company Name</label>
                        <input
                            type="text"
                            id="contactCompany"
                            name="company"
                            class="ces-form-input"
                            placeholder="Enter your company name"
                        >
                    </div>

                    <div class="ces-form-group">
                        <label for="contactMessage" class="ces-form-label">Message</label>
                        <textarea
                            id="contactMessage"
                            name="message"
                            class="ces-form-input"
                            placeholder="Tell us about your inquiry"
                            rows="5"
                            required
                            style="resize: vertical; font-family: inherit;"
                        ></textarea>
                    </div>

                    <button type="submit" class="ces-submit-btn">
                        Send Message
                    </button>
                </form>
            </div>

            <div style="margin-top: 3rem; text-align: center;">
                <h3 style="color: var(--glec-cyan); margin-bottom: 1.5rem; font-family: var(--font-display);">Company Information</h3>
                <p style="color: var(--glec-gray-300); line-height: 2;">
                    <strong style="color: var(--glec-white);">GLEC Inc.</strong><br>
                    Seoul, South Korea<br>
                    Email: info@glec.co.kr<br>
                    Founded: 2023
                </p>
            </div>
        </div>
    </section>
'''

contact_html += contact_content
contact_html += "\n" + FOOTER

with open(BASE_DIR / 'contact.html', 'w', encoding='utf-8') as f:
    f.write(contact_html)
print("✓ Created contact.html")

print("\n✅ All pages generated successfully!")
print("\nNext steps:")
print("1. Replace index.html with index-new.html")
print("2. Test all pages in a browser")
print("3. Verify navigation and language switching")
