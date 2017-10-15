import * as React from 'react';
import { nav, navItem, navItemChildren } from './Nav.scss';
import { HOME, INSIGHTS, USERS } from '../../../icons';

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
      { name: 'Administrar', link: '/students/admin' },
      { name: 'Grupos e Perfis', link: '/students/groups' },
    ],
  },
  {
    name: 'Insights',
    icon: INSIGHTS,
    children: [
      { name: 'Comportamento', link: '/insights/behavior' },
      { name: 'Campus', link: '/insights/campus' },
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
          <h3 key={children.name}>{children.name}</h3>
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
