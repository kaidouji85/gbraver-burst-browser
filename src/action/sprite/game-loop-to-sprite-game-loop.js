// @flow

import type {SpriteGameLoop} from "./sprite-game-loop";
import * as THREE from 'three';
import type {GameLoop} from "../game-loop/game-loop";
import {Observable} from "rxjs";
import {filter, map} from 'rxjs/operators';

/** ゲームループをスプライトゲームループに変換する */
export function toSpriteGameLoop(origin: GameLoop, camera: THREE.Camera): SpriteGameLoop {
  return {
    type: 'SpriteGameLoop',
    time: origin.time,
    camera: camera
  };
}

const DUMMY_ACTION = {
  type: 'SpriteGameLoop',
  time: 0,
  camera: new THREE.PerspectiveCamera()
};

/** ゲームループストリームをスプライトゲームループストリームに変換する */
export function toSpriteGameLoopObservable(origin: Observable<GameLoop>, camera: THREE.Camera): Observable<SpriteGameLoop> {
  return origin.pipe(
    map(v => {
      switch (v.type) {
        case 'GameLoop':
          return {isValid: true, action: toSpriteGameLoop(v, camera)};
        default:
          return {isValid: true, action: DUMMY_ACTION};
      }
    }),
    filter(v => v.isValid),
    map(v => v.action)
  )
}