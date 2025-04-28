# Interactive Learning Platform

A modern learning platform built with React, TypeScript, and Supabase, featuring interactive courses, gamification elements, and a community space for sharing projects.

## Features

- 🎓 Interactive course catalog
- 🏆 Gamification (badges, points, levels)
- 👥 Community project sharing
- 📊 Personal learning dashboard
- 🌓 Dark/Light mode support
- 🎨 Beautiful UI with Tailwind CSS and shadcn/ui

## Prerequisites

- Node.js 18.0 or higher
- npm or yarn
- Supabase account

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd interactive-learning-platform
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory and add your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/     # Reusable UI components
│   ├── community/  # Community-related components
│   ├── courses/    # Course-related components
│   ├── dashboard/  # Dashboard components
│   ├── layout/     # Layout components
│   └── ui/         # Base UI components
├── contexts/       # React contexts
├── lib/           # Utility functions and configurations
├── pages/         # Page components
└── types/         # TypeScript type definitions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Tech Stack

- **Frontend Framework**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Backend**: Supabase
- **Routing**: React Router
- **Type Checking**: TypeScript

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.