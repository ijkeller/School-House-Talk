'use strict';

const supertest = require('supertest');
const { app } = require('../../src/server');
const mockRequest = supertest(app);
const { sequelize, student, sport } = require('../../src/models/index');

const newUser1 = {
  username: 'testUser',
  password: 'pass',
  role: 'admin',
};

const sportExample1 = {
  sport: 'Football',
  date: '01/01/2022',
  time: 'test time',
  opponent: 'test opponent',
  location: 'test location',
};

const studentExample1 = {
  studentID: '001',
  name: 'Test Student Name',
  grade: 10,
  eligibility: true,
  sport: 'Football',
};

beforeAll(async () => {
  await sequelize.sync();
});

afterAll(async () => {
  await sequelize.drop();
  await sequelize.close();
});

describe('CRUD Tests', () => {
  test('Read failures', () => {
    console.log('-----SPORT READ-----', sport.read());
    console.log('-----STUDENT READ-----', student.read());
    // expect(sport.read()).toBe;
  });
  test('Create Student', () => {
    student.create(studentExample1);

  });
  test('Create Sport', () => {
    sport.create(sportExample1);
  });


});







