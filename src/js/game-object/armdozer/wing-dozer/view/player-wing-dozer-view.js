// @flow

import * as THREE from "three";
import { Group } from "three";

import type { Resources } from "../../../../resource";
import type { ArmdozerAnimation } from "../../mesh/armdozer-animation";
import { wingDozerBackStep } from "../mesh/back-step";
import { wingDozerActiveDashDown, wingDozerDashDown } from "../mesh/dash-down";
import {
  wingDozerActiveDashToStand,
  wingDozerDashToStand,
} from "../mesh/dash-to-stand";
import { wingDozerActiveDashUp, wingDozerDashUp } from "../mesh/dash-up";
import { wingDozerDown } from "../mesh/down";
import {
  wingDozerActiveFrontStep,
  wingDozerFrontStep,
} from "../mesh/front-step";
import { wingDozerActiveGuard, wingDozerGuard } from "../mesh/guard";
import { wingDozerKnockBack } from "../mesh/knock-back";
import { wingDozerActiveStand, wingDozerStand } from "../mesh/stand";
import { wingDozerUpperAttack } from "../mesh/upper-attack";
import { wingDozerUpperCharge } from "../mesh/upper-charge";
import { wingDozerUpperToStand } from "../mesh/upper-to-stand";
import type { AnimationType, WingDozerModel } from "../model/wing-dozer-model";
import type { WingDozerView } from "./wing-dozer-view";

