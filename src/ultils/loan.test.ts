import { describe, test, expect } from "vitest";
import { calculateLoan } from "./loan";

describe("calculateLoan", () => {
  test("Test Tổng tiền tính toán đúng", () => {
    const result = calculateLoan(
      "120000000",
      12,
      12
    );
    expect(result.result.length).toBe(12);
    expect(result.totalPay).toBeGreaterThan(0);
    expect(result.totalInterestPay).toBeGreaterThan(0);

  });


  it("Test lãi giảm dần", () => {
    const res = calculateLoan("1000000", 3, 12);

    expect(res.result[0].interest).toBeGreaterThan(res.result[1].interest);
  });

  it("Test tổng phải trả có bằng lãi + dư nợ gốc không", () => {
    const res = calculateLoan("1000000", 2, 12);

    const row = res.result[0];

    expect(row.payment).toBe(row.principal + row.interest);
  });

  it("Test dư nơ gốc tháng cuối = 0", () => {
    const res = calculateLoan("1000000", 2, 12);

    const last = res.result[res.result.length - 1];

    expect(last.remaining).toBe(0);
  });


});