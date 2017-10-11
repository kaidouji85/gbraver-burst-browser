// @flow
import type {Resources} from '../../src/common/resource-manager';
import {CanvasStubBase} from '../util/canvas-stub-base';
import {PlayerBatteryGauge} from '../../src/canvas-paint/battery-gauge';

CanvasStubBase((context: CanvasRenderingContext2D, reources: Resources) => {
  const basicX = window.innerWidth / 2;
  const basicY = window.innerHeight / 2;

  PlayerBatteryGauge(context, reources, basicX, basicY - 150, 0);
  PlayerBatteryGauge(context, reources, basicX, basicY - 100, 1);
  PlayerBatteryGauge(context, reources, basicX, basicY - 50, 2);
  PlayerBatteryGauge(context, reources, basicX, basicY, 3);
  PlayerBatteryGauge(context, reources, basicX, basicY + 50, 4);
  PlayerBatteryGauge(context, reources, basicX, basicY + 100, 5);
});