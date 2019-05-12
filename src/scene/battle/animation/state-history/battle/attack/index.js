// @flow
import {Animate} from "../../../../../../animation/animate";
import {empty} from "../../../../../../animation/delay";
import {BattleSceneView} from "../../../../view";
import type {BattleSceneState} from "../../../../state/battle-scene-state";
import type {GameState} from "gbraver-burst-core/lib/game-state/game-state";
import {ShinBraver} from "../../../../../../game-object/armdozer/shin-breaver/shin-braver";
import {NeoLandozer} from "../../../../../../game-object/armdozer/neo-landozer/neo-landozer";
import type {Battle} from "gbraver-burst-core/lib/effect/battle/effect/index";
import {shinBraverAttack} from "./shin-braver";
import {overWriteTDSprite} from "../../../../view/td/player";
import {neoLandozerAttack} from "./neo-landozer";
import {emptyAttackAnimation} from "./empty-animation";

/**
 * 攻撃側スプライトに応じて、戦闘アニメーションを切り替える
 *
 * @param view ビュー
 * @param sceneState シーンの状態
 * @param gameState ゲームの状態
 * @return アニメーション
 */
export function attackAnimation(view: BattleSceneView, sceneState: BattleSceneState, gameState: GameState): Animate {
  if (gameState.effect.name !== 'Battle') {
    return empty();
  }

  const effect: Battle = gameState.effect;
  const attackerState = gameState.players.find(v => v.playerId === effect.attacker);
  const attackerTD = view.td.players.find(v => v.playerId === effect.attacker);
  const attackerHUD = view.hud.players.find(v => v.playerId === effect.attacker);
  const defenderState = gameState.players.find(v => v.playerId !== effect.attacker);
  const defenderTD = view.td.players.find(v => v.playerId !== effect.attacker);
  const defenderHUD = view.hud.players.find(v => v.playerId !== effect.attacker);
  if (!attackerState || !attackerTD || !attackerHUD || !defenderState || !defenderTD || !defenderHUD) {
    return empty();
  }

  const commonAnimParam = {
    attackerState: attackerState,
    attackerHUD: attackerHUD,
    defenderState: defenderState,
    defenderTD: defenderTD,
    defenderHUD: defenderHUD,
    tdObjects: view.td.gameObjects,
    hudObjects: view.hud.gameObjects,
    result: effect.result,
  };

  const sprite = attackerTD.sprite;
  if (sprite instanceof ShinBraver) {
    return shinBraverAttack({
      ...commonAnimParam,
      attackerTD: overWriteTDSprite(attackerTD, sprite),
    });
  } else if (sprite instanceof NeoLandozer) {
    return neoLandozerAttack({
      ...commonAnimParam,
      attackerTD: overWriteTDSprite(attackerTD, sprite)
    })
  }

  return emptyAttackAnimation({
    ...commonAnimParam,
    attackerTD: attackerTD,
  });
}
