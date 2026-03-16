import { describe, test, expect } from "vitest";
import { calculateLoan } from "./loan";

describe("calculateLoan", () => {
  test("Tổng tiền tính toán đúng", () => {
    const result = calculateLoan(
      "120000000",
      12,
      12
    );
    expect(result.totalPay).toBe(127800000);
  });

  test("Hiện đủ số dòng table theo thời gian kỳ hạn", () => {
    const result = calculateLoan(
      "120000000",
      30,
      12
    );
    expect(result.result.length).toBe(30);
  });
});