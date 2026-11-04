declare module 'node:test' {
  export function test(name: string, fn: () => void | Promise<void>): void
}

declare module 'node:assert/strict' {
  const assert: {
    equal<T>(actual: T, expected: T): void
    deepEqual(actual: unknown, expected: unknown): void
    ok(value: unknown): void
  }
  export default assert
}

