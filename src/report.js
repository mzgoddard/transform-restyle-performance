import React, {Component} from 'react';

export default class Report extends Component {
  render() {
    return (<table>
      <thead><th>Name</th><th>Frames</th><th>Seconds</th><th>FPS</th></thead>
      {this.props.results.map(({name, frames, duration}) => (
        <tr><td>{name}</td><td>{frames}</td><td>{duration / 1000}</td><td>{frames / (duration / 1000) | 0}</td></tr>
      ))}
    </table>);
  }
}
