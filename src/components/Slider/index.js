import { h, Component } from 'preact';
import './style.css';
import json2mq from 'json2mq';
import enquire from 'enquire.js';

export class Slider extends Component {

  constructor(props) {
    super()
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.state = {
      sliderItems: [],
      offset: 0
    }
  }

  calculateSliderItems() {
    const { max } = this.state;
    const datas = this.props.children

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

    sliderItems[0].attributes.style = {
      marginLeft: `calc(-${this.state.offset} * 100%)`
    }

    this.setState({
      sliderItems
    })
    return sliderItems;
  }

  componentWillMount() {

    const { responsive } = this.props.settings;

    const breakpoints =
      responsive
        .map(x => x.breakpoint)
        .sort((a, b) => a - b);

    const registerMediaQuery = (mq, bp) => {
      const settingItem = responsive.filter(x => x.breakpoint == bp)[0];
      enquire.register(mq, () => {
        this.setState({
          breakpoint: bp,
          max: settingItem.settings.elementToShow
        });
        this.calculateSliderItems();
      })
    }

    breakpoints.map((bp, i) => {
      let bquery = json2mq({
        minWidth: i == 0 ? 0 : breakpoints[i-1],
        maxWidth: bp
      });
      registerMediaQuery(bquery, bp);
    });
    const lastbp = breakpoints.slice(-1)[0];
    registerMediaQuery(json2mq({minWidth: lastbp}), lastbp);
  }

  changeOffset(newoffset) {
    let max = this.state.sliderItems.length;
    let offset =
      newoffset >= max - 1 ? max -1 :
      newoffset < 0 ? 0 : newoffset
    this.setState({ offset })
    this.calculateSliderItems();
  }

  prev() {
    this.changeOffset(this.state.offset - 1);
  }

  next() {
    this.changeOffset(this.state.offset + 1);
  }

  render() {
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
