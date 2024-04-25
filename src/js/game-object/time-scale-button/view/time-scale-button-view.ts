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
import type { TimeScaleButtonModel } from "../model/time-scale-button-model";

/** canvasサイズ */
const CANVAS_SIZE = 256;

/** メッシュサイズ */
const MESH_SIZE = 70;

/** アニメーションタイムスケールボタンビュー */
export class TimeScaleButtonView {
  #group: THREE.Group;
  #button: SimpleImageMesh;
  #timeScale100: SimpleImageMesh;
  #timeScale050: SimpleImageMesh;
  #timeScale025: SimpleImageMesh;
  #pushDetector: PushDetector;
  #pushButton: Subject<void>;
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   * @param gameObjectAction ゲームオブジェクトアクション
   */
  constructor(
    resources: Resources,
    gameObjectAction: Observable<GameObjectAction>,
  ) {
    this.#group = new THREE.Group();
    this.#pushButton = new Subject();
    const buttonImage =
      resources.canvasImages.find(
        (v) => v.id === CANVAS_IMAGE_IDS.TIME_SCALE_BUTTON,
      )?.image ?? new Image();
    this.#button = new SimpleImageMesh({
      canvasSize: CANVAS_SIZE,
      meshSize: MESH_SIZE,
      image: buttonImage,
      imageWidth: 256,
    });
    this.#group.add(this.#button.getObject3D());
    const timeScale100 =
      resources.canvasImages.find(
        (v) => v.id === CANVAS_IMAGE_IDS.TIME_SCALE_100,
      )?.image ?? new Image();
    this.#timeScale100 = new SimpleImageMesh({
      canvasSize: CANVAS_SIZE,
      meshSize: MESH_SIZE,
      image: timeScale100,
      imageWidth: 256,
    });
    this.#group.add(this.#timeScale100.getObject3D());
    const timeScale050 =
      resources.canvasImages.find(
        (v) => v.id === CANVAS_IMAGE_IDS.TIME_SCALE_050,
      )?.image ?? new Image();
    this.#timeScale050 = new SimpleImageMesh({
      canvasSize: CANVAS_SIZE,
      meshSize: MESH_SIZE,
      image: timeScale050,
      imageWidth: 256,
    });
    this.#group.add(this.#timeScale050.getObject3D());
    const timeScale025 =
      resources.canvasImages.find(
        (v) => v.id === CANVAS_IMAGE_IDS.TIME_SCALE_025,
      )?.image ?? new Image();
    this.#timeScale025 = new SimpleImageMesh({
      canvasSize: CANVAS_SIZE,
      meshSize: MESH_SIZE,
      image: timeScale025,
      imageWidth: 256,
    });
    this.#group.add(this.#timeScale025.getObject3D());
    this.#pushDetector = circlePushDetector({
      radius: 30,
      segments: 32,
      gameObjectAction,
      visible: false,
    });
    this.#group.add(this.#pushDetector.getObject3D());
    this.#unsubscribers = [
      this.#pushDetector.notifyPressed().subscribe(() => {
        this.#pushButton.next();
      }),
    ];
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#button.destructor();
    this.#timeScale100.destructor();
    this.#timeScale050.destructor();
    this.#timeScale025.destructor();
    this.#pushDetector.destructor();
    this.#unsubscribers.forEach((unsubscriber) => {
      unsubscriber.unsubscribe();
    });
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
  notifyPressed(): Observable<void> {
    return this.#pushButton;
  }

  /**
   * モデルをビューに反映させる
   *
   * @param model モデル
   * @param preRender プリレンダー情報
   */
  engage(model: TimeScaleButtonModel, preRender: PreRender): void {
    const activeTimeScales: {
      timeScale: number;
      sprite: SimpleImageMesh;
    }[] = [
      {
        timeScale: 1,
        sprite: this.#timeScale100,
      },
      {
        timeScale: 0.5,
        sprite: this.#timeScale050,
      },
      {
        timeScale: 0.25,
        sprite: this.#timeScale025,
      },
    ];
    const activeTimeScale =
      activeTimeScales.find((v) => v.timeScale === model.timeScale)?.sprite ??
      this.#timeScale100;
    const timeScales = [
      this.#timeScale100,
      this.#timeScale050,
      this.#timeScale025,
    ];
    timeScales.forEach((timeScale) => {
      const opacity = timeScale === activeTimeScale ? model.opacity : 0;
      timeScale.setOpacity(opacity);
    });
    this.#button.setOpacity(model.opacity);
    const devicePerScale = HUDUIScale(
      preRender.rendererDOM,
      preRender.safeAreaInset,
    );
    const groupScale = model.scale * devicePerScale;
    this.#group.scale.set(groupScale, groupScale, groupScale);
    const paddingLeft = 25;
    const marginLeft = 5;
    this.#group.position.x =
      -preRender.rendererDOM.clientWidth / 2 +
      paddingLeft * devicePerScale +
      Math.max(marginLeft, preRender.safeAreaInset.left);
    const paddingTop = 25;
    const marginTop = 5;
    this.#group.position.y =
      preRender.rendererDOM.clientHeight / 2 -
      paddingTop * devicePerScale -
      Math.max(marginTop, preRender.safeAreaInset.top);
  }
}
