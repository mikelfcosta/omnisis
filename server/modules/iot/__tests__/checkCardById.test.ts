import * as supertest from 'supertest';
import App from '../../../App';
import { OmniRouter } from '../../../Router';
import { IOmniSmartCards, omniSmartCards } from '../models/Cards';
import { populateCards } from './helpers';

const agent = supertest.agent(App);
const core = OmniRouter.modulesApi;
const path = `${core}/iot/cards/:_id`;

describe.only('[Core] Check Card By ID Tests', () => {
  let smartCards: IOmniSmartCards[];
  let urlActive: string;
  let urlInactive: string;
  let urlUnassigned: string;

  beforeEach(async () => {
    await omniSmartCards.remove({});
    smartCards = <IOmniSmartCards[]>await populateCards(6);
    urlActive = path.replace(':_id', smartCards[0]._id);
    urlInactive = path.replace(':_id', smartCards[1]._id);
    urlUnassigned = path.replace(':_id', smartCards[2]._id);
  });

  test('correctly gets a assigned and active user with correct info', (done) => {
    agent
      .get(urlActive)
      .expect(200)
      .end(async (err, res) => {
        if (err) return done(err);
        try {
          return done();
        } catch (err) {
          return done(err);
        }
      });
  });
  test('correctly gets a assigned and inactive user with correct info', (done) => {
    agent
      .get(urlInactive)
      .expect(200)
      .end(async (err, res) => {
        if (err) return done(err);
        try {
          return done();
        } catch (err) {
          return done(err);
        }
      });
  });
  test('correctly gets a unassigned card with correct info', (done) => {
    agent
      .get(urlUnassigned)
      .expect(200)
      .end(async (err, res) => {
        if (err) return done(err);
        try {
          return done();
        } catch (err) {
          return done(err);
        }
      });
  });
  test('correctly returns a message if the card is not found', (done) => {
    agent
      .get(path)
      .expect(400)
      .end(async (err, res) => {
        if (err) return done(err);
        try {
          return done();
        } catch (err) {
          return done(err);
        }
      });
  });
  test('does not create a new user on unauthorized access');
  test('does not create a new user on unauthenticated access');
});
