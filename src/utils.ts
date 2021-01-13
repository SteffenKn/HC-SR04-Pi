export function generateId(idLength: number): string {
  let result: string = '';
  const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength: number = characters.length;

  for ( let i: number = 0; i < idLength; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

export function wait(ms: number): Promise<void> {
  return new Promise((resolve: Function): void => {setTimeout(resolve, ms); });
}
