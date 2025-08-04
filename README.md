# RepoScribe

RepoScribe is an AI-powered web application that generates high-quality documentation for GitHub repositories. It provides a seamless experience for developers to create comprehensive, professional documentation with just a few clicks.

## ✨ Features

- **🔐 GitHub OAuth Integration**: Secure authentication with GitHub
- **📚 Repository Selection**: Browse and select from your GitHub repositories
- **🤖 AI-Powered Generation**: Advanced AI analyzes your codebase and generates comprehensive documentation
- **🎨 Beautiful UI**: Modern, responsive design with smooth animations
- **📄 Multiple Export Formats**: Export documentation in Markdown, PDF, or HTML
- **⚡ Real-time Processing**: Watch the documentation generation process in real-time
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile devices

## 🚀 Tech Stack

- **Frontend**: Next.js 14, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Authentication**: GitHub OAuth
- **API**: Next.js API Routes

## 🛠️ Setup and Installation

### Prerequisites

- Node.js 18+ and npm/yarn
- GitHub OAuth App credentials

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd reposcribe
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. GitHub OAuth Setup

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in the application details:
   - **Application name**: RepoScribe
   - **Homepage URL**: http://localhost:3000
   - **Authorization callback URL**: http://localhost:3000/api/auth/callback
4. Copy the Client ID and Client Secret

### 4. Environment Configuration

1. Copy the example environment file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Update `.env.local` with your GitHub OAuth credentials:
   ```env
   NEXT_PUBLIC_GITHUB_CLIENT_ID=your_github_client_id_here
   GITHUB_CLIENT_ID=your_github_client_id_here
   GITHUB_CLIENT_SECRET=your_github_client_secret_here
   NEXTAUTH_URL=http://localhost:3000
   ```

### 5. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🎯 Usage

1. **Sign In**: Click "Sign in with GitHub" to authenticate
2. **Select Repository**: Choose a repository from your GitHub account
3. **Generate Documentation**: Watch as AI analyzes your code and generates comprehensive documentation
4. **Download**: Export your documentation in your preferred format

## 🏗️ Project Structure

```
reposcribe/
├── src/
│   ├── components/          # React components
│   │   ├── Landing.tsx      # Landing page with auth
│   │   ├── RepoSelector.tsx # Repository selection interface
│   │   ├── DocumentationGenerator.tsx # Documentation generation UI
│   │   └── Layout.tsx       # Main layout component
│   ├── contexts/           # React contexts
│   │   └── AuthContext.tsx # Authentication context
│   ├── pages/              # Next.js pages
│   │   ├── api/            # API routes
│   │   │   ├── auth/       # Authentication endpoints
│   │   │   ├── repositories.ts # Repository fetching
│   │   │   └── generate-documentation.ts # Documentation generation
│   │   ├── auth/           # Auth pages
│   │   └── index.tsx       # Main application page
│   ├── styles/             # CSS styles
│   └── types/              # TypeScript type definitions
├── public/                 # Static assets
└── README.md
```

## 🎨 Design Features

- **Modern Gradient Backgrounds**: Beautiful animated gradients
- **Glassmorphism Effects**: Subtle backdrop blur effects
- **Smooth Animations**: Framer Motion powered animations
- **Responsive Grid Layouts**: Perfect on all screen sizes
- **Interactive Elements**: Hover effects and micro-interactions
- **Loading States**: Elegant loading animations
- **Error Handling**: User-friendly error messages

## 🔧 API Endpoints

- `GET /api/auth/user` - Get authenticated user info
- `GET /api/auth/callback` - GitHub OAuth callback
- `GET /api/repositories` - Fetch user repositories
- `POST /api/generate-documentation` - Generate documentation

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Update GitHub OAuth callback URL to your production domain

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- Heroku
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is closed source. Contact for suggestions and contributions.

## 🙏 Acknowledgments

- GitHub API for repository access
- OpenAI/Anthropic for AI capabilities (integration ready)
- Vercel for hosting platform
- The open-source community for amazing tools

---

**Made with ❤️ for developers who value great documentation**
