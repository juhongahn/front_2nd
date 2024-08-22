import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Stack,
} from "@chakra-ui/react";
import ScheduleTable from "./ScheduleTable.tsx";
import { useScheduleContext } from "./ScheduleContext.tsx";
import SearchDialog from "./SearchDialog.tsx";
import { memo, useCallback, useState } from "react";
import { useDndContext } from "@dnd-kit/core";
import ScheduleDndProvider from "./ScheduleDndProvider.tsx";
import { useTableIdsContext } from "./TableIdsContext.tsx";
import { Schedule } from "./types.ts";

type AddButtonProps = {
  tableId: string;
};

const AddButton = memo(({ tableId }: AddButtonProps) => {
  const { schedules, setSchedules } = useScheduleContext();
  const { tableIds, setTableIds } = useTableIdsContext();

  const duplicate = useCallback((targetId: string) => {
    setTableIds((prev) => {
      return [...prev, `schedule-${Date.now()}`];
    });

    setSchedules((prev: Record<string, Schedule[]>) => ({
      ...prev,
      [`schedule-${Date.now()}`]: [...prev[targetId]],
    }));
  }, []);

  return (
    <Button colorScheme="green" mx="1px" onClick={() => duplicate(tableId)}>
      복제
    </Button>
  );
});

export const ScheduleTables = () => {
  const { tableIds, setTableIds } = useTableIdsContext();
  const [searchInfo, setSearchInfo] = useState<{
    tableId: string;
    day?: string;
    time?: number;
  } | null>(null);

  const disabledRemoveButton = tableIds.length === 1;
  const remove = (targetId: string) => {
    setTableIds(tableIds.filter((id) => id !== targetId));
  };

  return (
    <>
      <Flex w="full" gap={6} p={6} flexWrap="wrap">
        {tableIds.map((tableId, index) => (
          <Stack key={tableId} width="600px">
            <Flex justifyContent="space-between" alignItems="center">
              <Heading as="h3" fontSize="lg">
                시간표 {index + 1}
              </Heading>
              <ButtonGroup size="sm" isAttached>
                <Button
                  colorScheme="green"
                  onClick={() => setSearchInfo({ tableId })}
                >
                  시간표 추가
                </Button>
                <AddButton tableId={tableId} />
                <Button
                  colorScheme="green"
                  isDisabled={disabledRemoveButton}
                  onClick={() => remove(tableId)}
                >
                  삭제
                </Button>
              </ButtonGroup>
            </Flex>

            <ScheduleDndProvider>
              <ScheduleTableContainer
                key={`schedule-table-${index}`}
                tableId={tableId}
                onScheduleTimeClick={(timeInfo) =>
                  setSearchInfo({ tableId, ...timeInfo })
                }
              />
            </ScheduleDndProvider>
          </Stack>
        ))}
      </Flex>
      <SearchDialog
        searchInfo={searchInfo}
        onClose={() => setSearchInfo(null)}
      />
    </>
  );
};

type ScheduleTableContainerProps = {
  onScheduleTimeClick: (timeInfo: { day: string; time: number }) => void;
  tableId: string;
};
const ScheduleTableContainer = ({
  onScheduleTimeClick,
  tableId,
}: ScheduleTableContainerProps) => {
  const dndContext = useDndContext();
  const { schedules } = useScheduleContext();
  const getActiveTableId = () => {
    const activeId = dndContext.active?.id;
    if (activeId) {
      return String(activeId).split(":")[0];
    }
    return null;
  };
  const activeTableId = getActiveTableId();
  return (
    <>
      <Box
        position="relative"
        outline={activeTableId === tableId ? "5px dashed" : undefined}
        outlineColor="blue.300"
      >
        <ScheduleTable
          tableId={tableId}
          schedules={schedules[tableId]}
          onScheduleTimeClick={onScheduleTimeClick}
        />
      </Box>
    </>
  );
};
