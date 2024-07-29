import { http, HttpResponse } from "msw";

type RepeatType = "none" | "daily" | "weekly" | "monthly" | "yearly";

interface RepeatInfo {
  type: RepeatType;
  interval: number;
  endDate?: string;
}

interface Event {
  id: number;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  description: string;
  location: string;
  category: string;
  repeat: RepeatInfo;
  notificationTime: number; // 분 단위로 저장
}

interface EventDataModel {
  id: number;
  eventData: Event;
}

// fake db
const events: EventDataModel[] = [];

export const mockCalendarApiHandler = [
  http.get("/api/events", async () => {
    const responseEvents = events.map((event) => removeRowId(event));
    HttpResponse.json(responseEvents);
  }),

  http.post("/api/events", async ({ request }) => {
    const { eventData } = (await request.json()) as { eventData: Event };
    const newEvent = { id: events.length + 1, eventData };
    events.push(newEvent);
    return HttpResponse.json(removeRowId(newEvent), { status: 201 });
  }),
];

const removeRowId = (eventDM: EventDataModel): Event => {
  const { id, ...event } = eventDM;

  return event.eventData;
};
