#!/bin/bash

# History of Today - Deployment Script
echo "🚀 Deploying History of Today..."

# Build the project
echo "📦 Building project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📁 Build files are in the 'dist' directory"
    echo ""
    echo "🌐 Deployment options:"
    echo "   • Vercel: vercel --prod"
    echo "   • Netlify: netlify deploy --prod --dir=dist"
    echo "   • GitHub Pages: gh-pages -d dist"
    echo ""
    echo "🔗 Don't forget to update the README with your actual deployment URL!"
else
    echo "❌ Build failed! Please check the errors above."
    exit 1
fi
