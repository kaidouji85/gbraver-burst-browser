// @flow
import type {Resources} from '../../src/common/resource-manager';
import {CanvasStubBase} from '../util/canvas-stub-base';
import {PlayerHpGaugeBase} from '../../src/canvas-paint/player-hp-gauge/base';

CanvasStubBase((context: CanvasRenderingContext2D, reources: Resources) => {
  PlayerHpGaugeBase(context, reources, window.innerWidth / 2, window.innerHeight / 2);
});