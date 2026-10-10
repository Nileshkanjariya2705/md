export function serializeData<T>(data: T): T {
  if (!data) return data;
  return JSON.parse(JSON.stringify(data));
}
