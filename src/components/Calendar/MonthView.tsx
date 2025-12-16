import React, { memo, useCallback } from 'react';
import { CalendarCell } from './CalendarCell';
import { CalendarEvent } from './CalendarView.types';
import { WEEKDAY_NAMES } from '@/utils/date.utils';
import { getEventsForDate } from '@/utils/event.utils';

interface MonthViewProps {
  days: Date[];
  events: CalendarEvent[];
  currentDate: Date;
  selectedDate: Date | null;
  isToday: (date: Date) => boolean;
  isCurrentMonth: (date: Date) => boolean;
  isSelected: (date: Date) => boolean;
  onDateClick: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
}

export const MonthView: React.FC<MonthViewProps> = memo(({
  days,
  events,
  isToday,
  isCurrentMonth,
  isSelected,
  onDateClick,
  onEventClick,
}) => {
  const getEventsForDay = useCallback(
    (date: Date) => getEventsForDate(events, date),
    [events]
  );

  return (
    <div className="flex flex-col">
      {/* Weekday Headers */}
      <div className="grid grid-cols-7 bg-secondary border-b border-border">
        {WEEKDAY_NAMES.map((day) => (
          <div
            key={day}
            className="py-3 text-center text-sm font-medium text-muted-foreground"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-px bg-border flex-1">
        {days.map((day, index) => (
          <CalendarCell
            key={`${day.toISOString()}-${index}`}
            date={day}
            events={getEventsForDay(day)}
            isToday={isToday(day)}
            isSelected={isSelected(day)}
            isCurrentMonth={isCurrentMonth(day)}
            onClick={onDateClick}
            onEventClick={onEventClick}
          />
        ))}
      </div>
    </div>
  );
});

MonthView.displayName = 'MonthView';
