import * as R from "ramda";
import { Observable } from "rxjs";
import * as THREE from "three";

import { ResourcesContainer } from "../../../../resource";
import { findTextureOrThrow } from "../../../../resource/find-texture-or-throw";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import { HorizontalAnimationMesh } from "../../../../web-gl/mesh/horizontal-animation";
import { SPRITE_RENDER_ORDER } from "../../../../web-gl/render/render-order/td-render-order";
import { GameObjectActionContainer } from "../../action/game-object-action-container";
import { PushDetector } from "../../push-detector";
import { circlePushDetector } from "../../push-detector/circle-push-detector";
import { PredicatedDamageModel } from "../model/predicated-damage-model";

/** 最大アニメーション枚数 */
const MAX_ANIMATION = 11;

/** 数字系メッシュの縮小率、大きさ調整に利用する */
const NUMBER_SIZE_SCALE = 0.7;

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
const BATTLE_SIMULATOR_ICON_SIZE = 256 * 0.9;

/** バトルシミュレーターアイコンのプッシュ検出器の半径 */
const BATTLE_SIMULATOR_ICON_PUSH_DETECTOR_RADIUS = 80;

/** 数字とアイコンの間のマージン */
const NUMBER_TO_ICON_MARGIN = 64;

/** バトルシミュレーターアイコンのY位置 */
const BATTLE_SIMULATOR_ICON_Y = 2;

/** 台座の色 */
const PEDESTAL_COLOR = 0x000000;

/** 台座の横方向の余白、数字スプライトの端が切れないようにするための値 */
const PEDESTAL_HORIZONTAL_PADDING = 24;

/** 台座の縦方向の余白 */
const PEDESTAL_VERTICAL_PADDING = 24;

/**
 * 台座のrenderOrder
 * 数字メッシュ（SPRITE_RENDER_ORDER）より背面に描画するため、それより小さい値にする
 */
const PEDESTAL_RENDER_ORDER = SPRITE_RENDER_ORDER - 1;

/** コンストラクタのパラメータ */
export type PredicatedDamageViewConstructParams = ResourcesContainer &
  GameObjectActionContainer;

/** ダメージ予想 ビュー */
export class PredicatedDamageView {
  /** グループ */
  #group: THREE.Group;
  /** 数字の背面に表示する台座 */
  #pedestal: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
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

    const pedestalGeometry = new THREE.PlaneGeometry(1, 1, 1, 1);
    const pedestalMaterial = new THREE.MeshBasicMaterial({
      color: PEDESTAL_COLOR,
      side: THREE.DoubleSide,
      transparent: true,
    });
    this.#pedestal = new THREE.Mesh(pedestalGeometry, pedestalMaterial);
    this.#pedestal.renderOrder = PEDESTAL_RENDER_ORDER;
    this.#pedestal.material.depthTest = false;
    this.#group.add(this.#pedestal);

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
      radius: BATTLE_SIMULATOR_ICON_PUSH_DETECTOR_RADIUS,
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
    this.#pedestal.geometry.dispose();
    this.#pedestal.material.dispose();
    this.#numbers.forEach((n) => {
      n.destructor();
    });
    this.#battleSimulatorIcon.destructor();
    this.#battleSimulatorIconPushDetector.destructor();
  }

  /**
   * モデルをビューに反映させる
   * @param model モデル
   */
  engage(model: PredicatedDamageModel): void {
    const { damage, opacity } = model;
    const correctDamage = Math.max(
      MIN_DISPLAYABLE_DAMAGE,
      Math.min(damage, MAX_DISPLAYABLE_DAMAGE),
    );
    const values = String(correctDamage)
      .split("")
      .reverse()
      .map((v) => Number(v));
    this.#numbers.forEach((mesh, i) => {
      mesh.opacity(0);
      mesh.getObject3D().position.x =
        model.battleSimulatorIconPosition === "left"
          ? (-i + values.length + 1) * NUMBER_MESH_INTERVAL +
            NUMBER_TO_ICON_MARGIN
          : (-i - 1) * NUMBER_MESH_INTERVAL - NUMBER_TO_ICON_MARGIN;
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

    // 台座は、数字（values.length桁）と符号（1文字）をあわせた表示幅をすべて覆う
    const displayedCharacters = values.length + 1;
    const pedestalWidth =
      (displayedCharacters - 1) * NUMBER_MESH_INTERVAL +
      NUMBER_MESH_SIZE +
      PEDESTAL_HORIZONTAL_PADDING * 2;
    const pedestalHeight = NUMBER_MESH_SIZE + PEDESTAL_VERTICAL_PADDING * 2;
    const pedestalCenterOffset =
      ((displayedCharacters + 1) / 2) * NUMBER_MESH_INTERVAL +
      NUMBER_TO_ICON_MARGIN;
    this.#pedestal.scale.set(pedestalWidth, pedestalHeight, 1);
    this.#pedestal.position.x =
      model.battleSimulatorIconPosition === "left"
        ? pedestalCenterOffset
        : -pedestalCenterOffset;
    this.#pedestal.material.opacity = opacity;

    this.#battleSimulatorIcon.getObject3D().position.x = 0;
    this.#battleSimulatorIcon.getObject3D().position.y =
      BATTLE_SIMULATOR_ICON_Y;
    this.#battleSimulatorIcon
      .getObject3D()
      .scale.set(
        model.battleSimulatorIconScale,
        model.battleSimulatorIconScale,
        1,
      );
    this.#battleSimulatorIcon.opacity(opacity);

    this.#battleSimulatorIconPushDetector.getObject3D().position.x = 0;
    this.#battleSimulatorIconPushDetector.getObject3D().position.y =
      BATTLE_SIMULATOR_ICON_Y;
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
