import * as RTL from "@testing-library/react";
const { render, screen } = RTL;
import { describe, expect, it } from "vitest"; // Thêm 'it' ở đây
import LoanTable from "./LoanTable";
import "@testing-library/jest-dom";

describe("render dữ liệu loan", () => {
  const mockData = {
    totalPay: 127800000,
    totalInterestPay: 7800000,
    result: [
      {
        month: 22,
        principal: 1000000,
        interest: 100000,
        remaining: 0,
        payment: 100000,
      },
    ],
  };

  it("hiển thị 127.800.000 trong bảng kết quả", () => {
    render(<LoanTable cal={mockData} />);

    const cell = screen.getByText("127.800.000 VND");
    expect(cell).toBeInTheDocument();
  });
});
