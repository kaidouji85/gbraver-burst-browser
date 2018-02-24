// @flow
import type {Resources} from "../../../resource";
import {Button} from "./button";
import {AttackButtonView} from "./view/attack-button-view";

/** コウゲキボタン */
export function AttackButton(resources: Resources): Button {
  const attackButtonView: AttackButtonView = new AttackButtonView(resources);
  return new Button(attackButtonView);
}