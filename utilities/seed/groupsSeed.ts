import { random } from 'lodash';
import { models } from '../seed';

export async function groupsSeed() {
  console.info('Starting Groups Seed');
  await models.omniHoldersGroups.remove({});

  const groups = ['Alunos Graduação', 'Alunos Pós-Graduação', 'Alunos BSP', 'Professores', 'Funcionários', 'Visitantes', 'Ex-Alunos'];
  const users = ['michel.costa', 'joao.vitor'];
  const groupsToSave = [];
  try {
    for (let i = 0; i < groups.length; i += 1) {
      const user = users[random(0, 1)];
      const newGroup = new models.omniHoldersGroups({
        name: groups[i],
        createdBy: user,
        lastUpdatedBy: user,
      });
      groupsToSave.push(await newGroup.save());
    }
    return Promise.all(groupsToSave);
  } catch (err) {
    console.error(err);
  }
}
