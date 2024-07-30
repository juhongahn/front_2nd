import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

import { ReactNode } from "react";

const setup = (component: ReactNode) => {
  const user = userEvent.setup();
  return { user, ...render(component) };
};

describe("일정 관리 애플리케이션 통합 테스트", () => {
  describe("일정 CRUD 및 기본 기능", () => {
    test.only("새로운 일정을 생성하고 모든 필드가 정확히 저장되는지 확인한다", async () => {
      const { user } = setup(<App />);
      const titleInput = screen.getByLabelText("제목");
      await user.type(titleInput, "회의");

      const calendarInput = screen.getByLabelText("날짜");
      fireEvent.input(calendarInput, { target: { value: "2024-07-30" } });

      const startTimeInput = screen.getByLabelText("시작 시간");
      await user.type(startTimeInput, "15:00");

      const endTimeInput = screen.getByLabelText("종료 시간");
      await user.type(endTimeInput, "16:00");

      const descriptionInput = screen.getByLabelText("설명");
      await user.type(descriptionInput, "앱 버전 2 기획 설명");

      const locationInput = screen.getByLabelText("위치");
      await user.type(locationInput, "회의실 1");

      const categrySelect = screen.getByLabelText("카테고리");
      await user.selectOptions(categrySelect, ["업무"]);

      const repeatCheckbox = screen.getByLabelText("반복 설정");
      await user.click(repeatCheckbox);

      const alarmSelect = screen.getByLabelText("알림 설정");
      await user.selectOptions(alarmSelect, ["10분 전"]);

      const repeatSelect = screen.getByLabelText("반복 유형");
      await user.selectOptions(repeatSelect, ["매일"]);

      const repeatGapInput = screen.getByLabelText("반복 간격");
      await user.type(repeatGapInput, "1");

      const repeatEndInput = screen.getByLabelText("반복 종료일");
      fireEvent.input(repeatEndInput, { target: { value: "2024-07-31" } });

      const addButton = screen.getByTestId("event-submit-button");
      await user.click(addButton);

      expect(await screen.findByText("회의")).toBeInTheDocument();
      expect(
        await screen.findByText("2024-07-30 15:00 16:00"),
      ).toBeInTheDocument();
      expect(
        await screen.findByText("앱 버전 2 기획 설명"),
      ).toBeInTheDocument();
      expect(await screen.findByText("회의실 1")).toBeInTheDocument();
      expect(await screen.findByText("카테고리: 업무")).toBeInTheDocument();
      expect(await screen.findByText("알림: 10분 전")).toBeInTheDocument();
    });

    test.fails("새로운 일정을 생성하고 모든 필드가 정확히 저장되는지 확인한다");

    test.fails(
      "기존 일정의 세부 정보를 수정하고 변경사항이 정확히 반영되는지 확인한다",
    );
    test.fails("일정을 삭제하고 더 이상 조회되지 않는지 확인한다");
  });

  describe("일정 뷰 및 필터링", () => {
    test.fails("주별 뷰에 일정이 없으면, 일정이 표시되지 않아야 한다.");
    test.fails("주별 뷰에 일정이 정확히 표시되는지 확인한다");
    test.fails("월별 뷰에 일정이 없으면, 일정이 표시되지 않아야 한다.");
    test.fails("월별 뷰에 일정이 정확히 표시되는지 확인한다");
  });

  describe("알림 기능", () => {
    test.fails("일정 알림을 설정하고 지정된 시간에 알림이 발생하는지 확인한다");
  });

  describe("검색 기능", () => {
    test.fails("제목으로 일정을 검색하고 정확한 결과가 반환되는지 확인한다");
    test.fails("제목으로 일정을 검색하고 정확한 결과가 반환되는지 확인한다");
    test.fails("검색어를 지우면 모든 일정이 다시 표시되어야 한다");
  });

  describe("공휴일 표시", () => {
    test.fails("달력에 1월 1일(신정)이 공휴일로 표시되는지 확인한다");
    test.fails("달력에 5월 5일(어린이날)이 공휴일로 표시되는지 확인한다");
  });

  describe("일정 충돌 감지", () => {
    test.fails("겹치는 시간에 새 일정을 추가할 때 경고가 표시되는지 확인한다");
    test.fails(
      "기존 일정의 시간을 수정하여 충돌이 발생할 때 경고가 표시되는지 확인한다",
    );
  });
});
