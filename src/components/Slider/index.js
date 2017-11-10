import { h, Component } from 'preact';
import styles from './style.css';
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
    console.log('children', this.props.children);
    const hasItemClass = x => x.attributes && x.attributes.className && x.attributes.className.indexOf('item') !== -1;
    const datas = this.props.children.filter(hasItemClass)
    const sliderItemClass =
      this.props.settings && this.props.settings.display == 'column' ?
      styles.SliderItem + ' ' + styles.column : styles.SliderItem;

    let dataSlider = [];
    console.log(datas);
    for ( let i = 0; i < datas.length; i+=max) {
      dataSlider.push(datas.slice(i, i+max));
    }

    const generateSliderSubItems =
      (x, i) =>
        <div className={styles.subItem} key={i}>
          {x}
        </div>

    const generateSliderItems =
      (x, i) =>
        <div className={sliderItemClass}>
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
    if (this.props.settings && this.props.settings.responsive) {
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
    else {
      console.log('element to show: ' + this.props.elementToShow);
      this.setState({
        max: this.props.elementToShow || 3
      });
      this.calculateSliderItems();
    }
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

  getBtnControlElement() {
    const hasSliderControlClass =
      x => x.attributes && x.attributes.className && x.attributes.className.indexOf('slider-control') !== -1;
    const control = this.props.children.filter(hasSliderControlClass)[0]
    if (control) {
      control.children[0].children.map((x, i) => {
        if (x.attributes && x.attributes.className && x.attributes.className.indexOf('prev') !== -1)
          x.attributes.onClick = this.prev;
        else if (x.attributes && x.attributes.className && x.attributes.className.indexOf('next') !== -1)
          x.attributes.onClick = this.next;
      })
      return control;
    }
    return (
      <div>
        <span onClick={this.prev}>Prev</span>
        <span onClick={this.next}>Next</span>
      </div>
    )
  }

  render() {
    let containerClass = this.props.className + ' ' + styles.SliderContainer;
    console.log('final class name', containerClass);
    return (
      <div className={containerClass}>
        {this.getBtnControlElement()}
        <div className={styles.SliderContent}>
          {this.state.sliderItems}
        </div>
      </div>
    );
  }
}
