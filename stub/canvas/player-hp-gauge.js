// @flow
import type {Resources} from '../../src/common/resource-manager';
import {CanvasStubBase} from '../util/canvas-stub-base';
import {PlayerHpGauge} from '../../src/canvas-paint/player-hp-gauge';

CanvasStubBase((context: CanvasRenderingContext2D, reources: Resources) => {
  PlayerHpGauge(context, reources, window.innerWidth / 2, window.innerHeight / 2, 1000, 3000);
});