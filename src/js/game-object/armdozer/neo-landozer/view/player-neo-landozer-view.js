// @flow

import * as THREE from "three";

import type { Resources } from "../../../../resource";
import type { ArmdozerAnimation } from "../../mesh/armdozer-animation";
import { neoLandozerBackStep } from "../mesh/back-step";
import { neoLandozerDown } from "../mesh/down";
import { neoLandozerFrontStep } from "../mesh/front-step";
import { neoLandozerGuard } from "../mesh/guard";
import { neoLandozerGutsDown } from "../mesh/guts-down";
import { neoLandozerGutsUp } from "../mesh/guts-up";
import { neoLandozerHMAttack } from "../mesh/hm-attack";
import { neoLandozerHMCharge } from "../mesh/hm-charge";
import { neoLandozerHMToStand } from "../mesh/hm-to-stand";
import { neoLandozerKnockBack } from "../mesh/knock-back";
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
  /** ガード */
  #guard: ArmdozerAnimation;
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
  /** ガッツダウン */
  #gutsDown: ArmdozerAnimation;
  /** バックステップ */
  #backStep: ArmdozerAnimation;
  /** フロントステップ */
  #frontStep: ArmdozerAnimation;

  constructor(resources: Resources) {
    this.#group = new THREE.Group();
    this.#stand = neoLandozerStand(resources);
    this.#activeStand = neoLandozerActiveStand(resources);
    this.#knockBack = neoLandozerKnockBack(resources);
    this.#guard = neoLandozerGuard(resources);
    this.#hmCharge = neoLandozerHMCharge(resources);
    this.#hmAttack = neoLandozerHMAttack(resources);
    this.#hmToStand = neoLandozerHMToStand(resources);
    this.#down = neoLandozerDown(resources);
    this.#gutsUp = neoLandozerGutsUp(resources);
    this.#gutsDown = neoLandozerGutsDown(resources);
    this.#backStep = neoLandozerBackStep(resources);
    this.#frontStep = neoLandozerFrontStep(resources);

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
      this.#guard,
      this.#hmCharge,
      this.#hmAttack,
      this.#hmToStand,
      this.#down,
      this.#gutsUp,
      this.#gutsDown,
      this.#backStep,
      this.#frontStep,
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
   * @param type アニメーションタイプ
   * @return 取得結果、対応するものがない場合はnullを返す
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
