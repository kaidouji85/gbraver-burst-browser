import { Observable } from "rxjs";
import * as THREE from "three";

import type { PreRender } from "../../../game-loop/pre-render";
import { SimpleImageMesh } from "../../../mesh/simple-image-mesh";
import type { ResourcesContainer } from "../../../resource";
import { CANVAS_IMAGE_IDS } from "../../../resource/canvas-image";
import type { GameObjectAction } from "../../action/game-object-action";
import type { PushDetector } from "../../push-detector/push-detector";
import { circlePushDetector } from "../../push-detector/push-detector";
import { hudUIScale } from "../../scale";
import type { BurstButtonModel } from "../model/burst-button-model";
import type { ArmdozerIcon } from "./armdozer-icon";

/** コンストラクタのパラメータ */
type Param = ResourcesContainer & {
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
  /** アームドーザアイコン */
  armdozerIcon: ArmdozerIcon;
};

/** バーストボタンのビュー */
export class BurstButtonView {
  /** バーストボタン */
  #burstButton: SimpleImageMesh;
  /** アームドーザアイコン */
  #armdozerIcon: ArmdozerIcon;
  /** ラベル */
  #label: SimpleImageMesh;
  /** ボタン無効化オーバーレイ */
  #buttonDisabled: SimpleImageMesh;
  /** ボタン押下判定 */
  #pushDetector: PushDetector;
  /** グループ */
  #group: THREE.Group;

  /**
   * コンストラクタ
   * @param param パラメータ
   */
  constructor(param: Param) {
    this.#group = new THREE.Group();
    const burstButton =
      param.resources.canvasImages.find(
        (v) => v.id === CANVAS_IMAGE_IDS.BURST_BUTTON,
      )?.image ?? new Image();
    this.#burstButton = new SimpleImageMesh({
      canvasSize: 512,
      meshSize: 512,
      image: burstButton,
      imageWidth: 512,
    });
    this.#group.add(this.#burstButton.getObject3D());
    this.#armdozerIcon = param.armdozerIcon;
    this.#armdozerIcon.getObject3D().position.z =
      this.#burstButton.getObject3D().position.z + 1;
    this.#group.add(this.#armdozerIcon.getObject3D());
    const label =
      param.resources.canvasImages.find(
        (v) => v.id === CANVAS_IMAGE_IDS.BURST_BUTTON_LABEL,
      )?.image ?? new Image();
    this.#label = new SimpleImageMesh({
      canvasSize: 512,
      meshSize: 512,
      image: label,
      imageWidth: 264,
    });
    this.#group.add(this.#label.getObject3D());
    const buttonDisabled =
      param.resources.canvasImages.find(
        (v) => v.id === CANVAS_IMAGE_IDS.BIG_BUTTON_DISABLED,
      )?.image ?? new Image();
    this.#buttonDisabled = new SimpleImageMesh({
      canvasSize: 512,
      meshSize: 512,
      image: buttonDisabled,
      imageWidth: 414,
    });
    this.#group.add(this.#buttonDisabled.getObject3D());
    this.#pushDetector = circlePushDetector({
      radius: 200,
      segments: 32,
      gameObjectAction: param.gameObjectAction,
    });
    this.#group.add(this.#pushDetector.getObject3D());
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#burstButton.destructor();
    this.#armdozerIcon.destructor();
    this.#buttonDisabled.destructor();
    this.#label.destructor();
    this.#pushDetector.destructor();
  }

  /**
   * モデルをビューに反映させる
   * @param model モデル
   * @param preRender プリレンダー情報
   */
  engage(model: BurstButtonModel, preRender: PreRender): void {
    this.#burstButton.setOpacity(model.opacity);
    const iconOpacity = !model.canActivateBurst ? 0 : model.opacity;
    this.#armdozerIcon.setOpacity(iconOpacity);
    const labelOpacity = !model.canActivateBurst ? 0 : model.opacity;
    this.#label.setOpacity(labelOpacity);
    this.#label.getObject3D().position.y = -80;
    const disabledOpacity = model.canActivateBurst ? 0 : model.opacity;
    this.#buttonDisabled.setOpacity(disabledOpacity);
    const devicePerScale = hudUIScale(
      preRender.rendererDOM,
      preRender.safeAreaInset,
    );
    const frontScale = devicePerScale * model.scale * 0.3;
    this.#group.scale.set(frontScale, frontScale, 0.3);
    const paddingLeft = 175;
    const marginLeft = 10;
    this.#group.position.x =
      -preRender.rendererDOM.clientWidth / 2 +
      paddingLeft * devicePerScale +
      Math.max(marginLeft, preRender.safeAreaInset.left);
    const paddingBottom = 65;
    const marginBottom = 10;
    this.#group.position.y =
      -preRender.rendererDOM.clientHeight / 2 +
      paddingBottom * devicePerScale +
      Math.max(marginBottom, preRender.safeAreaInset.bottom);
    this.#group.quaternion.copy(preRender.camera.quaternion);
  }

  /**
   * 本ビューで使うthree.jsオブジェクトを取得する
   * @return
   */
  getObject3D(): THREE.Object3D {
    return this.#group;
  }

  /**
   * ボタン押下通知
   * @returns
   */
  notifyPush(): Observable<Event> {
    return this.#pushDetector.notifyPressed();
  }
}
