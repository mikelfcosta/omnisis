import * as faker from 'faker';
import { IOmniSmartCards, omniSmartCards } from '../models/Cards';

export async function populateCards(smartCardsToCreate: number = 10) {
  let smartCardsCreated = 3;
  const smartCards: IOmniSmartCards[] = [];
  const activeCard = new omniSmartCards({ _id: 'tagteste00001', assigned: true, student: '20709639', active: true, lastAssignedBy: 'michel.costa', lastAssignedAt: new Date().getTime() });
  const inactiveCard = new omniSmartCards({ _id: faker.internet.ipv6(), assigned: true, lastAssignedBy: activeCard.lastAssignedBy, student: faker.internet.userName(), active: false });
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
