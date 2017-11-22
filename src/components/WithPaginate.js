import { h, render, Component } from 'preact'

class WithPaginate extends Component {
  state = { offset: 0 }

  next() {
    this.setState({
      offset: cycleThrough(
        this.props.max,
        this.props.min,
        this.state.offset,
        this.state.offset + 1)
    })
  }
  prev() {
    this.setState({
      offset: cycleThrough(
        this.props.max,
        this.props.min,
        this.state.offset,
        this.state.offset - 1)
    })
  }
  componentWillReceiveProps(nextProps) {
    if (this.state.offset > nextProps.max) {
      this.setState({
        offset: 0
      })
    }
  }
  render() {
    return this.props.children[0](this.state.offset, this.next.bind(this), this.prev.bind(this))
  }
}

export default WithPaginate
