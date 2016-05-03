import React, {Component} from 'react';

import Runner from './runner';
import Test from './test';

import './main.css';

const objectCount = [10, 100, 200, 500, 1000, 2000, 5000, 10000];
const defalultObjectCount = [1000, 2000];
const animateFunction = [
  'translate', 'translate3d', 'rotateZ', 'rotate3d', 'matrix', 'matrix3d',
];
const defaultAnimateFunction = [
  'matrix', 'matrix3d',
];

function twitching(n, prefix, transformfn) {
  return {
    name: `${n} ${prefix} twitching`,
    step: (state) => {
      let {elements, last} = state;
      let tick = last ? last.tick : 1;
      tick = tick ? 0 : 1;
      if (last) {
        last.tick = tick;
      }
      else {
        // elements = state.elements = elements.map(el => el.children[0]);
        last = {tick};
      }
      const transform = transformfn(last);
      const cssTransform = 'transform: ' + transform;
      for (let i = 0; i < elements.length; i++) {
        var el = elements[i];
        // el.style.setProperty('transform', transform);
        // el.style.cssText = cssTransform;
        // el.setAttribute('style', cssTransform);
        el.style.transform = transform;
        el.style.MozTransform = transform;
        el.style.WebkitTransform = transform;
        // el.style.webkitTransform = transform;
      }
      // elements.forEach(el => {
      //   el.style.setProperty('transform', transform);
      // });
      return last;
    },
    nodes: () => {
      const elements = [];
      const row = n > 100 ? 30 : 10;
      for (let i = 0; i < n; i++) {
        elements.push(<div className="test-item" style={{
          // display: 'inline-block',
          // position: 'absolute',
          // top: (i / row | 0) * 10,
          // left: (i % row) * 10,
          // width: 10,
          // height: 10,
          // background: 'black',
          // transform: 'translateZ(0)',
        }}>
          <div></div>
        </div>);
      }
      return elements;
    },
  };
}

export default class Main extends Component {
  constructor() {
    super();

    this.state = {};
  }

  handleRun() {
    // const n = [10, 100, 500, 1000, 2000];
    // const n = [1000];
    // const n = [1000, 2000];
    // const n = [1000, 2000, 5000, 7500, 10000];
    const counts = objectCount.filter(n => this.refs[`num_${n}`].checked);
    const functions = animateFunction.filter(n => this.refs[`animate_${n}`].checked);
    console.log(counts, functions);

    const tests = [];

    if (functions.indexOf('translate') !== -1) {
      tests.push(...(counts.map(
        n => twitching(n, 'translate', ({tick}) => `translate(${tick * 5}px, 0)`)
      )));
    }
    if (functions.indexOf('translate3d') !== -1) {
      tests.push(...(counts.map(
        n => twitching(n, 'translate3d', ({tick}) => `translate3d(${tick * 5}px, 0, 0)`)
      )));
    }
    if (functions.indexOf('rotateZ') !== -1) {
      tests.push(...(counts.map(
        n => twitching(n, 'rotateZ', ({tick}) => `rotateZ(${tick}rad)`)
      )));
    }
    if (functions.indexOf('rotate3d') !== -1) {
      tests.push(...(counts.map(
        n => twitching(n, 'rotate3d', ({tick}) => `rotate3d(0, 0, 1, ${tick}rad)`)
      )));
    }
    if (functions.indexOf('matrix') !== -1) {
      tests.push(...(counts.map(
        n => twitching(n, 'matrix', ({tick}) => `matrix(${Math.cos(tick)}, ${Math.sin(tick)}, ${-Math.sin(tick)}, ${Math.cos(tick)}, ${tick * 5}, 0`)
      )));
    }
    if (functions.indexOf('matrix3d') !== -1) {
      tests.push(...(counts.map(
        n => twitching(n, 'matrix3d', ({tick}) => `matrix3d(${Math.cos(tick)}, ${-Math.sin(tick)}, 0, 0, ${Math.sin(tick)}, ${Math.cos(tick)}, 0, 0, 0, 0, 1, 0, ${tick * 5}, 0, 0, 1`)
      )));
    }

    this.setState({
      tests,
      runner: <Runner key={Math.random().toString(16).substring(2)} tests={tests} />,
    });
  }

  render() {
    const {runner} = this.state;
    return (<div>
      <form onSubmit={event => (event.preventDefault(), this.handleRun(), false)}>
        <div>
          <span>Object Count</span>
          {objectCount.map(n => (
            <span>
              <input type="checkbox" name={`num_${n}`} ref={`num_${n}`}
                defaultChecked={defalultObjectCount.indexOf(n) !== -1}/>
              <label for={`num_${n}`}>{n}</label>
            </span>
          ))}
        </div>
        <div>
          <span>Animate</span>
          {animateFunction.map(name => (
            <span>
            <input type="checkbox" name={`animate_${name}`} ref={`animate_${name}`}
                defaultChecked={defaultAnimateFunction.indexOf(name) !== -1}/>
              <label for={`animate_${name}`}>{name}</label>
            </span>
          ))}
        </div>
        <input type="submit" value="Run" />
      </form>
      {runner}
    </div>);
  }
}
