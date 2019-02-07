export default (string: string) => {
  return string
    .toLowerCase()
    .split(' ')
    .map(word => word.replace(/[^a-z0-9]*/gi, ''))
    .join('-');
};
