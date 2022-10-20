// @flow

import * as THREE from "three";
import type { Resources } from "../../../../resource";
import type { ArmdozerAnimation } from "../../mesh/armdozer-animation";
import { lightningDozerBackStep } from "../mesh/back-step";
import { lightningDozerDown } from "../mesh/down";
import { lightningDozerFrontStep } from "../mesh/front-step";
import { lightningDozerGuard } from "../mesh/guard";
import { lightningDozerGutsToStand } from "../mesh/gut-to-stand";
import { lightningDozerGutsDown } from "../mesh/guts-down";
import { lightningDozerGutsUp } from "../mesh/guts-up";
import { lightningDozerHmAttack } from "../mesh/hm-attack";
import { lightningDozerHmCharge } from "../mesh/hm-charge";
import { lightningDozerHmToStand } from "../mesh/hm-to-stand";
import { lightningDozerKnockBack } from "../mesh/knock-back";
import { lightningDozerStand } from "../mesh/stand";
import type {
  AnimationType,
  LightningDozerModel,
} from "../model/lightning-dozer-model";
import type { LightningDozerView } from "./lightning-dozer-view";

/**
 * プレイヤー側のライトニングドーザビュー
 */
export class PlayerLightingDozerView implements LightningDozerView {
  #group: typeof THREE.Group;
  #stand: ArmdozerAnimation;
  #hmCharge: ArmdozerAnimation;
  #hmAttack: ArmdozerAnimation;
  #hmToStand: ArmdozerAnimation;
  #knockBack: ArmdozerAnimation;
  #down: ArmdozerAnimation;
  #gutsUp: ArmdozerAnimation;
  #gutsDown: ArmdozerAnimation;
  #gutsToStand: ArmdozerAnimation;
  #guard: ArmdozerAnimation;
  #backStep: ArmdozerAnimation;
  #frontStep: ArmdozerAnimation;

  constructor(resources: Resources) {
    this.#group = new THREE.Group();

    this.#stand = lightningDozerStand(resources);
    this.#hmCharge = lightningDozerHmCharge(resources);
    this.#hmAttack = lightningDozerHmAttack(resources);
    this.#hmToStand = lightningDozerHmToStand(resources);
    this.#knockBack = lightningDozerKnockBack(resources);
    this.#down = lightningDozerDown(resources);
    this.#gutsUp = lightningDozerGutsUp(resources);
    this.#gutsDown = lightningDozerGutsDown(resources);
    this.#gutsToStand = lightningDozerGutsToStand(resources);
    this.#guard = lightningDozerGuard(resources);
    this.#backStep = lightningDozerBackStep(resources);
    this.#frontStep = lightningDozerFrontStep(resources);

    this.#getAllMeshes().forEach((v) => {
      this.#group.add(v.getObject3D());
    });
  }

  /** デストラクタ相当の処理 */
  destructor(): void {
    this.#getAllMeshes().forEach((v) => {
      v.destructor();
    });
  }

  /**
   * モデルをビューに反映させる
   *
   * @param model モデル
   */
  engage(model: LightningDozerModel): void {
    this.#group.position.set(
      model.position.x,
      model.position.y,
      model.position.z
    );

    const activeMesh = this.#getActiveMesh(model.animation.type);
    activeMesh.visible(true);
    activeMesh.animate(model.animation.frame);

    const disActiveMeshes = this.#getAllMeshes().filter(
      (v) => v !== activeMesh
    );
    disActiveMeshes.forEach((v) => {
      v.visible(false);
    });
  }

  /**
   * スプライト配下のオブジェクトを追加する
   *
   * @param object オブジェクト
   */
  addObject3D(object: typeof THREE.Object3D): void {
    this.#group.add(object);
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): typeof THREE.Object3D {
    return this.#group;
  }

  /**
   * カメラの真正面を向く
   *
   * @param camera カメラ
   */
  lookAt(camera: typeof THREE.Camera): void {
    this.#group.quaternion.copy(camera.quaternion);
  }

  /**
   * 本ビューの全メッシュを取得する
   *
   * @return 本ビューの全メッシュ
   */
  #getAllMeshes(): ArmdozerAnimation[] {
    return [
      this.#stand,
      this.#hmCharge,
      this.#hmAttack,
      this.#hmToStand,
      this.#knockBack,
      this.#down,
      this.#gutsUp,
      this.#gutsDown,
      this.#gutsToStand,
      this.#guard,
      this.#backStep,
      this.#frontStep,
    ];
  }

  /**
   * アニメ種別に対応するメッシュを返す
   *
   * @param animationType アニメ種別
   * @return アニメ種別に対応するメッシュ
   */
  #getActiveMesh(animationType: AnimationType): ArmdozerAnimation {
    switch (animationType) {
      case "HM_CHARGE":
        return this.#hmCharge;
      case "HM_ATTACK":
        return this.#hmAttack;
      case "HM_TO_STAND":
        return this.#hmToStand;
      case "KNOCK_BACK":
        return this.#knockBack;
      case "DOWN":
        return this.#down;
      case "GUTS_UP":
        return this.#gutsUp;
      case "GUTS_DOWN":
        return this.#gutsDown;
      case "GUTS_TO_STAND":
        return this.#gutsToStand;
      case "GUARD":
        return this.#guard;
      case "BACK_STEP":
        return this.#backStep;
      case "FRONT_STEP":
        return this.#frontStep;
      case "STAND":
      default:
        return this.#stand;
    }
  }
}
