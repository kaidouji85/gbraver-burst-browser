import * as TWEEN from "@tweenjs/tween.js";

import { GameLoop } from "../../../../game-loop/game-loop";
import { BattleSceneViewProps } from "../props";
import { tracking } from "./tracking";

/**
 * ゲームループ時の処理
 * @param props ビュープロパティ
 * @param action アクション
 */
export function onGameLoop(props: BattleSceneViewProps, action: GameLoop) {
  const {
    playerId,
    updateTD,
    preRenderTD,
    updateHUD,
    preRenderHUD,
    td,
    hud,
    renderer,
    safeAreaInset,
  } = props;
  TWEEN.update(action.time);

  updateTD.next({
    type: "Update",
    time: action.time,
  });
  preRenderTD.next({
    type: "PreRender",
    camera: td.camera.getCamera(),
    rendererDOM: renderer.getRendererDOM(),
    safeAreaInset,
  });
  renderer.rendering(td.scene, td.camera.getCamera());

  updateHUD.next({
    type: "Update",
    time: action.time,
  });
  tracking({
    td,
    hud,
    playerId,
    rendererDOM: renderer.getRendererDOM(),
  });
  preRenderHUD.next({
    type: "PreRender",
    camera: hud.camera.getCamera(),
    rendererDOM: renderer.getRendererDOM(),
    safeAreaInset: safeAreaInset,
  });
  renderer.rendering(hud.scene, hud.camera.getCamera());
}
