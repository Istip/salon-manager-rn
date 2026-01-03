import { create } from 'zustand';

export interface DateState {
  today: Date;
  setToday: (date: Date) => void;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  selectedDay: Date;
  setSelectedDay: (date: Date) => void;
}

export const useDateStore = create<DateState>()((set) => ({
  today: new Date(),
  setToday: (date: Date) => set({ today: date }),
  selectedDate: new Date(),
  setSelectedDate: (date: Date) => set({ selectedDate: date }),
  selectedDay: new Date(),
  setSelectedDay: (date: Date) => set({ selectedDay: date }),
}));
