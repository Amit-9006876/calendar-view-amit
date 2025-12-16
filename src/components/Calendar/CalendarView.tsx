import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/primitives/Button';
import { MonthView } from './MonthView';
import { WeekView } from './WeekView';
import { EventModal } from './EventModal';
import { CalendarViewProps, CalendarEvent, CalendarViewType } from './CalendarView.types';
import { useCalendar } from '@/hooks/useCalendar';
import { formatMonthYear, setTimeOnDate } from '@/utils/date.utils';
import { ChevronLeft, ChevronRight, Calendar, LayoutGrid } from 'lucide-react';

export const CalendarView: React.FC<CalendarViewProps> = ({
  events,
  onEventAdd,
  onEventUpdate,
  onEventDelete,
  initialView = 'month',
  initialDate = new Date(),
}) => {
  const {
    currentDate,
    view,
    selectedDate,
    days,
    goToNext,
    goToPrevious,
    goToToday,
    selectDate,
    setView,
    isToday,
    isCurrentMonth,
    isSelected,
  } = useCalendar(initialDate);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [modalDate, setModalDate] = useState<Date | undefined>(undefined);

  // Set initial view
  React.useEffect(() => {
    setView(initialView);
  }, [initialView, setView]);

  const handleDateClick = useCallback((date: Date) => {
    selectDate(date);
    setModalDate(date);
    setEditingEvent(null);
    setIsModalOpen(true);
  }, [selectDate]);

  const handleTimeSlotClick = useCallback((date: Date, hour: number) => {
    const dateWithTime = setTimeOnDate(date, hour, 0);
    selectDate(date);
    setModalDate(dateWithTime);
    setEditingEvent(null);
    setIsModalOpen(true);
  }, [selectDate]);

  const handleEventClick = useCallback((event: CalendarEvent) => {
    setEditingEvent(event);
    setModalDate(undefined);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingEvent(null);
    setModalDate(undefined);
  }, []);

  const handleSaveEvent = useCallback(
    (eventData: Omit<CalendarEvent, 'id'> | CalendarEvent) => {
      if ('id' in eventData && eventData.id) {
        onEventUpdate(eventData.id, eventData);
      } else {
        onEventAdd(eventData as CalendarEvent);
      }
    },
    [onEventAdd, onEventUpdate]
  );

  const handleDeleteEvent = useCallback(
    (id: string) => {
      onEventDelete(id);
    },
    [onEventDelete]
  );

  const handleViewChange = useCallback(
    (newView: CalendarViewType) => {
      setView(newView);
    },
    [setView]
  );

  return (
    <div className="flex flex-col h-full bg-background rounded-lg border border-border shadow-calendar overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-border bg-background">
        <div className="flex items-center gap-2">
          {/* Navigation */}
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={goToPrevious}
              aria-label={view === 'month' ? 'Previous month' : 'Previous week'}
              className="h-9 w-9"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={goToNext}
              aria-label={view === 'month' ? 'Next month' : 'Next week'}
              className="h-9 w-9"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Current date display */}
          <h2 className="text-lg font-semibold text-foreground ml-2">
            {formatMonthYear(currentDate)}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {/* Today button */}
          <Button variant="outline" size="sm" onClick={goToToday}>
            Today
          </Button>

          {/* View toggle */}
          <div className="flex rounded-lg border border-border overflow-hidden">
            <button
              onClick={() => handleViewChange('month')}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium transition-colors',
                view === 'month'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-background text-foreground hover:bg-secondary'
              )}
              aria-pressed={view === 'month'}
            >
              <LayoutGrid className="h-4 w-4" />
              <span className="hidden sm:inline">Month</span>
            </button>
            <button
              onClick={() => handleViewChange('week')}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium transition-colors border-l border-border',
                view === 'week'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-background text-foreground hover:bg-secondary'
              )}
              aria-pressed={view === 'week'}
            >
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Week</span>
            </button>
          </div>
        </div>
      </header>

      {/* Calendar Body */}
      <div className="flex-1 overflow-hidden">
        {view === 'month' ? (
          <MonthView
            days={days}
            events={events}
            currentDate={currentDate}
            selectedDate={selectedDate}
            isToday={isToday}
            isCurrentMonth={isCurrentMonth}
            isSelected={isSelected}
            onDateClick={handleDateClick}
            onEventClick={handleEventClick}
          />
        ) : (
          <WeekView
            days={days}
            events={events}
            isToday={isToday}
            onTimeSlotClick={handleTimeSlotClick}
            onEventClick={handleEventClick}
          />
        )}
      </div>

      {/* Event Modal */}
      <EventModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        event={editingEvent}
        selectedDate={modalDate}
        onSave={handleSaveEvent}
        onDelete={editingEvent ? handleDeleteEvent : undefined}
      />
    </div>
  );
};

export default CalendarView;
