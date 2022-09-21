// @flow
import * as THREE from "three";
import {SimpleImageMesh} from "../../../mesh/simple-image-mesh";
import type {Resources} from "../../../resource";
import {CANVAS_IMAGE_IDS} from "../../../resource/canvas-image";
import type {Stream, Unsubscriber} from "../../../stream/stream";
import type {GameObjectAction} from "../../action/game-object-action";
import {ButtonOverlap} from "../../button-overlap/button-overlap";
import {circleButtonOverlap} from "../../button-overlap/circle-button-overlap";
import type {BatterySelectorModel} from "../model";
import {canBatteryPlus} from "../model/can-battery-plus";

/** コンストラクタのパラメータ */
type Param = {
  /** リソース管理オブジェクト */
  resources: Resources,
  /** ゲームオブジェクトアクション */
  gameObjectAction: Stream<GameObjectAction>,
  /** ボタンが押された時に呼ばれるコールバック関数 */
  onPush: () => void
};

/** バッテリープラスボタン */
export class BatteryPlus {
  #group: typeof THREE.Group;
  #activeButton: SimpleImageMesh;
  #buttonDisabled: SimpleImageMesh;
  #overlap: ButtonOverlap;
  #unsubscribers: Unsubscriber[];

  /**
   * コンストラクタ
   * 
   * @param param パラメータ
   */
  constructor(param: Param) {
    const active = param.resources.canvasImages
      .find(v => v.id === CANVAS_IMAGE_IDS.BATTERY_PLUS)?.image ?? new Image();
    this.#activeButton = new SimpleImageMesh({canvasSize: 256, meshSize: 256, image: active, imageWidth: 172});

    const buttonDisabled = param.resources.canvasImages
      .find(v => v.id === CANVAS_IMAGE_IDS.SMALL_BUTTON_DISABLED)?.image ?? new Image();
    this.#buttonDisabled = new SimpleImageMesh({canvasSize: 256, meshSize: 256, image: buttonDisabled, imageWidth: 176});

    this.#overlap = circleButtonOverlap({radius: 80, segments: 32, gameObjectAction: param.gameObjectAction});

    this.#group = new THREE.Group();
    this.#group.add(this.#activeButton.getObject3D());
    this.#group.add(this.#buttonDisabled.getObject3D());
    this.#group.add(this.#overlap.getObject3D());

    this.#unsubscribers = [
      this.#overlap.pushStartNotifier().subscribe(param.onPush)
    ];
  }

  /** デストラクタ */
  destructor(): void {
    this.#activeButton.destructor();
    this.#buttonDisabled.destructor();
    this.#overlap.destructor();
    this.#unsubscribers.forEach(unsubscriber => {
      unsubscriber.unsubscribe();
    });
  }

  /** モデルをビューに反映させる */
  update(model: BatterySelectorModel): void {
    this.#activeButton.setOpacity(model.opacity);
    this.#activeButton.getObject3D().scale.set(
      model.plusButtonScale,
      model.plusButtonScale,
      model.plusButtonScale
    );

    const isDisabledVisible = !canBatteryPlus(model);
    const disabledOpacity = isDisabledVisible ? model.opacity : 0;
    this.#buttonDisabled.setOpacity(disabledOpacity);
    this.#buttonDisabled.getObject3D().scale.set(
      model.plusButtonScale,
      model.plusButtonScale,
      model.plusButtonScale
    );
  }

  /** シーンに追加するオブジェクトを取得する */
  getObject3D(): typeof THREE.Object3D {
    return this.#group;
  }
}