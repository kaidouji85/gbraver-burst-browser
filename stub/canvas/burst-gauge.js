// @flow
import type {Resources} from '../../src/resource/index';
import {CanvasStubBase} from '../util/canvas-stub-base';
import {drawBurstGauge} from "../../src/canvas/burst-gauge";

CanvasStubBase('../resources/', (context: CanvasRenderingContext2D, resources: Resources) => {
  drawBurstGauge(context, resources, true, window.innerWidth / 2, window.innerHeight / 2 + 32);
  drawBurstGauge(context, resources, false, window.innerWidth / 2, window.innerHeight / 2 - 32);
});