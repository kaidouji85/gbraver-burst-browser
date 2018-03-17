// @flow
import type {Resources} from "../../resource/index";
import {Button} from "./button";
import {AttackButtonView} from "./view/attack-button-view";

/** コウゲキボタン */
export function AttackButton(param: {
  /** リソース管理クラス */
  resources: Resources,
  /** ボタンが押された際のコールバック関数 */
  onPush: () => void
}): Button {
  return new Button({
    view: new AttackButtonView(param.resources),
    onPush: param.onPush
  });
}