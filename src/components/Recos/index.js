import { h, render, Component } from 'preact';
import { Eb } from 'earlybirds-js';
import { connect } from 'preact-redux';
import './style.css';
import {
  getRecommendationsStartAction,
  getRecommendationsSuccess
} from '../../redux/actions';

class RecosComponent extends Component {
  constructor() {
    super()
    this.state = {
      path: null
    }
  }
  componentWillMount() {
    const {
      widgetId,
      getRecommendations,
      getRecosDone, children } = this.props;

    getRecommendations();
    const eb =
    new Eb()
    .getRecommendations(widgetId)
    .then(x => x.json())
    .then((response) => {
      getRecosDone(response.recommendations);
      this.setState({
        path: document.querySelector(response.widget.location.path)
      })
      return response;
    })
  }
  render() {
    if (this.props.getRecosSuccess && this.state.path) {
      render(
        <div>{this.props.children}</div>,
        this.state.path 
      )
    }
    return null;
  }
}

const mapStateToProps = state => ({
  getRecosSuccess: state.getRecosSuccess
})

const mapDispatchToProps = dispatch => ({
  getRecommendations: () => {
    dispatch(getRecommendationsStartAction())
  },
  getRecosDone: (data) => {
    dispatch(getRecommendationsSuccess(data));
  }
})

export const Recos = connect(
  mapStateToProps,
  mapDispatchToProps
)(RecosComponent)
