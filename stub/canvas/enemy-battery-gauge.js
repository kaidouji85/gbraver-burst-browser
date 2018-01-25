// @flow
import type {Resources} from '../../src/resource/resource-manager';
import {CanvasStubBase} from '../util/canvas-stub-base';
import {drawEnemyBatteryGauge} from '../../src/canvas/draw/battery-gauge';

CanvasStubBase('../resources/', (context: CanvasRenderingContext2D, reources: Resources) => {
  const basicX = window.innerWidth / 2;
  const basicY = window.innerHeight / 2;

  drawEnemyBatteryGauge(context, reources, basicX, basicY - 150, 0, 5);
  drawEnemyBatteryGauge(context, reources, basicX, basicY - 100, 1, 5);
  drawEnemyBatteryGauge(context, reources, basicX, basicY - 50, 2, 5);
  drawEnemyBatteryGauge(context, reources, basicX, basicY, 3, 5);
  drawEnemyBatteryGauge(context, reources, basicX, basicY + 50, 4, 5);
  drawEnemyBatteryGauge(context, reources, basicX, basicY + 100, 5, 5);
});