// @flow
import type {Resources} from '../../src/resource/index';
import {CanvasStubBase} from '../util/canvas-stub-base';
import {BatterySlider} from "../../src/canvas/battery-slider";

CanvasStubBase('../resources/', (context: CanvasRenderingContext2D, reources: Resources) => {
  const baseX = window.innerWidth / 2;
  const baseY = window.innerHeight / 2;
  const paddingTop = 96;

  BatterySlider(context, reources, 5, 5, baseX, baseY + paddingTop * 2);
  BatterySlider(context, reources, 4, 5, baseX, baseY + paddingTop);
  BatterySlider(context, reources, 3, 5, baseX, baseY);
  BatterySlider(context, reources, 2, 5, baseX, baseY - paddingTop);
  BatterySlider(context, reources, 1, 5, baseX, baseY - paddingTop * 2);
  BatterySlider(context, reources, 0, 5, baseX, baseY - paddingTop * 3);
});