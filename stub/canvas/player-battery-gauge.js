// @flow
import type {Resources} from '../../src/resource/resource-manager';
import {CanvasStubBase} from '../util/canvas-stub-base';
import {drawPlayerBatteryGauge} from '../../src/util/canvas/draw/battery-gauge';

CanvasStubBase((context: CanvasRenderingContext2D, reources: Resources) => {
  const basicX = window.innerWidth / 2;
  const basicY = window.innerHeight / 2;

  drawPlayerBatteryGauge(context, reources, basicX, basicY - 150, 0, 5);
  drawPlayerBatteryGauge(context, reources, basicX, basicY - 100, 1, 5);
  drawPlayerBatteryGauge(context, reources, basicX, basicY - 50, 2, 5);
  drawPlayerBatteryGauge(context, reources, basicX, basicY, 3, 5);
  drawPlayerBatteryGauge(context, reources, basicX, basicY + 50, 4, 5);
  drawPlayerBatteryGauge(context, reources, basicX, basicY + 100, 5, 5);
});