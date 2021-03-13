// @flow

import TWEEN from "@tweenjs/tween.js";
import type {Resources} from '../../../../resource';
import {ThreeDimensionLayer} from './td';
import {HudLayer} from './hud';
import type {Player, PlayerId} from "gbraver-burst-core";
import type {GameLoop} from "../../../../game-loop/game-loop";
import {Observable} from "rxjs";
import type {BattleSceneAction} from "../actions";
import type {SafeAreaInset} from "../../../../safe-area/safe-area-inset";
import {createSafeAreaInset} from "../../../../safe-area/safe-area-inset";
import type {Resize} from "../../../../window/resize";
import type {Update} from "../../../../game-loop/update";
import type {PreRender} from "../../../../game-loop/pre-render";
import {tracking} from "./tracking";
import type {OverlapNotifier} from "../../../../render/overla-notifier";
import type {RendererDomGetter} from "../../../../render/renderer-dom-getter";
import type {Rendering} from "../../../../render/rendering";
import {RxjsStreamSource, toStream} from "../../../../stream/rxjs";
import type {StreamSource} from "../../../../stream/core";

/** 戦闘シーンビューで利用するレンダラ */
interface OwnRenderer extends OverlapNotifier, RendererDomGetter, Rendering {}

/** コンストラクタのパラメータ */
type Param = {
  resources: Resources,
  renderer: OwnRenderer,
  playerId: PlayerId,
  players: Player[],
  listener: {
    gameLoop: Observable<GameLoop>,
    resize: Observable<Resize>,
  }
};

/** 戦闘シーンビューのイベント通知 */
type Notifier = {
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
  _renderer: OwnRenderer;
  _updateTD: StreamSource<Update>;
  _preRenderTD: StreamSource<PreRender>;
  _updateHUD: StreamSource<Update>;
  _preRenderHUD: StreamSource<PreRender>;

  constructor(param: Param) {
    this._playerId = param.playerId;
    this._safeAreaInset = createSafeAreaInset();
    this._renderer = param.renderer;
    this._updateTD = new RxjsStreamSource();
    this._preRenderTD = new RxjsStreamSource();
    this._updateHUD = new RxjsStreamSource();
    this._preRenderHUD = new RxjsStreamSource();

    this.td = new ThreeDimensionLayer({
      resources: param.resources,
      renderer: param.renderer,
      safeAreaInset: this._safeAreaInset,
      playerId: param.playerId,
      players: param.players,
      listener: {
        resize: toStream(param.listener.resize),
        update: this._updateTD,
        preRender: this._preRenderTD,
      }
    });

    this.hud = new HudLayer({
      resources: param.resources,
      renderer: param.renderer,
      playerId: param.playerId,
      players: param.players,
      listener: {
        resize: toStream(param.listener.resize),
        update: this._updateHUD,
        preRender: this._preRenderHUD,
      }
    });

    param.listener.gameLoop.subscribe(action => {
      this._gameLoop(action);
    });
  }

  /**
   * デストラクタ相当の処理
   */
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
      battleAction: this.hud.notifier().battleAction,
    };
  }

  /**
   * ゲームループ
   *
   * @param action アクション
   */
  _gameLoop(action: GameLoop): void {
    TWEEN.update(action.time);

    this._updateTD.next({
      type: 'Update',
      time: action.time
    });
    this._preRenderTD.next({
      type: 'PreRender',
      camera: this.td.camera.getCamera(),
      rendererDOM: this._renderer.getRendererDOM(),
      safeAreaInset: this._safeAreaInset,
    });
    this._renderer.rendering(this.td.scene, this.td.camera.getCamera());

    this._updateHUD.next({
      type: 'Update',
      time: action.time
    });
    tracking(this.td, this.hud, this._playerId, this._renderer.getRendererDOM());
    this._preRenderHUD.next({
      type: 'PreRender',
      camera: this.hud.camera.getCamera(),
      rendererDOM: this._renderer.getRendererDOM(),
      safeAreaInset: this._safeAreaInset,
    });
    this._renderer.rendering(this.hud.scene, this.hud.camera.getCamera());
  }
}
