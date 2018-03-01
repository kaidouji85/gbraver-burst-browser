// @flow

import * as THREE from 'three';
import {BattleSceneView} from "../view";
import type {TouchEnd} from "../../action";
import type {BattleSceneState} from "../index";
import {getRaycaster} from "../../../touch/raycaster";
import {getPointerPosition} from "../../../touch/pointer-position";

/** ゲーム画面内をタッチエンドした際のイベント */
export function touchEnd(view: BattleSceneView, state: BattleSceneState, action: TouchEnd) {
  console.log('touchEnd');
  console.log(action.event);
}
