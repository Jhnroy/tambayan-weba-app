

import { DashboardHeader } from "@/components/features/resident/dashboard-header";
import { EventCard } from "@/components/features/resident/event-card";
import { EventFilters } from "@/components/features/resident/event-filters";
import { WelcomeBanner } from "@/components/features/resident/welcome-banner";
import { ResidentSidebar } from "@/components/resident-sidebar";


type Event = {
  category: "Cleanup" | "Feeding" | "Seminar" | "Other";
  title: string;
  date: string;
  location: string;
  organizer: string;
  slots: string;
};

const events: Event[] = [
  {
    category: "Cleanup",
    title: "Community Cleanup Day",
    date: "2023-09-01",
    location: "City Park",
    organizer: "City Council",
    slots: "10/20",
  },
  {
    category: "Feeding",
    title: "Community Feeding Program",
    date: "2023-09-01",
    location: "City Park",
    organizer: "City Council",
    slots: "10/20",
  }]

export const ResidentDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-64 hidden md:block border-r bg-white">
        <ResidentSidebar />
      </div>

      <div className="flex-1 p-4 md:p-8">
        <DashboardHeader />
        <WelcomeBanner name="Maria" />
        <EventFilters />

        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {events.map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
};
