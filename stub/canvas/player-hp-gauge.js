// @flow
import type {Resources} from '../../src/common/resource-manager';
import {CanvasStubBase} from '../util/canvas-stub-base';

CanvasStubBase((context: CanvasRenderingContext2D, reources: Resources) => {
  context.fillStyle = 'rgb(192, 80, 77)';
  context.fillRect(0, 0, 256, 256);
});