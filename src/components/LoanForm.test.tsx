import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import LoanForm from "@/components/LoanForm";
import userEvent from "@testing-library/user-event";
import { calculateLoan } from "@/ultils/loan";

vi.mock("@/ultils/loan");
const mockedCalculateLoan = vi.mocked(calculateLoan);

describe("LoanForm", () => {
  it("Test submit khi form rỗng", async () => {
    const setCal = vi.fn();

    render(<LoanForm setCal={setCal} />);

    const button = screen.getByRole("button", { name: /tính toán/i });

    await userEvent.click(button);

    expect(
      await screen.findByText("Vui lòng nhập số tiền vay"),
    ).toBeInTheDocument();
  });

  it("Test submit form thành công", async () => {
    const setCal = vi.fn();

    mockedCalculateLoan.mockReturnValue({
      result: [],
      totalPay: 100000,
      totalInterestPay: 20000,
    });

    render(<LoanForm setCal={setCal} />);

    await userEvent.type(screen.getByLabelText(/số tiền vay/i), "1000000");
    await userEvent.type(screen.getByLabelText(/lãi suất vay/i), "10");
    await userEvent.type(screen.getByLabelText(/thời hạn vay/i), "12");

    await userEvent.click(screen.getByRole("button", { name: /tính toán/i }));

    expect(calculateLoan).toHaveBeenCalled();
    expect(setCal).toHaveBeenCalled();
  });

  it("Test nhập số tiền <= 0", async () => {
    const setCal = vi.fn();

    render(<LoanForm setCal={setCal} />);

    await userEvent.type(screen.getByLabelText(/số tiền vay/i), "0");

    await userEvent.click(screen.getByRole("button", { name: /tính toán/i }));

    expect(
      await screen.findByText("Số tiền vay phải lớn hơn 0 VND"),
    ).toBeInTheDocument();
  });

  it("Test nhập số tiền > 1000 tỷ max", async () => {
    const setCal = vi.fn();

    render(<LoanForm setCal={setCal} />);

    await userEvent.type(
      screen.getByLabelText(/số tiền vay/i),
      "100000000000000",
    );

    await userEvent.click(screen.getByRole("button", { name: /tính toán/i }));

    expect(
      await screen.findByText("Số tiền vay tối đa là 1000 tỷ VND"),
    ).toBeInTheDocument();
  });

  it("Test Nhập kỳ hạn < 1 tháng", async () => {
    const setCal = vi.fn();

    render(<LoanForm setCal={setCal} />);

    await userEvent.type(screen.getByLabelText(/thời hạn vay/i), "0");

    await userEvent.click(screen.getByRole("button", { name: /tính toán/i }));

    expect(
      await screen.findByText("Vui lòng nhập kỳ hạn tối thiểu 1 tháng"),
    ).toBeInTheDocument();
  });

  it("Test Nhập kỳ hạn > 35 tháng (max)", async () => {
    const setCal = vi.fn();

    render(<LoanForm setCal={setCal} />);

    await userEvent.type(screen.getByLabelText(/thời hạn vay/i), "36");

    await userEvent.click(screen.getByRole("button", { name: /tính toán/i }));

    expect(
      await screen.findByText("Kỳ hạn vay tối đa là 35 tháng"),
    ).toBeInTheDocument();
  });

  it("Test không nhập lãi suất vay hoặc nhập <=0", async () => {
    const setCal = vi.fn();

    render(<LoanForm setCal={setCal} />);

    await userEvent.type(screen.getByLabelText(/lãi suất vay/i), "0");

    await userEvent.click(screen.getByRole("button", { name: /tính toán/i }));

    expect(
      await screen.findByText("Vui lòng nhập lãi suất lớn hơn 0%"),
    ).toBeInTheDocument();
  });
});
