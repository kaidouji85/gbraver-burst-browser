// @flow
import * as THREE from 'three';
import type {Resources} from '../../../../resource/resource-manager';
import type {BattleSceneState} from "../../index";
import {createPlayerHpGauge} from './player-hp-gauge';
import {HpGauge} from "../../../../game-object/gauge/hp-gauge/base";

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
  playerHpGauge: HpGauge;

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
    this.playerHpGauge.getThreeJsObjectList().forEach(v => this.scene.add(v));
  }
}