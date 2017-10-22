import * as supertest from 'supertest';
import App from '../../../App';
import { OmniRouter } from '../../../Router';
import { IOmniUsers, omniUsers } from '../models/Users';
import { populateUsers } from './helpers';

const agent = supertest.agent(App);
const core = OmniRouter.coreApi;
const path = `${core}/users/:id`;

describe('[Core] Get User By ID Tests', () => {
  let users: IOmniUsers[];
  let userToUpdate: IOmniUsers;
  let url: string;

  beforeEach(async () => {
    await omniUsers.remove({});
    users = <IOmniUsers[]>await populateUsers(6);
    userToUpdate = users[1];
    url = path.replace(':id', userToUpdate._id);
  });

  test('updates an user with correct info', (done) => {
    agent
      .patch(url)
      .send({ password: 'batata' })
      .expect(200)
      .end(async (err, res) => {
        if (err) return done(err);
        try {
          const gotUser = <IOmniUsers>await omniUsers.findById(userToUpdate._id).lean();
          expect(userToUpdate.password).not.toEqual(gotUser.password);
          expect(res.body._id).toEqual(gotUser._id);
          return done();
        } catch (err) {
          return done(err);
        }
      });
  });
  test('does not updates an user with incorrect info', (done) => {
    agent
      .patch(path)
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
