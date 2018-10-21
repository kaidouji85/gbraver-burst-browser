// @flow

import {BattleSceneView} from "./view/index";
import {onResizeOrthographicCamera} from "../../camera/resize";
import type {Resize} from "../../action/dom-event/resize";


/** リサイズ時の処理 */
export function resize(view: BattleSceneView, action: Resize): void {
  onResizeOrthographicCamera(view.hudLayer.camera, action.width, action.height);
}