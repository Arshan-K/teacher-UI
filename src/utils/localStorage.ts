import { Teacher } from "@/types/teacher";

const STORAGE_KEY = "teachers";

export const getTeachers = (): Teacher[] => {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveTeacher = (teacher: Teacher) => {
  const existing = getTeachers();
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...existing, teacher]));
};

export const deleteTeacher = (id: string) => {
  const current = getTeachers();
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(current.filter((t) => t.id !== id))
  );
};
