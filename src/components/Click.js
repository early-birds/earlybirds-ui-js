import { h, Component } from 'preact'

class Click extends Component {
  constructor() {
    super()
    this.state = {
      shouldRender: false,
      target: null
    }
  }

  componentDidMount() {
    const { selector } = this.props
    if (!selector) {
      console.warn('Earlybirds: Calling Click without a selector')
      return
    }
    const el = document.querySelectorAll(selector)
    for (let i = 0; i < el.length; ++i) {
      el[i].addEventListener('click', () => {
        this.setState({
          shouldRender: true,
          target: el[i]
        })
      })
    }
  }

  render() {
    const { shouldRender, target } = this.state
    const { children } = this.props
    return shouldRender && children[0](this.state.target)
  }
}

export default Click
