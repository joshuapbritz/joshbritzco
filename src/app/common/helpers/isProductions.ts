export function isProduction(): boolean {
  return (
    window.location.href.includes('//joshbritz.co') ||
    window.location.href.includes('//www.joshbritz.co')
  );
}
