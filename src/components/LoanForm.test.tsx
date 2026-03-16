import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import LoanForm from "@/components/LoanForm";
import userEvent from "@testing-library/user-event";

vi.mock("@/ultils/loan", () => ({
  calculateLoan: vi.fn(),
}));

describe("LoanForm", () => {
  it("show validation error when submit empty form", async () => {
    const setCal = vi.fn();

    render(<LoanForm setCal={setCal} />);

    const button = screen.getByRole("button", { name: /tính toán/i });

    await userEvent.click(button);

    expect(
      await screen.findByText("Vui lòng nhập số tiền vay"),
    ).toBeInTheDocument();
  });
});
