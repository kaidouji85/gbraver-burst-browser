// @flow

import TWEEN from "@tweenjs/tween.js";
import type {Resources} from '../../../../resource';
import {ThreeDimensionLayer} from './td';
import {HudLayer} from './hud';
import type {Player, PlayerId} from "gbraver-burst-core";
import type {GameLoop} from "../../../../action/game-loop/game-loop";
import {Observable, Subject} from "rxjs";
import type {TdDOMEvent} from "../../../../action/td-dom";
import type {BattleSceneAction} from "../../../../action/battle-scene";
import type {Render} from "../../../../action/game-loop/render";
import type {SafeAreaInset} from "../../../../safe-area/safe-area-inset";
import {createSafeAreaInset} from "../../../../safe-area/safe-area-inset";
import type {Resize} from "../../../../action/resize/resize";
import type {Update} from "../../../../action/game-loop/update";
import type {PreRender} from "../../../../action/game-loop/pre-render";
import {
  ARMDOZER_EFFECT_STANDARD_X,
  ARMDOZER_EFFECT_STANDARD_Y,
  ARMDOZER_EFFECT_STANDARD_Z
} from "../../../../game-object/armdozer/position";
import {toHUDCoordinate} from "./coordinate";
import {NeoLandozerCutIn} from "../../../../game-object/cut-in/neo-landozer/neo-landozer-cutin";
import {NeoLandozerHUD} from "./hud/armdozer/neo-landozer";
import type {ArmDozerSprite} from "../../../../game-object/armdozer/armdozer-sprite";
import {Gauge} from "../../../../game-object/gauge/gauge";

/** コンストラクタのパラメータ */
type Param = {
  resources: Resources,
  rendererDOM: HTMLElement,
  playerId: PlayerId,
  players: Player[],
  listener: {
    gameLoop: Observable<GameLoop>,
    domEvent: Observable<TdDOMEvent>,
    resize: Observable<Resize>,
  }
};

/** 戦闘シーンビューのイベント通知 */
type Notifier = {
  render: Observable<Render>,
  battleAction: Observable<BattleSceneAction>,
};

/**
 * 戦闘画面のビュー
 */
export class BattleSceneView {
  td: ThreeDimensionLayer;
  hud: HudLayer;
  _playerId: PlayerId;
  _safeAreaInset: SafeAreaInset;
  _rendererDOM: HTMLElement;
  _rendering: Subject<Render>;
  _updateTD: Subject<Update>;
  _preRenderTD: Subject<PreRender>;
  _updateHUD: Subject<Update>;
  _preRenderHUD: Subject<PreRender>;

  constructor(param: Param) {
    this._playerId = param.playerId;
    this._safeAreaInset = createSafeAreaInset();
    this._rendererDOM = param.rendererDOM;
    this._rendering = new Subject();
    this._updateTD = new Subject();
    this._preRenderTD = new Subject();
    this._updateHUD = new Subject();
    this._preRenderHUD = new Subject();

    this.td = new ThreeDimensionLayer({
      resources: param.resources,
      rendererDOM: param.rendererDOM,
      safeAreaInset: this._safeAreaInset,
      playerId: param.playerId,
      players: param.players,
      listener: {
        domEvent: param.listener.domEvent,
        resize: param.listener.resize,
        update: this._updateTD,
        preRender: this._preRenderTD,
      }
    });

    this.hud = new HudLayer({
      resources: param.resources,
      rendererDOM: param.rendererDOM,
      playerId: param.playerId,
      players: param.players,
      listener: {
        domEvent: param.listener.domEvent,
        resize: param.listener.resize,
        update: this._updateHUD,
        preRender: this._preRenderHUD,
      }
    });

    param.listener.gameLoop.subscribe(action => {
      this._gameLoop(action);
    });
  }

  /** デストラクタ */
  destructor(): void {
    this.hud.destructor();
    this.td.destructor();
  }

  /**
   * イベント通知ストリームを取得する
   *
   * @return イベント通知ストリーム
   */
  notifier(): Notifier {
    return {
      render: this._rendering,
      battleAction: this.hud.notifier().battleAction,
    };
  }

  /** ゲームループ */
  _gameLoop(action: GameLoop): void {
    TWEEN.update(action.time);

    this._updateTD.next({
      type: 'Update',
      time: action.time
    });
    this._preRenderTD.next({
      type: 'PreRender',
      camera: this.td.camera.getCamera(),
      rendererDOM: this._rendererDOM,
      safeAreaInset: this._safeAreaInset,
    });
    this._rendering.next({
      type: 'Render',
      scene: this.td.scene,
      camera: this.td.camera.getCamera()
    });

    this._updateHUD.next({
      type: 'Update',
      time: action.time
    });
    this._trackingTD();
    this._preRenderHUD.next({
      type: 'PreRender',
      camera: this.hud.camera.getCamera(),
      rendererDOM: this._rendererDOM,
      safeAreaInset: this._safeAreaInset,
    });
    this._rendering.next({
      type: 'Render',
      scene: this.hud.scene,
      camera: this.hud.camera.getCamera()
    });
  }

  /**
   * 3Dレイヤーの内容をトラッキングする
   */
  _trackingTD(): void {
    this.hud.players.forEach(v => {
      if (v.playerId === this._playerId) {
        this._trackingPlayerGauge(v.gauge);
      } else {
        this._trackingEnemyGauge(v.gauge);
      }
    });

    this.hud.armdozers.forEach(hudArmdozer => {
      this.td.sprites
        .filter(tdSprite => tdSprite.playerId === hudArmdozer.playerId)
        .forEach(tdSprite => {
          if (hudArmdozer instanceof NeoLandozerHUD) {
            this._trackingNeoLandozerCutIn(hudArmdozer.cutIn, tdSprite.sprite);
          }
        });
    });
  }

  /**
   * プレイヤーゲージをトラッキングする
   *
   * @param gauge ゲージ
   */
  _trackingPlayerGauge(gauge: Gauge): void {
    const tdCoordinate = {
      x: ARMDOZER_EFFECT_STANDARD_X,
      y: ARMDOZER_EFFECT_STANDARD_Y + 200,
      z: ARMDOZER_EFFECT_STANDARD_Z
    };
    const hudCoordinate = toHUDCoordinate(tdCoordinate, this.td.camera.getCamera(), this._rendererDOM);
    gauge.tracking(hudCoordinate.x, hudCoordinate.y);
  }

  /**
   * 敵ゲージをトラッキングする
   *
   * @param gauge ゲージ
   */
  _trackingEnemyGauge(gauge: Gauge): void {
    const tdCoordinate = {
      x: -ARMDOZER_EFFECT_STANDARD_X,
      y: ARMDOZER_EFFECT_STANDARD_Y + 200,
      z: ARMDOZER_EFFECT_STANDARD_Z
    };
    const hudCoordinate = toHUDCoordinate(tdCoordinate, this.td.camera.getCamera(), this._rendererDOM);
    gauge.tracking(hudCoordinate.x, hudCoordinate.y);
  }

  /**
   * ネオランドーザカットインのトラッキング
   *
   * @param cutIn カットイン
   * @param sprite スプライト
   */
  _trackingNeoLandozerCutIn(cutIn: NeoLandozerCutIn, sprite: ArmDozerSprite): void {
    const target =sprite.getObject3D();
    const tdPosition = {
      x: target.position.x,
      y: ARMDOZER_EFFECT_STANDARD_Y,
      z: target.position.z
    };
    const hudPosition = toHUDCoordinate(tdPosition, this.td.camera.getCamera(), this._rendererDOM);
    cutIn.tracking(hudPosition.x, hudPosition.y);
  }
}
