import * as React from 'react';
import { content, headerBackdrop } from './Content.scss';
import Card from './Card';

export default class Content extends React.Component<{}, {}> {

  componentWillMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div className={content}>
        <div className={headerBackdrop} />
        <Card height={500} size={100}>
          <p>Resumo</p>
        </Card>
        <Card height={300} size={65}>
          <p>Últimos Acessos</p>
        </Card>
        <Card height={300} size={35}>
          <p>Alunos no Campos</p>
        </Card>
      </div>
    );
  }
}
