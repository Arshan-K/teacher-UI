"use client";

import { useForm, useWatch } from "react-hook-form";
import { Teacher, Schedule } from "@/types/teacher";
import { useTeachers } from "@/hooks/useTeachers";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import Toast from "./Toast";

type FormData = Omit<Teacher, "id">;

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function TeacherForm() {
  const { addTeacher } = useTeachers();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<"success" | "error" | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>();

  const selectedWeekdays: string[] = useWatch({ control, name: "weekdays" }) || [];

  const onSubmit = (data: any) => {
    setLoading(true);
    try {
      const schedule: Schedule[] = (data.weekdays || [])
        .map((day: string) => {
          const daySchedule = data.schedule?.[day];
          if (!daySchedule) return undefined;

          const { start, end, classes } = daySchedule;
          if (start && end && classes !== undefined && classes !== null) {
            return {
              day,
              start,
              end,
              classes: Number(classes),
            } as Schedule;
          }
          return undefined;
        })
        .filter((entry: Schedule | undefined): entry is Schedule => Boolean(entry)); // ✅ fixed

      const newTeacher: Teacher = {
        id: uuidv4(),
        name: data.name,
        subject: data.subject,
        email: data.email,
        phone: data.phone,
        birthDate: data.birthDate,
        address: data.address,
        weekdays: data.weekdays || [],
        schedule,
        createdAt: Date.now(),
      };

      addTeacher(newTeacher);
      setToast("success");
      setTimeout(() => router.push("/teachers"), 1000);
    } catch {
      setToast("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {toast && (
        <Toast
          type={toast}
          message={toast === "success" ? "Teacher added!" : "Error occurred"}
        />
      )}

      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          {...register("name", { required: "Name is required" })}
          className="w-full p-2 border rounded"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Subject</label>
        <input
          {...register("subject", { required: "Subject is required" })}
          className="w-full p-2 border rounded"
        />
        {errors.subject && <p className="text-red-500 text-sm">{errors.subject.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Birth Date</label>
        <input
          type="date"
          {...register("birthDate", { required: "Birth Date is required" })}
          className="w-full p-2 border rounded"
        />
        {errors.birthDate && <p className="text-red-500 text-sm">{errors.birthDate.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          {...register("email", { required: "Email is required" })}
          className="w-full p-2 border rounded"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Phone</label>
        <input
          type="tel"
          inputMode="numeric"
          maxLength={10}
          pattern="\d*"
          {...register("phone", {
            required: "Phone is required",
            maxLength: { value: 10, message: "Phone number must be 10 digits" },
            minLength: { value: 10, message: "Phone number must be 10 digits" },
            validate: (value) => /^\d+$/.test(value) || "Phone must contain only digits",
          })}
          onInput={(e) => {
            const input = e.currentTarget;
            input.value = input.value.replace(/\D/g, "").slice(0, 10);
          }}
          className="w-full p-2 border rounded"
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Address</label>
        <textarea
          {...register("address", { required: "Address is required" })}
          className="w-full p-2 border rounded"
        />
        {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Working Days</label>
        <div className="grid grid-cols-3 gap-2">
          {daysOfWeek.map((day) => (
            <label key={day} className="flex items-center space-x-2">
              <input type="checkbox" value={day} {...register("weekdays")} />
              <span>{day}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Weekly Schedule</label>
        <div className="space-y-4">
          {daysOfWeek.map((day) => (
            selectedWeekdays.includes(day) && (
              <div key={day} className="flex items-center gap-2">
                <span className="w-12">{day}</span>
                <input
                  type="time"
                  {...register(`schedule.${day}.start` as any)}
                  className="p-2 border rounded"
                />
                <input
                  type="time"
                  {...register(`schedule.${day}.end` as any)}
                  className="p-2 border rounded"
                />
                <input
                  type="number"
                  placeholder="Classes"
                  min={0}
                  {...register(`schedule.${day}.classes` as any, { valueAsNumber: true })}
                  className="p-2 border rounded w-24"
                />
              </div>
            )
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
      >
        {loading ? "Saving..." : "Save Teacher"}
      </button>
    </form>
  );
}
