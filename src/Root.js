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
          <Item title={x.title} />
      )

    return (
      <div>
        <h1>Test</h1>
        <Slider max={4}>
          {mappedDatas}
        </Slider>
      </div>
    )
  }
}
