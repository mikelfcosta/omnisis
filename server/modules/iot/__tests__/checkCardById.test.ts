import * as supertest from 'supertest';
import App from '../../../App';
import { OmniRouter } from '../../../Router';
import { ECardErrors, IOmniSmartCards, omniSmartCards } from '../models/omniSmartCards';
import { populateCards } from './helpers';
import { PRIVATE_KEY } from '../index';
import omniHolders from '../../holders/models/Holders';
import normalizeName from '../common/normalizeName';

const agent = supertest.agent(App);
const core = OmniRouter.modulesApi;
const path = `${core}/iot/cards/:_id?private_key=${PRIVATE_KEY}`;

describe('[Core] Check Card By ID Tests', () => {
  let smartCards: IOmniSmartCards[];
  let urlActive: string;
  let urlInactive: string;
  let urlUnassigned: string;
  let urlNoCard: string;

  beforeEach(async () => {
    await omniSmartCards.remove({});
    smartCards = <IOmniSmartCards[]>await populateCards(6);
    urlActive = path.replace(':_id', smartCards[0]._id);
    urlInactive = path.replace(':_id', smartCards[1]._id);
    urlUnassigned = path.replace(':_id', smartCards[2]._id);
    urlNoCard = path.replace(':_id', 'siojdaoijsdioasjdoiasj');
    return Promise.resolve();
  });

  test('correctly gets a assigned and active user with correct info', (done) => {
    agent
      .get(urlActive)
      .expect(200)
      .end(async (err, res) => {
        if (err) return done(err);
        try {
          const student = await omniHolders.findById(<string>smartCards[0].student);
          if (!student) return Promise.reject('No user found');
          const studentName = normalizeName(student.name);

          const expected = {
            line1: studentName,
            line2: 'ACESSO LIBERADO!',
            access: '1',
          };
          expect(res.body).toMatchObject(expected);
          return done();
        } catch (err) {
          return done(err);
        }
      });
  });
  test('correctly gets a message on inactive user with correct info', (done) => {
    agent
      .get(urlInactive)
      .expect(200)
      .end(async (err, res) => {
        if (err) return done(err);
        try {
          const student = await omniHolders.findById(<string>smartCards[1].student);
          if (!student) return Promise.reject('No user found');
          const studentName = normalizeName(student.name);

          const expected = {
            line1: studentName,
            line2: 'ACESSO NEGADO!!!',
            access: '0',
          };
          expect(res.body).toMatchObject(expected);
          return done();
        } catch (err) {
          return done(err);
        }
      });
  });
  test('correctly gets a unrecognized message on card with no user', (done) => {
    agent
      .get(path)
      .expect(400)
      .end(async (err, res) => {
        if (err) return done(err);
        try {
          const expected = {
            line1: 'CARTAO INVALIDO ',
            line2: 'ACESSO NEGADO!!!',
            access: '0',
          };
          expect(res.body).toEqual(expected);
          return done();
        } catch (err) {
          return done(err);
        }
      });
  });
  test('correctly gets a unrecognized message on card not identified', (done) => {
    agent
      .get(urlNoCard)
      .expect(400)
      .end(async (err, res) => {
        if (err) return done(err);
        try {
          const expected = {
            line1: 'CARTAO INVALIDO ',
            line2: 'ACESSO NEGADO!!!',
            access: '0',
          };
          expect(res.body).toMatchObject(expected);
          return done();
        } catch (err) {
          return done(err);
        }
      });
  });
  test('does not create a new user on unauthorized access');
  test('does not create a new user on unauthenticated access');
});
