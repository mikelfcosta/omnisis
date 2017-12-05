import { models } from '../seed';
import { random } from 'lodash';
import * as moment from 'moment';

export default async function cardAssignSeed() {
  console.info('Starting Card Assignemnt Seed');
  try {
    const cardsToAssign = await models.omniSmartCards.find({ assigned: false });

    const assignedCards = [];
    for (let i = 0; i < cardsToAssign.length - 1; i += 1) {
      const shouldAssign = random(0, 100) < 95;
      if (shouldAssign) {
        const holderToAssign = await models.omniHolders.findOne({ activeCard: null });
        if (holderToAssign) {
          const dateString = `${random(7, 11)}.${random(1, 30)}.2017 ${random(10, 18)}.${random(10, 59)}`;
          const date = moment(dateString, 'MM.DD.YYYY HH:mm').toDate();
          const user = ['michel.costa', 'joao.vitor'][random(0, 1)];
          assignedCards.push(
            await models.omniHolders.findByIdAndUpdate(holderToAssign._id, {
              activeCard: cardsToAssign[i]._id,
              lastUpdatedBy: user,
              lastUpdatedAt: date,
            }),
            await models.omniSmartCards.findByIdAndUpdate(cardsToAssign[i]._id, {
              assigned: true,
              student: holderToAssign._id,
              active: random(0, 100) < 95,
              lastAssignedBy: user,
              lastAssignedAt: date,
            }),
          );
        }
      }
    }
    return Promise.all(assignedCards);
  } catch (err) {
    return Promise.reject(err);
  }
}