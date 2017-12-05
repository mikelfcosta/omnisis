import * as supertest from 'supertest';
import App from '../../../App';
import { OmniRouter } from '../../../Router';
import { IOmniSmartCards, omniSmartCards } from '../models/omniSmartCards';
import { populateCards } from './helpers';
import { PRIVATE_KEY } from '../index';

const agent = supertest.agent(App);
const core = OmniRouter.modulesApi;
const path = `${core}/iot/cards/search/:_id?private_key=${PRIVATE_KEY}`;

describe('[Core] Check Card By ID Tests', () => {
  let smartCards: IOmniSmartCards[];
  let urlNoCard: string;
  let urlAssigned: string;
  let urlUnassigned: string;

  beforeEach(async () => {
    await omniSmartCards.remove({});
    smartCards = <IOmniSmartCards[]>await populateCards(3);
    urlNoCard = path.replace(':_id', 'siojdaoijsdioasjdoiasj');
    urlAssigned = path.replace(':_id', smartCards[0]._id);
    urlUnassigned = path.replace(':_id', smartCards[2]._id);
    return Promise.resolve();
  });

  test('correctly gets a created message when the card is created', (done) => {
    agent
      .get(urlUnassigned)
      .expect(200)
      .end(async (err, res) => {
        if (err) return done(err);
        try {
          const expected = {
            line1: 'CODIGO:         ',
            line2: smartCards[2]._id,
          };
          expect(res.body).toMatchObject(expected);
          return done();
        } catch (err) {
          return done(err);
        }
      });
  });
  // test('correctly gets a message on assigned cards', (done) => {
  //   agent
  //     .get(urlAssigned)
  //     .expect(200)
  //     .end(async (err, res) => {
  //       if (err) return done(err);
  //       try {
  //         const expected = {
  //           line1: 'OPS! ESTE CARTAO',
  //           line2: 'ESTA EM USO...  ',
  //         };
  //         expect(res.body).toMatchObject(expected);
  //         return done();
  //       } catch (err) {
  //         return done(err);
  //       }
  //     });
  // });
  // test('correctly gets a message on unrecognized cards', (done) => {
  //   agent
  //     .get(urlNoCard)
  //     .expect(200)
  //     .end(async (err, res) => {
  //       if (err) return done(err);
  //       try {
  //         const expected = {
  //           line1: 'OPS! ESTE CARTAO',
  //           line2: 'E INVALIDO...   ',
  //         };
  //         expect(res.body).toEqual(expected);
  //         return done();
  //       } catch (err) {
  //         return done(err);
  //       }
  //     });
  // });
  test('does not create a new user on unauthorized access');
  test('does not create a new user on unauthenticated access');
});
