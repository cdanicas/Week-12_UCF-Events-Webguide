#!/bin/bash
# Script to add the UCF Tab image

echo "Adding UCF Tab Image..."
echo ""

# Copy the image file
cp /Users/christyd.shell/Downloads/PrimaryMark_TheTab/Tab-ForDigital/TheTab_KGrgb_72ppi.png assets/images/ucf-tab.png

if [ -f "assets/images/ucf-tab.png" ]; then
    echo "✓ Image successfully copied to assets/images/ucf-tab.png"
    echo ""
    echo "Next steps:"
    echo "1. Run: npm install"
    echo "2. Test locally: npm run dev"
    echo "3. Commit: git add assets/images/ucf-tab.png && git commit -m 'Add UCF tab logo'"
    echo "4. Push: git push"
else
    echo "✗ Error: Could not copy image file"
    echo "Please check that the source file exists at:"
    echo "/Users/christyd.shell/Downloads/PrimaryMark_TheTab/Tab-ForDigital/TheTab_KGrgb_72ppi.png"
fi
