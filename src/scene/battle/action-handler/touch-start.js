// @flow

import * as THREE from 'three';
import {BattleSceneView} from "../view";
import type {TouchStart} from "../../action";
import type {BattleSceneState} from "../index";
import {getMouseVector, getRaycaster} from "../../../touch/raycast";

/** ゲーム画面内をタッチスタートした際のイベント */
export function touchStart(view: BattleSceneView, state: BattleSceneState, action: TouchStart) {
  console.log('touchStart');
  console.log(action.event);
}
