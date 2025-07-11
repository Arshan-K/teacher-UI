"use client";

import React, { useState } from "react";
import clsx from "clsx";
import { useTeachers } from "@/hooks/useTeachers";
import { Teacher } from "@/types/teacher";

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const timeSlots = Array.from({ length: 13 }, (_, i) => `${8 + i}:00`); // 8AM to 8PM

const TeacherInsightsPage = () => {
  const { teachers } = useTeachers();
  const [search, setSearch] = useState("");
  const [selectedTeacherId, setSelectedTeacherId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("Availability");

  const filteredTeachers = teachers.filter((teacher) =>
    teacher.name.toLowerCase().includes(search.toLowerCase())
  );

  const selectedTeacher: Teacher | undefined = teachers.find(
    (t) => t.id === selectedTeacherId
  );

  const getCellDetails = (day: string, time: string) => {
    if (!selectedTeacher || !selectedTeacher.weekdays) return { color: "bg-gray-200", label: "" };

    const isWorkingDay = selectedTeacher.weekdays.includes(day);
    const hour = parseInt(time?.split(":")?.[0] ?? "0", 10);

    if (!isWorkingDay) return { color: "bg-gray-700", label: "" };

    const slot = selectedTeacher.schedule?.find((s) => s.day.toLowerCase() === day.toLowerCase());
    if (!slot) return { color: "bg-gray-400", label: "" };

    const startHour = parseInt(slot.start?.split(":")[0] ?? "0", 10);
    const endHour = parseInt(slot.end?.split(":")[0] ?? "0", 10);
    const hasClassAtHour = hour >= startHour && hour < endHour;

    if (activeTab === "Availability") {
      return hasClassAtHour
        ? { color: "bg-white", label: "" }
        : { color: "bg-green-300", label: "Available" };
    }

    if (activeTab === "Schedule") {
      return hasClassAtHour
        ? { color: "bg-red-300", label: `${slot.start} - ${slot.end}` }
        : { color: "bg-white", label: "" };
    }

    if (activeTab === "Classes") {
      return hasClassAtHour
        ? { color: "bg-pink-300", label: `Class (${slot.start} - ${slot.end})` }
        : { color: "bg-white", label: "" };
    }

    return { color: "bg-gray-200", label: "" };
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Teacher Insights</h1>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search teacher..."
        className="border p-2 w-full mb-4 rounded"
      />

      <div className="flex gap-2 mb-6 overflow-x-auto">
        {filteredTeachers.map((teacher) => (
          <button
            key={teacher.id}
            onClick={() => setSelectedTeacherId(teacher.id)}
            className={clsx(
              "px-3 py-2 border rounded",
              selectedTeacherId === teacher.id ? "bg-red-600 text-white" : "bg-white"
            )}
          >
            {teacher.name}
          </button>
        ))}
      </div>

      {selectedTeacher && (
        <>
          <div className="mb-4 p-4 border rounded bg-gray-50">
            <h2 className="text-xl font-semibold mb-2">{selectedTeacher.name}</h2>
            <p><strong>Subject:</strong> {selectedTeacher.subject}</p>
            <p><strong>Email:</strong> {selectedTeacher.email}</p>
            <p><strong>Phone:</strong> {selectedTeacher.phone}</p>
            <p><strong>Address:</strong> {selectedTeacher.address}</p>
            <p><strong>Birth Date:</strong> {selectedTeacher.birthDate}</p>
          </div>

          <div className="flex gap-4 mb-4">
            {["Availability", "Schedule", "Classes"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={clsx(
                  "px-4 py-2 rounded border",
                  activeTab === tab ? "bg-black text-white" : "bg-white"
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="overflow-auto border rounded shadow">
            <div className="grid grid-cols-8">
              <div className="bg-gray-100 p-2 font-bold">Time</div>
              {weekdays.map((day) => (
                <div key={day} className="bg-gray-100 p-2 font-bold text-center">
                  {day}
                </div>
              ))}
              {timeSlots.map((time, index) => (
                <React.Fragment key={`row-${time}`}>
                  <div className="border p-2 text-sm font-medium">{time}</div>
                  {weekdays.map((day) => {
                    const { color, label } = getCellDetails(day, time);
                    return (
                      <div
                        key={`${day}-${time}`}
                        className={clsx("border h-10 text-xs text-center flex items-center justify-center", color)}
                      >
                        {label}
                      </div>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TeacherInsightsPage;