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

/** プッシュ検出器幅 */
const PUSH_DETECTOR_WIDTH = 384;

/** プッシュ検出器高さ */
const PUSH_DETECTOR_HEIGHT = 128;

/** マイナス符号も含めた数字の最大桁数 */
const NUMBER_OF_DIGITS = 5;

/** 最大ダメージ */
const MAX_DAMAGE = 9999;

/** 最小ダメージ */
const MIN_DAMAGE = 0;

/** 基本拡大率 */
const BASE_SCALE = 0.3;

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
  #pushDetector: PushDetector;

  /**
   * コンストラクタ
   * @param params パラメータ
   */
  constructor(params: PredicatedDamageViewConstructParams) {
    const { resources } = params;

    this.#group = new THREE.Group();

    const { texture } = findTextureOrThrow(
      resources,
      TEXTURE_IDS.PREDICATED_DAMAGE_NUMBER,
    );
    this.#numbers = R.times(
      () =>
        new HorizontalAnimationMesh({
          texture,
          maxAnimation: MAX_ANIMATION,
          width: NUMBER_MESH_SIZE,
          height: NUMBER_MESH_SIZE,
        }),
      NUMBER_OF_DIGITS,
    );
    this.#numbers.forEach((n) => {
      this.#group.add(n.getObject3D());
    });

    this.#pushDetector = planePushDetector({
      ...params,
      width: PUSH_DETECTOR_WIDTH,
      height: PUSH_DETECTOR_HEIGHT,
      visible: false,
    });
    this.#group.add(this.#pushDetector.getObject3D());
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#numbers.forEach((n) => {
      n.destructor();
    });
    this.#pushDetector.destructor();
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
    this.#pushDetector.getObject3D().scale.x = damageDigit / NUMBER_OF_DIGITS;
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
    return this.#pushDetector.notifyPressed();
  }
}
