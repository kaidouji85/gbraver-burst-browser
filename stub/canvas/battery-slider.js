// @flow
import type {Resources} from '../../src/resource/index';
import {CanvasStubBase} from '../util/canvas-stub-base';
import {drawBatterySlider} from "../../src/canvas/deprocated-battery-slider";

CanvasStubBase('../resources/', (context: CanvasRenderingContext2D, reources: Resources) => {
  const baseX = window.innerWidth / 2;
  const baseY = window.innerHeight / 2;
  const paddingTop = 96;

  drawBatterySlider(context, reources, 5, 5, baseX, baseY + paddingTop * 2);
  drawBatterySlider(context, reources, 4, 5, baseX, baseY + paddingTop);
  drawBatterySlider(context, reources, 3, 5, baseX, baseY);
  drawBatterySlider(context, reources, 2, 5, baseX, baseY - paddingTop);
  drawBatterySlider(context, reources, 1, 5, baseX, baseY - paddingTop * 2);
  drawBatterySlider(context, reources, 0, 5, baseX, baseY - paddingTop * 3);
});