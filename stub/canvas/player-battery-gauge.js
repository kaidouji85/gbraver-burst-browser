// @flow
import type {Resources} from '../../src/common/resource-manager';
import {CanvasStubBase} from '../util/canvas-stub-base';
import {PlayerBatteryGauge} from '../../src/canvas-paint/battery-gauge';

CanvasStubBase((context: CanvasRenderingContext2D, reources: Resources) => {
  const basicX = window.innerWidth / 2;
  const basicY = window.innerHeight / 2;

  PlayerBatteryGauge(context, reources, basicX, basicY, 5);
});