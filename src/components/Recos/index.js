import { h, render, Component } from 'preact';
import Eb from 'earlybirds-js';
import Render from '../Render';
import { CloneElement } from '../../lib/CloneElement';
import { ExpectChild } from '../../hoc/ExpectChild';

class RecosComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recommendations: null,
      path: null
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
            path: response.widget.location.path
          })
        });
    }
  }

  render() {
    if (this.state.recommendations) {
      return (
        <Render path={this.state.path}>
          { this.props.children[0](this.state.recommendations) }
        </Render>
      )
    }
  }
}

export default ExpectChild(RecosComponent);
