const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fakeApi<T>(fn: () => T, opts?: { min?: number; max?: number; failRate?: number }) {
  const min = opts?.min ?? 350;
  const max = opts?.max ?? 900;
  const failRate = opts?.failRate ?? 0.08;
  const wait = Math.floor(Math.random() * (max - min + 1)) + min;
  await delay(wait);
  if (Math.random() < failRate) throw new Error("Mock API request failed. Please retry.");
  return fn();
}
