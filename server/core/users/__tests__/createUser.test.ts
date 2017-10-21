import * as supertest from 'supertest';
import App from '../../../App';
import { OmniRouter } from '../../../Router';

const agent = supertest.agent(App);
const core = OmniRouter.coreApi;
const path = `${core}/users/new`;

describe('[Core] Create Users Tests', () => {
  test('creates a new user with correct info');
  test('does not create a new user with incorrect info');
  test('does not create a new user on unauthorized access');
  test('does not create a new user on unauthenticated access');
});
