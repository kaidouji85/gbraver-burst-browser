import { Observable } from "rxjs";
import * as THREE from "three";

import { HorizontalAnimationMesh } from "../../../../mesh/horizontal-animation";
import { ResourcesContainer } from "../../../../resource";
import { findTextureOrThrow } from "../../../../resource/find-texture-or-throw";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import { GameObjectActionContainer } from "../../../action/game-object-action-container";
import { PushDetector } from "../../../push-detector";
import { planePushDetector } from "../../../push-detector/plane-push-detector";
import { BatterySelectorModel } from "../../model";
import { createBatteryNumberMesh } from "./create-battery-number-mesh";
import { getBatteryNumberPosition } from "./get-battery-number-position";
import { getBatteryNumberScale } from "./get-battery-number-scale";

/** バッテリーセレクタ数字 */
export class BatteryNumber {
  /** 値 */
  readonly value: number;

  /** グループ */
  readonly #group: THREE.Group;
  /** 数字メッシュ */
  readonly #numberMesh: HorizontalAnimationMesh;
  /** プッシュ検出器 */
  readonly #pushDetector: PushDetector;

  /**
   * コンストラクタ
   * @param options 生成オプション
   * @param options.value 数字の値
   */
  constructor(
    options: ResourcesContainer & GameObjectActionContainer & { value: number },
  ) {
    const { resources, gameObjectAction, value } = options;

    this.value = value;

    this.#group = new THREE.Group();

    const { texture } = findTextureOrThrow(
      resources,
      TEXTURE_IDS.BATTERY_SELECTOR_NUMBER,
    );
    this.#numberMesh = createBatteryNumberMesh(value, texture);
    this.#group.add(this.#numberMesh.getObject3D());

    this.#pushDetector = planePushDetector({
      width: 64,
      height: 80,
      gameObjectAction,
      visible: false,
    });
    this.#group.add(this.#pushDetector.getObject3D());
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#numberMesh.destructor();
    this.#pushDetector.destructor();
  }

  /**
   * シーンに追加するオブジェクトを取得する
   * @returns シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this.#group;
  }

  /**
   * モデルにビューを反映させる
   * @param model モデル
   */
  update(model: BatterySelectorModel): void {
    const { x, y } = getBatteryNumberPosition(this.value, model.maxBattery);
    this.#group.position.x = x;
    this.#group.position.y = y;
    const scale = getBatteryNumberScale(model.maxBattery);
    this.#group.scale.set(scale, scale, 1);

    const opacity = this.value <= model.enableMaxBattery ? model.opacity : 0;
    this.#numberMesh.opacity(opacity);
  }

  /**
   * プッシュ通知を受け取る
   * @returns プッシュ通知のObservable
   */
  notifyPushed(): Observable<unknown> {
    return this.#pushDetector.notifyPressed();
  }
}
