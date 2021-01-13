// tslint:disable: no-console
export class Logger {
  private appName: string = 'typescript-template-repository';
  private moduleName: string;

  constructor(moduleName?: string) {
    this.moduleName = moduleName;
  }

  public log(text: string): void {
    if (this.moduleName) {
      console.log(`${this.appName} | ${this.moduleName} | ${text}`);
    } else {
      console.log(`${this.appName} | ${text}`);
    }
  }
}
