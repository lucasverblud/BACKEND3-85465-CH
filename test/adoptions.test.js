import mongoose from "mongoose";
import request from "supertest";
import { expect } from "chai";
import app from "../src/app.js";
import UserModel from "../src/dao/models/user.model.js";
import PetModel from "../src/dao/models/pet.model.js";
import AdoptionModel from "../src/dao/models/adoption.model.js";

describe("Adoptions API", function () {
  this.timeout(10000);

  let userId, petId, adoptionId;

  before(async () => {
    await mongoose.connect(process.env.MONGO_URL);

    await UserModel.deleteMany({});
    await PetModel.deleteMany({});
    await AdoptionModel.deleteMany({});

    const user = await UserModel.create({
      first_name: "Lucas",
      last_name: "Verblud",
      email: "lucas@example.com",
      password: "1234",
    });

    const pet = await PetModel.create({
      name: "Firulais",
      specie: "Perro",
      adopted: false,
    });

    userId = user._id.toString();
    petId = pet._id.toString();
  });

  after(async () => {
    await mongoose.connection.close();
  });

  it("GET /api/adoptions → should return all adoptions (empty at start)", async () => {
    const res = await request(app).get("/api/adoptions");
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("status", "success");
    expect(res.body.payload).to.be.an("array").that.is.empty;
  });

  it("POST /api/adoptions/:uid/:pid → should adopt a pet", async () => {
    const res = await request(app).post(`/api/adoptions/${userId}/${petId}`);
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("status", "success");
    expect(res.body.payload).to.have.property("user", userId);
    expect(res.body.payload).to.have.property("pet", petId);
    adoptionId = res.body.payload._id;
  });

  it("POST /api/adoptions/:uid/:pid → should not adopt if already adopted by same user", async () => {
    const res = await request(app).post(`/api/adoptions/${userId}/${petId}`);
    expect(res.status).to.equal(400);
    expect(res.body).to.have.property("status", "error");
    expect(res.body.message).to.include("Pet already adopted by this user");
  });

  it("POST /api/adoptions/:uid/:pid → should return 404 if user or pet not found", async () => {
    const res = await request(app).post(`/api/adoptions/000000000000000000000000/000000000000000000000000`);
    expect(res.status).to.equal(404);
    expect(res.body).to.have.property("status", "error");
    expect(res.body.message).to.include("User or Pet not found");
  });

  it("GET /api/adoptions/:id → should return a specific adoption", async () => {
    const res = await request(app).get(`/api/adoptions/${adoptionId}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("status", "success");
    expect(res.body.payload).to.have.property("_id", adoptionId);
  });

  it("GET /api/adoptions/:id → should return 404 if adoption not found", async () => {
    const res = await request(app).get(`/api/adoptions/000000000000000000000000`);
    expect(res.status).to.equal(404);
    expect(res.body).to.have.property("status", "error");
    expect(res.body.message).to.include("Adoption not found");
  });

  it("PATCH /api/adoptions/:id → should update adoption status", async () => {
    const res = await request(app).patch(`/api/adoptions/${adoptionId}`).send({ status: "completed" });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("status", "success");
    expect(res.body.payload).to.have.property("status", "completed");
  });

  it("PATCH /api/adoptions/:id → should return 404 if adoption not found", async () => {
    const res = await request(app).patch(`/api/adoptions/000000000000000000000000`).send({ status: "completed" });
    expect(res.status).to.equal(404);
    expect(res.body).to.have.property("status", "error");
    expect(res.body.message).to.include("Adoption not found");
  });

  it("DELETE /api/adoptions/:id → should delete an adoption", async () => {
    const res = await request(app).delete(`/api/adoptions/${adoptionId}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("status", "success");
  });

  it("DELETE /api/adoptions/:id → should return 404 if adoption not found", async () => {
    const res = await request(app).delete(`/api/adoptions/000000000000000000000000`);
    expect(res.status).to.equal(404);
    expect(res.body).to.have.property("status", "error");
    expect(res.body.message).to.include("Adoption not found");
  });
});
