import { ChakraProvider } from "@chakra-ui/react";
import { ScheduleProvider } from "./ScheduleContext.tsx";
import { ScheduleTables } from "./ScheduleTables.tsx";
import { TableIdsProvider } from "./TableIdsContext.tsx";

function App() {
  return (
    <ChakraProvider>
      <ScheduleProvider>
        <TableIdsProvider>
          <ScheduleTables />
        </TableIdsProvider>
      </ScheduleProvider>
    </ChakraProvider>
  );
}

export default App;
