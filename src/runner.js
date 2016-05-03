import React, {Component} from 'react';

import Report from './report';
import Test from './test';

export default class Runner extends Component {
  constructor(props) {
    super(props);
    this.state = {index: 0, test: null, results: []};
    this.handleCallback = this.handleCallback.bind(this);
  }

  componentDidMount() {
    this.createNextTest();
  }

  createNextTest() {
    const {index, results} = this.state;
    if (this.state.index >= this.props.tests.length) {
      this.setState({
        index,
        test: <div></div>,
        results,
      });
      return;
    }
    this.setState({
      index: index + 1,
      test: <Test
        key={index + 1}
        ref={testComponent => {this.testComponent = testComponent;}}
        test={this.props.tests[index]}
        callback={this.handleCallback} />,
      results,
    });
  }

  handleCallback() {
    const {index, test, results} = this.state;
    this.setState({
      index,
      test,
      results: results.concat(this.testComponent.result()),
    });
    this.createNextTest();
  }

  render() {
    const {results, test} = this.state;
    return (<div>
      <Report results={results} />
      {test}
    </div>);
  }
}
