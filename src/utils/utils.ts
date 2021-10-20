export const asyncForEach = async <T = unknown, R=unknown>(array: T[], callback: (item: T, index: number, array: T[]) => Promise<R>) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};