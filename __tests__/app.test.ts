export function sum(a: number, b: number): number {
  return a + b;
}

describe("sum", () => {
  it("should add two numbers", () => {
    const result = sum(2, 3);
    expect(result).toBe(5);
  });
});
