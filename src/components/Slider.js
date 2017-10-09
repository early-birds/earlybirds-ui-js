import { h, Component } from 'preact';
import './style.css';

export class Slider extends Component {

  constructor(props) {
    super()
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);

    const hasSliderItemClass =
      x => x.attributes.className === 'SliderItem';
    const sliderItems =
      props.children
      .filter(hasSliderItemClass)
    this.state = {
      offset: 0,
      sliderItems
    }
  }

  changeOffset(newoffset) {
    console.log('changeo ffset');
    let max = this.state.sliderItems.length;
    let offset =
      this.state.offset >= max - 1 ? max -1 :
      this.state.offset < 0 ? 0 : newoffset
    console.log(offset);
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
          <span onClick={this.prev}>Prev</span>
          <span onClick={this.next}>Next</span>
        </div>
        <div className='SliderContent'>
          {this.state.sliderItems}
        </div>
      </div>
    );
  }
}
