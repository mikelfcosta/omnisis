import * as supertest from 'supertest';
import App from '../../../App';
import { OmniRouter } from '../../../Router';
import { IOmniUsersModel, omniUsers } from '../models/Users';
import { populateUsers } from './helpers';

const agent = supertest.agent(App);
const core = OmniRouter.coreApi;
const path = `${core}/users`;

describe('[Core] Get User By ID Tests', () => {
  let users: IOmniUsersModel[];
  beforeEach(async () => {
    await omniUsers.remove({});
    users = <IOmniUsersModel[]>await populateUsers(15);
  });

  test('gets only the requested users as per pagination', (done) => {
    agent
      .get(path)
      .query({ sort: '-createdAt', limit: 10, page: 1 })
      .expect(200)
      .end(async (err, res) => {
        if (err) return done(err);
        try {
          expect(res.body.users).toHaveLength(10);
          const firstUserCreatedAt = new Date(res.body.users[0].createdAt).getTime();
          const lastUserCreatedAt = new Date(res.body.users[9].createdAt).getTime();
          expect(firstUserCreatedAt).toBeGreaterThanOrEqual(lastUserCreatedAt);
          expect(res.body.total).toEqual(users.length);
          return done();
        } catch (err) {
          return done(err);
        }
      });
  });
  test('does not gets requested users without all querys', (done) => {
    agent
      .get(path)
      .expect(400)
      .end(async (err, res) => {
        if (err) return done(err);
        try {
          expect(res.body).toEqual({ message: 'Dados de paginação incorretos' });
          return done();
        } catch (err) {
          return done(err);
        }
      });
  });
  test('does not gets users on unauthorized access');
  test('does not gets users on unauthenticated access');
});
