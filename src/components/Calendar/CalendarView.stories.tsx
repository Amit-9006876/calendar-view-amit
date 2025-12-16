import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { CalendarView } from './CalendarView';
import { CalendarEvent } from './CalendarView.types';
import { generateSampleEvents, generateEventId } from '@/utils/event.utils';

const meta: Meta<typeof CalendarView> = {
  title: 'Components/Calendar/CalendarView',
  component: CalendarView,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A fully interactive calendar component with month and week views, event management, and accessibility features.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    initialView: {
      control: 'radio',
      options: ['month', 'week'],
      description: 'Initial view mode of the calendar',
    },
    initialDate: {
      control: 'date',
      description: 'Initial date to display',
    },
  },
  decorators: [
    (Story) => (
      <div className="h-screen p-6 bg-neutral-50">
        <div className="h-full max-w-7xl mx-auto">
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CalendarView>;

// Wrapper component to handle state
const CalendarWithState = ({
  initialEvents = [],
  initialView = 'month',
  initialDate,
}: {
  initialEvents?: CalendarEvent[];
  initialView?: 'month' | 'week';
  initialDate?: Date;
}) => {
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);

  const handleEventAdd = (event: CalendarEvent) => {
    setEvents((prev) => [...prev, { ...event, id: generateEventId() }]);
  };

  const handleEventUpdate = (id: string, updates: Partial<CalendarEvent>) => {
    setEvents((prev) =>
      prev.map((event) => (event.id === id ? { ...event, ...updates } : event))
    );
  };

  const handleEventDelete = (id: string) => {
    setEvents((prev) => prev.filter((event) => event.id !== id));
  };

  return (
    <CalendarView
      events={events}
      onEventAdd={handleEventAdd}
      onEventUpdate={handleEventUpdate}
      onEventDelete={handleEventDelete}
      initialView={initialView}
      initialDate={initialDate}
    />
  );
};

/**
 * Default calendar view with sample events showing the current month.
 */
export const Default: Story = {
  render: () => <CalendarWithState initialEvents={generateSampleEvents()} />,
};

/**
 * Empty state showing a calendar with no events.
 */
export const EmptyState: Story = {
  render: () => <CalendarWithState initialEvents={[]} />,
  parameters: {
    docs: {
      description: {
        story: 'Calendar with no events. Click on any date to create a new event.',
      },
    },
  },
};

/**
 * Week view demonstration showing the time-based layout.
 */
export const WeekView: Story = {
  render: () => (
    <CalendarWithState
      initialEvents={generateSampleEvents()}
      initialView="week"
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Week view with time slots. Events are positioned based on their start time and duration.',
      },
    },
  },
};

// Generate many events for stress testing
const generateManyEvents = (): CalendarEvent[] => {
  const baseDate = new Date();
  const events: CalendarEvent[] = [];
  const colors: CalendarEvent['color'][] = [
    'blue', 'green', 'purple', 'orange', 'pink', 'teal', 'red', 'yellow',
  ];
  const categories = ['Work', 'Personal', 'Meeting', 'Birthday', 'Holiday', 'Other'];

  for (let i = 0; i < 25; i++) {
    const dayOffset = Math.floor(Math.random() * 28) + 1;
    const hour = Math.floor(Math.random() * 12) + 8;
    const duration = Math.floor(Math.random() * 3) + 1;

    events.push({
      id: generateEventId(),
      title: `Event ${i + 1}`,
      description: `Description for event ${i + 1}`,
      startDate: new Date(
        baseDate.getFullYear(),
        baseDate.getMonth(),
        dayOffset,
        hour,
        0
      ),
      endDate: new Date(
        baseDate.getFullYear(),
        baseDate.getMonth(),
        dayOffset,
        hour + duration,
        0
      ),
      color: colors[Math.floor(Math.random() * colors.length)],
      category: categories[Math.floor(Math.random() * categories.length)],
    });
  }

  return events;
};

/**
 * Calendar with many events (20+) to demonstrate performance and overflow handling.
 */
export const WithManyEvents: Story = {
  render: () => <CalendarWithState initialEvents={generateManyEvents()} />,
  parameters: {
    docs: {
      description: {
        story: 'Calendar with 25+ events showing badge indicators when more than 3 events exist on a single day.',
      },
    },
  },
};

/**
 * Fully functional event management demonstration.
 */
export const InteractiveDemo: Story = {
  render: () => <CalendarWithState initialEvents={generateSampleEvents()} />,
  parameters: {
    docs: {
      description: {
        story: `
Interactive demo with full event management capabilities:
- **Click empty cell**: Opens "Create Event" modal with pre-filled date
- **Click event**: Opens "Edit Event" modal with event details
- **Create**: Fill in event details and save
- **Edit**: Modify event details and save changes
- **Delete**: Remove events using the delete button
        `,
      },
    },
  },
};

/**
 * Mobile viewport demonstration showing responsive layout.
 */
export const MobileView: Story = {
  render: () => <CalendarWithState initialEvents={generateSampleEvents()} />,
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Mobile-optimized view with compact layout and touch-friendly interactions.',
      },
    },
  },
};

/**
 * Accessibility demonstration with keyboard navigation.
 */
export const Accessibility: Story = {
  render: () => <CalendarWithState initialEvents={generateSampleEvents()} />,
  parameters: {
    docs: {
      description: {
        story: `
Keyboard navigation demonstration:
- **Tab**: Move focus between interactive elements
- **Shift + Tab**: Move focus backwards
- **Enter / Space**: Activate focused element (open event or create new)
- **Escape**: Close modal or cancel action
- **Arrow Keys**: Navigate between calendar cells

All interactive elements have proper ARIA labels and focus indicators.
        `,
      },
    },
    a11y: {
      element: '#storybook-root',
      config: {},
      options: {},
      manual: false,
    },
  },
};
