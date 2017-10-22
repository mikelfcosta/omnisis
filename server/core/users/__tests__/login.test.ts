import * as supertest from 'supertest';
import * as jwt from 'jsonwebtoken';
import App from '../../../App';
import { OmniRouter } from '../../../Router';
import { ELoginErrors, IOmniUsers, omniUsers } from '../models/Users';
import { populateUsers } from './helpers';

const agent = supertest.agent(App);
const core = OmniRouter.coreApi;
const path = `${core}/users/login`;

describe('[Core] Login Tests', () => {
  let users: IOmniUsers[];
  let userToLogin: IOmniUsers;

  beforeEach(async () => {
    await omniUsers.remove({});
    users = <IOmniUsers[]>await populateUsers(6);
    userToLogin = users[0];
  });

  test('login with correct info', (done) => {
    agent
      .post(path)
      .send({ username: 'ADMIN', password: 'admin' })
      .expect(200)
      .end(async (err, res) => {
        if (err) return done(err);
        try {
          const gotUser = <IOmniUsers>await omniUsers.findById(userToLogin._id).lean();
          const token = res.header['x-auth'];
          expect(token).toBeDefined();
          const userReturned = <any>jwt.decode(token);
          expect(userReturned._id).toEqual(gotUser._id);
          return done();
        } catch (err) {
          return done(err);
        }
      });
  });
  test('does not login with incorrect info', (done) => {
    agent
      .post(path)
      .send({ username: 'ADMIN', password: 'notcorrect' })
      .expect(401)
      .end(async (err, res) => {
        if (err) return done(err);
        try {
          expect(res.body).toEqual({ message: ELoginErrors.IncorrectPassword });
          return done();
        } catch (err) {
          return done(err);
        }
      });
  });
  test('does not create a new user on unauthorized access');
  test('does not create a new user on unauthenticated access');
});
