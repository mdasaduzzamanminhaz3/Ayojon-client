
export type EventCategory =
  | "Wedding"
  | "Birthday"
  | "Anniversary"
  | "Engagement"
  | "Conference"
  | "Workshop"
  | "Seminar"
  | "Concert"
  | "Festival"
  | "Charity"
  | "Sports"
  | "Social Gathering"
  | "Education"
  | "Corporate"
  | "Other";

export type EventStatus =
  | "upcoming"
  | "ongoing"
  | "completed"
  | "cancelled";

export interface IEvent {
    id: string;
  _id?: string;
  title: string;
  category: EventCategory;
  description: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  image: string;
  status: EventStatus;
  organizer: string;
  attendees?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  icon?: string;
}
