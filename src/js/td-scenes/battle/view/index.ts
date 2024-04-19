import * as TWEEN from "@tweenjs/tween.js";
import type { PlayerId } from "gbraver-burst-core";
import { merge, Observable, Subject } from "rxjs";

import type { GameLoop } from "../../../game-loop/game-loop";
import type { PreRender } from "../../../game-loop/pre-render";
import type { Update } from "../../../game-loop/update";
import type { OverlapNotifier } from "../../../render/overlap-notifier";
import type { RendererDomGetter } from "../../../render/renderer-dom-getter";
import type { Rendering } from "../../../render/rendering";
import type { SafeAreaInset } from "../../../safe-area/safe-area-inset";
import { createSafeAreaInset } from "../../../safe-area/safe-area-inset";
import type { BattleSceneAction } from "../actions";
import { BattleViewCreatorParams } from "./creator-params";
import { createDOMLayer, DOMLayer } from "./dom";
import { HudLayer } from "./hud";
import { ThreeDimensionLayer } from "./td";
import { tracking } from "./tracking";

/** 戦闘シーンビューで利用するレンダラ */
interface OwnRenderer extends OverlapNotifier, RendererDomGetter, Rendering {}

/** コンストラクタのパラメータ */
type Param = BattleViewCreatorParams & {
  /** レンダラ */
  renderer: OwnRenderer;
};

/** 戦闘画面のビュー */
export class BattleSceneView {
  td: ThreeDimensionLayer;
  hud: HudLayer;
  dom: DOMLayer;
  #playerId: PlayerId;
  #safeAreaInset: SafeAreaInset;
  #renderer: OwnRenderer;
  #updateTD: Subject<Update>;
  #preRenderTD: Subject<PreRender>;
  #updateHUD: Subject<Update>;
  #preRenderHUD: Subject<PreRender>;

  /**
   * コンストラクタ
   * @param param パラメータ
   */
  constructor(param: Param) {
    this.#playerId = param.player.playerId;
    this.#safeAreaInset = createSafeAreaInset();
    this.#renderer = param.renderer;
    this.#updateTD = new Subject();
    this.#preRenderTD = new Subject();
    this.#updateHUD = new Subject();
    this.#preRenderHUD = new Subject();
    this.td = new ThreeDimensionLayer({
      ...param,
      update: this.#updateTD,
      preRender: this.#preRenderTD,
    });
    this.hud = new HudLayer({
      ...param,
      update: this.#updateHUD,
      preRender: this.#preRenderHUD,
    });
    this.dom = createDOMLayer(param);
    param.gameLoop.subscribe((action) => {
      this.#gameLoop(action);
    });
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.hud.destructor();
    this.td.destructor();
    this.dom.destructor();
  }

  /**
   * 戦闘シーンアクションを通知する
   * @return 通知ストリーム
   */
  battleActionNotifier(): Observable<BattleSceneAction> {
    return merge(
      this.hud.battleActionNotifier(),
      this.dom.battleActionNotifier(),
    );
  }

  /**
   * ゲームループ
   * @param action アクション
   */
  #gameLoop(action: GameLoop): void {
    TWEEN.update(action.time);
    this.#updateTD.next({
      type: "Update",
      time: action.time,
    });
    this.#preRenderTD.next({
      type: "PreRender",
      camera: this.td.camera.getCamera(),
      rendererDOM: this.#renderer.getRendererDOM(),
      safeAreaInset: this.#safeAreaInset,
    });
    this.#renderer.rendering(this.td.scene, this.td.camera.getCamera());
    this.#updateHUD.next({
      type: "Update",
      time: action.time,
    });
    tracking(
      this.td,
      this.hud,
      this.#playerId,
      this.#renderer.getRendererDOM(),
    );
    this.#preRenderHUD.next({
      type: "PreRender",
      camera: this.hud.camera.getCamera(),
      rendererDOM: this.#renderer.getRendererDOM(),
      safeAreaInset: this.#safeAreaInset,
    });
    this.#renderer.rendering(this.hud.scene, this.hud.camera.getCamera());
  }
}
