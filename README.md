# 📚 History of Today

Discover fascinating historical events, births, and deaths that happened on this day in history. Built with modern web technologies and powered by Wikipedia's comprehensive historical database.

![History of Today](https://img.shields.io/badge/Version-1.0.0-blue) ![React](https://img.shields.io/badge/React-18.3.1-61dafb) ![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178c6) ![Vite](https://img.shields.io/badge/Vite-5.4.19-646cff)

## ✨ Features

- 🗓️ **Date Navigation**: Browse historical events by any date
- 🔍 **Smart Search**: Search through events by year, person, or keyword
- 📊 **Event Categories**: Filter by events, births, and deaths
- 🖼️ **Rich Media**: High-quality images from Wikipedia
- 📱 **Responsive Design**: Optimized for all devices
- 🎨 **Elegant UI**: Beautiful, modern interface with smooth animations
- 🔗 **Wikipedia Integration**: Direct links to detailed Wikipedia articles
- 📤 **Share Events**: Share interesting historical moments
- 🌙 **Dark Mode**: Automatic theme switching

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Hepheoluwah/history-of-today
   cd history-of-today
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the application.

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🏗️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui with Radix UI primitives
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **HTTP Client**: Fetch API with React Query
- **Routing**: React Router DOM

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── EventCard.tsx   # Historical event display
│   ├── LoadingCard.tsx # Loading skeleton
│   └── ShareDialog.tsx # Event sharing modal
├── pages/              # Application pages
│   ├── Index.tsx       # Main history page
│   └── NotFound.tsx    # 404 page
├── services/           # API services
│   └── api.ts          # Wikipedia API integration
├── types/              # TypeScript definitions
│   └── history.ts      # Historical event types
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── main.tsx           # Application entry point
```

## 🔌 API Integration

This application uses the **Wikipedia On This Day API** to fetch historical data:

- **Base URL**: `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday`
- **Data Sources**: Wikipedia's comprehensive historical database
- **Rate Limiting**: Respects Wikipedia's API guidelines
- **Content**: Events, births, and deaths with rich metadata

## 🎨 Design System

### Color Palette
- **Primary**: Deep historical blues (#1e3a5f)
- **Secondary**: Warm gold accents (#d4af37)
- **Background**: Clean whites and subtle grays
- **Text**: High contrast for accessibility

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)
- **Scale**: Harmonious typographic scale

### Components
- **Cards**: Elevated with subtle shadows
- **Timeline**: Visual connection between events
- **Animations**: Smooth, purposeful transitions

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy the dist folder to Vercel
```

### Netlify
```bash
npm run build
# Deploy the dist folder to Netlify
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Wikipedia** for providing the comprehensive historical database
- **Wikimedia Foundation** for the excellent On This Day API
- **shadcn/ui** for the beautiful component library
- **Vercel** for the amazing development experience
- **React Team** for the incredible framework

## 📞 Support

- 📧 Email: deniranifeoluwa@gmail.com


<!-- ## 🔗 Links

- 🌐 **Live Demo**: [todayinhistory.dev](https://todayinhistory.dev)
- 📚 **Documentation**: [docs.todayinhistory.dev](https://docs.todayinhistory.dev)
- 🐦 **Twitter**: [@TodayInHistory](https://twitter.com/TodayInHistory)
- 📖 **Blog**: [blog.todayinhistory.dev](https://blog.todayinhistory.dev) -->

---

Made with ❤️ by 0x_Ifeoluwa