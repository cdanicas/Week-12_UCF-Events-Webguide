# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

UCF Event Planning Educational Website - An educational resource for UCF event planners (faculty, staff, students) providing step-by-step guidance, interactive tools, and resources for planning university events.

**Target Users**: UCF faculty, staff, and students planning events across various colleges, departments, and student organizations.

**Key Constraint**: Static site designed for GitHub Pages deployment (HTML/CSS/JavaScript only, no backend).

## Technology Stack

- **HTML5/CSS3/Vanilla JavaScript** - Core technologies (GitHub Pages compatible)
- **SheetJS (xlsx.js)** - Excel export for budget calculator, timeline builder, catering menu builder
- **Chart.js** - Budget visualizations and infographics
- **AOS (Animate On Scroll)** - Scroll-based animations
- **JSON files** - Content storage in `data/` directory for easy updates without code changes

## Development Commands

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev        # Start local development server
npm start          # Alternative command
```

### Build & Deployment
```bash
npm run build      # Build for production
npm run deploy     # Deploy to GitHub Pages
```

### Code Quality
```bash
npm run lint       # Check for linting errors
npm run lint:fix   # Auto-fix linting errors
```

## Architecture

### 9-Module Tab-Based Navigation

The site is organized into 9 main modules accessible via tab navigation:

1. **Conflict Management** - Links to UCF calendars (campus events, athletics, Board of Trustees, FL Board of Governors)
2. **Budgeting** - Interactive budget calculator with Excel export + best practices
3. **Venues** - Filterable directory of venues across 4 UCF campuses (Main, Lake Nona, Downtown Orlando, Rosen)
4. **Parking & Transportation** - Links to parking services, transportation, parking maps
5. **Security** - UCF Police links + security best practices
6. **Catering Services** - UCF dining menus + interactive catering menu builder with Excel export
7. **Event Permits** - UCF SAFE form link + permit requirements checklist
8. **Lodging** - Hotels near all 4 campuses with interactive maps
9. **Marketing** - UCF brand standards + marketing timeline templates

### Interactive Tools (Excel Export Required)

All interactive tools must support Excel export using SheetJS:

- **Budget Calculator** (`assets/js/tools/budgetCalculator.js`) - Line item entry, category organization, real-time totals, visual charts
- **Timeline Builder** (`assets/js/tools/timelineBuilder.js`) - Milestone tracking with Gantt-style visualization
- **Catering Menu Builder** (`assets/js/tools/cateringBuilder.js`) - Menu selection, guest count, dietary restrictions, cost estimation
- **Checklist Generator** (`assets/js/tools/checklistGenerator.js`) - Customizable event planning checklists

Export utility: `assets/js/tools/excelExporter.js`

### JSON-Based Content Management

All editable content is stored in JSON files under `data/` directory:

- `data/venues.json` - Venue information (name, campus, capacity, amenities, contact)
- `data/hotels.json` - Lodging near each campus
- `data/links.json` - All external UCF resource links
- `data/bestPractices.json` - Best practices content for each module
- `data/checklists.json` - Checklist templates

**Important**: When updating content, edit JSON files rather than hardcoding in HTML/JS. This allows non-developers to maintain content.

### File Structure

```
├── index.html                          # Main entry point with tab navigation
├── modules/                            # HTML for each of the 9 modules
│   ├── conflict-management.html
│   ├── budgeting.html
│   ├── venues.html
│   └── ...
├── assets/
│   ├── css/
│   │   ├── main.css                   # Global styles
│   │   ├── animations.css             # All animation definitions
│   │   └── modules/                   # Module-specific styles
│   ├── js/
│   │   ├── main.js                    # App initialization
│   │   ├── navigation.js              # Tab navigation logic
│   │   ├── tools/                     # Interactive tools
│   │   │   ├── budgetCalculator.js
│   │   │   ├── timelineBuilder.js
│   │   │   ├── cateringBuilder.js
│   │   │   └── excelExporter.js
│   │   └── utils/
│   │       └── dataLoader.js          # JSON data loading utility
│   └── lib/                           # Third-party libraries
│       ├── xlsx.min.js
│       ├── chart.min.js
│       └── aos.js
└── data/                              # Editable JSON content
    ├── venues.json
    ├── hotels.json
    ├── links.json
    └── ...
```

### Animation Strategy

- **Page Transitions**: Smooth fade/slide between module tabs
- **Scroll Animations**: AOS library for content reveals
- **Hover Effects**: Button scales, card elevations
- **Micro-interactions**: Form validation feedback, loading states
- **Step Progression**: Animated progress bars for multi-step processes

All animations defined in `assets/css/animations.css` and controlled by `assets/js/animations.js`.

## Key Architectural Decisions

1. **No Backend/Database**: All user data (budgets, timelines, menus) export to Excel rather than saving server-side
2. **localStorage for Drafts**: Use browser localStorage for temporary saving of in-progress work
3. **JSON Content**: All content in JSON for easy non-developer updates
4. **Module Isolation**: Each of the 9 modules is self-contained with dedicated HTML/CSS/JS
5. **UCF Branding**: Use UCF official colors (black/gold) and follow brand standards

## Development Workflow

1. **Adding New Content**: Edit relevant JSON file in `data/` directory
2. **Adding New Module**: Create HTML in `modules/`, CSS in `assets/css/modules/`, add to navigation
3. **Modifying Tools**: Update calculator/builder logic in `assets/js/tools/`
4. **Testing Excel Export**: Always test Excel export functionality after modifying interactive tools
5. **Animation Changes**: Update `assets/css/animations.css` and test across browsers
