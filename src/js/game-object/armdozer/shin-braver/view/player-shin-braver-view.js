// @flow

import * as THREE from "three";

import type { Resources } from "../../../../resource";
import type { ArmdozerAnimation } from "../../mesh/armdozer-animation";
import { shinBraverBackStep } from "../mesh/back-step";
import { shinBraverBurstDown } from "../mesh/burst-down";
import { shinBraverBurstUp } from "../mesh/burst-up";
import { shinBraverDown } from "../mesh/down";
import { shinBraverFrontStep } from "../mesh/front-step";
import { shinBraverGuard } from "../mesh/guard";
import { shinBraverGutsDown } from "../mesh/guts-down";
import { shinBraverGutsUp } from "../mesh/guts-up";
import { shinBraverKnockBack } from "../mesh/knock-back";
import { shinBraverSPAttack } from "../mesh/sp-attack";
import { shinBraverSPCharge } from "../mesh/sp-charge";
import { shinBraverSPToStand } from "../mesh/sp-to-stand";
import { shinBraverActiveStand, shinBraverStand } from "../mesh/stand";
import type { AnimationType } from "../model/animation-type";
import type { ShinBraverModel } from "../model/shin-braver-model";
import type { ShinBraverView } from "./shin-braver-view";

/** プレイヤー側シンブレイバーのビュー */
export class PlayerShinBraverView implements ShinBraverView {
  #group: typeof THREE.Group;
  #activeStand: ArmdozerAnimation;
  #stand: ArmdozerAnimation;
  #spCharge: ArmdozerAnimation;
  #spAttack: ArmdozerAnimation;
  #spToStand: ArmdozerAnimation;
  #knockBack: ArmdozerAnimation;
  #guard: ArmdozerAnimation;
  #down: ArmdozerAnimation;
  #gutsUp: ArmdozerAnimation;
  #gutsDown: ArmdozerAnimation;
  #burstUp: ArmdozerAnimation;
  #burstDown: ArmdozerAnimation;
  #backStep: ArmdozerAnimation;
  #frontStep: ArmdozerAnimation;

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this.#group = new THREE.Group();
    this.#stand = shinBraverStand(resources);
    this.#activeStand = shinBraverActiveStand(resources);
    this.#spCharge = shinBraverSPCharge(resources);
    this.#spAttack = shinBraverSPAttack(resources);
    this.#spToStand = shinBraverSPToStand(resources);
    this.#knockBack = shinBraverKnockBack(resources);
    this.#guard = shinBraverGuard(resources);
    this.#down = shinBraverDown(resources);
    this.#gutsUp = shinBraverGutsUp(resources);
    this.#gutsDown = shinBraverGutsDown(resources);
    this.#burstUp = shinBraverBurstUp(resources);
    this.#burstDown = shinBraverBurstDown(resources);
    this.#backStep = shinBraverBackStep(resources);
    this.#frontStep = shinBraverFrontStep(resources);

    this.#getAllMeshes().forEach((v) => {
      this.#group.add(v.getObject3D());
    });
  }

  /** @override */
  destructor(): void {
    this.#getAllMeshes().forEach((v) => {
      v.destructor();
    });
  }

  /** @override */
  engage(model: ShinBraverModel): void {
    this.#refreshPos(model);

    const currentMesh = this.#getMeshAccordingTo(model.animation.type);
    const currentActiveMesh = this.#getActiveMeshAccordingTo(
      model.animation.type
    );
    this.#getAllMeshes()
      .filter((v) => v !== currentMesh)
      .filter((v) => v !== currentActiveMesh)
      .forEach((v) => {
        v.opacity(0);
      });

    currentMesh.opacity(1);
    currentActiveMesh && currentActiveMesh.opacity(0.2 + model.active * 0.1);
    currentMesh.animate(model.animation.frame);
  }

  /** @override */
  addObject3D(object: typeof THREE.Object3D): void {
    this.#group.add(object);
  }

  /** @override */
  lookAt(camera: typeof THREE.Camera): void {
    this.#group.quaternion.copy(camera.quaternion);
  }

  /** @override */
  getObject3D(): typeof THREE.Object3D {
    return this.#group;
  }

  /**
   * 本クラスが持つ全メッシュを返す
   * @return 取得結果
   */
  #getAllMeshes(): ArmdozerAnimation[] {
    return [
      this.#stand,
      this.#activeStand,
      this.#spCharge,
      this.#spAttack,
      this.#spToStand,
      this.#knockBack,
      this.#guard,
      this.#down,
      this.#gutsUp,
      this.#gutsDown,
      this.#burstUp,
      this.#burstDown,
      this.#backStep,
      this.#frontStep,
    ];
  }

  /**
   * 座標を更新する
   * @param model モデル
   */
  #refreshPos(model: ShinBraverModel): void {
    this.#group.position.set(
      model.position.x,
      model.position.y,
      model.position.z
    );
  }

  /**
   * アニメーションタイプに応じたメッシュを取得する
   * @param animationType アニメーションタイプ
   * @return 取得結果
   */
  #getMeshAccordingTo(animationType: AnimationType): ArmdozerAnimation {
    switch (animationType) {
      case "STAND":
        return this.#stand;
      case "SP_CHARGE":
        return this.#spCharge;
      case "SP_ATTACK":
        return this.#spAttack;
      case "SP_TO_STAND":
        return this.#spToStand;
      case "KNOCK_BACK":
        return this.#knockBack;
      case "GUARD":
        return this.#guard;
      case "DOWN":
        return this.#down;
      case "GUTS_UP":
        return this.#gutsUp;
      case "GUTS_DOWN":
        return this.#gutsDown;
      case "BURST_UP":
        return this.#burstUp;
      case "BURST_DOWN":
        return this.#burstDown;
      case "BACK_STEP":
        return this.#backStep;
      case "FRONT_STEP":
        return this.#frontStep;
      default:
        return this.#stand;
    }
  }

  /**
   * アニメーション対応に応じたアクティブメッシュを取得する
   * @param animationType アニメーションタイプ
   * @return 取得結果、対応するアクティブメッシュがない場合はnullを返す
   */
  #getActiveMeshAccordingTo(animationType: AnimationType): ?ArmdozerAnimation {
    switch (animationType) {
      case "STAND":
        return this.#activeStand;
      default:
        return null;
    }
  }
}
