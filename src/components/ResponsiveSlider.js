import { h, Component } from 'preact'
import enquire from 'enquire.js'
import json2mq from 'json2mq'
import { generateSortedMediaQueriesFromList } from '../lib/Json2MqParsing'
import Slider from './Slider'

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

const DynamicItemPerPage = ({ breakpoints, children }) => {
  const settings =
    breakpoints
    .map(({ bp, ...rest }) => ({ bp: bp, data: rest }))

  return (
    <MediaQuery settings={settings}>
    {data => {
      console.log(data)
      return (
        <div>
          {children[0](data.itemPerPage)}
        </div>
      )
    }}
    </MediaQuery>
  )
}

const ResponsiveSlider = ({ datas, breakpoints, children }) => {
  return (
    <DynamicItemPerPage breakpoints={breakpoints}>
      {itemPerPage => (

        <div>
          <h1>Call slider</h1>
          <Slider datas={datas.map(x => <div>{x.title}</div>)} itemPerPage={itemPerPage}>
            {(list, next, prev, offset) => (
              <div>
                <h1>In Slider</h1>
                {children[0](list, next, prev, offset)}
              </div>
            )}
          </Slider>
        </div>
      )}
    </DynamicItemPerPage>
  )
}

export default ResponsiveSlider
