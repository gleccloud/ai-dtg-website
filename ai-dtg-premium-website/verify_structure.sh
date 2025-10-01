#!/bin/bash

echo "================================"
echo "GLEC AI DTG Multi-Page Verification"
echo "================================"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check files exist
echo "1. Checking HTML Files..."
for file in index.html solutions.html about.html ces2026.html contact.html; do
    if [ -f "$file" ]; then
        echo -e "   ${GREEN}✓${NC} $file ($(ls -lh $file | awk '{print $5}'))"
    else
        echo -e "   ${RED}✗${NC} $file (MISSING)"
    fi
done
echo ""

# Check shared resources
echo "2. Checking Shared Resources..."
if [ -f "css/shared-styles.css" ]; then
    echo -e "   ${GREEN}✓${NC} css/shared-styles.css ($(ls -lh css/shared-styles.css | awk '{print $5}'))"
else
    echo -e "   ${RED}✗${NC} css/shared-styles.css (MISSING)"
fi

if [ -f "js/main.js" ]; then
    echo -e "   ${GREEN}✓${NC} js/main.js ($(ls -lh js/main.js | awk '{print $5}'))"
else
    echo -e "   ${RED}✗${NC} js/main.js (MISSING)"
fi
echo ""

# Check backup
echo "3. Checking Backup..."
if [ -f "index-single-page-backup.html" ]; then
    echo -e "   ${GREEN}✓${NC} index-single-page-backup.html ($(ls -lh index-single-page-backup.html | awk '{print $5}'))"
else
    echo -e "   ${YELLOW}⚠${NC} index-single-page-backup.html (No backup found)"
fi
echo ""

# Verify links in index.html
echo "4. Verifying Navigation Links in index.html..."
if grep -q 'href="solutions.html' index.html; then
    echo -e "   ${GREEN}✓${NC} Solutions page links found"
fi
if grep -q 'href="about.html' index.html; then
    echo -e "   ${GREEN}✓${NC} About page links found"
fi
if grep -q 'href="ces2026.html' index.html; then
    echo -e "   ${GREEN}✓${NC} CES 2026 page links found"
fi
if grep -q 'href="contact.html' index.html; then
    echo -e "   ${GREEN}✓${NC} Contact page links found"
fi
echo ""

# Check CSS and JS references
echo "5. Verifying CSS/JS References..."
html_files="index.html solutions.html about.html ces2026.html contact.html"
for file in $html_files; do
    if grep -q 'href="css/shared-styles.css"' "$file"; then
        echo -e "   ${GREEN}✓${NC} $file links to CSS"
    else
        echo -e "   ${RED}✗${NC} $file missing CSS link"
    fi
    
    if grep -q 'src="js/main.js"' "$file"; then
        echo -e "   ${GREEN}✓${NC} $file links to JS"
    else
        echo -e "   ${RED}✗${NC} $file missing JS link"
    fi
done
echo ""

# Check section IDs in solutions.html
echo "6. Verifying Section IDs in solutions.html..."
for section in transformation ai-dtg ai-dashboard technology solutions; do
    if grep -q "id=\"$section\"" solutions.html; then
        echo -e "   ${GREEN}✓${NC} #$section section found"
    else
        echo -e "   ${RED}✗${NC} #$section section missing"
    fi
done
echo ""

# Check section IDs in about.html
echo "7. Verifying Section IDs in about.html..."
for section in company-overview team timeline certifications tech-differentiation; do
    if grep -q "id=\"$section\"" about.html; then
        echo -e "   ${GREEN}✓${NC} #$section section found"
    else
        echo -e "   ${RED}✗${NC} #$section section missing"
    fi
done
echo ""

echo "================================"
echo -e "${GREEN}Verification Complete!${NC}"
echo "================================"
echo ""
echo "Next steps:"
echo "  1. Open index.html in a browser"
echo "  2. Test navigation between pages"
echo "  3. Verify language switching"
echo "  4. Check all forms and interactions"
echo ""
