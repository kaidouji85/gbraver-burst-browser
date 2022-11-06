// @flow

import * as THREE from "three";

import type { Resources } from "../../../../resource";
import type { ArmdozerAnimation } from "../../mesh/armdozer-animation";
import {
  shinBraverActiveBackStep,
  shinBraverBackStep,
} from "../mesh/back-step";
import {
  shinBraverActiveBurstDown,
  shinBraverBurstDown,
} from "../mesh/burst-down";
import { shinBraverActiveBurstUp, shinBraverBurstUp } from "../mesh/burst-up";
import { shinBraverDown } from "../mesh/down";
import {
  shinBraverActiveFrontStep,
  shinBraverFrontStep,
} from "../mesh/front-step";
import { shinBraverActiveGuard, shinBraverGuard } from "../mesh/guard";
import { shinBraverGutsDown } from "../mesh/guts-down";
import { shinBraverGutsUp } from "../mesh/guts-up";
import {
  shinBraverActiveKnockBack,
  shinBraverKnockBack,
} from "../mesh/knock-back";
import { shinBraverSPAttack } from "../mesh/sp-attack";
import { shinBraverSPCharge } from "../mesh/sp-charge";
import { shinBraverSPToStand } from "../mesh/sp-to-stand";
import { shinBraverActiveStand, shinBraverStand } from "../mesh/stand";
import type { AnimationType } from "../model/animation-type";
import type { ShinBraverModel } from "../model/shin-braver-model";
import type { ShinBraverView } from "./shin-braver-view";

/** プレイヤー側シンブレイバーのビュー */
export class PlayerShinBraverView implements ShinBraverView {
  /** グループ */
  #group: typeof THREE.Group;
  /** スタンド */
  #stand: ArmdozerAnimation;
  /** アクティブスタンド */
  #activeStand: ArmdozerAnimation;
  /** ストレートパンチチャージ */
  #spCharge: ArmdozerAnimation;
  /** ストレートパンチ */
  #spAttack: ArmdozerAnimation;
  /** ストレートパンチ -> スタンド */
  #spToStand: ArmdozerAnimation;
  /** ノックバック */
  #knockBack: ArmdozerAnimation;
  /** アクティブノックバック */
  #activeKnockBack: ArmdozerAnimation;
  /** ガード */
  #guard: ArmdozerAnimation;
  /** アクティブガード */
  #activeGuard: ArmdozerAnimation;
  /** ダウン */
  #down: ArmdozerAnimation;
  /** ガッツアップ */
  #gutsUp: ArmdozerAnimation;
  /** ガッツダウン */
  #gutsDown: ArmdozerAnimation;
  /** バーストアップ */
  #burstUp: ArmdozerAnimation;
  /** アクティブバーストアップ */
  #activeBurstUp: ArmdozerAnimation;
  /** バーストダウン */
  #burstDown: ArmdozerAnimation;
  /** アクティブバーストダウン */
  #activeBurstDown: ArmdozerAnimation;
  /** バックステップ */
  #backStep: ArmdozerAnimation;
  /** アクティブバックステップ */
  #activeBackStep: ArmdozerAnimation;
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
    this.#stand = shinBraverStand(resources);
    this.#activeStand = shinBraverActiveStand(resources);
    this.#spCharge = shinBraverSPCharge(resources);
    this.#spAttack = shinBraverSPAttack(resources);
    this.#spToStand = shinBraverSPToStand(resources);
    this.#knockBack = shinBraverKnockBack(resources);
    this.#activeKnockBack = shinBraverActiveKnockBack(resources);
    this.#guard = shinBraverGuard(resources);
    this.#activeGuard = shinBraverActiveGuard(resources);
    this.#down = shinBraverDown(resources);
    this.#gutsUp = shinBraverGutsUp(resources);
    this.#gutsDown = shinBraverGutsDown(resources);
    this.#burstUp = shinBraverBurstUp(resources);
    this.#activeBurstUp = shinBraverActiveBurstUp(resources);
    this.#burstDown = shinBraverBurstDown(resources);
    this.#activeBurstDown = shinBraverActiveBurstDown(resources);
    this.#backStep = shinBraverBackStep(resources);
    this.#activeBackStep = shinBraverActiveBackStep(resources);
    this.#frontStep = shinBraverFrontStep(resources);
    this.#activeFrontStep = shinBraverActiveFrontStep(resources);

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

    const currentMesh = this.#getMesh(model.animation.type);
    const currentActiveMesh = this.#getActiveMesh(model.animation.type);
    this.#getAllMeshes()
      .filter((v) => v !== currentMesh)
      .filter((v) => v !== currentActiveMesh)
      .forEach((v) => {
        v.opacity(0);
      });

    currentMesh.opacity(1);
    currentMesh.animate(model.animation.frame);

    if (currentActiveMesh) {
      const activeOpacity =
        (0.5 + model.active.strength * 0.1) * model.active.opacity;
      currentActiveMesh.opacity(activeOpacity);
      currentActiveMesh.animate(model.animation.frame);
    }
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
      this.#activeKnockBack,
      this.#guard,
      this.#activeGuard,
      this.#down,
      this.#gutsUp,
      this.#gutsDown,
      this.#burstUp,
      this.#activeBurstUp,
      this.#burstDown,
      this.#activeBurstDown,
      this.#backStep,
      this.#activeBackStep,
      this.#frontStep,
      this.#activeFrontStep,
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
  #getMesh(animationType: AnimationType): ArmdozerAnimation {
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
  #getActiveMesh(animationType: AnimationType): ?ArmdozerAnimation {
    switch (animationType) {
      case "STAND":
        return this.#activeStand;
      case "KNOCK_BACK":
        return this.#activeKnockBack;
      case "GUARD":
        return this.#activeGuard;
      case "BURST_UP":
        return this.#activeBurstUp;
      case "BURST_DOWN":
        return this.#activeBurstDown;
      case "BACK_STEP":
        return this.#activeBackStep;
      case "FRONT_STEP":
        return this.#activeFrontStep;
      default:
        return null;
    }
  }
}
