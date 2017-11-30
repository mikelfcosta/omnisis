import * as React from 'react';
import InsightsSummary from './InsightsSummary';
import LastAccesses from './LastAccesses';
import HoldersOnCampus from './HoldersOnCampus';

export default class Dash extends React.Component<{}, {}> {

  componentWillMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div>
        <InsightsSummary/>
        <LastAccesses/>
        <HoldersOnCampus/>
      </div>
    );
  }
}
