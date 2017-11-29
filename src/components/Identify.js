import { h, Component } from 'preact'
import Eb from 'earlybirds-js'

class Identify extends Component {
  state = { isIdentified: false }

  componentWillMount() {
    if (!this.props.profile) return false
    const eb = new Eb().getInstance()
    if (!eb.trackerKey && !this.props.trackerKey)
      return false
    if (!eb.trackerKey) {
      eb.init(this.props.trackerKey)
    }
    eb.identify(this.props.profile)
      .then(response => {
        this.setState({
          isIdentified: true
        })
        return response
      })
      .catch(err => {
        console.error(err)
        throw err
      })
  }

  render() {
    if (this.state.isIdentified) {
      console.log('is identified')
      return this.props.children[0]
    }
  }
}

export default Identify
