import * as faker from 'faker';
import { IOmniSmartCards, omniSmartCards } from '../models/Cards';
import { omniHolders } from '../../holders/models/Holders';

const whiteCard = '80787d7a';
const keyChain = '80cd5280';

export async function populateCards(smartCardsToCreate: number = 10) {
  let smartCardsCreated = 3;
  const smartCards: IOmniSmartCards[] = [];

  await omniHolders.findByIdAndUpdate('20709639',
    { _id: '20709639', name: 'Michel Augusto Favero Costa', type: 'user', activeCard: whiteCard },
    { upsert: true });
  await omniHolders.findByIdAndUpdate('20700000',
    { _id: '20700000', name: 'João Vitor Barbosa Brandão', type: 'user', activeCard: whiteCard },
    { upsert: true });
  const activeCard = new omniSmartCards({ _id: whiteCard, assigned: true, student: '20709639', active: true, lastAssignedBy: 'michel.costa', lastAssignedAt: Date.now() });
  const inactiveCard = new omniSmartCards({ _id: keyChain, assigned: true, student: '20700000', active: false, lastAssignedBy: activeCard.lastAssignedBy, lastAssignedAt: Date.now() });
  const unassignedCard = new omniSmartCards({ _id: faker.internet.ipv6(), lastAssignedBy: activeCard.lastAssignedBy, assigned: false });
  try {
    smartCards.push(await activeCard.save());
    smartCards.push(await inactiveCard.save());
    smartCards.push(await unassignedCard.save());
    for (smartCardsCreated; smartCardsCreated < smartCardsToCreate; smartCardsCreated += 1) {
      const isAssigned = faker.random.boolean();
      const smartCard = new omniSmartCards({
        _id: faker.internet.ipv6(),
        assigned: isAssigned,
        student: isAssigned ? faker.internet.userName() : null,
        active: isAssigned ? faker.random.boolean() : false,
        lastAssignedBy: activeCard.lastAssignedBy,
      });
      smartCards.push(await smartCard.save());
    }
    return Promise.all(smartCards);
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
}
