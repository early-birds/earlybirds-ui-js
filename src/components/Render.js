import { h, render, Component } from 'preact';

class Render extends Component {

  componentWillMount() {
    const { path, children, type = 'html' } = this.props;
    if (path == null) return null;

    const el = document.querySelector(path);
    if (el) {
      const toBeRendered = <span>{children}</span>;

      children.forEach((c) => {
        const newEl = document.querySelector(path).insertBefore(document.createElement('li'), el.firstChild);

        switch (type) {
          case 'html':
            render(c, null, newEl);
            break;
          case 'append':
            render(c, newEl);
            break;
          case 'prepend':
            render(c, newEl, newEl.firstChild);
            break;
        }
      });
    }
  }
};

export default Render;
