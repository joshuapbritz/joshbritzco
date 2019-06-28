export class Logger {
  private get styleprefix(): string[] {
    const styled = [`%c${this.prefix}`];

    if (!Array.isArray(this.color)) {
      styled.push(
        `background: ${
          this.color
        }; color: white; padding: 2px 0.5em; border-radius: 0.5em;`
      );
    } else {
      styled.push(
        `background: ${this.color[0]}; color: ${
          this.color[1]
        }; padding: 2px 0.5em; border-radius: 0.5em;`
      );
    }

    return styled;
  }

  constructor(
    public readonly prefix: string,
    public readonly color: string | [string, string]
  ) {}

  public log(...inputs: any[]): void {
    console.log(...this.styleprefix, ...inputs);
  }

  public warn(...inputs: any[]): void {
    console.warn(...this.styleprefix, ...inputs);
  }

  public info(...inputs: any[]): void {
    // tslint:disable-next-line:no-console
    console.info(...this.styleprefix, ...inputs);
  }

  public error(...inputs: any[]): void {
    console.error(...this.styleprefix, ...inputs);
  }
}
