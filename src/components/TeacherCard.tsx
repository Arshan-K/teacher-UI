// src/components/TeacherCard.tsx
import { Teacher } from "@/types/teacher";

interface Props {
  teacher: Teacher;
  onDelete: (id: string) => void;
}

const TeacherCard = ({ teacher, onDelete }: Props) => {
  return (
    <div className="bg-white shadow rounded p-4 flex justify-between items-center">
      <div>
        <h3 className="font-semibold text-lg">{teacher.name}</h3>
        <p className="text-sm text-gray-600">{teacher.subject}</p>
        <p className="text-sm">{teacher.email}</p>
        <p className="text-sm">{teacher.phone}</p>
      </div>
      <button
        onClick={() => onDelete(teacher.id)}
        className="text-sm text-red-600 hover:underline"
      >
        Delete
      </button>
    </div>
  );
};

export default TeacherCard;
