import { h, render, Component } from 'preact';
import Eb from 'earlybirds-js';
import Render from '../Render';
import WaitDomElement from '../WaitDomElement';
import { CloneElement } from '../../lib/CloneElement';
import { ExpectChild } from '../../hoc/ExpectChild';

class RecosComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: null,
      path: null,
      type: null
    }
  }

  getPath(path) {
    const location = this.props.automount
    if (location !== undefined &&
      location !== 'auto') {
      return location
    }
    else {
      return path
    }
  }

  componentDidMount() {
    if (!this.props.widgetId) {
      console.error('Recos component: widgetId is missing');
      return null;
    }
    const { widgetId } = this.props;
    new Eb().getInstance()
      .getRecommendations(widgetId, { variables: this.props.variables })
      .then((response) => {
        this.setState({
          response,
          path: this.getPath(response.widget.location.path),
          type: response.widget.location.type,
        });
      });
  }

  render() {
    if (this.state.response) {
      const toBeRendered = this.props.children[0](this.state.response)
      if (this.state.path) {
        return (
          <WaitDomElement path={this.state.path}>
            <Render path={this.state.path} type={this.state.type}>
              {toBeRendered}
            </Render>
          </WaitDomElement>
        );
      }
      return toBeRendered;
    }
  }
}

export default ExpectChild(RecosComponent);
