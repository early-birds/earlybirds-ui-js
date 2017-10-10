import { h, render, Component } from 'preact';
import { Root } from './src/Root';
import { Earlybirds } from './src/components/Earlybirds';

render(
  <Earlybirds>
    <Root />
  </Earlybirds>,
  document.getElementById('app')
)
