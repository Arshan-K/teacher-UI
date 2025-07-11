"use client";

import { useEffect, useState } from "react";
import { Teacher } from "@/types/teacher";
import { getTeachers, saveTeacher, deleteTeacher } from "@/utils/localStorage";

export const useTeachers = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = getTeachers();
    setTeachers(data);
    setLoading(false);
  }, []);

  const addTeacher = (teacher: Teacher) => {
    saveTeacher(teacher);
    setTeachers((prev) => [...prev, teacher]);
  };

  const removeTeacher = (id: string) => {
    deleteTeacher(id);
    setTeachers((prev) => prev.filter((t) => t.id !== id));
  };

  return {
    teachers,
    loading,
    addTeacher,
    removeTeacher,
  };
};
