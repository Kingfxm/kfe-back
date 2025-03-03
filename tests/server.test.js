const request = require("supertest");
const app = require("../server");

describe("API Tests", () => {
  it("Debe obtener todos los productos", async () => {
    const res = await request(app).get("/api/products");
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it("Debe obtener un producto por ID", async () => {
    const res = await request(app).get("/api/products/1");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("name");
  });

  it("Debe manejar un producto inexistente", async () => {
    const res = await request(app).get("/api/products/999");
    expect(res.statusCode).toBe(404);
  });

  it("Debe rechazar acceso a una ruta protegida sin token", async () => {
    const res = await request(app).get("/api/protected");
    expect(res.statusCode).toBe(403);
  });
});
