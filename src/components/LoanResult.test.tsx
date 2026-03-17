import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import * as common from "@/ultils/common";
import LoanResult from "./LoanResult";
import type { CaculateLoanResponse } from "@/ultils/loan";

const mockCal: CaculateLoanResponse = {
  result: [],
  totalPay: 1000000,
  totalInterestPay: 20000,
};

describe("LoanResult", () => {
  it("Test hiển thị mặc định", () => {
    render(<LoanResult cal={null} />);

    expect(screen.getAllByText("0 VND").length).toBeGreaterThan(0);
  });

  it("Test hiển thị format tiền sau khi tính toán", () => {
    render(<LoanResult cal={mockCal} />);

    expect(screen.getByText(/1.000.000/)).toBeInTheDocument();
  });

  it("Test gọi hàm formatMoney", () => {
    const spy = vi.spyOn(common, "formatMoney");

    render(<LoanResult cal={mockCal} />);

    expect(spy).toHaveBeenCalled();
  });
});
