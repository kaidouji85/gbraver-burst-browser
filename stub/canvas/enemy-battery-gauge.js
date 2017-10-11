// @flow
import type {Resources} from '../../src/common/resource-manager';
import {CanvasStubBase} from '../util/canvas-stub-base';
import {EnemyBatteryGauge} from '../../src/canvas-paint/battery-gauge';

CanvasStubBase((context: CanvasRenderingContext2D, reources: Resources) => {
  const basicX = window.innerWidth / 2;
  const basicY = window.innerHeight / 2;

  EnemyBatteryGauge(context, reources, basicX, basicY - 150, 0);
  EnemyBatteryGauge(context, reources, basicX, basicY - 100, 1);
  EnemyBatteryGauge(context, reources, basicX, basicY - 50, 2);
  EnemyBatteryGauge(context, reources, basicX, basicY, 3);
  EnemyBatteryGauge(context, reources, basicX, basicY + 50, 4);
  EnemyBatteryGauge(context, reources, basicX, basicY + 100, 5);
});