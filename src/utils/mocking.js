import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

// Generar usuarios
export const generateMockingUsers = async (num) => {
  const users = [];
  const hashedPassword = await bcrypt.hash("coder123", 10);

  for (let i = 0; i < num; i++) {
    users.push({
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      password: hashedPassword,
      role: faker.helpers.arrayElement(["user", "admin"]),
      pets: [],
    });
  }

  return users;
};

// Generar mascotas
export const generateMockingPets = (num) => {
  const pets = [];

  for (let i = 0; i < num; i++) {
    pets.push({
      name: faker.animal.petName(),
      type: faker.animal.type(),
      adopted: faker.datatype.boolean(),
    });
  }

  return pets;
};
