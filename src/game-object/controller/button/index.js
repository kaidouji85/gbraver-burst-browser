// @flow
import type {Resources} from "../../../resource";
import {Button} from "./button";
import {AttackButtonView} from "./view/attack-button-view";

/** コウゲキボタン */
export function AttackButton(param:{resources: Resources, onPush: () => void}): Button {
  return new Button({
    view: new AttackButtonView(param.resources),
    onPush: param.onPush
  });
}