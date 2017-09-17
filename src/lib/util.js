import React from 'react';
import jQuery from 'jquery';
import { render } from 'react-dom';

export function mountFromLocation(Component, location) {
  let dom;

  if (location.type !== 'html') {
    const generatedId = `eb-auto-wrapper-${Date.now()}`;
    jQuery(location.path)[location.type](`<div id="${generatedId}"></div>`);
    dom = document.getElementById(generatedId);
  } else {
    dom = jQuery(location.path)[0];
  }
  mount(Component, dom);
  return dom;
}

export function mount(Component, mount) {
  render(Component, mount);
}

export function arrToObject(arr) {
  return arr.reduce(function(result, item) {
    var key = Object.keys(item)[0];
    result[key] = item[key];
    return result;
  }, {});
}