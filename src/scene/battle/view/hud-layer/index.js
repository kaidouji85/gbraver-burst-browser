// @flow
import * as THREE from 'three';
import type {Resources} from '../../../../resource/resource-manager';
import type {BattleSceneState} from "../../state";
import {PlayerHpGaugeContext} from "../../../../game-object/gauge/player-hp-gauge";
import {createPlayerHpGauge} from './player-hp-gauge';

/**
 * HUDレイヤーで使用するオブジェクトを全て集めたもの
 *
 * @author y.takeuchi
 */
export class HudLayer {
  /** 本レイヤーのベースとなるシーン */
  scene: THREE.Scene;
  /** 本レイヤーのカメラ */
  camera: THREE.OrthographicCamera;
  /** プレイヤーHPゲージ */
  playerHpGauge: PlayerHpGaugeContext;

  constructor(props: {resources: Resources, state: BattleSceneState}) {
    this.scene = new THREE.Scene();

    this.camera = new THREE.OrthographicCamera(
      -window.innerWidth/2,
      window.innerWidth/2,
      window.innerHeight/2,
      -window.innerHeight/2,
      0,
      30
    );

    this.playerHpGauge = createPlayerHpGauge(props.resources, props.state);
    this.playerHpGauge._target.getThreeJsObjectList().forEach(v => this.scene.add(v));
  }
}