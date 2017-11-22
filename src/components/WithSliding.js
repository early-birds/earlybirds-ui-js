import { h, render, Component } from 'preact'

class WithSliding extends Component {
  componentWillReceiveProps(nextProps) {
    this.animation = !(this.props.offset > 1 && nextProps.offset === 0)
  }
  render() {
    const { list, offset, children } = this.props
    if (list.length <= 0) return null
    let scrollTo = 100 * offset
    const lastElement = list[list.length-1].children
    const elementPerPage = list[0].children.length
    if (list[offset].children.length < elementPerPage) {
      scrollTo -= 100 - ((100  / elementPerPage) * lastElement.length)
    }
    list[0].attributes.style = {
      marginLeft: `calc(-${scrollTo}%)`,
      transition: this.animation == true ? 'all linear 0.4s' : 'none'
    }
    return children[0]()
  }
}

export default WithSliding
