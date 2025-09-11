import * as R from "ramda";
import { Observable } from "rxjs";
import * as THREE from "three";

import { PreRender } from "../../../game-loop/pre-render";
import { HorizontalAnimationMesh } from "../../../mesh/horizontal-animation";
import { ResourcesContainer } from "../../../resource";
import { findTextureOrThrow } from "../../../resource/find-texture-or-throw";
import { TEXTURE_IDS } from "../../../resource/texture/ids";
import { GameObjectAction } from "../../action/game-object-action";
import { PushDetector } from "../../push-detector";
import { planePushDetector } from "../../push-detector/square-push-detector";
import { hudScale } from "../../scale";
import { PredicatedDamageModel } from "../model/predicated-damage-model";

/** 最大アニメーション枚数 */
const MAX_ANIMATION = 16;

/** 数字メッシュサイズ */
const NUMBER_MESH_SIZE = 128;

/** 数字メッシュ間隔 */
const NUMBER_MESH_INTERVAL = 72;

/** 数字メッシュのプッシュ検出器幅 */
const NUMBER_PUSH_DETECTOR_WIDTH = 384;

/** 数字メッシュのプッシュ検出器高さ */
const NUMBER_PUSH_DETECTOR_HEIGHT = 128;

/** マイナス符号も含めた数字の最大桁数 */
const NUMBER_OF_DIGITS = 5;

/** 最大ダメージ */
const MAX_DAMAGE = 9999;

/** 最小ダメージ */
const MIN_DAMAGE = 0;

/** 基本拡大率 */
const BASE_SCALE = 0.3;

/** バトルシミュレーターアイコンのサイズ */
const BATTLE_SIMULATOR_ICON_SIZE = 70;

/** コンストラクタのパラメータ */
export type PredicatedDamageViewConstructParams = ResourcesContainer & {
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};

/** ダメージ予想 ビュー */
export class PredicatedDamageView {
  /** グループ */
  #group: THREE.Group;
  /** 数字メッシュをあつめたもの */
  #numbers: HorizontalAnimationMesh[];
  /** ボタン押下検知 */
  #numberPushDetector: PushDetector;
  /** バトルシミュレーターアイコン */
  #battleSimulatorIcon: HorizontalAnimationMesh;

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
      NUMBER_OF_DIGITS,
    );
    this.#numbers.forEach((n) => {
      this.#group.add(n.getObject3D());
    });

    this.#numberPushDetector = planePushDetector({
      ...params,
      width: NUMBER_PUSH_DETECTOR_WIDTH,
      height: NUMBER_PUSH_DETECTOR_HEIGHT,
      visible: false,
    });
    this.#group.add(this.#numberPushDetector.getObject3D());

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
    this.#numberPushDetector.destructor();
    this.#battleSimulatorIcon.destructor();
  }

  /**
   * モデルをビューに反映させる
   * @param model モデル
   * @param preRender プリレンダリング情報
   */
  engage(model: PredicatedDamageModel, preRender: PreRender): void {
    const { damage, opacity } = model;
    const { safeAreaInset, rendererDOM } = preRender;

    const scale = hudScale(rendererDOM, safeAreaInset) * BASE_SCALE;
    this.#group.scale.set(scale, scale, scale);

    const correctDamage = Math.max(MIN_DAMAGE, Math.min(damage, MAX_DAMAGE));
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

    const damageDigit = values.length + 1;
    this.#numberPushDetector.getObject3D().scale.x =
      damageDigit / NUMBER_OF_DIGITS;
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
    return this.#numberPushDetector.notifyPressed();
  }
}
