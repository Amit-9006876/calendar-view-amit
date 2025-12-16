# Calendar View Component

A fully interactive, production-grade calendar component built with React, TypeScript, and Tailwind CSS.

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

## Usage

```tsx
import { CalendarView } from '@/components/Calendar/CalendarView';
import { useEventManager } from '@/hooks/useEventManager';

function App() {
  const { events, addEvent, updateEvent, deleteEvent } = useEventManager();

  return (
    <CalendarView
      events={events}
      onEventAdd={addEvent}
      onEventUpdate={updateEvent}
      onEventDelete={deleteEvent}
      initialView="month"
      initialDate={new Date()}
    />
  );
}
```

## Storybook

Run Storybook to see all component states:

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

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| Tab | Move focus between elements |
| Shift + Tab | Move focus backwards |
| Enter / Space | Activate focused element |
| Escape | Close modal |
| Arrow Keys | Navigate calendar cells |

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **date-fns** - Date manipulation
- **Lucide React** - Icons
- **Storybook** - Component documentation

## Design Tokens

The component uses a design system with semantic tokens defined in `index.css`:

- Primary colors (sky blue)
- Neutral scale
- Event colors (8 presets)
- Spacing, shadows, animations

## Performance

- `React.memo()` for cell components
- `useCallback` and `useMemo` for optimized re-renders
- Efficient event filtering by date
- Lazy modal loading

---

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
