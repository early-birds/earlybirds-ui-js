import { h, Component } from 'preact';
import { Eb } from 'earlybirds-js';
import { Provider, connect } from 'preact-redux';
import { createStore } from 'redux';
import { reducers } from '../../redux/reducers';

const store = createStore(reducers);

export class Earlybirds extends Component {
  render() {
    return (
      <Provider store={store}>
        {this.props.children}  
      </Provider>
    )
  }
}
