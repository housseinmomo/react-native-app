declare module '*.png';
declare module '*.PNG';
declare module '*.jpg' {
  const value: string;
  export default value;
}
