# 🧠 Visual Intelligence Workspace

A production-grade visual intelligence workspace that transforms unstructured text or PDFs into interactive, node-based diagrams (Mind Maps, Timelines, Quadrants) on an infinite canvas.

![Next.js](https://img.shields.io/badge/Next.js-16+-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4+-38B2AC?logo=tailwind-css)

## ✨ Features

- 🤖 **AI-Powered Graph Generation** - Uses OpenAI to intelligently extract concepts and relationships
- 🎨 **Interactive Infinite Canvas** - Built with React Flow for smooth pan/zoom navigation
- 🧩 **Smart Nodes** - Rich content nodes with markdown support and visual hierarchy
- 🔄 **Node Expansion** - Click any node to generate deeper AI-powered insights
- 📐 **Auto-Layout Engine** - Powered by ELK.js for optimal graph positioning
- 📊 **Multiple Visualization Types** - Mind Maps, Timelines, and Quadrant diagrams
- ⏪ **Undo/Redo** - Full history management with Zustand
- 🌙 **Dark Mode** - Automatic theme detection

## 🛠️ Tech Stack

- **Framework**: Next.js 16+ (App Router, Server Components)
- **Language**: TypeScript (Strict mode)
- **Styling**: Tailwind CSS with shadcn/ui components
- **Icons**: Lucide React
- **Canvas Engine**: @xyflow/react (React Flow v12+)
- **Layout Engine**: ELK.js (Eclipse Layout Kernel)
- **AI**: Vercel AI SDK with OpenAI
- **State Management**: Zustand

## 🚀 Getting Started

### Prerequisites

1. **OpenAI API Key** - Get one from [OpenAI Platform](https://platform.openai.com/api-keys)

### Installation

```bash
# Clone the repository
git clone https://github.com/anubhavaanand/mylens.git
cd mylens

# Install dependencies
npm install

# Create environment file
echo "OPENAI_API_KEY=your-api-key-here" > .env.local

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

### Environment Variables

Create a `.env.local` file with:

```env
OPENAI_API_KEY=your-openai-api-key
```

## 📖 How to Use

1. **Enter Content** - Type or paste text into the input area
2. **Select Visualization Type** - Choose Mind Map, Timeline, or Quadrant
3. **Generate** - Click "Generate Diagram" to create your visualization
4. **Explore** - Pan, zoom, and interact with the canvas
5. **Expand** - Click the + button on any node to generate child concepts

## 🏗️ Project Structure

```
├── app/
│   ├── api/
│   │   └── generate/
│   │       ├── route.ts      # AI streaming API endpoint
│   │       └── schema.ts     # Zod schema for graph structure
│   ├── globals.css           # Global styles with theme variables
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Main page component
├── components/
│   ├── ui/                   # shadcn/ui components
│   ├── Canvas.tsx            # React Flow canvas wrapper
│   ├── Sidebar.tsx           # Input and controls sidebar
│   └── SmartNode.tsx         # Custom node component
├── hooks/
│   └── useAutoLayout.ts      # Auto-layout hook with ELK.js
├── lib/
│   ├── layout.ts             # ELK.js layout utilities
│   └── utils.ts              # Utility functions
└── store/
    └── graphStore.ts         # Zustand state management
```

## 🔧 Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## 📝 License

MIT License - feel free to use this for personal or commercial projects!

## 🙏 Acknowledgments

- Inspired by [MyLens.AI](https://mylens.ai)
- Built with [Next.js](https://nextjs.org)
- Canvas powered by [React Flow](https://reactflow.dev)
- Layout by [ELK.js](https://eclipse.dev/elk/)
