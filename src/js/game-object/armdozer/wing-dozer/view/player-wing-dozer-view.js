// @flow

import * as THREE from "three";
import { Group } from "three";
import type { Resources } from "../../../../resource";
import type { ArmdozerAnimation } from "../../mesh/armdozer-animation";
import { wingDozerBackStep } from "../mesh/back-step";
import { wingDozerDashDown } from "../mesh/dash-down";
import { wingDozerDashToStand } from "../mesh/dash-to-stand";
import { wingDozerDashUp } from "../mesh/dash-up";
import { wingDozerDown } from "../mesh/down";
import { wingDozerFrontStep } from "../mesh/front-step";
import { wingDozerGuard } from "../mesh/guard";
import { wingDozerKnockBack } from "../mesh/knock-back";
import { wingDozerStand } from "../mesh/stand";
import { wingDozerUpperAttack } from "../mesh/upper-attack";
import { wingDozerUpperCharge } from "../mesh/upper-charge";
import { wingDozerUpperToStand } from "../mesh/upper-to-stand";
import type { AnimationType, WingDozerModel } from "../model/wing-dozer-model";
import type { WingDozerView } from "./wing-dozer-view";

/**
 * プレイヤー側 ウィングドーザ ビュー
 */
export class PlayerWingDozerView implements WingDozerView {
  #stand: ArmdozerAnimation;
  #upperCharge: ArmdozerAnimation;
  #upperAttack: ArmdozerAnimation;
  #upperToStand: ArmdozerAnimation;
  #dashUp: ArmdozerAnimation;
  #dashDown: ArmdozerAnimation;
  #dashToStand: ArmdozerAnimation;
  #knockBack: ArmdozerAnimation;
  #down: ArmdozerAnimation;
  #backStep: ArmdozerAnimation;
  #frontStep: ArmdozerAnimation;
  #guard: ArmdozerAnimation;
  #group: typeof THREE.Group;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources): void {
    this.#stand = wingDozerStand(resources);
    this.#upperCharge = wingDozerUpperCharge(resources);
    this.#upperAttack = wingDozerUpperAttack(resources);
    this.#upperToStand = wingDozerUpperToStand(resources);
    this.#dashUp = wingDozerDashUp(resources);
    this.#dashDown = wingDozerDashDown(resources);
    this.#dashToStand = wingDozerDashToStand(resources);
    this.#knockBack = wingDozerKnockBack(resources);
    this.#down = wingDozerDown(resources);
    this.#backStep = wingDozerBackStep(resources);
    this.#frontStep = wingDozerFrontStep(resources);
    this.#guard = wingDozerGuard(resources);

    this.#group = new Group();
    this.#getAllMeshes().forEach((mesh) => {
      this.#group.add(mesh.getObject3D());
    });
  }

  /**
   * デストラクタ
   */
  destructor(): void {
    this.#getAllMeshes().forEach((mesh) => {
      mesh.destructor();
    });
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
   * モデルをビューに反映させる
   *
   * @param model モデル
   */
  engage(model: WingDozerModel): void {
    this.#group.position.x = model.position.x;
    this.#group.position.y = model.position.y;
    this.#group.position.z = model.position.z;

    this.#group.scale.x = 1;
    this.#group.scale.y = 1;
    this.#group.scale.z = 1;

    const activeMesh = this.#getActiveMesh(model.animation.type);
    activeMesh.animate(model.animation.frame);
    activeMesh.visible(true);

    const disActiveMesh = this.#getAllMeshes().filter((v) => v !== activeMesh);
    disActiveMesh.forEach((v) => v.visible(false));
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
   * スプライト配下のオブジェクトを追加する
   *
   * @param object 追加するオブジェクト
   */
  addObject3D(object: typeof THREE.Object3D): void {
    this.#group.add(object);
  }

  /**
   * 本ビューに含まれる全メッシュを返す
   *
   * @return 全メッシュ
   */
  #getAllMeshes(): ArmdozerAnimation[] {
    return [
      this.#stand,
      this.#upperCharge,
      this.#upperAttack,
      this.#upperToStand,
      this.#dashUp,
      this.#dashDown,
      this.#dashToStand,
      this.#knockBack,
      this.#down,
      this.#backStep,
      this.#frontStep,
      this.#guard,
    ];
  }

  /**
   * アニメーションタイプに応じたメッシュを返す
   *
   * @param type あアニメーションタイプ
   * @return メッシュ
   */
  #getActiveMesh(type: AnimationType): ArmdozerAnimation {
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
}
