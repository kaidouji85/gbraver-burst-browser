// @flow
import type {Resources} from '../../src/resource/index';
import {CanvasStubBase} from '../util/canvas-stub-base';
import {drawBatterySlider} from "../../src/canvas/battery-slider";

CanvasStubBase('../resources/', (context: CanvasRenderingContext2D, reources: Resources) => {

  drawBatterySlider(context, reources, 4, 5, window.innerWidth / 2, window.innerHeight / 2);
});