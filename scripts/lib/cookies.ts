export class CookieMonster {
  constructor() {
    if (process.env.NODE_ENV !== 'production') console.log(`COOKIES!!!!!!`);
  }

  public getAll(): { [key: string]: string } {
    const values = document.cookie.split('; ');
    const mapped = values.map(d => d.split('='));
    console.log(mapped);
    return;
  }

  public get(key: string): string {
    return;
  }
}
