// @flow
import type {Resources} from '../../../resource/index';
import * as THREE from 'three';
import {ThreeDimensionLayer} from './three-dimension-layer';
import {HudLayer} from './hud-layer/index';
import type {Player, PlayerId} from "gbraver-burst-core/lib/player/player";
import type {GameLoop} from "../../../action/game-loop/game-loop";
import {Observable, Observer, Subject} from "rxjs";
import type {DOMEvent} from "../../../action/dom-event";
import type {BattleSceneAction} from "../../../action/battle-scene";
import {createLayerGameLoop} from "./layer-game-loop";

/** コンストラクタのパラメータ */
type Param = {
  resources: Resources,
  battleActionNotifier: Observer<BattleSceneAction>,
  gameLoopListener: Observable<GameLoop>,
  domEventListener: Observable<DOMEvent>,
  renderer: THREE.WebGLRenderer,
  playerId: PlayerId,
  players: Player[]
};

/**
 * 戦闘画面のビュー
 */
export class BattleSceneView {
  /** レンダラ */
  renderer: THREE.WebGLRenderer;
  /** 3D空間レイヤー */
  threeDimensionLayer: ThreeDimensionLayer;
  /** Head Up Display(HUD)レイヤー */
  hudLayer: HudLayer;

  constructor(param: Param) {
    const {hud, threeDimension} = createLayerGameLoop(param.gameLoopListener);
    this.renderer = param.renderer;

    this.threeDimensionLayer = new ThreeDimensionLayer({
      renderer: param.renderer,
      gameLoopListener: threeDimension,
      resources: param.resources,
      playerId: param.playerId,
      players: param.players
    });
    this.hudLayer = new HudLayer({

      resources: param.resources,
      renderer: param.renderer,
      playerId: param.playerId,
      players: param.players,
      battleActionNotifier: param.battleActionNotifier,
      gameLoopListener: hud,
      domEventListener: param.domEventListener,
    });
  }
}