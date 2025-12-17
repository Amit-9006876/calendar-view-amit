# Calendar View Component

A fully interactive, production-grade calendar component built with React, TypeScript, and Tailwind CSS.

## Live Storybook
https://calender-project-l32z-7l4oubfna-amits-projects-df5961c7.vercel.app/

## Live Application
https://calendar-view-amit.vercel.app/

## Features

### Core Features
- **Month View**: 42-cell grid displaying complete weeks with events
- **Week View**: Time-based layout with hourly slots (00:00 - 23:00)
- **Event Management**: Create, edit, and delete events with a modal form
- **Navigation**: Previous/Next buttons, Today button, Month/Year display
- **View Toggle**: Switch between Month and Week views

### Event Features
- Title (required, max 100 characters)
- Description (optional, max 500 characters)
- Start/End date and time
- 8 color presets
- Category selection
- Validation with error messages

### Visual Features
- Today's date highlighted
- Adjacent month dates grayed out
- Event badges showing overflow count (+N)
- Colored event pills
- Smooth animations and transitions

### Accessibility (WCAG 2.1 AA)
- Full keyboard navigation
- ARIA labels and roles
- Focus indicators
- Screen reader support

## Project Structure

```
src/
├── components/
│   ├── Calendar/
│   │   ├── CalendarView.tsx        # Main component
│   │   ├── CalendarView.stories.tsx # Storybook stories
│   │   ├── CalendarView.types.ts   # TypeScript types
│   │   ├── MonthView.tsx           # Month grid view
│   │   ├── WeekView.tsx            # Week time-based view
│   │   ├── CalendarCell.tsx        # Individual day cell
│   │   └── EventModal.tsx          # Event form modal
│   │
│   └── primitives/                 # Reusable UI elements
│       ├── Button.tsx
│       ├── Modal.tsx
│       └── Select.tsx
│
├── hooks/
│   ├── useCalendar.ts              # Calendar state management
│   └── useEventManager.ts          # Event CRUD operations
│
├── utils/
│   ├── date.utils.ts               # Date manipulation utilities
│   └── event.utils.ts              # Event helper functions
│
├── styles/
│   └── globals.css                 # Global styles
│
└── index.css                       # Design system tokens
```



## Storybook

Storybook Stories

Default – Month view calendar

Empty – Calendar with no events

Week View – Week-based calendar layout
```bash
npm run storybook
```

### Available Stories
- **Default**: Current month with sample events
- **Empty State**: Calendar with no events
- **Week View**: Week view demonstration
- **With Many Events**: Month with 25+ events
- **Interactive Demo**: Full event management
- **Mobile View**: Responsive layout
- **Accessibility**: Keyboard navigation demo


## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **date-fns** - Date manipulation
- **Lucide React** - Icons
- **Storybook** - Component documentation




## Development

### Getting Started

```sh
# Install dependencies
npm install

# Start development server
npm run dev

# Run Storybook
npm run storybook
```

### Build

```sh
npm run build
```
