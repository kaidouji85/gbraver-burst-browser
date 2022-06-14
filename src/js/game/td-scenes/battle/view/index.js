// @flow
import TWEEN from "@tweenjs/tween.js";
import type {Player, PlayerId} from "gbraver-burst-core";
import type {GameLoop} from "../../../../game-loop/game-loop";
import type {PreRender} from "../../../../game-loop/pre-render";
import type {Update} from "../../../../game-loop/update";
import type {OverlapNotifier} from "../../../../render/overla-notifier";
import type {RendererDomGetter} from "../../../../render/renderer-dom-getter";
import type {Rendering} from "../../../../render/rendering";
import type {Resources} from '../../../../resource';
import type {SafeAreaInset} from "../../../../safe-area/safe-area-inset";
import {createSafeAreaInset} from "../../../../safe-area/safe-area-inset";
import type {Stream, StreamSource} from "../../../../stream/stream";
import {createStreamSource} from "../../../../stream/stream";
import type {Resize} from "../../../../window/resize";
import type {BattleSceneAction} from "../actions";
import {HudLayer} from './hud';
import {ThreeDimensionLayer} from './td';
import {tracking} from "./tracking";

/** 戦闘シーンビューで利用するレンダラ */
interface OwnRenderer extends OverlapNotifier, RendererDomGetter, Rendering {}

/** コンストラクタのパラメータ */
type Param = {
  resources: Resources,
  renderer: OwnRenderer,
  player: Player,
  enemy: Player,
  gameLoop: Stream<GameLoop>,
  resize: Stream<Resize>,
};

/**
 * 戦闘画面のビュー
 */
export class BattleSceneView {
  td: ThreeDimensionLayer;
  hud: HudLayer;
  #playerId: PlayerId;
  #safeAreaInset: SafeAreaInset;
  #renderer: OwnRenderer;
  #updateTD: StreamSource<Update>;
  #preRenderTD: StreamSource<PreRender>;
  #updateHUD: StreamSource<Update>;
  #preRenderHUD: StreamSource<PreRender>;

  constructor(param: Param) {
    this.#playerId = param.player.playerId;
    this.#safeAreaInset = createSafeAreaInset();
    this.#renderer = param.renderer;
    this.#updateTD = createStreamSource();
    this.#preRenderTD = createStreamSource();
    this.#updateHUD = createStreamSource();
    this.#preRenderHUD = createStreamSource();

    this.td = new ThreeDimensionLayer({
      resources: param.resources,
      renderer: param.renderer,
      safeAreaInset: this.#safeAreaInset,
      player: param.player,
      enemy: param.enemy,
      resize: param.resize,
      update: this.#updateTD,
      preRender: this.#preRenderTD,
    });

    this.hud = new HudLayer({
      resources: param.resources,
      renderer: param.renderer,
      player: param.player,
      enemy: param.enemy,
      resize: param.resize,
      update: this.#updateHUD,
      preRender: this.#preRenderHUD,
    });

    param.gameLoop.subscribe(action => {
      this.#gameLoop(action);
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
   * 戦闘シーンアクションを通知する
   * @return 通知ストリーム
   */
  battleActionNotifier(): Stream<BattleSceneAction> {
    return this.hud.battleActionNotifier();
  }

  /**
   * ゲームループ
   *
   * @param action アクション
   */
  #gameLoop(action: GameLoop): void {
    TWEEN.update(action.time);

    this.#updateTD.next({
      type: 'Update',
      time: action.time
    });
    this.#preRenderTD.next({
      type: 'PreRender',
      camera: this.td.camera.getCamera(),
      rendererDOM: this.#renderer.getRendererDOM(),
      safeAreaInset: this.#safeAreaInset,
    });
    this.#renderer.rendering(this.td.scene, this.td.camera.getCamera());

    this.#updateHUD.next({
      type: 'Update',
      time: action.time
    });
    tracking(this.td, this.hud, this.#playerId, this.#renderer.getRendererDOM());
    this.#preRenderHUD.next({
      type: 'PreRender',
      camera: this.hud.camera.getCamera(),
      rendererDOM: this.#renderer.getRendererDOM(),
      safeAreaInset: this.#safeAreaInset,
    });
    this.#renderer.rendering(this.hud.scene, this.hud.camera.getCamera());
  }
}
