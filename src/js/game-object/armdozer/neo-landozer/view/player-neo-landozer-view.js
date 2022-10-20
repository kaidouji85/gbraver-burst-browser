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
import { neoLandozerStand } from "../mesh/stand";
import type { AnimationType } from "../model/animation-type";
import type { NeoLandozerModel } from "../model/neo-landozer-model";
import type { NeoLandozerView } from "./neo-landozer-view";

/** プレイヤー側ネオランドーザのビュー */
export class PlayerNeoLandozerView implements NeoLandozerView {
  #group: typeof THREE.Group;
  #stand: ArmdozerAnimation;
  #knockBack: ArmdozerAnimation;
  #guard: ArmdozerAnimation;
  #hmCharge: ArmdozerAnimation;
  #hmAttack: ArmdozerAnimation;
  #hmToStand: ArmdozerAnimation;
  #down: ArmdozerAnimation;
  #gutsUp: ArmdozerAnimation;
  #gutsDown: ArmdozerAnimation;
  #backStep: ArmdozerAnimation;
  #frontStep: ArmdozerAnimation;

  constructor(resources: Resources) {
    this.#group = new THREE.Group();
    this.#stand = neoLandozerStand(resources);
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

  /** デストラクタ */
  destructor(): void {
    this.#getAllMeshes().forEach((v) => {
      v.destructor();
    });
  }

  /** モデルをビューに反映させる */
  engage(model: NeoLandozerModel): void {
    const activeMesh = this.#getActiveMesh(model.animation.type);
    this.#getAllMeshes()
      .filter((v) => v !== activeMesh)
      .forEach((v) => {
        v.visible(false);
      });
    activeMesh.visible(true);
    activeMesh.animate(model.animation.frame);
    this.#refreshPos(model);
  }

  /** カメラの真正面を向く */
  lookAt(camera: typeof THREE.Camera): void {
    this.#group.quaternion.copy(camera.quaternion);
  }

  /** シーンに追加するオブジェクトを取得する */
  getObject3D(): typeof THREE.Object3D {
    return this.#group;
  }

  /**
   * スプライト配下にオブジェクトを追加する
   *
   * @param object 追加するオブジェクト
   */
  addObject3D(object: typeof THREE.Object3D): void {
    this.#group.add(object);
  }

  /** 本クラスが保持する全メッシュを返す */
  #getAllMeshes(): ArmdozerAnimation[] {
    return [
      this.#stand,
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

  /** 座標を更新する */
  #refreshPos(model: NeoLandozerModel): void {
    this.#group.position.set(
      model.position.x,
      model.position.y,
      model.position.z
    );
  }

  /** アニメーションタイプに応じたメッシュを返す */
  #getActiveMesh(type: AnimationType): ArmdozerAnimation {
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
}
