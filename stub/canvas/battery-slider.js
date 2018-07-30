// @flow
import type {Resources} from '../../src/resource/index';
import {CanvasStubBase} from '../util/canvas-stub-base';
import {drawBatterySlider} from "../../src/canvas/battery-slider";

CanvasStubBase('../resources/', (context: CanvasRenderingContext2D, reources: Resources) => {
  const baseX = window.innerWidth / 2;
  const baseY = window.innerHeight / 2;

  drawBatterySlider(context, reources, {
    battery: 1.5,
    maxEnableBattery: 5,
    maxBattery: 5,
    dx: baseX,
    dy: baseY
  });
});