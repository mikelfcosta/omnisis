import * as faker from 'faker';
import { random } from 'lodash';
import { models } from '../seed';
import { IOmniCampi } from '../../server/modules/locations/models/omniCampi';
import { IOmniHoldersGroups } from '../../server/modules/holders/models/omniHoldersGroups';
import { IOmniHoldersProfiles } from '../../server/modules/holders/models/omniHoldersProfiles';
import { Types } from 'mongoose';

const whiteCard = '80787d7a';
const keyChain = '80cd5280';

export async function holdersSeed(quantity = 50000) {
  console.info('Starting Holders Seed');
  try {
    const groups = await models.omniHoldersGroups.find({});
    const profiles = await models.omniHoldersProfiles.find({});
    const campus = await models.omniCampi.find({});

    await models.omniHolders.remove({});

    await setMainHolders(groups, campus, profiles);

    const holders = [];
    for (let i = 0; i < quantity; i += 1) {
      const typeOfHolder = random(0, 15);

      // Set group
      const percentage = random(0, 100);
      let groupToUse: Types.ObjectId;
      if (percentage <= 60) groupToUse = groups.filter(group => group.name === 'Alunos Graduação')[0]._id;
      else if (percentage > 60 && percentage <= 75) groupToUse = groups.filter(group => group.name === 'Ex-Alunos')[0]._id;
      else if (percentage > 75 && percentage <= 90) groupToUse = groups.filter(group => group.name === 'Alunos Pós-Graduação')[0]._id;
      else groupToUse = groups.filter(group => group.name === 'Alunos BSP')[0]._id;

      const profilesToUse: Types.ObjectId[] = [];
      if (percentage <= 40 || percentage > 70) {
        profilesToUse.push(profiles.filter(profile => profile.name === 'Acesso Básico')[0]._id);

        if (percentage > 80 && percentage <= 90) {
          profilesToUse.push(profiles.filter(profile => profile.name === 'BSP')[0]._id);
        } else if (percentage > 90) {
          profilesToUse.push(profiles.filter(profile => profile.name === 'Acesso Completo')[0]._id);
        }

        const specialProfilePercentage = random(0, 100);
        if (specialProfilePercentage <= 10) {
          profilesToUse.push(profiles.filter(profile => profile.name === 'Estudio')[0]._id);
        } else if (specialProfilePercentage > 10 && specialProfilePercentage <= 20) {
          profilesToUse.push(profiles.filter(profile => profile.name === 'Academia')[0]._id);
        }
      }

      const users = ['michel.costa', 'joao.vitor'];
      const user = users[random(0, 1)];

      let newHolder: any;
      if (typeOfHolder < 15) {
        newHolder = new models.omniHolders({
          _id: (20000000 + i).toString(),
          name: faker.name.firstName() + ' ' + faker.name.lastName(),
          group: groupToUse,
          profiles: profilesToUse,
          activeCard: null,
          student: {
            mainCampus: campus[random(0, campus.length - 1)]._id,
          },
          createdBy: user,
          lastUpdatedBy: user,
        });
      } else {
        let staffGroup: Types.ObjectId;
        if (percentage <= 70) staffGroup = groups.filter(group => group.name === 'Professores')[0]._id;
        else staffGroup = groups.filter(group => group.name === 'Funcionários')[0]._id;

        newHolder = new models.omniHolders({
          _id: (20000000 + i).toString(),
          name: faker.name.firstName() + ' ' + faker.name.lastName(),
          group: staffGroup,
          profiles: profilesToUse,
          activeCard: null,
          staff: {
            campus: [campus[random(0, campus.length - 1)]._id],
          },
          createdBy: user,
          lastUpdatedBy: user,
        });
      }

      holders.push(await newHolder.save());
    }
    return Promise.all(holders);
  } catch (err) {
    console.error(err);
  }
}


async function setMainHolders(groups: IOmniHoldersGroups[], campus: IOmniCampi[], profiles: IOmniHoldersProfiles[]) {
  const groupToUse = groups.filter(group => group.name === 'Alunos Graduação');
  const profileToUse = profiles.filter(profile => profile.name === 'Acesso Básico');
  const campusToUse = campus.filter(campus => campus.name === 'Morumbi');

  const whiteCardHolder = new models.omniHolders({
    _id: '20709639',
    name: 'Michel Augusto Favero Costa',
    group: groupToUse[0]._id,
    profiles: profileToUse,
    activeCard: whiteCard,
    student: {
      mainCampus: campusToUse[0]._id,
    },
    createdBy: 'michel.costa',
    lastUpdatedBy: 'michel.costa',
  });
  await whiteCardHolder.save();
  await models.omniSmartCards.findByIdAndUpdate(whiteCard, {
    assigned: true,
    student: whiteCardHolder._id,
    active: true,
    lastAssignedBy: 'michel.costa',
    lastAssignedAt: Date.now(),
  });


  const keychainHolder = new models.omniHolders({
    _id: '20700000',
    name: 'João Vitor Barbosa Brandão',
    group: groupToUse[0]._id,
    profiles: profileToUse,
    activeCard: keyChain,
    student: {
      mainCampus: campusToUse[0]._id,
    },
    createdBy: 'michel.costa',
    lastUpdatedBy: 'michel.costa',
  });
  await keychainHolder.save();
  await models.omniSmartCards.findByIdAndUpdate(keyChain, {
    assigned: true,
    student: keychainHolder._id,
    active: false,
    lastAssignedBy: 'michel.costa',
    lastAssignedAt: Date.now(),
  });
}
