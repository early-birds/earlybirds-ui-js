import { h, render } from 'preact';

const actions = {
  'prepend': el => {
    el.insertBefore(document.createElement('div'), el.firstElementChild);
    return el.firstElementChild;
  },
  'append': el => {
    el.appendChild(document.createElement('div'))
    return el.lastElementChild;
  },
  'html': el => {
    el.innerHTML = '';
    return el;
  },
  'after': el => {
    const newEl = el.parentNode.insertBefore(document.createElement('div'), el.nextSibling)
    return newEl;
  },
  'before': el => {
    const newEl = el.parentNode.insertBefore(document.createElement('div'), el)
    return newEl;
  },
}

const Render = (props) => {
  const { path, children, type = 'html' } = props;
  if (path == null) return null;
  const el = document.querySelector(path);
  let replaceAt;
  if (el) {
    const replaceAt = actions[type](el)
    render(
      <span>{children}</span>,
      replaceAt,
    );
  }
  return null;
};

export default Render;
