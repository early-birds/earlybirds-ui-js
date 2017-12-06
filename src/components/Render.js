import { h, render, Component } from 'preact';

class Render extends Component {

  componentWillMount() {
    const { path, children, type = 'html' } = this.props;
    if (path == null) return null;

    const el = document.querySelector(path);
    if (el) {
      const toBeRendered = <span>{children}</span>

      switch(type) {
        case 'html':
          render(toBeRendered, null, el);
          break;
        case 'append':
          render(toBeRendered, el);
          break;
        case 'prepend':
          render(toBeRendered, el, el.firstChild);
          break;
      }
    }
  }
};

export default Render;
