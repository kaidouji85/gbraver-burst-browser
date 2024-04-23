import * as TWEEN from "@tweenjs/tween.js";
import type { PlayerId } from "gbraver-burst-core";
import { merge, Observable, Subject, Unsubscribable } from "rxjs";

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
import { createHUDLayer, HUDLayer } from "./hud";
import { createTDLayer, TDLayer } from "./td";
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
  /** 3Dレイヤー */
  td: TDLayer;
  /** HUDレイヤー */
  hud: HUDLayer;
  /** DOMレイヤー */
  dom: DOMLayer;
  /** 画面を開いているプレイヤーのID */
  #playerId: PlayerId;
  /** セーフエリア員セット */
  #safeAreaInset: SafeAreaInset;
  /** レンダラ */
  #renderer: OwnRenderer;
  /** 3Dレイヤー アップデート */
  #updateTD: Subject<Update>;
  /** 3Dレイヤー プリレンダ */
  #preRenderTD: Subject<PreRender>;
  /** HUDレイヤー アップデート */
  #updateHUD: Subject<Update>;
  /** HUDレイヤー プリレンダ */
  #preRenderHUD: Subject<PreRender>;
  /** アンサブスクライバ */
  #unsubscribers: Unsubscribable[];

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
    this.td = createTDLayer({
      ...param,
      update: this.#updateTD,
      preRender: this.#preRenderTD,
    });
    this.hud = createHUDLayer({
      ...param,
      update: this.#updateHUD,
      preRender: this.#preRenderHUD,
    });
    this.dom = createDOMLayer(param);
    this.#unsubscribers = [
      param.gameLoop.subscribe((action) => {
        this.#gameLoop(action);
      }),
    ];
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.hud.destructor();
    this.td.destructor();
    this.dom.destructor();
    this.#unsubscribers.forEach((u) => {
      u.unsubscribe();
    });
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
    tracking({
      td: this.td,
      hud: this.hud,
      activePlayerId: this.#playerId,
      rendererDOM: this.#renderer.getRendererDOM(),
    });
    this.#preRenderHUD.next({
      type: "PreRender",
      camera: this.hud.camera.getCamera(),
      rendererDOM: this.#renderer.getRendererDOM(),
      safeAreaInset: this.#safeAreaInset,
    });
    this.#renderer.rendering(this.hud.scene, this.hud.camera.getCamera());
  }
}
