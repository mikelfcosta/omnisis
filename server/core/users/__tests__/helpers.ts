import * as faker from 'faker';
import { IOmniUsers, omniUsers } from '../models/Users';

export async function populateUsers(usersToCreate: number = 10) {
  let usersCreated = 1;
  const users: IOmniUsers[] = [];
  const admin = new omniUsers({ _id: 'ADMIN', password: 'admin', createdBy: 'ADMIN', active: true });
  try {
    users.push(await admin.save());
    for (usersCreated; usersCreated < usersToCreate; usersCreated += 1) {
      const user = new omniUsers({
        _id: faker.internet.userName(),
        password: faker.internet.password(),
        createdBy: admin._id,
        active: true,
      });
      users.push(await user.save());
    }
    return Promise.all(users);
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
}
