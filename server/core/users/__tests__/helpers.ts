import * as faker from 'faker';
import { IOmniUsersModel, omniUsers } from '../models/Users';

export async function populateUsers(usersToCreate: number = 10) {
  let usersCreated = 1;
  const users: IOmniUsersModel[] = [];
  const admin = new omniUsers({ _id: 'ADMIN', password: 'admin', createdBy: 'ADMIN' });
  try {
    users.push(await admin.save());
    for (usersCreated; usersCreated < usersToCreate; usersCreated += 1) {
      const user = new omniUsers({
        _id: faker.internet.userName(),
        password: faker.internet.password(),
        createdBy: admin._id,
      });
      users.push(await user.save());
    }
    return Promise.all(users);
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
}
