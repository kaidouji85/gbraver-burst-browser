// @flow
import type {Resources} from '../../src/resource/resource-manager';
import {CanvasStubBase} from '../util/canvas-stub-base';
import {drawEnemyBatteryGauge} from '../../src/util/canvas/draw/battery-gauge';

CanvasStubBase((context: CanvasRenderingContext2D, reources: Resources) => {
  const basicX = window.innerWidth / 2;
  const basicY = window.innerHeight / 2;

  drawEnemyBatteryGauge(context, reources, basicX, basicY - 150, 0);
  drawEnemyBatteryGauge(context, reources, basicX, basicY - 100, 1);
  drawEnemyBatteryGauge(context, reources, basicX, basicY - 50, 2);
  drawEnemyBatteryGauge(context, reources, basicX, basicY, 3);
  drawEnemyBatteryGauge(context, reources, basicX, basicY + 50, 4);
  drawEnemyBatteryGauge(context, reources, basicX, basicY + 100, 5);
});