import { h, render, Component } from 'preact';
import { CloneElement } from '../lib/CloneElement';

export const Render = props => {
  const { path, children, type = 'replace' } = props;
  if (path == null) return null;
  const el = document.querySelector(path)
  let replaceAt;
  if (el) {
    if (type === "prepend") {
      el.insertBefore(document.createElement('div'), el.firstElementChild)
      replaceAt = el.firstElementChild;
    }
    else if (type === 'replace') {
      el.innerHTML = '';
      replaceAt = el;
    }
    render(
      <span>{children}</span>,
      replaceAt
    )
  }
}
