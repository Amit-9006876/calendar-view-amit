import { CalendarEvent, EventColor } from '@/components/Calendar/CalendarView.types';
import { isSameDay, isWithinInterval, startOfDay, endOfDay } from 'date-fns';

export const getEventsForDate = (events: CalendarEvent[], date: Date): CalendarEvent[] => {
  return events.filter((event) => {
    const eventStart = startOfDay(event.startDate);
    const eventEnd = endOfDay(event.endDate);
    const targetDay = startOfDay(date);
    
    return (
      isSameDay(event.startDate, date) ||
      isSameDay(event.endDate, date) ||
      isWithinInterval(targetDay, { start: eventStart, end: eventEnd })
    );
  });
};

export const getEventsForWeek = (events: CalendarEvent[], weekStart: Date, weekEnd: Date): CalendarEvent[] => {
  return events.filter((event) => {
    return (
      isWithinInterval(event.startDate, { start: weekStart, end: weekEnd }) ||
      isWithinInterval(event.endDate, { start: weekStart, end: weekEnd }) ||
      (event.startDate <= weekStart && event.endDate >= weekEnd)
    );
  });
};

export const sortEventsByTime = (events: CalendarEvent[]): CalendarEvent[] => {
  return [...events].sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
};

export const generateEventId = (): string => {
  return `event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const getEventColorClass = (color: EventColor = 'blue'): string => {
  const colorMap: Record<EventColor, string> = {
    blue: 'bg-event-blue text-white',
    green: 'bg-event-green text-white',
    purple: 'bg-event-purple text-white',
    orange: 'bg-event-orange text-white',
    pink: 'bg-event-pink text-white',
    teal: 'bg-event-teal text-white',
    red: 'bg-event-red text-white',
    yellow: 'bg-event-yellow text-neutral-900',
  };
  return colorMap[color];
};

export const getEventBorderClass = (color: EventColor = 'blue'): string => {
  const colorMap: Record<EventColor, string> = {
    blue: 'border-l-4 border-event-blue',
    green: 'border-l-4 border-event-green',
    purple: 'border-l-4 border-event-purple',
    orange: 'border-l-4 border-event-orange',
    pink: 'border-l-4 border-event-pink',
    teal: 'border-l-4 border-event-teal',
    red: 'border-l-4 border-event-red',
    yellow: 'border-l-4 border-event-yellow',
  };
  return colorMap[color];
};

export const validateEventForm = (data: {
  title: string;
  startDate: Date;
  endDate: Date;
}): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!data.title.trim()) {
    errors.title = 'Title is required';
  } else if (data.title.length > 100) {
    errors.title = 'Title must be 100 characters or less';
  }

  if (!data.startDate) {
    errors.startDate = 'Start date is required';
  }

  if (!data.endDate) {
    errors.endDate = 'End date is required';
  }

  if (data.startDate && data.endDate && data.endDate < data.startDate) {
    errors.endDate = 'End date must be after start date';
  }

  return errors;
};

export const createDefaultEvent = (date: Date): Omit<CalendarEvent, 'id'> => {
  const startDate = new Date(date);
  startDate.setHours(9, 0, 0, 0);
  
  const endDate = new Date(date);
  endDate.setHours(10, 0, 0, 0);

  return {
    title: '',
    description: '',
    startDate,
    endDate,
    color: 'blue',
    category: '',
  };
};

// Sample events for demo/storybook
export const generateSampleEvents = (baseDate: Date = new Date()): CalendarEvent[] => {
  const events: CalendarEvent[] = [
    {
      id: generateEventId(),
      title: 'Team Standup',
      description: 'Daily team sync meeting',
      startDate: new Date(baseDate.getFullYear(), baseDate.getMonth(), 5, 9, 0),
      endDate: new Date(baseDate.getFullYear(), baseDate.getMonth(), 5, 9, 30),
      color: 'blue',
      category: 'Meeting',
    },
    {
      id: generateEventId(),
      title: 'Project Review',
      description: 'Quarterly project review with stakeholders',
      startDate: new Date(baseDate.getFullYear(), baseDate.getMonth(), 10, 14, 0),
      endDate: new Date(baseDate.getFullYear(), baseDate.getMonth(), 10, 16, 0),
      color: 'purple',
      category: 'Work',
    },
    {
      id: generateEventId(),
      title: 'Birthday Party',
      description: 'Sarah\'s birthday celebration',
      startDate: new Date(baseDate.getFullYear(), baseDate.getMonth(), 15, 18, 0),
      endDate: new Date(baseDate.getFullYear(), baseDate.getMonth(), 15, 21, 0),
      color: 'pink',
      category: 'Birthday',
    },
    {
      id: generateEventId(),
      title: 'Gym Session',
      description: 'Weekly workout',
      startDate: new Date(baseDate.getFullYear(), baseDate.getMonth(), 8, 7, 0),
      endDate: new Date(baseDate.getFullYear(), baseDate.getMonth(), 8, 8, 30),
      color: 'green',
      category: 'Personal',
    },
    {
      id: generateEventId(),
      title: 'Client Call',
      description: 'Discussion about new features',
      startDate: new Date(baseDate.getFullYear(), baseDate.getMonth(), 12, 11, 0),
      endDate: new Date(baseDate.getFullYear(), baseDate.getMonth(), 12, 12, 0),
      color: 'orange',
      category: 'Work',
    },
    {
      id: generateEventId(),
      title: 'Lunch with Team',
      startDate: new Date(baseDate.getFullYear(), baseDate.getMonth(), 18, 12, 30),
      endDate: new Date(baseDate.getFullYear(), baseDate.getMonth(), 18, 13, 30),
      color: 'teal',
      category: 'Personal',
    },
  ];

  return events;
};
