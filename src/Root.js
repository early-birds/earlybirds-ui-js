import { h, render, Component } from 'preact';
import { Slider } from './components/Slider';
import { Item } from './components/Item';
import { Eb } from 'earlybirds-js';
import { connect } from 'preact-redux';
import { Earlybirds } from './components/Earlybirds';
import { Identify } from './components/Identify';
import { Recos } from './components/Recos';

class RootComponent extends Component {

  render() {
    const { getRecosPayload, getRecosSuccess } = this.props;
    const settings = {
      trackerKey: '59512ddd7fa84f30d835bb2e',
      profile: {
        profile: [
          {
            id: '59512ddd7fa84f30d835bb2f',
          }
        ]
      }
    }
    
    const recommendations = 
      getRecosSuccess &&
      getRecosPayload.map(x => {
        return <div>{x.product.title}</div>
      })

    const mappedDatas =
      getRecosSuccess &&
      getRecosPayload.map(
        (x, i) =>
          <Item className='item' title={x.product.title} />
      )

    const sliderSettings = {
      responsive: [
        {
          breakpoint: 1400,
          settings: {
            elementToShow: 5
          }
        },
        {
          breakpoint: 1200,
          settings: {
            elementToShow: 4
          }
        },
        {
          breakpoint: 1000,
          settings: {
            elementToShow: 3
          }
        },
        {
          breakpoint: 800,
          settings: {
            elementToShow: 2
          }
        },
        {
          breakpoint: 600,
          settings: {
            elementToShow: 1
          }
        },
      ]
    }

    return (
      <Identify {...settings}>
        <Recos widgetId='59cb69fec03905235d4cdc9a'>
          <Slider settings={sliderSettings}>
            <div className='slider-control'>
                <button className='prev'>Precedent</button>
                <button className='next'>Suivant</button>
            </div>
            {mappedDatas}
          </Slider>
        </Recos>
      </Identify>
    )
  }
}

const mapStateToProps = state => ({
  getRecosSuccess: state.getRecosSuccess,
  getRecosPayload: state.getRecosPayload
})

export const Root = connect(
  mapStateToProps
)(RootComponent)

    /*
    const datas = [
      { title: 'element1' },
      { title: 'element2' },
      { title: 'element3' },
      { title: 'element4' },
      { title: 'element5' },
      { title: 'element6' },
      { title: 'element7' },
      { title: 'element8' },
      { title: 'element9' },
      { title: 'element10' },
      { title: 'element11' }
    ];

    const mappedDatas =
      datas.map(
        (x, i) =>
          <Item className='item' title={x.title} />
      )

    const sliderSettings = {
      responsive: [
        {
          breakpoint: 1400,
          settings: {
            elementToShow: 5
          }
        },
        {
          breakpoint: 1200,
          settings: {
            elementToShow: 4
          }
        },
        {
          breakpoint: 1000,
          settings: {
            elementToShow: 3
          }
        },
        {
          breakpoint: 800,
          settings: {
            elementToShow: 2
          }
        },
        {
          breakpoint: 600,
          settings: {
            elementToShow: 1
          }
        },
      ]
    }

    return (
      <div>
        <h1>Test4</h1>
        <Slider settings={sliderSettings}>
          <div className='slider-control'>
              <button className='prev'>Precedent</button>
              <button className='next'>Suivant</button>
          </div>
          {mappedDatas}
        </Slider>
      </div>
    )
  }
}
    */
