// src/app/teachers/page.tsx
"use client";

import Graph from "@/components/Graph";
import TeacherCard from "@/components/TeacherCard";
import { useTeachers } from "@/hooks/useTeachers";

export default function TeacherDashboard() {
  const { teachers, removeTeacher } = useTeachers();

  return (
    <div className="space-y-6 text-black">
      <Graph />

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-black">All Teachers</h2>
        <div className="grid gap-4 text-black">
          {teachers.length === 0 ? (
            <p className="text-gray-600">No teachers found.</p>
          ) : (
            teachers.map((teacher) => (
              <TeacherCard key={teacher.id} teacher={teacher} onDelete={async (id) => {removeTeacher(id);}} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
