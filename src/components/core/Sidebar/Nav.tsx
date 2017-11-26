import * as React from 'react';
import { nav, navItem, active, navItemChildren } from './Nav.scss';
import { HOME, INSIGHTS, USERS } from '../../../icons';
import { Link } from 'react-router-dom';

interface INavState {
  navigation: INavigation[];
}

interface INavigation {
  name: string;
  link?: string;
  icon: string;
  children?: { name: string, link: string }[];
}

const navigation = [
  {
    name: 'Dashboard',
    link: '/',
    icon: HOME,
  },
  {
    name: 'Alunos',
    icon: USERS,
    children: [
      { name: 'Administrar', link: '/holders/manage' },
      { name: 'Grupos', link: '/holders/groups' },
      { name: 'Perfis', link: '/holders/profiles' },
    ],
  },
  {
    name: 'Smart Pass',
    icon: USERS,
    children: [
      { name: 'Maquinas', link: '/iot/machines' },
      { name: 'Cartões', link: '/iot/cards' },
      { name: 'Locais', link: '/iot/locations' },
    ],
  },
  {
    name: 'Insights',
    icon: INSIGHTS,
    children: [
      { name: 'Comportamento', link: '/insights/behavior' },
      { name: 'Campus', link: '/insights/campus' },
      { name: 'Cartões', link: '/insights/cards' },
    ],
  },
  {
    name: 'Admin',
    icon: INSIGHTS,
    children: [
      { name: 'Usuários', link: '/admin/users' },
      { name: 'Perfis', link: '/admin/roles' },
    ],
  },
];

export default class Nav extends React.Component<any, INavState> {

  constructor(props: any) {
    super(props);
  }

  componentWillMount() {
    this.setState({ navigation });
  }

  componentWillUnmount() {}

  renderNavigation() {
    return this.state.navigation.map((nav) => {
      return (
        <div key={nav.name} className={navItem}>
          <span className={(nav.name === 'Dashboard' ? `${active}` : '')} />
          <span className={(nav.name === 'Dashboard' ? `${active}` : '')} />
          <img srcSet={nav.icon} alt="icon" />
          <h2>{nav.name}</h2>
          {this.renderNavigationChildren(nav)}
        </div>
      );
    });
  }

  // noinspection JSMethodCanBeStatic
  private renderNavigationChildren(nav: INavigation) {
    if (nav.children) {
      const children = nav.children.map((children) => {
        return (
          <Link to={children.link} key={children.name}>{children.name}</Link>
        );
      });
      return (
        <div className={navItemChildren}>
          { children }
        </div>
      );
    }
  }

  render() {
    return (
      <div className={nav}>
        {this.renderNavigation()}
      </div>
    );
  }
}
