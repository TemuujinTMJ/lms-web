export const compareIds = (a: string, b: string) => {
  return (a || '').toString() === (b || '').toString();
};
