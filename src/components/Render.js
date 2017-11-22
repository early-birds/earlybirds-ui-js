import { h, render } from 'preact';

const Render = (props) => {
  const { path, children, type = 'replace' } = props;
  if (path == null) return null;
  const el = document.querySelector(path);
  let replaceAt;
  if (el) {
    if (type === 'prepend') {
      el.insertBefore(document.createElement('div'), el.firstElementChild);
      replaceAt = el.firstElementChild;
    } else if (type === 'replace') {
      el.innerHTML = '';
      replaceAt = el;
    }
    render(
      <span>{children}</span>,
      replaceAt,
    );
  }
  return null;
};

export default Render;
