import React from 'react';
import { CalendarView } from '@/components/Calendar/CalendarView';
import { useEventManager } from '@/hooks/useEventManager';
import { generateSampleEvents } from '@/utils/event.utils';
import { CalendarEvent } from '@/components/Calendar/CalendarView.types';

const Index: React.FC = () => {
  const { events, addEvent, updateEvent, deleteEvent } = useEventManager({
    initialEvents: generateSampleEvents(),
  });

  const handleEventAdd = (event: CalendarEvent) => {
    addEvent(event);
  };

  const handleEventUpdate = (id: string, updates: Partial<CalendarEvent>) => {
    updateEvent(id, updates);
  };

  const handleEventDelete = (id: string) => {
    deleteEvent(id);
  };

  return (
    <main className="min-h-screen bg-neutral-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <header className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Calendar
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your events and schedule
          </p>
        </header>

        {/* Calendar Container */}
        <div className="h-[calc(100vh-180px)] min-h-[600px]">
          <CalendarView
            events={events}
            onEventAdd={handleEventAdd}
            onEventUpdate={handleEventUpdate}
            onEventDelete={handleEventDelete}
            initialView="month"
          />
        </div>
      </div>
    </main>
  );
};

export default Index;
