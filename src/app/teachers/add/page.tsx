// src/app/teachers/add/page.tsx
import TeacherForm from "@/components/TeacherForm";

export default function AddTeacherPage() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Add Teacher</h2>
      <TeacherForm />
    </div>
  );
}
