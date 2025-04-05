declare module "*.hbs" {
  const value: (v: unknown) => string;
  export default value;
}
