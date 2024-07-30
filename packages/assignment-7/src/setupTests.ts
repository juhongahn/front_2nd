import "@testing-library/jest-dom";
import { setupServer } from "msw/node";
import { mockCalendarApiHandler } from "./mockCalendarApiHandler";

const server = setupServer(...mockCalendarApiHandler);

beforeAll(() => server.listen());

afterEach(() => {
  server.resetHandlers();
  vi.clearAllMocks();
});
afterAll(() => {
  server.close();
  vi.clearAllMocks();
});
