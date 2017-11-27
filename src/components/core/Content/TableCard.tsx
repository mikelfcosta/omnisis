import * as React from 'react';
import Card from './Card';
import Table from 'reactstrap/lib/Table';
import { tableCardToolbar, tableCardPagination } from './TableCard.scss';
import { LISTSEARCH} from '../../../icons';

interface TableCardProps {
  rowKey: string;
  headers: string[];
  data: any[];
  length: number;
}

interface TableCardState {
  page: number;
  limit: number;
  order: string;
}

export default class TableCard extends React.Component<TableCardProps, TableCardState> {

  constructor(props: TableCardProps) {
    super(props);
  }

  componentWillMount() {
    this.setState({
      page: 0,
      limit: 10,
    });
  }

  componentWillUnmount() {}

  render() {
    const firstPage = this.state.page * this.state.limit === 0 ? 1 : this.state.page * this.state.limit;
    return (
      <Card size={100}>
        <div className={tableCardToolbar}>
          <img srcSet={LISTSEARCH} alt="icon" />
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
              <select value={this.state.page} onChange={event => this.setState({ page: +event.target.value })}>
                {this.renderPages()}
              </select>
          </div>
          <div>
            { firstPage } - { (this.state.page + 1) * this.state.limit } de { this.props.length }
          </div>
          <div>
            <button onClick={() => this.setState({ page: this.state.page - 1 })}
                    disabled={this.state.page === 0}>
              {'<'}
            </button>
            <button onClick={() => this.setState({ page: this.state.page + 1 })}
                    disabled={this.props.length <= (this.state.page + 1) * this.state.limit}>
              {'>'}
            </button>
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
        <tr key={row[this.props.rowKey]}>
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

  renderPages() {
    const selects = [];
    for (let i = 1; i * this.state.limit <= this.props.length; i += 1) {
      selects.push(<option key={i} value={i - 1}>{i}</option>);
    }
    return selects;
  }

}
