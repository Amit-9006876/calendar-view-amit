import { useState, useCallback, useMemo } from 'react';
import { CalendarState, CalendarViewType } from '@/components/Calendar/CalendarView.types';
import {
  getMonthDays,
  getWeekDays,
  navigateMonth,
  navigateWeek,
  isTodayCheck,
  isSameMonthCheck,
  isSameDayCheck,
} from '@/utils/date.utils';

export const useCalendar = (initialDate: Date = new Date()) => {
  const [state, setState] = useState<CalendarState>({
    currentDate: initialDate,
    view: 'month',
    selectedDate: null,
  });

  const goToNextMonth = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentDate: navigateMonth(prev.currentDate, 'next'),
    }));
  }, []);

  const goToPreviousMonth = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentDate: navigateMonth(prev.currentDate, 'prev'),
    }));
  }, []);

  const goToNextWeek = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentDate: navigateWeek(prev.currentDate, 'next'),
    }));
  }, []);

  const goToPreviousWeek = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentDate: navigateWeek(prev.currentDate, 'prev'),
    }));
  }, []);

  const goToToday = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentDate: new Date(),
      selectedDate: new Date(),
    }));
  }, []);

  const goToDate = useCallback((date: Date) => {
    setState((prev) => ({
      ...prev,
      currentDate: date,
    }));
  }, []);

  const selectDate = useCallback((date: Date | null) => {
    setState((prev) => ({
      ...prev,
      selectedDate: date,
    }));
  }, []);

  const setView = useCallback((view: CalendarViewType) => {
    setState((prev) => ({
      ...prev,
      view,
    }));
  }, []);

  const goToNext = useCallback(() => {
    if (state.view === 'month') {
      goToNextMonth();
    } else {
      goToNextWeek();
    }
  }, [state.view, goToNextMonth, goToNextWeek]);

  const goToPrevious = useCallback(() => {
    if (state.view === 'month') {
      goToPreviousMonth();
    } else {
      goToPreviousWeek();
    }
  }, [state.view, goToPreviousMonth, goToPreviousWeek]);

  const days = useMemo(() => {
    if (state.view === 'month') {
      return getMonthDays(state.currentDate);
    }
    return getWeekDays(state.currentDate);
  }, [state.currentDate, state.view]);

  const isToday = useCallback((date: Date) => isTodayCheck(date), []);

  const isCurrentMonth = useCallback(
    (date: Date) => isSameMonthCheck(date, state.currentDate),
    [state.currentDate]
  );

  const isSelected = useCallback(
    (date: Date) => state.selectedDate ? isSameDayCheck(date, state.selectedDate) : false,
    [state.selectedDate]
  );

  return {
    ...state,
    days,
    goToNextMonth,
    goToPreviousMonth,
    goToNextWeek,
    goToPreviousWeek,
    goToToday,
    goToDate,
    goToNext,
    goToPrevious,
    selectDate,
    setView,
    isToday,
    isCurrentMonth,
    isSelected,
  };
};
