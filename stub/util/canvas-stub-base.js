// @flow
import type {Resources} from '../../src/resource/resource-manager';
import {ResourceManager} from '../../src/resource/resource-manager';
import {CanvasScene} from '../util/canvas-scene'

/**
 * キャンバス用スタブのベース
 * 画面リサイズには対応していない
 *
 * @param renderFunc キャンバスレンダリングをする関数
 */
export async function CanvasStubBase(renderFunc: (context: CanvasRenderingContext2D, reources: Resources) => void) {
  const resourceManager:  ResourceManager = new ResourceManager('../../');
  await Promise.all([
    resourceManager.loadModels(),
    resourceManager.loadTextures(),
    resourceManager.loadCanvasImages(),
  ]);

  const scene = new CanvasScene();
  document.body.appendChild(scene.renderer.domElement);

  const context = scene.canvas.getContext('2d');
  context.clearRect(0, 0, window.innerWidth, window.innerHeight);
  renderFunc(context, resourceManager.resources);
  scene.render();
};