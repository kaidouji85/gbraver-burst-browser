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
  /** ダウン */
  #down: ArmdozerAnimation;
  /** ガッツアップ */
  #gutsUp: ArmdozerAnimation;
  /** ガッツダウン */
  #gutsDown: ArmdozerAnimation;
  /** ガッツ->立ち */
  #gutsToStand: ArmdozerAnimation;
  /** ガード */
  #guard: ArmdozerAnimation;
  /** バックステップ */
  #backStep: ArmdozerAnimation;
  /** フロントステップ */
  #frontStep: ArmdozerAnimation;

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
        (0.2 + model.active.strength * 0.05) * model.active.opacity;
      currentActiveMesh.opacity(activeOpacity);
      currentActiveMesh.animate(model.animation.frame);
    }

    const disActiveMeshes = this.#getAllMeshes()
      .filter((v) => v !== currentMesh)
      .filter(v => v !== currentActiveMesh)
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
   * @param type アニメーションタイプ
   * @return 取得結果、対応するメッシュがない場合はnullを返す
   */
  #getActiveMesh(type: AnimationType): ?ArmdozerAnimation {
    switch (type) {
      case "STAND":
        return this.#activeStand;
      default:
        return null;
    }
  }
}
