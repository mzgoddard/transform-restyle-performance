import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';

export default class Test extends Component {
  constructor(props) {
    super(props);
    this.data = {frames: -1, duration: 0, last: 0};
    this.state = {nodes: this.props.test.nodes(), stepInput: {elements: null}};
    this.step = this.step.bind(this);
  }

  componentDidMount() {
    this.state.stepInput.elements = Array.from(findDOMNode(this).children);
    this.frameId = requestAnimationFrame(() => {
      this.data.last = Date.now();
      this.step();
    });
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.frameId);
  }

  step() {
    if (this.data.duration > 2000) {this.props.callback(); return;}
    this.frameId = requestAnimationFrame(this.step);
    this.data.frames++;
    const now = Date.now();
    this.data.duration += now - this.data.last;
    this.data.last = now;
    this.state.stepInput.last = this.props.test.step(this.state.stepInput);
  }

  result() {
    const {name} = this.props.test;
    const {frames, duration} = this.data;
    return {
      name,
      frames,
      duration,
    };
  }

  render() {
    const {nodes} = this.state;
    return (<div style={{position: 'relative'}}>
      {nodes}
    </div>);
  }
}
