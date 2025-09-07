import { Observable, Subject, Unsubscribable } from "rxjs";
import * as THREE from "three";

import { PreRender } from "../../../game-loop/pre-render";
import { HorizontalAnimationMesh } from "../../../mesh/horizontal-animation";
import { ResourcesContainer } from "../../../resource";
import { TEXTURE_IDS } from "../../../resource/texture/ids";
import { GameObjectActionContainer } from "../../action/game-object-action-container";
import { PushDetector } from "../../push-detector";
import { circlePushDetector } from "../../push-detector/circle-push-detector";
import { hudUIScale } from "../../scale";
import { StatusIconModel } from "../model/status-icon-model";

/** テクスチャの大きさ */
const TEXTURE_SIZE = 70;

/** ステータスアイコンのビュー */
export class StatusIconView {
  /** グループ */
  #group: THREE.Group;
  /** ボタンのテクスチャ */
  #button: HorizontalAnimationMesh;
  /** 押下判定 */
  #pushDetector: PushDetector;
  /** ボタン押下通知 */
  #pushButtonNotifier: Subject<void>;
  /** アンサブスクライバブル */
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   * @param options コンストラクタのパラメータ
   */
  constructor(options: ResourcesContainer & GameObjectActionContainer) {
    const { resources, gameObjectAction } = options;

    this.#group = new THREE.Group();

    const buttonTexture =
      resources.textures.find((v) => v.id === TEXTURE_IDS.STATUS_ICON)
        ?.texture ?? new THREE.Texture();
    this.#button = new HorizontalAnimationMesh({
      texture: buttonTexture,
      maxAnimation: 1,
      width: TEXTURE_SIZE,
      height: TEXTURE_SIZE,
    });
    this.#group.add(this.#button.getObject3D());

    this.#pushDetector = circlePushDetector({
      radius: 30,
      segments: 32,
      gameObjectAction,
      visible: false,
    });
    this.#group.add(this.#pushDetector.getObject3D());

    this.#pushButtonNotifier = new Subject<void>();
    this.#unsubscribers = [
      this.#pushDetector.notifyPressed().subscribe(() => {
        this.#pushButtonNotifier.next();
      }),
    ];
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#button.destructor();
    this.#pushDetector.destructor();
    this.#unsubscribers.forEach((u) => u.unsubscribe());
  }

  /**
   * シーンに追加するオブジェクトを取得する
   * @returns シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this.#group;
  }

  /**
   * モデルをビューに反映する
   * @param model モデル
   * @param preRender プリレンダー情報
   */
  engage(model: StatusIconModel, preRender: PreRender): void {
    const devicePerScale = hudUIScale(
      preRender.rendererDOM,
      preRender.safeAreaInset,
    );
    const scale = model.scale * devicePerScale;

    this.#group.scale.set(scale, scale, scale);
    this.#button.opacity(model.opacity);
  }

  /**
   * ボタン押下通知
   * @returns 通知ストリーム
   */
  notifyPushed(): Observable<void> {
    return this.#pushButtonNotifier;
  }
}
