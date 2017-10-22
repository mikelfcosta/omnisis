import * as supertest from 'supertest';
import App from '../../../App';
import { OmniRouter } from '../../../Router';
import { IOmniUsersModel, omniUsers } from '../models/Users';
import { populateUsers } from './helpers';

const agent = supertest.agent(App);
const core = OmniRouter.coreApi;
const path = `${core}/users/:id`;

describe('[Core] Create Users Tests', () => {
  let users: IOmniUsersModel[];
  let userToDelete: IOmniUsersModel;
  let url: string;

  beforeEach(async () => {
    await omniUsers.remove({});
    users = <IOmniUsersModel[]>await populateUsers(4);
    userToDelete = users[2];
    url = path.replace(':id', userToDelete._id);
  });

  test('disables an user with correct info', (done) => {
    agent
      .delete(url)
      .expect(200)
      .end(async (err, res) => {
        if (err) return done(err);
        try {
          const disabledUser = <IOmniUsersModel>await omniUsers.findById(userToDelete._id).lean();
          expect(disabledUser).toMatchObject({ _id: userToDelete._id, active: false });
          const enabledUsers = <IOmniUsersModel[]> await omniUsers.find({ _id: { $ne: userToDelete._id } });
          expect(enabledUsers).toHaveLength(users.length - 1);
          return done();
        } catch (err) {
          return done(err);
        }
      });
  });
  test('does not disable an user with incorrect info', (done) => {
    agent
      .delete(path)
      .expect(400)
      .end(async (err, res) => {
        if (err) return done(err);
        try {
          const enabledUsers = <IOmniUsersModel[]>await omniUsers.find({ active: true });
          expect(enabledUsers).toHaveLength(users.length);
          return done();
        } catch (err) {
          return done(err);
        }
      });
  });
  test('does not create a new user on unauthorized access');
  test('does not create a new user on unauthenticated access');
});
