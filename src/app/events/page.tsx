import MainLayout from "../main-layout";
import EventsClient from "../../components/Event/events-client";

export default async function EventsPage() {
  let categories = [];
  let events = [];
  let hasError = false;

  try {
    const [categoryRes, eventRes] = await Promise.all([
      fetch("http://localhost:8000/categories"),
      fetch("http://localhost:8000/events/upcoming"),
    ]);

    if (!categoryRes.ok || !eventRes.ok) {
      throw new Error("Failed to fetch data");
    }

    const categoryData = await categoryRes.json();
    const eventData = await eventRes.json();

    categories = Array.isArray(categoryData)
      ? categoryData
      : categoryData.data || [];

    events = Array.isArray(eventData)
      ? eventData
      : eventData.data || [];

  } catch (error) {
    console.error("Events fetching error:", error);
    hasError = true;
  }

  // Jodi fetch korte giye error ashe, tahole ei UI-ti dekhabe
  if (hasError) {
    return (
      <MainLayout>
        <div className="py-20 text-center text-red-500">
          Failed to load events. Please try again later.
        </div>
      </MainLayout>
    );
  }

  // Shob thik thakle mukhkhu JSX component-gula try/catch er baire render hobe
  return (
    <MainLayout>
      <EventsClient
        categories={categories}
        events={events}
      />
    </MainLayout>
  );
}