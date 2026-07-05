import * as React from 'react';
import type { IToDoProps } from './IToDoProps';
import HomePage from './HomePage/HomePage';

export default class ToDo extends React.Component<IToDoProps> {
  public render(): React.ReactElement<IToDoProps> {
  

    return (
      <>
      <HomePage context={this.props.context} />
      </>
    );
  }
}
