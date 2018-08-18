// @flow
import type {Resources} from '../../src/resource/index';
import {CanvasStubBase} from '../util/canvas-stub-base';
import {drawGauge} from "../../src/canvas/gauge";

CanvasStubBase('../resources/', (context: CanvasRenderingContext2D, resources: Resources) => {
  const baseX = window.innerWidth / 2;
  const baseY = window.innerHeight / 2;

  drawGauge({
    context: context,
    resources: resources,
    dx: baseX,
    dy: baseY,
    hp: 3000,
    maxHp: 3000,
    battery: 4,
    maxBattery: 5
  });
});