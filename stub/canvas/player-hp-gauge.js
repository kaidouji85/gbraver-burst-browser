// @flow
import type {Resources} from '../../src/resource/index';
import {CanvasStubBase} from '../util/canvas-stub-base';
import {drawPlayerHpGauge} from '../../src/canvas/draw/hp-gauge';

CanvasStubBase('../resources/', (context: CanvasRenderingContext2D, reources: Resources) => {
  const basicX = window.innerWidth / 2;
  const basicY = window.innerHeight / 2;
  const heightMargin = 80;

  drawPlayerHpGauge(context, reources, basicX, basicY - heightMargin * 2, 3200, 3200);
  drawPlayerHpGauge(context, reources, basicX, basicY - heightMargin * 1, 1948, 3200);
  drawPlayerHpGauge(context, reources, basicX, basicY, 156, 3000);
  drawPlayerHpGauge(context, reources, basicX, basicY + heightMargin * 1, 56, 3000);
  drawPlayerHpGauge(context, reources, basicX, basicY + heightMargin * 2, 4, 3000);
});