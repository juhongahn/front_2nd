import React, {
  createContext,
  memo,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import dummyScheduleMap from "./dummyScheduleMap.ts";
import { useScheduleContext } from "./ScheduleContext.tsx";

interface TableIdsContextType {
  tableIds: string[];
  setTableIds: React.Dispatch<React.SetStateAction<string[]>>;
}

const TableIdsContext = createContext<TableIdsContextType | undefined>(
  undefined,
);

export const useTableIdsContext = () => {
  const context = useContext(TableIdsContext);
  if (context === undefined) {
    throw new Error("useSchedule must be used within a ScheduleProvider");
  }
  return context;
};

export const TableIdsProvider = memo(({ children }: PropsWithChildren) => {
  const [tableIds, setTableIds] = useState<string[]>(
    Object.keys(dummyScheduleMap),
  );

  return (
    <TableIdsContext.Provider value={{ tableIds, setTableIds }}>
      {children}
    </TableIdsContext.Provider>
  );
});
