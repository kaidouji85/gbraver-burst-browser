// @flow

import type {Resources} from "../../../resource/index";
import {AttackButtonView} from "./attack-button-view";
import {getControllerScale} from "../../../device-scale/controller-scale";
import {Button} from "../button/index";

/** コウゲキボタンを生成する */
export function AttackButton(param: {resources: Resources, onPush:() => void, visible: boolean}): Button {
  const view: AttackButtonView = new AttackButtonView(param.resources, getControllerScale());
  return new Button({...param, view});
}