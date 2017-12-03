import { random } from 'lodash';
import { omniHoldersGroups } from '../../server/modules/holders/models/omniHoldersGroups';

export async function groupsSeed() {
  await omniHoldersGroups.remove({});

  const groups = ['Alunos Graduação', 'Alunos Pós-Graduação', 'Alunos BSP', 'Professores', 'Funcionários', 'Visitantes', 'Ex-Alunos'];
  const users = ['michel.costa', 'joao.vitor'];
  const groupsToSave = [];
  try {
    for (let i = 0; i < groups.length; i += 1) {
      const user = users[random(0, 1)];
      const newGroup = new omniHoldersGroups({
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
