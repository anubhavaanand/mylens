# 🧠 AI Mind Map Generator - MyLens.AI Clone

A powerful single-page web application that transforms any text into beautiful, interactive AI-generated mind maps using Google Gemini.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- 🤖 **AI-Powered Analysis** - Uses Google Gemini to intelligently extract key concepts
- 🎨 **Interactive Visualizations** - Beautiful mind maps rendered with HTML5 Canvas
- 🔄 **Node Expansion** - Click any node to generate deeper AI insights
- 🎭 **Multiple Themes** - Default, Dark, Warm, and Cool color schemes
- 📥 **Export to PNG** - Save your mind maps as high-quality images
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- ⚡ **Zero Dependencies** - Single HTML file, no build process required

## 🚀 Quick Start

### Prerequisites

1. **Get a Free Google Gemini API Key**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Sign in with your Google account
   - Click "Create API Key"
   - Copy the key (format: `AIzaSy...`)

### Installation

**Option 1: Local Usage (Instant)**

1. Download or clone this repository
2. Open `index.html` in a modern web browser (Chrome, Firefox, Edge, Safari)
3. Enter your Gemini API key when prompted
4. Start creating mind maps!

**Option 2: Deploy Online**

Deploy to Netlify:
1. Sign up at [netlify.com](https://netlify.com) (free)
2. Drag and drop `index.html` to Netlify
3. Get instant live URL to share

Deploy to GitHub Pages:
```bash
git init
git add index.html
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_REPO_URL
git push -u origin main
# Enable GitHub Pages in repository settings
```

## 📖 How to Use

1. **Enter Text** - Paste any content into the text area (study notes, concepts, topics)
2. **Generate** - Click "✨ Generate Mind Map" to create your visualization
3. **Interact** - Click on branch nodes to expand with AI-generated insights
4. **Customize** - Use Settings (⚙️) to change themes and update your API key
5. **Export** - Save your mind map as PNG using the "📥 Export PNG" button

### Example Use Cases

- 📚 **Study Notes** - Transform lecture notes into visual summaries
- 🧪 **Research** - Organize complex topics and concepts
- 📊 **Project Planning** - Visualize project components and tasks
- 🎓 **Exam Prep** - Create quick revision materials
- 💡 **Brainstorming** - Explore ideas and connections

## 🎯 Example Prompts

Try these sample prompts to see the AI in action:

- "Machine Learning is a subset of AI that enables computers to learn from data. Key types include supervised, unsupervised, and reinforcement learning."
- "The water cycle involves evaporation, condensation, precipitation, and collection. Water moves between Earth's surface and atmosphere continuously."
- "Project Management involves initiation, planning, execution, monitoring, and closure. Key tools include Gantt charts, Kanban boards, and agile methodologies."

## 🛠️ Technical Details

### Architecture

- **Frontend**: Pure HTML5, CSS3, and Vanilla JavaScript
- **AI Integration**: Google Gemini Pro API
- **Visualization**: HTML5 Canvas API with custom rendering engine
- **Storage**: LocalStorage for API key persistence
- **Layout Algorithm**: Radial positioning with bezier curve connections

### Browser Compatibility

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Opera 76+

### API Usage

The application uses Google Gemini's free tier:
- **Rate Limit**: 60 requests/minute
- **Cost**: Free (within quota)
- **Model**: `gemini-pro`

## 🔧 Troubleshooting

### Common Issues

**Issue: "API Key Invalid"**
- Solution: Double-check you copied the complete key from Google AI Studio
- Verify no extra spaces before/after the key
- Make sure the key starts with `AIzaSy`

**Issue: "Network Error"**
- Solution: Check internet connection
- Verify API quota hasn't exceeded
- Try refreshing the page

**Issue: "Mind Map Not Rendering"**
- Solution: Open browser console (F12) to check errors
- Ensure JavaScript is enabled
- Try a different browser
- Clear browser cache

**Issue: "Slow Response"**
- Solution: Shorten input text
- Check API rate limits
- Wait a moment and try again

## 🎨 Customization

### Themes

The application includes 4 built-in themes:
- **Default** - Professional blues and purples
- **Dark** - Easy on the eyes for night usage
- **Warm** - Orange and red tones
- **Cool** - Cyan and blue hues

### Extending Functionality

The single-file architecture makes it easy to customize:

1. **Add More Themes** - Modify CSS variables in the `<style>` section
2. **Change Layout** - Update the `drawMindMap()` function
3. **Different AI Prompts** - Customize the prompt in `analyzeWithAI()`
4. **Additional Export Formats** - Extend `exportToPNG()` function

## 📊 Features Comparison

| Feature | This Clone | MyLens.AI Original |
|---------|-----------|-------------------|
| Text Input | ✅ | ✅ |
| Mind Maps | ✅ | ✅ |
| AI Analysis | ✅ (Gemini) | ✅ (Proprietary) |
| Themes | 4 themes | Multiple |
| Export PNG | ✅ | ✅ |
| File Upload | ⏳ Future | ✅ |
| Timelines | ⏳ Future | ✅ |
| Flowcharts | ⏳ Future | ✅ |
| Tables | ⏳ Future | ✅ |

## 🚧 Future Enhancements

- [ ] PDF and DOCX file upload support
- [ ] Multiple visualization types (timeline, flowchart, table)
- [ ] Real-time collaboration
- [ ] Local save/load functionality
- [ ] Chrome extension for quick access
- [ ] Drag-and-drop node repositioning
- [ ] Undo/redo functionality
- [ ] Custom color picker
- [ ] Advanced layout algorithms

## 📝 License

MIT License - feel free to use this for personal or commercial projects!

## 🤝 Contributing

Contributions welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

## 👨‍💻 Author

Built with ❤️ as a simplified clone of MyLens.AI for educational purposes.

## 🙏 Acknowledgments

- Original inspiration: [MyLens.AI](https://mylens.ai)
- AI Provider: Google Gemini
- Font: Google Fonts (Inter)

## 📞 Support

If you encounter issues:
1. Check the Troubleshooting section above
2. Open browser console (F12) for error details
3. Verify your API key is valid
4. Ensure you're using a modern browser

## 🎓 Learning Resources

- [Google Gemini API Docs](https://ai.google.dev/docs)
- [Canvas API Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [JavaScript Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

---

**Built in 3-4 hours as a fast prototype. Perfect for students, researchers, and anyone who wants to visualize complex information!** 🚀

**Star ⭐ this project if you find it helpful!**
