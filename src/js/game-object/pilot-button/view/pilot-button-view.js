// @flow

import * as THREE from 'three';
import {SimpleImageMesh} from "../../../mesh/simple-image-mesh";
import type {Resources} from "../../../resource";
import {CANVAS_IMAGE_IDS} from "../../../resource/canvas-image";
import type {PilotButtonModel} from "../model/pilot-button-model";
import type {PreRender} from "../../../game-loop/pre-render";
import {HUDUIScale} from "../../../hud-scale/hud-scale";
import {ButtonOverlap} from "../../button-overlap/button-overlap";
import {circleButtonOverlap} from "../../button-overlap/circle-button-overlap";
import type {PilotIcon} from "./pilot-icon";
import type {PilotId} from "gbraver-burst-core";
import {createPilotIcon} from "./pilot-id-to-icon";
import type {GameObjectAction} from "../../action/game-object-action";
import type {Stream, StreamSource} from "../../../stream/core";
import {RxjsStreamSource} from "../../../stream/rxjs";

/** キャンバスサイズ */
const CANVAS_SIZE = 512;

/** 全体のスケール */
const GROUP_SCALE = 0.3;

/** 左パディング */
const PADDING_LEFT = 70;

/** 下パディング */
const PADDING_BOTTOM = 160;

/**
 * パイロットボタン ビュー
 */
export class PilotButtonView {
  _pushButton: StreamSource<void>;
  _group: typeof THREE.Group;
  _button: SimpleImageMesh;
  _label: SimpleImageMesh;
  _pilotIcon: PilotIcon;
  _buttonDisabled: SimpleImageMesh;
  _overlap: ButtonOverlap;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   * @param pilotId パイロットID
   * @param listener イベントリスナ
   */
  constructor(resources: Resources, pilotId: PilotId, listener: Stream<GameObjectAction>) {
    this._pushButton = new RxjsStreamSource();
    this._group = new THREE.Group();

    const buttonDisabledResource = resources.canvasImages
      .find(v => v.id === CANVAS_IMAGE_IDS.BIG_BUTTON_DISABLED);
    const buttonDisabled = buttonDisabledResource
      ? buttonDisabledResource.image
      : new Image();
    this._buttonDisabled = new SimpleImageMesh({
      canvasSize: CANVAS_SIZE,
      meshSize: CANVAS_SIZE,
      image: buttonDisabled
    });
    this._buttonDisabled.getObject3D().position.z = 2;
    this._group.add(this._buttonDisabled.getObject3D());

    const pilotButton = resources.canvasImages
      .find(v => v.id === CANVAS_IMAGE_IDS.PILOT_BUTTON)
      ?.image ?? new Image();
    this._button = new SimpleImageMesh({
      canvasSize: CANVAS_SIZE,
      meshSize: CANVAS_SIZE,
      image: pilotButton,
    });
    this._group.add(this._button.getObject3D());

    const label = resources.canvasImages
      .find(v => v.id === CANVAS_IMAGE_IDS.PILOT_BUTTON_LABEL)
      ?.image ?? new Image();
    this._label = new SimpleImageMesh({
      canvasSize: CANVAS_SIZE,
      meshSize: CANVAS_SIZE,
      image: label,
    });
    this._label.getObject3D().position.y = -100;
    this._group.add(this._label.getObject3D());

    this._pilotIcon = createPilotIcon(pilotId, resources);
    this._pilotIcon.getObject3D().position.z = 1;
    this._group.add(this._pilotIcon.getObject3D());

    this._overlap = circleButtonOverlap({
      radius: 200,
      segments: 32,
      listener: listener,
      onButtonPush: ()=> {
        this._pushButton.next();
      }
    });
    this._overlap.getObject3D().position.z = 1;
    this._group.add(this._overlap.getObject3D());
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this._button.destructor();
    this._pilotIcon.destructor();
    this._buttonDisabled.destructor();
    this._label.destructor();
    this._overlap.destructor();
  }

  /**
   * モデルをビューに反映させる
   *
   * @param model モデル
   * @param preRender プリレンダー情報
   */
  engage(model: PilotButtonModel, preRender: PreRender): void {
    this._button.setOpacity(model.opacity);

    const labelOpacity = model.canPilot ? model.opacity : 0;
    this._label.setOpacity(labelOpacity);
    this._pilotIcon.setOpacity(labelOpacity);

    const disabledOpacity = model.canPilot ? 0 : model.opacity;
    this._buttonDisabled.setOpacity(disabledOpacity);

    const devicePerScale = HUDUIScale(preRender.rendererDOM, preRender.safeAreaInset);
    this._group.scale.set(
      GROUP_SCALE * devicePerScale * model.scale,
      GROUP_SCALE * devicePerScale * model.scale,
      GROUP_SCALE * devicePerScale * model.scale
    );
    this._group.position.x =
      -preRender.rendererDOM.clientWidth / 2
      +preRender.safeAreaInset.left
      +PADDING_LEFT * devicePerScale;
    this._group.position.y =
      -preRender.rendererDOM.clientHeight / 2
      +preRender.safeAreaInset.bottom
      +PADDING_BOTTOM * devicePerScale;
    this._group.quaternion.copy(preRender.camera.quaternion);
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): typeof THREE.Object3D {
    return this._group;
  }

  /**
   * ボタン押下通知
   * 
   * @return 通知ストリーム
   */
  pushButtonNotifier(): Stream<void> {
    return this._pushButton;
  }
}