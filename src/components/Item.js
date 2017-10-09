import { h, render, Component } from 'preact';

export class Item extends Component {
  render() {
    return (
      <div className='item'>{this.props.title}</div>
    )
  }
}
