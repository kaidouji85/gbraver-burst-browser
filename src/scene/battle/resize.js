// @flow

import {BattleSceneView} from "./view/index";
import {onResizeOrthographicCamera, onResizePerspectiveCamera} from "../../camera/resize";
import type {Resize} from "../../action/dom-event/resize";


/** リサイズ時の処理 */
export function resize(view: BattleSceneView, action: Resize): void {
  view.renderer.setSize(action.width, action.height);
  onResizePerspectiveCamera(view.threeDimensionLayer.camera, action.width, action.height);
  onResizeOrthographicCamera(view.hudLayer.camera, action.width, action.height);
}