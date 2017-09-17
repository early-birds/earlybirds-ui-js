import React from 'react';
import RecosWidget from './src/components/RecosWidget';
import Recos from './src/widgets/Recos';
import Earlybirds from './src/containers/Earlybirds';
import Router from './src/containers/Router';
import Route from './src/containers/Route';
import TrackActivity from './src/containers/TrackActivity';
import { Test } from './src/connectors';

module.exports = {
  RecosWidget,
  Earlybirds,
  TrackActivity,
  Router,
  Route,
  Test,
  widgets: {
    Recos,
  }
}
