import { h, render, Component } from 'preact';
import { Slider } from './src/components/Slider';
import { Render } from './src/components/Render';
import { Recos } from './src/components/Recos';
import { ExpectChild } from './src/hoc/ExpectChild';
import { CloneElement } from './src/lib/CloneElement';

let config = {
  Slider,
  Render,
  Recos,
  ExpectChild,
  CloneElement
}
/* REDUX-RELATED-START */
import CreateStore from './src/widgets/CreateStore';
import { reducerIdentify, reducerGetRecos } from './src/redux/reducers';
import { getRecommendations } from './src/redux/actions';

config = {
  ...config,
  CreateStore,
  getRecommendations,
  Reducers: {
    reducerIdentify,
    reducerGetRecos
  }
}
/* REDUX-RELATED-END */
export default config;
