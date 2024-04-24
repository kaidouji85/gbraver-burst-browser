import { Subject } from "rxjs";

import { PreRender } from "../../../../game-loop/pre-render";
import { Update } from "../../../../game-loop/update";
import { createSafeAreaInset } from "../../../../safe-area/safe-area-inset";
import { BattleViewCreatorParams } from "../creator-params";
import { createDOMLayer } from "../dom";
import { createHUDLayer } from "../hud";
import { BattleSceneRender, BattleSceneViewProps } from "../props";
import { createTDLayer } from "../td";

/** 生成パラメータ */
export type BattleSceneViewPropsCreatorParams = BattleViewCreatorParams & {
  /** レンダラ */
  renderer: BattleSceneRender;
};

/**
 * BattleSceneViewPropsを生成する
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function createBattleSceneViewProps(
  params: BattleSceneViewPropsCreatorParams,
): BattleSceneViewProps {
  const { player, renderer } = params;
  const playerId = player.playerId;
  const safeAreaInset = createSafeAreaInset();

  const updateTD = new Subject<Update>();
  const preRenderTD = new Subject<PreRender>();
  const updateHUD = new Subject<Update>();
  const preRenderHUD = new Subject<PreRender>();

  const td = createTDLayer({
    ...params,
    update: updateTD,
    preRender: preRenderTD,
  });
  const hud = createHUDLayer({
    ...params,
    update: updateHUD,
    preRender: preRenderHUD,
  });
  const dom = createDOMLayer(params);

  return {
    playerId,
    safeAreaInset,
    renderer,
    updateTD,
    preRenderTD,
    updateHUD,
    preRenderHUD,
    td,
    hud,
    dom,
  };
}
