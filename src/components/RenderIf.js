import { h, render, Component } from 'preact'

class RenderIf extends Component {
  state = { shouldRender: false }

  componentWillMount() {
    const { condition } = this.props
    if (!condition) return null
    const tr = () => {
      if (!condition()) {
        window.requestAnimationFrame(tr);
      } else {
        this.setState({
          shouldRender: true,
        })
      }
    };
    tr()
  }

  render() {
    if (this.state.shouldRender) {
      return this.props.children[0]
    }
  }
}

export default RenderIf;
