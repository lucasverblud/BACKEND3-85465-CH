import request from "supertest";
import { expect } from "chai";
import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "../src/app.js";
import UserModel from "../src/dao/models/user.model.js";

dotenv.config();

describe("Users API", () => {
  before(async () => {
    await mongoose.connect(process.env.MONGO_URL);
    await UserModel.deleteMany({});
  });

  after(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  let createdUserId;

  it("GET /api/users → should return all users", async () => {
    const res = await request(app).get("/api/users");
    expect(res.status).to.equal(200);
    expect(res.body.payload).to.be.an("array");
  });

  it("POST /api/users → should create a new user", async () => {
    const userData = {
      first_name: "Test",
      last_name: "User",
      email: "testuser@example.com",
      password: "123456"
    };

    const res = await request(app).post("/api/users").send(userData);
    expect(res.status).to.equal(201);
    expect(res.body.payload).to.have.property("_id");
    createdUserId = res.body.payload._id;
  });

  it("GET /api/users/:id → should return a single user by ID", async () => {
    const res = await request(app).get(`/api/users/${createdUserId}`);
    expect(res.status).to.equal(200);
    expect(res.body.payload).to.have.property("_id", createdUserId);
  });

  it("POST /api/users → should not create a user with existing email", async () => {
    const userData = {
      first_name: "Duplicate",
      last_name: "User",
      email: "testuser@example.com",
      password: "123456"
    };

    const res = await request(app).post("/api/users").send(userData);
    expect([400, 409]).to.include(res.status);
  });
});
