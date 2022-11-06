// @flow

import * as THREE from "three";

import type { Resources } from "../../../../resource";
import type { ArmdozerAnimation } from "../../mesh/armdozer-animation";
import { lightningDozerBackStep } from "../mesh/back-step";
import { lightningDozerDown } from "../mesh/down";
import {
  lightningDozerActiveFrontStep,
  lightningDozerFrontStep,
} from "../mesh/front-step";
import { lightningDozerActiveGuard, lightningDozerGuard } from "../mesh/guard";
import {
  lightningDozerActiveGutsToStand,
  lightningDozerGutsToStand,
} from "../mesh/gut-to-stand";
import {
  lightningDozerActiveGutsDown,
  lightningDozerGutsDown,
} from "../mesh/guts-down";
import {
  lightningDozerActiveGutsUp,
  lightningDozerGutsUp,
} from "../mesh/guts-up";
import { lightningDozerHmAttack } from "../mesh/hm-attack";
import { lightningDozerHmCharge } from "../mesh/hm-charge";
import { lightningDozerHmToStand } from "../mesh/hm-to-stand";
import {
  lightningDozerActiveKnockBack,
  lightningDozerKnockBack,
} from "../mesh/knock-back";
import { lightningDozerActiveStand, lightningDozerStand } from "../mesh/stand";
import type {
  AnimationType,
  LightningDozerModel,
} from "../model/lightning-dozer-model";
import type { LightningDozerView } from "./lightning-dozer-view";

/** プレイヤー側のライトニングドーザビュー */
export class PlayerLightingDozerView implements LightningDozerView {
  /** グループ */
  #group: typeof THREE.Group;
  /** 立ち */
  #stand: ArmdozerAnimation;
  /** アクティブ立ち */
  #activeStand: ArmdozerAnimation;
  /** アームハンマーチャージ */
  #hmCharge: ArmdozerAnimation;
  /** アームハンマー */
  #hmAttack: ArmdozerAnimation;
  /** アームハンマー->立ち */
  #hmToStand: ArmdozerAnimation;
  /** ノックバック */
  #knockBack: ArmdozerAnimation;
  /** アクティブノックバック */
  #activeKnockBack: ArmdozerAnimation;
  /** ダウン */
  #down: ArmdozerAnimation;
  /** ガッツアップ */
  #gutsUp: ArmdozerAnimation;
  /** アクティブガッツアップ */
  #activeGutsUp: ArmdozerAnimation;
  /** ガッツダウン */
  #gutsDown: ArmdozerAnimation;
  /** アクティブガッツダウン */
  #activeGutsDown: ArmdozerAnimation;
  /** ガッツ->立ち */
  #gutsToStand: ArmdozerAnimation;
  /** アクティブガッツ->立ち */
  #activeGutsToStand: ArmdozerAnimation;
  /** ガード */
  #guard: ArmdozerAnimation;
  /** アクティブガード */
  #activeGuard: ArmdozerAnimation;
  /** バックステップ */
  #backStep: ArmdozerAnimation;
  /** フロントステップ */
  #frontStep: ArmdozerAnimation;
  /** アクティブフロントステップ */
  #activeFrontStep: ArmdozerAnimation;

  /**
   * コンストラクタ
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    this.#group = new THREE.Group();
    this.#stand = lightningDozerStand(resources);
    this.#activeStand = lightningDozerActiveStand(resources);
    this.#hmCharge = lightningDozerHmCharge(resources);
    this.#hmAttack = lightningDozerHmAttack(resources);
    this.#hmToStand = lightningDozerHmToStand(resources);
    this.#knockBack = lightningDozerKnockBack(resources);
    this.#activeKnockBack = lightningDozerActiveKnockBack(resources);
    this.#down = lightningDozerDown(resources);
    this.#gutsUp = lightningDozerGutsUp(resources);
    this.#activeGutsUp = lightningDozerActiveGutsUp(resources);
    this.#gutsDown = lightningDozerGutsDown(resources);
    this.#activeGutsDown = lightningDozerActiveGutsDown(resources);
    this.#gutsToStand = lightningDozerGutsToStand(resources);
    this.#activeGutsToStand = lightningDozerActiveGutsToStand(resources);
    this.#guard = lightningDozerGuard(resources);
    this.#activeGuard = lightningDozerActiveGuard(resources);
    this.#backStep = lightningDozerBackStep(resources);
    this.#frontStep = lightningDozerFrontStep(resources);
    this.#activeFrontStep = lightningDozerActiveFrontStep(resources);
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
  engage(model: LightningDozerModel): void {
    this.#group.position.set(
      model.position.x,
      model.position.y,
      model.position.z
    );

    const currentMesh = this.#getMesh(model.animation.type);
    currentMesh.opacity(1);
    currentMesh.animate(model.animation.frame);

    const currentActiveMesh = this.#getActiveMesh(model.animation.type);
    if (currentActiveMesh) {
      const activeOpacity =
        (0.4 + model.active.strength * 0.1) * model.active.opacity;
      currentActiveMesh.opacity(activeOpacity);
      currentActiveMesh.animate(model.animation.frame);
    }

    const disActiveMeshes = this.#getAllMeshes()
      .filter((v) => v !== currentMesh)
      .filter((v) => v !== currentActiveMesh);
    disActiveMeshes.forEach((v) => {
      v.opacity(0);
    });
  }

  /** @override */
  addObject3D(object: typeof THREE.Object3D): void {
    this.#group.add(object);
  }

  /** @override */
  getObject3D(): typeof THREE.Object3D {
    return this.#group;
  }

  /** @override */
  lookAt(camera: typeof THREE.Camera): void {
    this.#group.quaternion.copy(camera.quaternion);
  }

  /**
   * 本ビューの全メッシュを取得する
   * @return 本ビューの全メッシュ
   */
  #getAllMeshes(): ArmdozerAnimation[] {
    return [
      this.#stand,
      this.#activeStand,
      this.#hmCharge,
      this.#hmAttack,
      this.#hmToStand,
      this.#knockBack,
      this.#activeKnockBack,
      this.#down,
      this.#gutsUp,
      this.#activeGutsUp,
      this.#gutsDown,
      this.#activeGutsDown,
      this.#gutsToStand,
      this.#activeGutsToStand,
      this.#guard,
      this.#activeGuard,
      this.#backStep,
      this.#frontStep,
      this.#activeFrontStep,
    ];
  }

  /**
   * アニメ種別に対応するメッシュを返す
   * @param animationType アニメ種別
   * @return アニメ種別に対応するメッシュ
   */
  #getMesh(animationType: AnimationType): ArmdozerAnimation {
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

  /**
   * アニメーションタイプに応じたアクティブメッシュを返す
   * @param animationType アニメーションタイプ
   * @return 取得結果、対応するメッシュがない場合はnullを返す
   */
  #getActiveMesh(animationType: AnimationType): ?ArmdozerAnimation {
    switch (animationType) {
      case "KNOCK_BACK":
        return this.#activeKnockBack;
      case "GUTS_UP":
        return this.#activeGutsUp;
      case "GUTS_DOWN":
        return this.#activeGutsDown;
      case "GUTS_TO_STAND":
        return this.#activeGutsToStand;
      case "GUARD":
        return this.#activeGuard;
      case "FRONT_STEP":
        return this.#activeFrontStep;
      case "STAND":
        return this.#activeStand;
      default:
        return null;
    }
  }
}
