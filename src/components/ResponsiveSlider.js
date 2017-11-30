import { h, Component } from 'preact'
import Slider from './Slider'
import MediaQuery from './MediaQuery'

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
  if (!breakpoints) {
    console.warn('Earlybirds reponsive slider : breakpoints object is missing')
    return null
  }
  return (
    <DynamicItemPerPage breakpoints={breakpoints}>
      {itemPerPage => (

        <div>
          <h1>Call slider</h1>
          <Slider datas={datas} itemPerPage={itemPerPage}>
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
