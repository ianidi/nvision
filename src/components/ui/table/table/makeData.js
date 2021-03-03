var faker = require("faker");

const range = (len) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = () => {
  const statusChance = Math.random();
  return {
    name: faker.name.findName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    age: Math.floor(Math.random() * 30),
    visits: Math.floor(Math.random() * 100),
    progress: Math.floor(Math.random() * 100),
    status: statusChance > 0.66 ? "relationship" : statusChance > 0.33 ? "complicated" : "single",
    number: faker.random.number(),
    time: faker.date.recent(),
    updated: faker.date.recent(),
    in_out: statusChance > 0.66 ? true : false,
    device_status: statusChance > 0.66 ? true : false,
    id: faker.random.number(),
    device_number: faker.random.number(),
    device_channel: faker.random.number(),
    device_people: faker.random.number(),
    device_version: faker.random.number(),
    device_title: faker.random.word(),

    ip: faker.internet.ip(),
    company: faker.company.companyName(),
    department: faker.name.jobType(),
    team: faker.name.jobTitle(),
    type: faker.name.jobType(),
    temperature: statusChance > 0.66 ? 36.6 : statusChance > 0.33 ? 38 : 37.2,
    photo: "/temperature_alert.png",
  };
};

export default function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map((d) => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}
