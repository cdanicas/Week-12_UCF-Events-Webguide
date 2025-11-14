# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

UCF Events Webguide - A web application for browsing and managing University of Central Florida events.

This is currently an empty repository. Once initialized, this will be a web-based event guide application.

## Development Commands

Once the project is set up, common commands will include:

### Installation
```bash
npm install
# or
yarn install
```

### Development Server
```bash
npm run dev
# or
npm start
```

### Build
```bash
npm run build
```

### Testing
```bash
npm test              # Run all tests
npm test -- <file>    # Run specific test file
npm run test:watch    # Run tests in watch mode
```

### Linting
```bash
npm run lint          # Check for linting errors
npm run lint:fix      # Auto-fix linting errors
```

## Architecture (To Be Established)

This section will be updated once the project structure is created. Typical architecture for an events web guide:

### Frontend
- Component-based architecture (likely React, Vue, or similar)
- State management for event data
- Responsive design for mobile/desktop views
- Event listing, filtering, and search functionality

### Backend (if applicable)
- RESTful API or GraphQL for event data
- Database integration for event storage
- Authentication if user features are needed

### Data Structure
- Events: title, date, time, location, description, category
- Categories: academic, sports, social, club activities
- Potentially user accounts for saved events or RSVPs

## Project Initialization

When setting up this project from scratch, consider:
- Technology stack: React/Vue/vanilla JS for frontend
- Build tools: Vite, Create React App, or Next.js
- Styling: Tailwind CSS, Material-UI, or custom CSS
- Data source: Static JSON, external API, or database
- Responsive design for mobile accessibility
