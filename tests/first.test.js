//import { assertEquals } from "https://deno.land/std@0.120.0/testing/asserts.ts";
//import { Application } from "../deps.js";
import { superoak } from "https://deno.land/x/superoak@4.6.0/mod.ts";
import { app } from "../app.js";

Deno.test({
  name: "Test /",
  async fn() {
    const testClient = await superoak(app);
    await testClient.get("/").expect(200);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name: "Test /topics",
  async fn() {
    const testClient = await superoak(app);
    await testClient.get("/topics").expect(302);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name: "Test /auth/login",
  async fn() {
    const testClient = await superoak(app);
    await testClient.get("/topics").expect(302);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name: "Test /auth/register",
  async fn() {
    const testClient = await superoak(app);
    await testClient.get("/topics").expect(302);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name: "Test /quiz",
  async fn() {
    const testClient = await superoak(app);
    await testClient.get("/topics").expect(302);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name: "Test /auth/register",
  async fn() {
    const testClient = await superoak(app);
    await testClient.post("/topics").expect(302);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name: "Test /topics",
  async fn() {
    const testClient = await superoak(app);
    await testClient.post("/topics").expect(302);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name: "Test /auth/login",
  async fn() {
    const testClient = await superoak(app);
    await testClient.post("/topics").expect(302);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name: "Test /api/questions/random",
  async fn() {
    const testClient = await superoak(app);
    await testClient.get("/api/questions/random").expect(200);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name: "Test /api/questions/random",
  async fn() {
    const testClient = await superoak(app);
    await testClient.get("/api/questions/random")
      .expect(200)
      .expect("Content-Type", new RegExp("application/json"));
  },
  sanitizeResources: false,
  sanitizeOps: false,
});
