import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameDay,
  isSameMonth,
  addMonths,
  subMonths,
  addWeeks,
  subWeeks,
  isToday,
  getHours,
  getMinutes,
  setHours,
  setMinutes,
  addDays,
} from 'date-fns';

export const getMonthDays = (date: Date): Date[] => {
  const start = startOfWeek(startOfMonth(date), { weekStartsOn: 0 });
  const end = endOfWeek(endOfMonth(date), { weekStartsOn: 0 });
  return eachDayOfInterval({ start, end });
};

export const getWeekDays = (date: Date): Date[] => {
  const start = startOfWeek(date, { weekStartsOn: 0 });
  const end = endOfWeek(date, { weekStartsOn: 0 });
  return eachDayOfInterval({ start, end });
};

export const formatMonthYear = (date: Date): string => {
  return format(date, 'MMMM yyyy');
};

export const formatDayNumber = (date: Date): string => {
  return format(date, 'd');
};

export const formatWeekDay = (date: Date): string => {
  return format(date, 'EEE');
};

export const formatFullDate = (date: Date): string => {
  return format(date, 'EEEE, MMMM d, yyyy');
};

export const formatTime = (date: Date): string => {
  return format(date, 'h:mm a');
};

export const formatDateForInput = (date: Date): string => {
  return format(date, "yyyy-MM-dd'T'HH:mm");
};

export const isSameDayCheck = (date1: Date, date2: Date): boolean => {
  return isSameDay(date1, date2);
};

export const isSameMonthCheck = (date1: Date, date2: Date): boolean => {
  return isSameMonth(date1, date2);
};

export const isTodayCheck = (date: Date): boolean => {
  return isToday(date);
};

export const navigateMonth = (date: Date, direction: 'next' | 'prev'): Date => {
  return direction === 'next' ? addMonths(date, 1) : subMonths(date, 1);
};

export const navigateWeek = (date: Date, direction: 'next' | 'prev'): Date => {
  return direction === 'next' ? addWeeks(date, 1) : subWeeks(date, 1);
};

export const getTimeFromDate = (date: Date): { hours: number; minutes: number } => {
  return {
    hours: getHours(date),
    minutes: getMinutes(date),
  };
};

export const setTimeOnDate = (date: Date, hours: number, minutes: number): Date => {
  return setMinutes(setHours(date, hours), minutes);
};

export const generateTimeSlots = (intervalMinutes: number = 60): string[] => {
  const slots: string[] = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += intervalMinutes) {
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      slots.push(time);
    }
  }
  return slots;
};

export const getEventPositionInDay = (
  startDate: Date,
  endDate: Date,
  dayStart: number = 0,
  dayEnd: number = 24
): { top: number; height: number } => {
  const startHour = getHours(startDate) + getMinutes(startDate) / 60;
  const endHour = getHours(endDate) + getMinutes(endDate) / 60;
  
  const totalHours = dayEnd - dayStart;
  const top = ((startHour - dayStart) / totalHours) * 100;
  const height = ((endHour - startHour) / totalHours) * 100;
  
  return { top: Math.max(0, top), height: Math.max(2, height) };
};

export const WEEKDAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const WEEKDAY_NAMES_FULL = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export { addDays };
