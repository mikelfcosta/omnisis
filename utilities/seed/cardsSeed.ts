import { random } from 'lodash';
import { models } from '../seed';
import * as faker from 'faker';

const whiteCardId = '80787d7a';
const keyChainId = '80cd5280';

export default async function cardsSeed(quantity = 10000) {
  await models.omniSmartCards.remove({});


  const users = ['michel.costa', 'joao.vitor'];
  const cardsToSave = [];
  try {
    const whiteCard = new models.omniSmartCards({
      _id: whiteCardId,
      assigned: false,
      student: null,
      active: true,
      lastAssignedBy: 'michel.costa',
    });
    cardsToSave.push(await whiteCard.save());
    const keyChain = new models.omniSmartCards({
      _id: keyChainId,
      assigned: false,
      student: null,
      active: true,
      lastAssignedBy: 'michel.costa',
    });
    cardsToSave.push(await keyChain.save());

    for (let i = 0; i < quantity; i += 1) {
      const user = users[random(0, 1)];
      const cardId = faker.random.alphaNumeric(8);

      const newGroup = new models.omniSmartCards({
        _id: cardId,
        assigned: false,
        student: null,
        active: true,
        lastAssignedBy: user,
      });
      cardsToSave.push(await newGroup.save());
    }
    return Promise.all(cardsToSave);
  } catch (err) {
    console.error(err);
  }
}
