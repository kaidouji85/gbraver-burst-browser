// @flow

import * as THREE from 'three';
import {BattleSceneView} from "../view";
import type {TouchStart} from "../../action";
import type {BattleSceneState} from "../index";
import {getRaycaster} from "../../../touch/raycast";
import {getPointerPosition} from "../../../touch/pointer-position";

/** ゲーム画面内をタッチスタートした際のイベント */
export function touchStart(view: BattleSceneView, state: BattleSceneState, action: TouchStart) {
  console.log('touchStart');
  console.log(action.event);
}
