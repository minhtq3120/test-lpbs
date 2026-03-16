import { describe, test, expect } from "vitest";
import { formatMoney } from "./common";

describe("formatMoney", () => {

  test("format đúng tiền VN", () => {
    const result = formatMoney(123451234567.89);

    expect(result).toBe("123.451.234.567,89");
  });

});