// @flow

import type {Resources} from "../../../resource/index";
import {OkButtonView} from "./ok-button-view";
import {getControllerScale} from "../../../device-scale/controller-scale";
import {Button} from "../button/index";

/** ケッテイボタンを生成する */
export function OkButton(param: {resources: Resources, onPush:() => void, visible: boolean}): Button {
  const view: OkButtonView = new OkButtonView(param.resources, getControllerScale());
  return new Button({...param, view});
}