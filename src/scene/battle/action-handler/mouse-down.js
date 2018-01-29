// @flow

import * as THREE from 'three';
import {BattleSceneView} from "../view";
import type {MouseDown} from "../../action";
import type {BattleSceneState} from "../index";

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

export function mouseDown(view: BattleSceneView, state: BattleSceneState, action: MouseDown) {
  action.event.preventDefault();

  mouse.x = ( action.event.clientX / view.renderer.domElement.clientWidth ) * 2 - 1;
  mouse.y = - ( action.event.clientY / view.renderer.domElement.clientHeight ) * 2 + 1;
  raycaster.setFromCamera( mouse, view.threeDimensionLayer.camera );

  view.threeDimensionLayer.playerSprite.mouseDown(raycaster);
  //console.log('mousedown');
}
