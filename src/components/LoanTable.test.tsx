import * as RTL from "@testing-library/react";
const { render, screen } = RTL;
import { describe, expect, it } from "vitest"; // Thêm 'it' ở đây
import LoanTable from "./LoanTable";
import "@testing-library/jest-dom";
import type { CaculateLoanResponse } from "@/ultils/loan";

const mockCal: CaculateLoanResponse = {
  result: [
    {
      month: 1,
      principal: 100000,
      remaining: 900000,
      interest: 10000,
      payment: 110000,
    },
    {
      month: 2,
      principal: 100000,
      remaining: 800000,
      interest: 9000,
      payment: 109000,
    },
  ],
  totalInterestPay: 19000,
  totalPay: 1019000,
};

describe("LoanTable", () => {
  it("Test hiển thị headers table", () => {
    render(<LoanTable cal={mockCal} />);

    expect(screen.getByText("Tháng")).toBeInTheDocument();
    expect(screen.getByText("Tiền gốc mỗi kỳ (VND)")).toBeInTheDocument();
    expect(screen.getByText("Tiền gốc còn lại (VND)")).toBeInTheDocument();
    expect(screen.getByText("Lãi mỗi kỳ (VND)")).toBeInTheDocument();
  });

  it("Test số line của table", () => {
    render(<LoanTable cal={mockCal} />);

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("Test format totalInterst và totalPay", () => {
    render(<LoanTable cal={mockCal} />);

    expect(screen.getAllByText(/19.000 VND/)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/1.019.000 VND/)[0]).toBeInTheDocument();
  });

  it("Mặc định cal = null", () => {
    render(<LoanTable cal={null} />);

    expect(screen.getByText("Tổng cộng")).toBeInTheDocument();
    expect(screen.getAllByText("0 VND").length).toBeGreaterThan(0);
  });
});
