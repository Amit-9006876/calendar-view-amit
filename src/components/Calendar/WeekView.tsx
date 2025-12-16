import React, { memo, useMemo, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { CalendarEvent } from './CalendarView.types';
import { formatWeekDay, formatDayNumber, generateTimeSlots, getEventPositionInDay, isSameDayCheck, formatTime } from '@/utils/date.utils';
import { getEventsForDate, getEventColorClass, getEventBorderClass } from '@/utils/event.utils';

interface WeekViewProps {
  days: Date[];
  events: CalendarEvent[];
  isToday: (date: Date) => boolean;
  onTimeSlotClick: (date: Date, hour: number) => void;
  onEventClick: (event: CalendarEvent) => void;
}

const HOUR_HEIGHT = 60; // pixels per hour
const START_HOUR = 0;
const END_HOUR = 24;

export const WeekView: React.FC<WeekViewProps> = memo(({
  days,
  events,
  isToday,
  onTimeSlotClick,
  onEventClick,
}) => {
  const timeSlots = useMemo(() => generateTimeSlots(60), []);

  const getEventsForDay = useCallback(
    (date: Date) => getEventsForDate(events, date),
    [events]
  );

  const handleTimeSlotClick = useCallback(
    (date: Date, hour: number) => {
      onTimeSlotClick(date, hour);
    },
    [onTimeSlotClick]
  );

  const handleEventClick = useCallback(
    (e: React.MouseEvent, event: CalendarEvent) => {
      e.stopPropagation();
      onEventClick(event);
    },
    [onEventClick]
  );

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header with day names */}
      <div className="flex border-b border-border bg-secondary shrink-0">
        {/* Time gutter */}
        <div className="w-16 shrink-0" />
        
        {/* Day headers */}
        <div className="flex-1 grid grid-cols-7">
          {days.map((day) => (
            <div
              key={day.toISOString()}
              className={cn(
                'py-3 text-center border-l border-border',
                isToday(day) && 'bg-primary-50'
              )}
            >
              <div className="text-sm font-medium text-muted-foreground">
                {formatWeekDay(day)}
              </div>
              <div
                className={cn(
                  'text-2xl font-semibold mt-1',
                  isToday(day) ? 'text-primary' : 'text-foreground'
                )}
              >
                {formatDayNumber(day)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Time grid */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex relative">
          {/* Time labels */}
          <div className="w-16 shrink-0 bg-background">
            {timeSlots.map((time, index) => (
              <div
                key={time}
                className="h-[60px] text-xs text-muted-foreground text-right pr-2 pt-0 -mt-2"
                style={{ height: HOUR_HEIGHT }}
              >
                {index > 0 && time}
              </div>
            ))}
          </div>

          {/* Day columns */}
          <div className="flex-1 grid grid-cols-7">
            {days.map((day) => {
              const dayEvents = getEventsForDay(day);
              
              return (
                <div
                  key={day.toISOString()}
                  className={cn(
                    'relative border-l border-border',
                    isToday(day) && 'bg-primary-50/30'
                  )}
                >
                  {/* Time slots (clickable) */}
                  {timeSlots.map((_, hourIndex) => (
                    <div
                      key={hourIndex}
                      className={cn(
                        'border-b border-border cursor-pointer',
                        'hover:bg-primary-50 transition-colors duration-100'
                      )}
                      style={{ height: HOUR_HEIGHT }}
                      onClick={() => handleTimeSlotClick(day, hourIndex)}
                      role="button"
                      tabIndex={0}
                      aria-label={`Add event at ${hourIndex}:00`}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleTimeSlotClick(day, hourIndex);
                        }
                      }}
                    />
                  ))}

                  {/* Events */}
                  {dayEvents.map((event) => {
                    // Only show if the event is on this day
                    if (!isSameDayCheck(event.startDate, day)) return null;
                    
                    const { top, height } = getEventPositionInDay(
                      event.startDate,
                      event.endDate,
                      START_HOUR,
                      END_HOUR
                    );

                    return (
                      <button
                        key={event.id}
                        onClick={(e) => handleEventClick(e, event)}
                        className={cn(
                          'absolute left-1 right-1 px-2 py-1 rounded text-xs overflow-hidden',
                          'cursor-pointer transition-all duration-150',
                          'hover:shadow-md hover:z-10',
                          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                          getEventBorderClass(event.color),
                          'bg-background shadow-sm'
                        )}
                        style={{
                          top: `${top}%`,
                          height: `${Math.max(height, 3)}%`,
                          minHeight: '24px',
                        }}
                      >
                        <div className="font-medium truncate text-foreground">
                          {event.title}
                        </div>
                        <div className="text-muted-foreground truncate">
                          {formatTime(event.startDate)} - {formatTime(event.endDate)}
                        </div>
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
});

WeekView.displayName = 'WeekView';
