import { h, render, Component } from 'preact';
import { Slider } from './components/Slider';
import { Item } from './components/Item';

export class Root extends Component {

  render() {
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
