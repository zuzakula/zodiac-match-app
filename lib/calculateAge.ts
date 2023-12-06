export const calculateAge = (date) => {
  const diff = Date.now() - date.getTime();
  const resultDate = new Date(diff);
  const year = resultDate.getUTCFullYear();
  return Math.abs(year - 1970);
};
