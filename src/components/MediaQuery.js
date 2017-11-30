import { h, Component } from 'preact'
import enquire from 'enquire.js'
import json2mq from 'json2mq'
import { generateSortedMediaQueriesFromList } from '../lib/Json2MqParsing'

class MediaQuery extends Component {
  state = { data: this.props.settings[0].data }
  componentDidMount() {
    if (this.props.settings.length === 0) return
    const mqList =
      generateSortedMediaQueriesFromList(this.props.settings)
      .map(x => {
        enquire.register(x.computed, () => {
          this.setState({
            data: x.data
          })
        })
        return x
      })

    enquire.register(json2mq({ minWidth: mqList[mqList.length-1].bp }), () => {
      this.setState({
        data: mqList[mqList.length-1]
      })
    })
  }

  render() {
    return this.props.children[0](this.state.data)
  }
}

export default MediaQuery
