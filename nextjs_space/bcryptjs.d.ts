declare module 'bcryptjs' {
  export function hash(data: any, rounds: any): Promise<any>;
  export function compare(data: any, encrypted: any): Promise<any>;
  export function hashSync(data: any, rounds: any): any;
  export function compareSync(data: any, encrypted: any): any;
}
