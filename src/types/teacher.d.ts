export interface Schedule {
  day: string; // e.g., "Monday"
  start: string;
  end: string;
  classes: number;
}

export interface Teacher {
  id: string;
  name: string;
  subject: string;
  email: string;
  phone: string;
  createdAt: number;
  birthDate: string;
  address: string;
  weekdays: string[]; // Days they're available
  schedule: Schedule[]; // List of schedule entries per day
  qualifications?: string[]; // editable in edit page
}
