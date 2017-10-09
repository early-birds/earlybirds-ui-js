import { h, Component } from 'preact';
import './style.css';

export class Slider extends Component {

  constructor(props) {
    super()
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);

    const { max } = props;
    const datas = props.children

    let dataSlider = [];
    for ( let i = 0; i < datas.length; i+=max) {
      dataSlider.push(datas.slice(i, i+max));
    }

    const generateSliderSubItems =
      (x, i) =>
        <div className='subItem' key={i}>
          {x}
        </div>

    const generateSliderItems =
      (x, i) =>
        <div className='SliderItem'>
          {x.map(generateSliderSubItems)}
        </div>

    const sliderItems =
      dataSlider
      .map(generateSliderItems)

    console.log('slider items', sliderItems);

    this.state = {
      offset: 0,
      sliderItems
    }
  }

  changeOffset(newoffset) {
    let max = this.state.sliderItems.length;
    let offset =
      newoffset >= max - 1 ? max -1 :
      newoffset < 0 ? 0 : newoffset
    this.setState({ offset })
  }

  prev() {
    this.changeOffset(this.state.offset - 1);
  }

  next() {
    this.changeOffset(this.state.offset + 1);
  }

  render() {
    const firstItem = this.state.sliderItems[0]
    firstItem.attributes.style = {
      marginLeft: `calc(-${this.state.offset} * 100%)`
    }
    return (
      <div className='SliderContainer'>
        <div>
          <span onClick={this.prev}>Prevlol3</span>
          <span onClick={this.next}>Next</span>
        </div>
        <div className='SliderContent'>
          {this.state.sliderItems}
        </div>
      </div>
    );
  }
}
