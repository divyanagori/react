import * as React from 'react';

import HomePage from './Home/HomePage';

import { IEmpDetailsProps } from './IEmpDetailsProps';

export default class EmpTracker extends React.Component<IEmpDetailsProps, {}> {

  public render(): React.ReactElement<IEmpDetailsProps> {

    return (
      <div>
        <HomePage context={this.props.context} />
      </div>
    );
  }
} 