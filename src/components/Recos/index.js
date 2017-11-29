import { h, render, Component } from 'preact';
import Eb from 'earlybirds-js';
import Render from '../Render';
import { CloneElement } from '../../lib/CloneElement';
import { ExpectChild } from '../../hoc/ExpectChild';

class RecosComponent extends Component {
  constructor(props) {
    super(props);
    console.log('Recos component')
    this.state = {
      recommendations: null,
      path: null
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
    if (!this.props.widgetId) return null
    const { widgetId } = this.props;
    if (!this.state.response) {
      new Eb().getInstance()
        .getRecommendations(widgetId)
        .then(response => {
          this.setState({
            recommendations: response.recommendations,
            path: this.getPath(response.widget.location.path)
          })
        });
    }
  }

  render() {
    if (this.state.recommendations) {
      const toBeRendered = this.props.children[0](this.state.recommendations)
      if (this.state.path) {
        return (
          <Render path={this.state.path}>
          {toBeRendered}
          </Render>
        )
      }
      else {
        return toBeRendered
      }
    }
  }
}

export default ExpectChild(RecosComponent);
