export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  color?: EventColor;
  category?: string;
}

export type EventColor = 
  | 'blue' 
  | 'green' 
  | 'purple' 
  | 'orange' 
  | 'pink' 
  | 'teal' 
  | 'red' 
  | 'yellow';

export type CalendarViewType = 'month' | 'week';

export interface CalendarViewProps {
  events: CalendarEvent[];
  onEventAdd: (event: CalendarEvent) => void;
  onEventUpdate: (id: string, updates: Partial<CalendarEvent>) => void;
  onEventDelete: (id: string) => void;
  initialView?: CalendarViewType;
  initialDate?: Date;
}

export interface CalendarCellProps {
  date: Date;
  events: CalendarEvent[];
  isToday: boolean;
  isSelected: boolean;
  isCurrentMonth: boolean;
  onClick: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
}

export interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event?: CalendarEvent | null;
  selectedDate?: Date;
  onSave: (event: Omit<CalendarEvent, 'id'> | CalendarEvent) => void;
  onDelete?: (id: string) => void;
}

export interface CalendarState {
  currentDate: Date;
  view: CalendarViewType;
  selectedDate: Date | null;
}

export interface EventFormData {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  color: EventColor;
  category: string;
}

export type FormErrors = Partial<Record<keyof EventFormData, string>>;

export const EVENT_COLORS: { value: EventColor; label: string; class: string }[] = [
  { value: 'blue', label: 'Blue', class: 'bg-event-blue' },
  { value: 'green', label: 'Green', class: 'bg-event-green' },
  { value: 'purple', label: 'Purple', class: 'bg-event-purple' },
  { value: 'orange', label: 'Orange', class: 'bg-event-orange' },
  { value: 'pink', label: 'Pink', class: 'bg-event-pink' },
  { value: 'teal', label: 'Teal', class: 'bg-event-teal' },
  { value: 'red', label: 'Red', class: 'bg-event-red' },
  { value: 'yellow', label: 'Yellow', class: 'bg-event-yellow' },
];

export const CATEGORIES = [
  'Work',
  'Personal',
  'Meeting',
  'Birthday',
  'Holiday',
  'Other',
];
