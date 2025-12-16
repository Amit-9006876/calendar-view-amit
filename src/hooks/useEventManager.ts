import { useState, useCallback, useMemo } from 'react';
import { CalendarEvent } from '@/components/Calendar/CalendarView.types';
import { generateEventId, getEventsForDate, sortEventsByTime } from '@/utils/event.utils';

interface UseEventManagerOptions {
  initialEvents?: CalendarEvent[];
}

export const useEventManager = (options: UseEventManagerOptions = {}) => {
  const [events, setEvents] = useState<CalendarEvent[]>(options.initialEvents || []);

  const addEvent = useCallback((eventData: Omit<CalendarEvent, 'id'>) => {
    const newEvent: CalendarEvent = {
      ...eventData,
      id: generateEventId(),
    };
    setEvents((prev) => [...prev, newEvent]);
    return newEvent;
  }, []);

  const updateEvent = useCallback((id: string, updates: Partial<CalendarEvent>) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === id ? { ...event, ...updates } : event
      )
    );
  }, []);

  const deleteEvent = useCallback((id: string) => {
    setEvents((prev) => prev.filter((event) => event.id !== id));
  }, []);

  const getEventById = useCallback(
    (id: string): CalendarEvent | undefined => {
      return events.find((event) => event.id === id);
    },
    [events]
  );

  const getEventsForDay = useCallback(
    (date: Date): CalendarEvent[] => {
      return sortEventsByTime(getEventsForDate(events, date));
    },
    [events]
  );

  const eventsByDate = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();
    events.forEach((event) => {
      const dateKey = event.startDate.toISOString().split('T')[0];
      const existing = map.get(dateKey) || [];
      map.set(dateKey, [...existing, event]);
    });
    return map;
  }, [events]);

  const totalEventCount = useMemo(() => events.length, [events]);

  return {
    events,
    setEvents,
    addEvent,
    updateEvent,
    deleteEvent,
    getEventById,
    getEventsForDay,
    eventsByDate,
    totalEventCount,
  };
};
