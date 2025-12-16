import React, { memo, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { CalendarCellProps, CalendarEvent } from './CalendarView.types';
import { formatDayNumber, formatFullDate } from '@/utils/date.utils';
import { getEventColorClass } from '@/utils/event.utils';

const MAX_VISIBLE_EVENTS = 3;

export const CalendarCell: React.FC<CalendarCellProps> = memo(({
  date,
  events,
  isToday,
  isSelected,
  isCurrentMonth,
  onClick,
  onEventClick,
}) => {
  const dayNumber = formatDayNumber(date);
  const fullDate = formatFullDate(date);
  const visibleEvents = events.slice(0, MAX_VISIBLE_EVENTS);
  const remainingCount = events.length - MAX_VISIBLE_EVENTS;

  const handleCellClick = useCallback(() => {
    onClick(date);
  }, [date, onClick]);

  const handleEventClick = useCallback(
    (e: React.MouseEvent, event: CalendarEvent) => {
      e.stopPropagation();
      onEventClick(event);
    },
    [onEventClick]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick(date);
      }
    },
    [date, onClick]
  );

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`${fullDate}. ${events.length} events.`}
      aria-pressed={isSelected}
      onClick={handleCellClick}
      onKeyDown={handleKeyDown}
      className={cn(
        'min-h-[100px] md:min-h-[120px] p-1.5 md:p-2 cursor-pointer',
        'transition-all duration-150 ease-out',
        'hover:bg-primary-50',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring',
        isCurrentMonth ? 'bg-background' : 'bg-neutral-50',
        isSelected && 'bg-primary-100 ring-2 ring-inset ring-primary'
      )}
    >
      {/* Day Number */}
      <div className="flex items-center justify-between mb-1">
        <span
          className={cn(
            'flex items-center justify-center w-7 h-7 text-sm font-medium rounded-full',
            'transition-colors duration-150',
            isToday && 'bg-primary text-primary-foreground',
            !isToday && isCurrentMonth && 'text-foreground',
            !isToday && !isCurrentMonth && 'text-muted-foreground'
          )}
        >
          {dayNumber}
        </span>
        {remainingCount > 0 && (
          <span className="text-xs font-medium text-muted-foreground bg-secondary px-1.5 py-0.5 rounded">
            +{remainingCount}
          </span>
        )}
      </div>

      {/* Events */}
      <div className="space-y-1">
        {visibleEvents.map((event) => (
          <button
            key={event.id}
            onClick={(e) => handleEventClick(e, event)}
            className={cn(
              'w-full text-left px-1.5 py-0.5 rounded text-xs font-medium truncate',
              'transition-all duration-150 hover:opacity-90 hover:shadow-sm',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              getEventColorClass(event.color)
            )}
            title={event.title}
          >
            {event.title}
          </button>
        ))}
      </div>
    </div>
  );
});

CalendarCell.displayName = 'CalendarCell';
