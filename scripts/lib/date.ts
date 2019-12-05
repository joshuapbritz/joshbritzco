const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export function parseDate(input: string | Date): string {
  const date = new Date(input);

  return `${padZero(date.getDate())} ${
    months[date.getMonth()]
  } ${date.getFullYear()}`;
}

export function padZero(input: string | number): string {
  const value = input.toString();
  return ('0' + value).substr(-2);
}
