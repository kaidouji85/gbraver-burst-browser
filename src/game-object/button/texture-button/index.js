// @flow
import * as THREE from "three";
import type {Resources} from "../../../resource";
import {TEXTURE_IDS} from "../../../resource/texture";
import type {TextureResource} from "../../../resource/texture";
import {TextureButton} from "./texture-button";
import {AttackButtonView} from "./view/attack-button-view";

/** コウゲキボタン */
export function AttackButton(resources: Resources): TextureButton {
  const attackButtonView: AttackButtonView = new AttackButtonView(resources);
  return new TextureButton(attackButtonView);
}