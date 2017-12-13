import { h, render, Component } from 'preact'

class RenderIf extends Component {
  state = { shouldRender: false }

  componentWillMount() {
    const { condition } = this.props
    if (!condition) return null
    const intervalId = setInterval(() => {
      if (condition()) {
        clearInterval(intervalId)
        this.setState({
          shouldRender: true
        })
      }
    }, 200)
  }

  render() {
    if (this.state.shouldRender) {
      return this.props.children[0]
    }
  }
}

export default RenderIf;
