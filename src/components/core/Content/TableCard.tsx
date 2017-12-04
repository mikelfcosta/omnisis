import * as React from 'react';
import Card from './Card';
import Table from 'reactstrap/lib/Table';
import { tableCardToolbar, tableCardPagination } from './TableCard.scss';
import { EDIT, LISTSEARCH, ASSIGN, ASSIGN_DISABLED } from '../../../icons';

interface TableCardProps {
  rowKey: string;
  headers: string[];
  data: any[];
  length: number;
  order?: string;
  onPaginate: (event: TableCardState) => any;
  edit?: boolean;
  assign?: boolean;
  onEdit?: (e: React.MouseEvent<HTMLImageElement>) => any;
  onAssign?: (e: React.MouseEvent<HTMLImageElement>) => any;
}

export interface TableCardState {
  page: number;
  limit: number;
  order?: string;
  search: string;
}

export default class TableCard extends React.Component<TableCardProps, TableCardState> {

  constructor(props: TableCardProps) {
    super(props);
    this.state = { search: '', page: 0, limit: 10, order: props.order };
  }

  componentWillUnmount() {}

  render() {
    const firstPage = this.state.page * this.state.limit === 0 ? 1 : this.state.page * this.state.limit;
    const showingMax = (this.state.page + 1) * this.state.limit <= this.props.length ? (this.state.page + 1) * this.state.limit : this.props.length;
    return (
      <Card size={100}>
        <div className={tableCardToolbar}>
          <img srcSet={LISTSEARCH} alt="icon" />
          <input type="text" placeholder="Buscar" value={this.state.search}
                 onChange={event => this.onPaginate({ search: event.target.value })}/>
        </div>
        <Table>
          <thead>
            <tr>
              {this.renderHeader()}
              {this.props.edit ? <th>Editar</th> : null}
              {this.props.assign ? <th>Assignar</th> : null}
            </tr>
          </thead>
          <tbody>
            {this.renderRows()}
          </tbody>
        </Table>
        <div className={tableCardPagination}>
          <div>
              <label>Página</label>
              <select value={this.state.page} onChange={event => this.onPaginate({ page: +event.target.value })}>
                {this.renderPages()}
              </select>
          </div>
          <div>
            { firstPage } - { showingMax } de { this.props.length }
          </div>
          <div>
            <button onClick={() => this.onPaginate({ page: this.state.page - 1 })}
                    disabled={this.state.page === 0}>
              {'<'}
            </button>
            <button onClick={() => this.onPaginate({ page: this.state.page + 1 })}
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
    if (this.props.data.length === 0) return;
    return this.props.data.map((row) => {
      if (row != null) {
        return (
          <tr key={row[this.props.rowKey]}>
            {this.renderCells(row)}
            {this.renderEdit(row)}
            {this.renderAssign(row)}
          </tr>
        );
      }
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
    for (let i = 1; (i - 1) * this.state.limit < this.props.length; i += 1) {
      selects.push(<option key={i} value={i - 1}>{i}</option>);
    }
    return selects;
  }

  onPaginate(change: any) {
    this.setState(change, () => {
      this.props.onPaginate(this.state);
    });
  }

  renderEdit(row: any) {
    if (this.props.edit) {
      return (
        <th>
          <img src={EDIT} alt="Editar" onClick={e => this.handleEdit(row)} style={ { width: '22px', marginLeft: '10px', cursor: 'pointer' } } />
        </th>
      );
    }
  }

  handleEdit(row: any) {
    if (this.props.onEdit) {
      this.props.onEdit(row);
    }
  }

  renderAssign(row: any) {
    const icon = row.activeCard == null ? ASSIGN : ASSIGN_DISABLED;
    const styles: any = { width: '22px', marginLeft: '20px' };
    if (!row.activeCard) styles['cursor'] = 'pointer';
    if (this.props.assign) {
      return (
        <th>
          <img src={icon} alt="Assignar" onClick={e => this.handleAssign(row)} style={styles} />
        </th>
      );
    }
  }

  handleAssign(row: any) {
    if (this.props.onAssign) {
      this.props.onAssign(row);
    }
  }

}
