import { h, render, Component } from 'preact';

const insertElem = (element, parent, type) => {
  const newDiv = document.createElement((element.attributes || {}).rootElement || element.nodeName);
  let newEl;

  if (type === 'append') {
    newEl = parent.appendChild(newDiv);
  } else if (type === 'prepend') {
    newEl = parent.insertBefore(newDiv, parent.firstChild);
  }
  render(element, null, newEl);
};

class Render extends Component {
  static createElement({ path, type, nodeName }) {
    const parent = document.querySelector(path);
    const newDiv = document.createElement(nodeName);

    if (!parent) {
      return null;
    }

    switch (type) {
      case 'html':
        return parent;
      case 'append':
        return parent.appendChild(newDiv);
      case 'prepend':
        return parent.insertBefore(newDiv, parent.firstChild);
      case 'before':
        return parent.parentNode.insertBefore(newDiv, parent);
      case 'after':
        return parent.parentNode.insertBefore(newDiv, parent.nextSibling);
      default:
        throw new Error('Unhandled render type');
    }
  }

  componentWillMount() {
    const { path, children, type = 'html' } = this.props;
    console.log(this.props);
    if (path == null) return null;
    const el = document.querySelector(path);
    let newDiv;

    if (el) {
      const toBeRendered = children.length > 1 ? <span>{children}</span> : children[0];

      switch (type) {
        case 'html':
          render(toBeRendered, null, el);
          break;
        case 'append':
        case 'prepend':
          children.forEach(child => insertElem(child, el, type));
          break;
        case 'before':
        case 'after':
          newDiv = document.createElement(toBeRendered.nodeName);
          el.parentNode.insertBefore(newDiv, type === 'before' ? el : el.nextSibling);
          render(toBeRendered, null, newDiv);
          break;
        default:
          throw new Error('Unhandled render type');
      }
    }
  }
}

export default Render;
