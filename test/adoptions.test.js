import mongoose from "mongoose";
import request from "supertest";
import { expect } from "chai";
import app from "../src/app.js";
import UserModel from "../src/dao/models/user.model.js";
import PetModel from "../src/dao/models/pet.model.js";
import AdoptionModel from "../src/dao/models/adoption.model.js";

describe("Adoptions API", function () {
  this.timeout(10000);

  let userId, petId;

  before(async () => {
    await mongoose.connect(process.env.MONGO_URL);

    // Limpiar colecciones antes de empezar
    await UserModel.deleteMany({});
    await PetModel.deleteMany({});
    await AdoptionModel.deleteMany({});

    // Crear un usuario y una mascota de prueba
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

  it("GET /api/adoptions → should return all adoptions", async () => {
    const res = await request(app).get("/api/adoptions");
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("status", "success");
    expect(res.body).to.have.property("payload");
    expect(res.body.payload).to.be.an("array");
  });

  it("POST /api/adoptions/:uid/:pid → should adopt a pet", async () => {
    const res = await request(app).post(`/api/adoptions/${userId}/${petId}`);
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("status", "success");
    expect(res.body.payload).to.have.property("user", userId);
    expect(res.body.payload).to.have.property("pet", petId);
  });

  it("POST /api/adoptions/:uid/:pid → should not adopt if already adopted", async () => {
    const res = await request(app).post(`/api/adoptions/${userId}/${petId}`);
    expect(res.status).to.equal(400);
    expect(res.body).to.have.property("status", "error");
    expect(res.body.message).to.include("Pet already adopted");
  });

  it("POST /api/adoptions/:uid/:pid → should return error if user or pet not found", async () => {
    const res = await request(app).post(`/api/adoptions/invalidUser/invalidPet`);
    expect(res.status).to.be.oneOf([400, 404, 500]); // depende del router cómo maneja IDs inválidos
    expect(res.body).to.have.property("status", "error");
  });
});
