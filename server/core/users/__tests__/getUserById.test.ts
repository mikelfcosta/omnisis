import * as supertest from 'supertest';
import App from '../../../App';
import { OmniRouter } from '../../../Router';
import { IOmniUsersModel, omniUsers } from '../models/Users';
import { populateUsers } from './helpers';

const agent = supertest.agent(App);
const core = OmniRouter.coreApi;
const path = `${core}/users/:id`;

describe('[Core] Get User By ID Tests', () => {
  let users: IOmniUsersModel[];
  let userToGet: IOmniUsersModel;
  let url: string;

  beforeEach(async () => {
    await omniUsers.remove({});
    users = <IOmniUsersModel[]>await populateUsers(6);
    userToGet = users[1];
    url = path.replace(':id', userToGet._id);
    return Promise.resolve();
  });

  test('gets an user with correct info', (done) => {
    agent
      .get(url)
      .expect(200)
      .end(async (err, res) => {
        if (err) return done(err);
        try {
          const gotUser = <IOmniUsersModel>await omniUsers.findById(userToGet._id).lean();
          expect(res.body).toMatchObject({ _id: gotUser._id, active: gotUser.active, createdBy: gotUser.createdBy });
          return done();
        } catch (err) {
          return done(err);
        }
      });
  });
  test('does not gets an user with incorrect info', (done) => {
    agent
      .get(path)
      .expect(400)
      .end(async (err, res) => {
        if (err) return done(err);
        try {
          expect(res.body).toEqual({ message: 'Usuário não encontrado' });
          return done();
        } catch (err) {
          return done(err);
        }
      });
  });
  test('does not create a new user on unauthorized access');
  test('does not create a new user on unauthenticated access');
});
