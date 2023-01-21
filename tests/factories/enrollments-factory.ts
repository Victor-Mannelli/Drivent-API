import faker from "@faker-js/faker";
import { generateCPF, getStates } from "@brazilian-utils/brazilian-utils";
import { User } from "@prisma/client";
import { createUser } from "./users-factory";
import { prisma } from "@/config";

export async function createEnrollmentWithAddress(user?: User) {
  const incomingUser = user || (await createUser());

  return prisma.enrollment.create({
    data: {
      name: faker.name.findName(),
      cpf: generateCPF(),
      birthday: faker.date.past(),
      phone: faker.phone.phoneNumber("(##) 9####-####"),
      userId: incomingUser.id,
      Address: {
        create: {
          street: faker.address.streetName(),
          cep: faker.address.zipCode(),
          city: faker.address.city(),
          neighborhood: faker.address.city(),
          number: faker.datatype.number().toString(),
          state: faker.helpers.arrayElement(getStates()).name,
        },
      },
    },
    include: {
      Address: true,
    },
  });
}

export function createhAddressWithCEP() {
  return {
    cep: "04538-132",
    logradouro: "Avenida Brigadeiro Faria Lima",
    complemento: "de 3252 ao fim - lado par",
    bairro: "Itaim Bibi",
    localidade: "São Paulo",
    uf: "SP",
    ibge: "3550308",
    gia: "1004",
    ddd: "11",
    siafi: "7107"
  };
}
