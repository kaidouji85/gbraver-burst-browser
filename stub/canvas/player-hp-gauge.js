// @flow
import type {Resources} from '../../src/common/resource-manager';
import {CanvasStubBase} from '../util/canvas-stub-base';

import {draw, drawWithCenter} from '../../src/canvas-paint/player-hp-gauge/base';

CanvasStubBase((context: CanvasRenderingContext2D, reources: Resources) => {
  draw(context, reources, window.innerWidth/2, 0);
  drawWithCenter(context, reources, window.innerWidth/2, 100);
});