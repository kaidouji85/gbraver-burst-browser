// @flow

import type {BattleSceneState} from "../../state";
import {BattleSceneView} from "../../view/index";
import {onResizeOrthographicCamera, onResizePerspectiveCamera} from "../../../../camera/resize";


/** リサイズ時の処理 */
export function resize(view: BattleSceneView, state: BattleSceneState): void {
  const width = getWidth();
  const height = getHeight();

  view.renderer.setSize(width, height);
  onResizePerspectiveCamera(view.threeDimensionLayer.camera, width, height);
  onResizeOrthographicCamera(view.hudLayer.camera, width, height);
}


/** リサイズ時の画面横幅 */
function getWidth(): number {
  if (document.documentElement) {
    // iPhoneではリサイズイベント発火後に、window.innerWidthに正しい値が反映されないが、
    // document.documentElement.clientWidthは正しく値が取得できる
    return document.documentElement.clientWidth;
  }

  // document.documentElementが存在しないことが理論上あるので、
  // その時にはwindow.innerWidthを使う
  return window.innerWidth;
}

/** リサイズ時の画面高 */
function getHeight(): number {
  if (document.documentElement) {
    // iPhoneではリサイズイベント発火後に、window.innerHeightに正しい値が反映されないが、
    // document.documentElement.clientHeightは正しく値が取得できる

    return document.documentElement.clientHeight;
  }

  // document.documentElementが存在しないことが理論上あるので、
  // その時にはwindow.iinnerHeightを使う
  return window.innerHeight;
}