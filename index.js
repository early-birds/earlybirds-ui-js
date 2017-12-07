import Sliders from 'preact-slider';
import Render from './src/components/Render';
import Recos from './src/components/Recos';
import Identify from './src/components/Identify';
import WaitDomElement from './src/components/WaitDomElement';
import { ExpectChild } from './src/hoc/ExpectChild';
import { CloneElement } from './src/lib/CloneElement';

const { Slider, ResponsiveSlider } = Sliders

const config = {
  Slider,
  ResponsiveSlider,
  Render,
  Recos,
  ExpectChild,
  CloneElement,
  Identify,
  WaitDomElement
};

export default config;
