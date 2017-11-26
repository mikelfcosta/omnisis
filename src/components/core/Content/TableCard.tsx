import * as React from 'react';
import Card from './Card';
import Table from 'reactstrap/lib/Table';
import { tableCardToolbar, tableCardPagination } from './TableCard.scss';

interface TableCardProps {
  key: string;
  headers: string[];
  data: any[];
}

interface TableCardState {
  page: number;
  limit: number;
  order: string;
  length: number;
}

export default class TableCard extends React.Component<TableCardProps, TableCardState> {

  constructor(props: TableCardProps) {
    super(props);
  }

  componentWillMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <Card size={100}>
        <div className={tableCardToolbar}>
          <img srcSet={''} alt="icon" />
          <input type="text" placeholder="Buscar"/>
        </div>
        <Table>
          <thead>
            <tr>
              {this.renderHeader()}
            </tr>
          </thead>
          <tbody>
            {this.renderRows()}
          </tbody>
        </Table>
        <div className={tableCardPagination}>
          <div>
              <label>Página</label>
              <select>
                <option value="1" selected>1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
          </div>
          <div>
            1 - 10 de 1000
          </div>
          <div>
            <button>{'<'}</button>
            <button>{'>'}</button>
          </div>
        </div>
      </Card>
    );
  }

  renderHeader() {
    return this.props.headers.map((header) => {
      return (
        <th key={header}>{header}</th>
      );
    });
  }

  renderRows() {
    return this.props.data.map((row) => {
      return (
        <tr key={row[this.props.key]}>
          {this.renderCells(row)}
        </tr>
      );
    });
  }

  renderCells(row: any) {
    const cells = Object.keys(row);
    return cells.map((cell) => {
      return (
        <th key={cell}>{ row[cell] }</th>
      );
    });
  }
}
