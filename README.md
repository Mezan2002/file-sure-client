# FileSure Frontend

Modern, responsive web application for the FileSure Referral & Credit System built with Next.js 15, TypeScript, Tailwind CSS, and TanStack Query.

## 📖 Overview

FileSure is a referral and credit management platform that allows users to earn credits by referring friends. This frontend application provides an intuitive interface for user authentication, referral tracking, and real-time dashboard analytics.

## ✨ Features

- 🔐 **Secure Authentication** - Register, login, logout with JWT
- 👥 **Referral System** - Share unique referral links
- 💰 **Credit Tracking** - Real-time credit balance updates
- 📊 **Interactive Dashboard** - View referral stats and conversions
- 🎨 **Modern UI** - Responsive design with Tailwind CSS
- 🔄 **Auto-Refresh** - Dashboard polls for updates every 30 seconds
- 📋 **Copy to Clipboard** - Easy referral link sharing
- 🎯 **Type-Safe** - Full TypeScript implementation
- 🚀 **Optimized Performance** - TanStack Query caching
- 📱 **Mobile Responsive** - Works on all devices

## 🏗️ Architecture

## 🚀 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn UI
- **Animation:** Framer Motion
- **State Management:** Zustand (client state) + TanStack Query (server state)
- **Data Fetching:** TanStack Query (React Query)
- **HTTP Client:** Axios
- **Form Handling:** React Hook Form
- **Validation:** Zod
- **Notifications:** Sonner (toast)
- **Icons:** Lucide React

## 📦 Installation

### Prerequisites

- Node.js v18 or higher
- npm or yarn
- Backend API running (see backend README)

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/filesure-frontend.git
   cd filesure-frontend
   ```

### Install dependencies

npm install

### Environment Configuration

cp .env.example .env.local

### Update .env.local:

NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_URL=http://localhost:3000

### Run Development Server

npm run dev
Open http://localhost:3000
