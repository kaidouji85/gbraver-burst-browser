// @flow
import type {Resources} from '../../browser/resource';
import {loadAllResource} from '../../browser/resource';
import {CanvasScene} from './canvas-scene'

/**
 * キャンバス用スタブのベース
 * 画面リサイズには対応していない
 *
 * @param basePath リソースのベースとなるパス
 * @param renderFunc キャンバスレンダリングをする関数
 */
export async function CanvasStubBase(basePath: string, renderFunc: (context: CanvasRenderingContext2D, reources: Resources) => void) {
  const resources = await loadAllResource(basePath);

  const scene = new CanvasScene();
  const body = document.body || document.createElement('body');
  body.appendChild(scene.renderer.domElement);

  const context = scene.canvas.getContext('2d');
  context.clearRect(0, 0, window.innerWidth, window.innerHeight);
  renderFunc(context, resources);
  scene.render();
};