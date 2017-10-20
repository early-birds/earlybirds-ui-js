import { h, render, Component } from 'preact';
import { Slider } from './src/components/Slider';
import { Render } from './src/components/Render';
import { CreateStore } from './src/widgets/CreateStore';
import { reducerIdentify, reducerGetRecos } from './src/redux/reducers';
import { getRecommendations } from './src/redux/actions';

module.exports = {
  Slider,
  Render,
  CreateStore,
  getRecommendations,
  Reducers: {
    reducerIdentify,
    reducerGetRecos
  }
}
