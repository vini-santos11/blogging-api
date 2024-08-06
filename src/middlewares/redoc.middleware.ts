import redoc from "redoc-express";

export function setupRedoc(app: any) {
  const redocOptions = {
    title: "Blogging API",
    version: "1.0",
    specUrl: '/swagger.json'
  };

  app.use("/docs", redoc(redocOptions));
}
