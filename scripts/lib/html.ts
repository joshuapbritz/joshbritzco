export function html(strings, ...values): string {
  let str = '';

  strings.forEach((string, i) => {
    str += string + processValue(values[i] || '');
  });

  return str.trim();
}

function processValue(value: any): string {
  if (Array.isArray(value)) {
    return value.join('');
  } else return value;
}
