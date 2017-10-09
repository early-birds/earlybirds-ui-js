import { h, render, Component } from 'preact';
import { Slider } from './components/Slider';

export class Root extends Component {
  render() {
    return (
      <div>
        <h1>Test</h1>
        <Slider>
          <div className='SliderItem'>Element 1</div>
          <div className='SliderItem'>Element 2</div>
          <div className='SliderItem'>Element 3</div>
          <div className='SliderItem'>Element 4</div>
        </Slider>
      </div>
    )
  }
}
