import { h, render, Component } from 'preact'

class WaitDomElement extends Component {
  state = { shouldRender: false }

  componentWillMount() {
    const { path } = this.props
    if (!path) return null
    const intervalId = setInterval(() => {
      if (document.querySelector(path)) {
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

export default WaitDomElement
