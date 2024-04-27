import { Observable, Subject, Unsubscribable } from "rxjs";
import * as THREE from "three";

import type { PreRender } from "../../../game-loop/pre-render";
import { SimpleImageMesh } from "../../../mesh/simple-image-mesh";
import type { Resources } from "../../../resource";
import { CANVAS_IMAGE_IDS } from "../../../resource/canvas-image";
import type { GameObjectAction } from "../../action/game-object-action";
import type { PushDetector } from "../../push-detector/push-detector";
import { circlePushDetector } from "../../push-detector/push-detector";
import { HUDUIScale } from "../../scale";
import type { PilotButtonModel } from "../model/pilot-button-model";
import type { PilotIcon } from "./pilot-icon";

/**
 * パイロットボタン ビュー
 */
export class PilotButtonView {
  #group: THREE.Group;
  #button: SimpleImageMesh;
  #label: SimpleImageMesh;
  #pilotIcon: PilotIcon;
  #buttonDisabled: SimpleImageMesh;
  #pushDetector: PushDetector;
  #pushButton: Subject<Event>;
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   * @param pilotIcon パイロットアイコン
   * @param gameObjectAction ゲームオブジェクトアクション
   */
  constructor(
    resources: Resources,
    pilotIcon: PilotIcon,
    gameObjectAction: Observable<GameObjectAction>,
  ) {
    this.#pushButton = new Subject();
    this.#group = new THREE.Group();
    const buttonDisabled =
      resources.canvasImages.find(
        (v) => v.id === CANVAS_IMAGE_IDS.BIG_BUTTON_DISABLED,
      )?.image ?? new Image();
    this.#buttonDisabled = new SimpleImageMesh({
      canvasSize: 512,
      meshSize: 512,
      image: buttonDisabled,
      imageWidth: 414,
    });
    this.#buttonDisabled.getObject3D().position.z = 2;
    this.#group.add(this.#buttonDisabled.getObject3D());
    const pilotButton =
      resources.canvasImages.find((v) => v.id === CANVAS_IMAGE_IDS.PILOT_BUTTON)
        ?.image ?? new Image();
    this.#button = new SimpleImageMesh({
      canvasSize: 512,
      meshSize: 512,
      image: pilotButton,
      imageWidth: 414,
    });
    this.#group.add(this.#button.getObject3D());
    const label =
      resources.canvasImages.find(
        (v) => v.id === CANVAS_IMAGE_IDS.PILOT_BUTTON_LABEL,
      )?.image ?? new Image();
    this.#label = new SimpleImageMesh({
      canvasSize: 512,
      meshSize: 512,
      image: label,
      imageWidth: 328,
    });
    this.#label.getObject3D().position.y = -100;
    this.#group.add(this.#label.getObject3D());
    this.#pilotIcon = pilotIcon;
    this.#pilotIcon.getObject3D().position.z = 1;
    this.#group.add(this.#pilotIcon.getObject3D());
    this.#pushDetector = circlePushDetector({
      radius: 200,
      segments: 32,
      gameObjectAction: gameObjectAction,
    });
    this.#pushDetector.getObject3D().position.z = 1;
    this.#group.add(this.#pushDetector.getObject3D());
    this.#unsubscribers = [
      this.#pushDetector.notifyPressed().subscribe((event) => {
        this.#pushButton.next(event);
      }),
    ];
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#button.destructor();
    this.#pilotIcon.destructor();
    this.#buttonDisabled.destructor();
    this.#label.destructor();
    this.#pushDetector.destructor();
    this.#unsubscribers.forEach((unsubscriber) => {
      unsubscriber.unsubscribe();
    });
  }

  /**
   * モデルをビューに反映させる
   *
   * @param model モデル
   * @param preRender プリレンダー情報
   */
  engage(model: PilotButtonModel, preRender: PreRender): void {
    this.#button.setOpacity(model.opacity);
    const labelOpacity = model.canActivatePilotSkill ? model.opacity : 0;
    this.#label.setOpacity(labelOpacity);
    this.#pilotIcon.setOpacity(labelOpacity);
    const disabledOpacity = model.canActivatePilotSkill ? 0 : model.opacity;
    this.#buttonDisabled.setOpacity(disabledOpacity);
    const devicePerScale = HUDUIScale(
      preRender.rendererDOM,
      preRender.safeAreaInset,
    );
    const frontScale = 0.3 * devicePerScale * model.scale;
    this.#group.scale.set(frontScale, frontScale, 0.3);
    const paddingLeft = 65;
    const marginLeft = 10;
    this.#group.position.x =
      -preRender.rendererDOM.clientWidth / 2 +
      paddingLeft * devicePerScale +
      Math.max(marginLeft, preRender.safeAreaInset.left);
    const paddingBottom = 145;
    const marginBottom = 10;
    this.#group.position.y =
      -preRender.rendererDOM.clientHeight / 2 +
      paddingBottom * devicePerScale +
      Math.max(marginBottom, preRender.safeAreaInset.bottom);
    this.#group.quaternion.copy(preRender.camera.quaternion);
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @returns シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this.#group;
  }

  /**
   * ボタン押下通知
   *
   * @returns 通知ストリーム
   */
  notifyPressed(): Observable<Event> {
    return this.#pushButton;
  }
}
