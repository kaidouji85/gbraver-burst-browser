import * as THREE from "three";

import type { PreRender } from "../../../game-loop/pre-render";
import { SimpleImageMesh } from "../../../mesh/simple-image-mesh";
import type { Resources } from "../../../resource";
import { CANVAS_IMAGE_IDS } from "../../../resource/canvas-image";
import type { Stream, Unsubscriber } from "../../../stream/stream";
import type { GameObjectAction } from "../../action/game-object-action";
import type { PushDetector } from "../../push-detector/push-detector";
import { circlePushDetector } from "../../push-detector/push-detector";
import { HUDUIScale } from "../../scale";
import type { BurstButtonModel } from "../model/burst-button-model";
import type { ArmdozerIcon } from "./armdozer-icon";

/** コンストラクタのパラメータ */
type Param = {
  /** リソース管理オブジェクト */
  resources: Resources;

  /** ゲームオブジェクトアクション */
  gameObjectAction: Stream<GameObjectAction>;

  /** アームドーザアイコン */
  armdozerIcon: ArmdozerIcon;

  /**
   * ボタンを押した時に呼ばれるコールバック関数
   * @param event イベント
   */
  onPush: (event: Event) => void;
};

/** バーストボタンのビュー */
export class BurstButtonView {
  #burstButton: SimpleImageMesh;
  #armdozerIcon: ArmdozerIcon;
  #label: SimpleImageMesh;
  #buttonDisabled: SimpleImageMesh;
  #pushDetector: PushDetector;
  #group: THREE.Group;
  #unsubscribers: Unsubscriber[];

  /**
   * コンストラクタ
   *
   * @param param パラメータ
   */
  constructor(param: Param) {
    this.#group = new THREE.Group();
    const burstButton = param.resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.BURST_BUTTON)?.image ?? new Image();
    this.#burstButton = new SimpleImageMesh({
      canvasSize: 512,
      meshSize: 512,
      image: burstButton,
      imageWidth: 512
    });
    this.#group.add(this.#burstButton.getObject3D());
    this.#armdozerIcon = param.armdozerIcon;
    this.#armdozerIcon.getObject3D().position.z = this.#burstButton.getObject3D().position.z + 1;
    this.#group.add(this.#armdozerIcon.getObject3D());
    const label = param.resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.BURST_BUTTON_LABEL)?.image ?? new Image();
    this.#label = new SimpleImageMesh({
      canvasSize: 512,
      meshSize: 512,
      image: label,
      imageWidth: 264
    });
    this.#group.add(this.#label.getObject3D());
    const buttonDisabled = param.resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.BIG_BUTTON_DISABLED)?.image ?? new Image();
    this.#buttonDisabled = new SimpleImageMesh({
      canvasSize: 512,
      meshSize: 512,
      image: buttonDisabled,
      imageWidth: 414
    });
    this.#group.add(this.#buttonDisabled.getObject3D());
    this.#pushDetector = circlePushDetector({
      radius: 200,
      segments: 32,
      gameObjectAction: param.gameObjectAction
    });
    this.#group.add(this.#pushDetector.getObject3D());
    this.#unsubscribers = [this.#pushDetector.pushNotifier().subscribe(param.onPush)];
  }

  /** デストラクタ */
  destructor(): void {
    this.#burstButton.destructor();
    this.#armdozerIcon.destructor();
    this.#buttonDisabled.destructor();
    this.#label.destructor();
    this.#pushDetector.destructor();
    this.#unsubscribers.forEach(unsubscriber => {
      unsubscriber.unsubscribe();
    });
  }

  /**
   * モデルをビューに反映させる
   *
   * @param model モデル
   * @param preRender プリレンダー情報
   */
  engage(model: BurstButtonModel, preRender: PreRender): void {
    this.#burstButton.setOpacity(model.opacity);
    const iconOpacity = !model.canBurst ? 0 : model.opacity;
    this.#armdozerIcon.setOpacity(iconOpacity);
    const labelOpacity = !model.canBurst ? 0 : model.opacity;
    this.#label.setOpacity(labelOpacity);
    this.#label.getObject3D().position.y = -80;
    const disabledOpacity = model.canBurst ? 0 : model.opacity;
    this.#buttonDisabled.setOpacity(disabledOpacity);
    const devicePerScale = HUDUIScale(preRender.rendererDOM, preRender.safeAreaInset);
    const frontScale = devicePerScale * model.scale * 0.3;
    this.#group.scale.set(frontScale, frontScale, 0.3);
    const paddingLeft = 175;
    const marginLeft = 10;
    this.#group.position.x = -preRender.rendererDOM.clientWidth / 2 + paddingLeft * devicePerScale + Math.max(marginLeft, preRender.safeAreaInset.left);
    const paddingBottom = 65;
    const marginBottom = 10;
    this.#group.position.y = -preRender.rendererDOM.clientHeight / 2 + paddingBottom * devicePerScale + Math.max(marginBottom, preRender.safeAreaInset.bottom);
    this.#group.quaternion.copy(preRender.camera.quaternion);
  }

  /**
   * 本ビューで使うthree.jsオブジェクトを取得する
   *
   * @return
   */
  getObject3D(): THREE.Object3D {
    return this.#group;
  }

}