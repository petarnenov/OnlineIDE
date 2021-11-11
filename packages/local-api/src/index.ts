export interface ServeConfig {
  port: number;
  filename: string;
  dir: string;
}
export const serve = (serveConfig: ServeConfig) => {
  console.log(serveConfig);
};
