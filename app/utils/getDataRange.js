function getDateRange(range) {
  const now = new Date();
  const start = new Date(now);
  if (range === "1d") start.setDate(now.getDate() - 1);
  else if (range === "7d") start.setDate(now.getDate() - 7);
  else if (range === "30d") start.setDate(now.getDate() - 30);
  else return null; // "all"
  start.setHours(0, 0, 0, 0);
  return start;
}
export default getDateRange