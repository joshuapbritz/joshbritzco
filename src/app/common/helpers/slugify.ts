export default (input: string) => {
  return input
    .toLowerCase()
    .split(' ')
    .map(word => word.replace(/[^a-z0-9]*/gi, ''))
    .join('-');
};
