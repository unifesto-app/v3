#!/bin/bash

# Universal Links & Android App Links - Deployment Script
# This script deploys the fixes and verifies they're working

set -e  # Exit on error

echo "🚀 Deploying Universal Links & Android App Links Fix..."
echo ""

# Step 1: Git commit and push
echo "📦 Step 1: Committing changes..."
git add .
git commit -m "Fix: Universal Links and Android App Links with route handlers

- Created route handlers for .well-known files to ensure HTTP 200
- Updated AASA file with modern components format
- Updated middleware to prevent .well-known redirects
- Ready for domain verification"

echo "⬆️  Pushing to main branch..."
git push origin main

echo ""
echo "✅ Deployment initiated!"
echo ""
echo "⏳ Waiting 2 minutes for Vercel deployment to complete..."
sleep 120

echo ""
echo "🔍 Step 2: Verifying domain files..."
echo ""

# Test iOS AASA file
echo "Testing iOS AASA file (unifesto.app)..."
AASA_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://unifesto.app/.well-known/apple-app-site-association)
if [ "$AASA_STATUS" = "200" ]; then
    echo "✅ unifesto.app AASA: HTTP $AASA_STATUS"
else
    echo "❌ unifesto.app AASA: HTTP $AASA_STATUS (Expected 200)"
fi

echo ""
echo "Testing iOS AASA file (www.unifesto.app)..."
AASA_WWW_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://www.unifesto.app/.well-known/apple-app-site-association)
if [ "$AASA_WWW_STATUS" = "200" ]; then
    echo "✅ www.unifesto.app AASA: HTTP $AASA_WWW_STATUS"
else
    echo "❌ www.unifesto.app AASA: HTTP $AASA_WWW_STATUS (Expected 200)"
fi

echo ""
# Test Android assetlinks.json
echo "Testing Android assetlinks.json (unifesto.app)..."
ASSETLINKS_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://unifesto.app/.well-known/assetlinks.json)
if [ "$ASSETLINKS_STATUS" = "200" ]; then
    echo "✅ unifesto.app assetlinks.json: HTTP $ASSETLINKS_STATUS"
else
    echo "❌ unifesto.app assetlinks.json: HTTP $ASSETLINKS_STATUS (Expected 200)"
fi

echo ""
echo "Testing Android assetlinks.json (www.unifesto.app)..."
ASSETLINKS_WWW_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://www.unifesto.app/.well-known/assetlinks.json)
if [ "$ASSETLINKS_WWW_STATUS" = "200" ]; then
    echo "✅ www.unifesto.app assetlinks.json: HTTP $ASSETLINKS_WWW_STATUS"
else
    echo "❌ www.unifesto.app assetlinks.json: HTTP $ASSETLINKS_WWW_STATUS (Expected 200)"
fi

echo ""
echo "📄 Viewing AASA file content..."
curl -s https://unifesto.app/.well-known/apple-app-site-association | python3 -m json.tool

echo ""
echo "📄 Viewing assetlinks.json content..."
curl -s https://unifesto.app/.well-known/assetlinks.json | python3 -m json.tool

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Deployment Complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📋 Next Steps:"
echo ""
echo "1. Validate with official tools:"
echo "   iOS: https://search.developer.apple.com/appsearch-validation-tool/"
echo "   Android: https://developers.google.com/digital-asset-links/tools/generator"
echo ""
echo "2. Rebuild mobile app:"
echo "   cd ../mobile-app"
echo "   npx expo prebuild --clean"
echo "   eas build --platform all --profile production"
echo ""
echo "3. Test on devices:"
echo "   iOS: Open Notes app, type link, tap it"
echo "   Android: adb shell am start -W -a android.intent.action.VIEW -d \"https://unifesto.app/events/esummit26\" com.unifesto.app"
echo ""
echo "📖 Full guide: ../UNIVERSAL_LINKS_COMPLETE_FIX.md"
echo ""
