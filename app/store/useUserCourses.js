import { create } from "zustand";

export const useUserData = create((set) => ({
  data: null,
  setData: (userCourse) => set({ data: userCourse }),
  clearData: () => set({ data: null }),
}));

export const useUserTokens = create((set) => ({
  tokens: null,
  setTokens: (userTokens) => set({ tokens: userTokens }),
  clearData: () => set({ tokens: null }),
}));

export const useUserCourses = create((set) => ({
  courses: null,
  setCourses: (userCourses) => set({ courses: userCourses }),
  clearCourses: () => set({ courses: null }),
}));

export const useUserCoursesIds = create((set) => ({
  coursesID: [],
  setCoursesID: (userCoursesID) => set({ coursesID: userCoursesID }),
  clearCoursesID: () => set({ coursesID: [] }),
}));

export const useUserCoursesWorks = create((set) => ({
  coursesWork: [],
  setCoursesWorks: (userCoursesWorks) => set({ coursesWork: userCoursesWorks }),
  clearCoursesID: () => set({ coursesWork: [] }),
}));
