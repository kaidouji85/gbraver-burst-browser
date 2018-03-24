// @flow
import type {Resources} from '../../src/resource/index';
import {CanvasStubBase} from '../util/canvas-stub-base';
import {BatterySlider} from "../../src/canvas/battery-slider";

CanvasStubBase('../resources/', (context: CanvasRenderingContext2D, reources: Resources) => {

  BatterySlider(context, reources, 4, 5, window.innerWidth / 2, window.innerHeight / 2);
});