/** プレイヤー側 ウィングドーザ ビュー */
export class PlayerWingDozerView implements WingDozerView {
  /** 立ち */
  #stand: ArmdozerAnimation;
  /** アクティブ立ち */
  #activeStand: ArmdozerAnimation;
  /** アッパーチャージ */
  #upperCharge: ArmdozerAnimation;
  /** アッパー */
  #upperAttack: ArmdozerAnimation;
  /** アッパー->立ち */
  #upperToStand: ArmdozerAnimation;
  /** ダッシュアップ */
  #dashUp: ArmdozerAnimation;
  /** アクティブダッシュアップ */
  #activeDashUp: ArmdozerAnimation;
  /** ダッシュダウン */
  #dashDown: ArmdozerAnimation;
  /** アクティブダッシュダウン */
  #activeDashDown: ArmdozerAnimation;
  /** ダッシュ->立ち */
  #dashToStand: ArmdozerAnimation;
  /** アクティブダッシュ->立ち */
  #activeDashToStand: ArmdozerAnimation;
  /** ノックバック */
  #knockBack: ArmdozerAnimation;
  /** ダウン */
  #down: ArmdozerAnimation;
  /** バックステップ */
  #backStep: ArmdozerAnimation;
  /** フロントステップ */
  #frontStep: ArmdozerAnimation;
  /** アクティブフロントステップ */
  #activeFrontStep: ArmdozerAnimation;
  /** ガード */
  #guard: ArmdozerAnimation;
  /** アクティブガード */
  #activeGuard: ArmdozerAnimation;
  /** グループ */
  #group: typeof THREE.Group;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources): void {
    this.#stand = wingDozerStand(resources);
    this.#activeStand = wingDozerActiveStand(resources);
    this.#upperCharge = wingDozerUpperCharge(resources);
    this.#upperAttack = wingDozerUpperAttack(resources);
    this.#upperToStand = wingDozerUpperToStand(resources);
    this.#dashUp = wingDozerDashUp(resources);
    this.#activeDashUp = wingDozerActiveDashUp(resources);
    this.#dashDown = wingDozerDashDown(resources);
    this.#activeDashDown = wingDozerActiveDashDown(resources);
    this.#dashToStand = wingDozerDashToStand(resources);
    this.#activeDashToStand = wingDozerActiveDashToStand(resources);
    this.#knockBack = wingDozerKnockBack(resources);
    this.#down = wingDozerDown(resources);
    this.#backStep = wingDozerBackStep(resources);
    this.#frontStep = wingDozerFrontStep(resources);
    this.#activeFrontStep = wingDozerActiveFrontStep(resources);
    this.#guard = wingDozerGuard(resources);
    this.#activeGuard = wingDozerActiveGuard(resources);
    this.#group = new Group();
    this.#getAllMeshes().forEach((mesh) => {
      this.#group.add(mesh.getObject3D());
    });
  }

  /** @override */
  destructor(): void {
    this.#getAllMeshes().forEach((mesh) => {
      mesh.destructor();
    });
  }

  /** @override */
  getObject3D(): typeof THREE.Object3D {
    return this.#group;
  }

  /** @override */
  engage(model: WingDozerModel): void {
    this.#group.position.x = model.position.x;
    this.#group.position.y = model.position.y;
    this.#group.position.z = model.position.z;

    this.#group.scale.x = 1;
    this.#group.scale.y = 1;
    this.#group.scale.z = 1;

    const currentMesh = this.#getMesh(model.animation.type);
    currentMesh.animate(model.animation.frame);
    currentMesh.opacity(1);

    const currentActiveMesh = this.#getActiveMesh(model.animation.type);
    if (currentActiveMesh) {
      const activeOpacity =
        (0.2 + model.active.strength * 0.05) * model.active.opacity;
      currentActiveMesh.opacity(activeOpacity);
      currentActiveMesh.animate(model.animation.frame);
    }

    const disActiveMesh = this.#getAllMeshes()
      .filter((v) => v !== currentMesh)
      .filter((v) => v !== currentActiveMesh);
    disActiveMesh.forEach((v) => v.opacity(0));
  }

  /** @override */
  lookAt(camera: typeof THREE.Camera): void {
    this.#group.quaternion.copy(camera.quaternion);
  }

  /** @override */
  addObject3D(object: typeof THREE.Object3D): void {
    this.#group.add(object);
  }

  /**
   * 本ビューに含まれる全メッシュを返す
   * @return 全メッシュ
   */
  #getAllMeshes(): ArmdozerAnimation[] {
    return [
      this.#stand,
      this.#activeStand,
      this.#upperCharge,
      this.#upperAttack,
      this.#upperToStand,
      this.#dashUp,
      this.#activeDashUp,
      this.#dashDown,
      this.#activeDashDown,
      this.#dashToStand,
      this.#activeDashToStand,
      this.#knockBack,
      this.#down,
      this.#backStep,
      this.#frontStep,
      this.#activeFrontStep,
      this.#guard,
      this.#activeGuard,
    ];
  }

  /**
   * アニメーションタイプに応じたメッシュを返す
   * @param type アニメーションタイプ
   * @return メッシュ
   */
  #getMesh(type: AnimationType): ArmdozerAnimation {
    switch (type) {
      case "STAND":
        return this.#stand;
      case "UPPER_CHARGE":
        return this.#upperCharge;
      case "UPPER_ATTACK":
        return this.#upperAttack;
      case "UPPER_TO_STAND":
        return this.#upperToStand;
      case "DASH_UP":
        return this.#dashUp;
      case "DASH_DOWN":
        return this.#dashDown;
      case "DASH_TO_STAND":
        return this.#dashToStand;
      case "KNOCK_BACK":
        return this.#knockBack;
      case "DOWN":
        return this.#down;
      case "BACK_STEP":
        return this.#backStep;
      case "FRONT_STEP":
        return this.#frontStep;
      case "GUARD":
        return this.#guard;
      default:
        return this.#stand;
    }
  }

  /**
   * アニメーションタイプに応じたアクティブメッシュを返す
   * @param animationType アニメーションタイプ
   * @return 取得結果、対応するものがない場合はnullを返す
   */
  #getActiveMesh(animationType: AnimationType): ?ArmdozerAnimation {
    switch (animationType) {
      case "STAND":
        return this.#activeStand;
      case "DASH_UP":
        return this.#activeDashUp;
      case "DASH_DOWN":
        return this.#activeDashDown;
      case "DASH_TO_STAND":
        return this.#activeDashToStand;
      case "FRONT_STEP":
        return this.#activeFrontStep;
      case "GUARD":
        return this.#activeGuard;
      default:
        return null;
    }
  }
}
