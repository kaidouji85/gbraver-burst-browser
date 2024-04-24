import { PlayerId } from "gbraver-burst-core";
import { Subject } from "rxjs";

import { PreRender } from "../../../game-loop/pre-render";
import { Update } from "../../../game-loop/update";
import { OverlapNotifier } from "../../../render/overlap-notifier";
import { RendererDomGetter } from "../../../render/renderer-dom-getter";
import { Rendering } from "../../../render/rendering";
import { SafeAreaInset } from "../../../safe-area/safe-area-inset";
import { DOMLayer } from "./dom";
import { HUDLayer } from "./hud";
import { TDLayer } from "./td";

/** 戦闘シーンビューで利用するレンダラ */
export interface BattleSceneRender
  extends OverlapNotifier,
    RendererDomGetter,
    Rendering {}

/** 戦闘シーンビュー レイヤー関連プロパティ */
export type BattleSceneLayers = {
  /** 3Dレイヤー */
  td: TDLayer;
  /** HUDレイヤー */
  hud: HUDLayer;
  /** DOMレイヤー */
  dom: DOMLayer;
};

/** 戦闘シーンビュー プロパティ */
export type BattleSceneViewProps = BattleSceneLayers & {
  /** 画面を開いているプレイヤーのID */
  playerId: PlayerId;
  /** セーフエリアインセット */
  safeAreaInset: SafeAreaInset;
  /** レンダラ */
  renderer: BattleSceneRender;
  /** 3Dレイヤー アップデート */
  updateTD: Subject<Update>;
  /** 3Dレイヤー プリレンダ */
  preRenderTD: Subject<PreRender>;
  /** HUDレイヤー アップデート */
  updateHUD: Subject<Update>;
  /** HUDレイヤー プリレンダ */
  preRenderHUD: Subject<PreRender>;
};
