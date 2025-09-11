import * as R from "ramda";
import { Observable } from "rxjs";
import * as THREE from "three";

import { PreRender } from "../../../game-loop/pre-render";
import { HorizontalAnimationMesh } from "../../../mesh/horizontal-animation";
import { ResourcesContainer } from "../../../resource";
import { findTextureOrThrow } from "../../../resource/find-texture-or-throw";
import { TEXTURE_IDS } from "../../../resource/texture/ids";
import { GameObjectActionContainer } from "../../action/game-object-action-container";
import { PushDetector } from "../../push-detector";
import { circlePushDetector } from "../../push-detector/circle-push-detector";
import { hudUIScale } from "../../scale";
import { PredicatedDamageModel } from "../model/predicated-damage-model";

/** 最大アニメーション枚数 */
const MAX_ANIMATION = 16;

/** 数字系メッシュの縮小率、大きさ調整に利用する */
const NUMBER_SIZE_SCALE = 0.3;

/** 数字メッシュサイズ */
const NUMBER_MESH_SIZE = 128 * NUMBER_SIZE_SCALE;

/** 数字メッシュ間隔 */
const NUMBER_MESH_INTERVAL = 72 * NUMBER_SIZE_SCALE;

/** 数字表示に必要な最大文字数（マイナス符号含む） */
const MAX_NUMBER_CHARACTERS = 5;

/** 表示可能な最大ダメージ */
const MAX_DISPLAYABLE_DAMAGE = 9999;

/** 表示可能な最小ダメージ */
const MIN_DISPLAYABLE_DAMAGE = 0;

/** バトルシミュレーターアイコンのサイズ */
const BATTLE_SIMULATOR_ICON_SIZE = 70;

/** 数字とアイコンの間のマージン */
const NUMBER_TO_ICON_MARGIN = 2;

/** コンストラクタのパラメータ */
export type PredicatedDamageViewConstructParams = ResourcesContainer &
  GameObjectActionContainer;

/** ダメージ予想 ビュー */
export class PredicatedDamageView {
  /** グループ */
  #group: THREE.Group;
  /** 数字メッシュをあつめたもの */
  #numbers: HorizontalAnimationMesh[];
  /** バトルシミュレーターアイコン */
  #battleSimulatorIcon: HorizontalAnimationMesh;
  /** バトルシミュレーターアイコンのプッシュ検出器 */
  #battleSimulatorIconPushDetector: PushDetector;

  /**
   * コンストラクタ
   * @param params パラメータ
   */
  constructor(params: PredicatedDamageViewConstructParams) {
    const { resources } = params;

    this.#group = new THREE.Group();

    const { texture: numberTexture } = findTextureOrThrow(
      resources,
      TEXTURE_IDS.PREDICATED_DAMAGE_NUMBER,
    );
    this.#numbers = R.times(
      () =>
        new HorizontalAnimationMesh({
          texture: numberTexture,
          maxAnimation: MAX_ANIMATION,
          width: NUMBER_MESH_SIZE,
          height: NUMBER_MESH_SIZE,
        }),
      MAX_NUMBER_CHARACTERS,
    );
    this.#numbers.forEach((n) => {
      this.#group.add(n.getObject3D());
    });

    this.#battleSimulatorIconPushDetector = circlePushDetector({
      ...params,
      radius: 30,
      segments: 32,
      visible: false,
    });
    this.#group.add(this.#battleSimulatorIconPushDetector.getObject3D());

    const { texture: battleSimulatorIconTexture } = findTextureOrThrow(
      resources,
      TEXTURE_IDS.BATTLE_SIMULATOR_ICON,
    );
    this.#battleSimulatorIcon = new HorizontalAnimationMesh({
      texture: battleSimulatorIconTexture,
      maxAnimation: 1,
      width: BATTLE_SIMULATOR_ICON_SIZE,
      height: BATTLE_SIMULATOR_ICON_SIZE,
    });
    this.#group.add(this.#battleSimulatorIcon.getObject3D());
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#numbers.forEach((n) => {
      n.destructor();
    });
    this.#battleSimulatorIcon.destructor();
    this.#battleSimulatorIconPushDetector.destructor();
  }

  /**
   * モデルをビューに反映させる
   * @param model モデル
   * @param preRender プリレンダリング情報
   */
  engage(model: PredicatedDamageModel, preRender: PreRender): void {
    const { damage, opacity } = model;
    const { safeAreaInset, rendererDOM } = preRender;

    const scale = hudUIScale(rendererDOM, safeAreaInset);
    this.#group.scale.set(scale, scale, scale);

    const correctDamage = Math.max(
      MIN_DISPLAYABLE_DAMAGE,
      Math.min(damage, MAX_DISPLAYABLE_DAMAGE),
    );
    const values = String(correctDamage)
      .split("")
      .reverse()
      .map((v) => Number(v));
    const intervalCount = values.length;
    this.#numbers.forEach((mesh, i) => {
      mesh.opacity(0);
      mesh.getObject3D().position.x =
        (-i + intervalCount / 2) * NUMBER_MESH_INTERVAL;
    });

    R.zip(this.#numbers, values)
      .map((n) => ({
        mesh: n[0],
        value: n[1],
      }))
      .forEach(({ mesh, value }) => {
        mesh.animate(value / MAX_ANIMATION);
        mesh.opacity(opacity);
      });

    const sign = this.#numbers.at(values.length);
    if (sign) {
      sign.opacity(opacity);
      sign.animate(10 / MAX_ANIMATION);
    }

    const battleSimulatorIconX =
      (intervalCount / 2) * NUMBER_MESH_INTERVAL +
      BATTLE_SIMULATOR_ICON_SIZE / 2 +
      NUMBER_TO_ICON_MARGIN;
    this.#battleSimulatorIcon.getObject3D().position.x = battleSimulatorIconX;
    this.#battleSimulatorIcon
      .getObject3D()
      .scale.set(
        model.battleSimulatorIconScale,
        model.battleSimulatorIconScale,
        1,
      );
    this.#battleSimulatorIcon.opacity(opacity);

    this.#battleSimulatorIconPushDetector.getObject3D().position.x =
      battleSimulatorIconX;
  }

  /**
   * シーンに追加するオブジェクトを取得する
   * @returns 取得結果
   */
  getObject3D(): THREE.Object3D {
    return this.#group;
  }

  /**
   * 押下通知
   * @returns 通知ストリーム
   */
  notifyPush(): Observable<Event> {
    return this.#battleSimulatorIconPushDetector.notifyPressed();
  }
}
