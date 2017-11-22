import { h, render, Component } from 'preact'

class WithWindowResizing extends Component {
  state = { elementToShow: this.props.elementToShow }
  componentDidMount() {
    if (this.props.responsive.length === 0) return
    const mqList =
      generateSortedMediaQueriesFromList(this.props.responsive)
      .map(x => {
        enquire.register(x.computed, () => {
          console.log(x.computed, x.elementToShow)
          this.setState({
            elementToShow: x.elementToShow
          })
        })
        return x
      })

    enquire.register(json2mq({ minWidth: mqList[mqList.length-1].bp }), () => {
      console.log('high')
      this.setState({
        elementToShow: mqList[mqList.length-1].elementToShow
      })
    })
  }

  render() {
    return this.props.children[0](this.state.elementToShow)
  }
}

export default WithWindowResizing
