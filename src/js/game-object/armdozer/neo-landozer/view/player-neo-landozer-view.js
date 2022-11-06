// @flow

import * as THREE from "three";

import type { Resources } from "../../../../resource";
import type { ArmdozerAnimation } from "../../mesh/armdozer-animation";
import { neoLandozerBackStep } from "../mesh/back-step";
import { neoLandozerDown } from "../mesh/down";
import {
  neoLandozerActiveFrontStep,
  neoLandozerFrontStep,
} from "../mesh/front-step";
import { neoLandozerActiveGuard, neoLandozerGuard } from "../mesh/guard";
import {
  neoLandozerActiveGutsDown,
  neoLandozerGutsDown,
} from "../mesh/guts-down";
import { neoLandozerActiveGutsUp, neoLandozerGutsUp } from "../mesh/guts-up";
import { neoLandozerHMAttack } from "../mesh/hm-attack";
import { neoLandozerHMCharge } from "../mesh/hm-charge";
import { neoLandozerHMToStand } from "../mesh/hm-to-stand";
import {
  neoLandozerActiveKnockBack,
  neoLandozerKnockBack,
} from "../mesh/knock-back";
import { neoLandozerActiveStand, neoLandozerStand } from "../mesh/stand";
import type { AnimationType } from "../model/animation-type";
import type { NeoLandozerModel } from "../model/neo-landozer-model";
import type { NeoLandozerView } from "./neo-landozer-view";

/** プレイヤー側ネオランドーザのビュー */
export class PlayerNeoLandozerView implements NeoLandozerView {
  /** グループ */
  #group: typeof THREE.Group;
  /** 立ち */
  #stand: ArmdozerAnimation;
  /** アクティブ立ち */
  #activeStand: ArmdozerAnimation;
  /** ノックバック */
  #knockBack: ArmdozerAnimation;
  /** アクティブノックバック */
  #activeKnockBack: ArmdozerAnimation;
  /** ガード */
  #guard: ArmdozerAnimation;
  /** アクティブガード */
  #activeGuard: ArmdozerAnimation;
  /** アームハンマーチャージ */
  #hmCharge: ArmdozerAnimation;
  /** アームハンマー */
  #hmAttack: ArmdozerAnimation;
  /** アームハンマー->立ち */
  #hmToStand: ArmdozerAnimation;
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
  /** バックステップ */
  #backStep: ArmdozerAnimation;
  /** フロントステップ */
  #frontStep: ArmdozerAnimation;
  /** アクティブフロントステップ */
  #activeFrontStep: ArmdozerAnimation;

  constructor(resources: Resources) {
    this.#group = new THREE.Group();
    this.#stand = neoLandozerStand(resources);
    this.#activeStand = neoLandozerActiveStand(resources);
    this.#knockBack = neoLandozerKnockBack(resources);
    this.#activeKnockBack = neoLandozerActiveKnockBack(resources);
    this.#guard = neoLandozerGuard(resources);
    this.#activeGuard = neoLandozerActiveGuard(resources);
    this.#hmCharge = neoLandozerHMCharge(resources);
    this.#hmAttack = neoLandozerHMAttack(resources);
    this.#hmToStand = neoLandozerHMToStand(resources);
    this.#down = neoLandozerDown(resources);
    this.#gutsUp = neoLandozerGutsUp(resources);
    this.#activeGutsUp = neoLandozerActiveGutsUp(resources);
    this.#gutsDown = neoLandozerGutsDown(resources);
    this.#activeGutsDown = neoLandozerActiveGutsDown(resources);
    this.#backStep = neoLandozerBackStep(resources);
    this.#frontStep = neoLandozerFrontStep(resources);
    this.#activeFrontStep = neoLandozerActiveFrontStep(resources);

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
  engage(model: NeoLandozerModel): void {
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
        (0.2 + model.active.strength * 0.05) * model.active.opacity;
      currentActiveMesh.opacity(activeOpacity);
      currentActiveMesh.animate(model.animation.frame);
    }
    this.#refreshPos(model);
  }

  /** @override */
  lookAt(camera: typeof THREE.Camera): void {
    this.#group.quaternion.copy(camera.quaternion);
  }

  /** @override */
  getObject3D(): typeof THREE.Object3D {
    return this.#group;
  }

  /** @override */
  addObject3D(object: typeof THREE.Object3D): void {
    this.#group.add(object);
  }

  /**
   * 本クラスが保持する全メッシュを返す
   * @return 取得結果
   */
  #getAllMeshes(): ArmdozerAnimation[] {
    return [
      this.#stand,
      this.#activeStand,
      this.#knockBack,
      this.#activeKnockBack,
      this.#guard,
      this.#activeGuard,
      this.#hmCharge,
      this.#hmAttack,
      this.#hmToStand,
      this.#down,
      this.#gutsUp,
      this.#activeGutsUp,
      this.#gutsDown,
      this.#activeGutsDown,
      this.#backStep,
      this.#frontStep,
      this.#activeFrontStep,
    ];
  }

  /**
   * 座標を更新する
   * @param model モデル
   */
  #refreshPos(model: NeoLandozerModel): void {
    this.#group.position.set(
      model.position.x,
      model.position.y,
      model.position.z
    );
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
      case "KNOCK_BACK":
        return this.#knockBack;
      case "GUARD":
        return this.#guard;
      case "HM_CHARGE":
        return this.#hmCharge;
      case "HM_ATTACK":
        return this.#hmAttack;
      case "HM_TO_STAND":
        return this.#hmToStand;
      case "DOWN":
        return this.#down;
      case "GUTS_UP":
        return this.#gutsUp;
      case "GUTS_DOWN":
        return this.#gutsDown;
      case "BACK_STEP":
        return this.#backStep;
      case "FRONT_STEP":
        return this.#frontStep;
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
      case "KNOCK_BACK":
        return this.#activeKnockBack;
      case "GUARD":
        return this.#activeGuard;
      case "GUTS_UP":
        return this.#activeGutsUp;
      case "GUTS_DOWN":
        return this.#activeGutsDown;
      case "FRONT_STEP":
        return this.#activeFrontStep;
      default:
        return null;
    }
  }
}
