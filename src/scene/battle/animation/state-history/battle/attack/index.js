// @flow
import {Animate} from "../../../../../../animation/animate";
import {empty} from "../../../../../../animation/delay";
import {emptyBattleAnimation} from "./empty-battle-animation";
import {BattleSceneView} from "../../../../view";
import type {BattleSceneState} from "../../../../state/battle-scene-state";
import type {GameState} from "gbraver-burst-core/lib/game-state/game-state";
import {ShinBraver} from "../../../../../../game-object/armdozer/shin-breaver/shin-braver";
import {shinBraverAttack} from "./shin-braver";
import {NeoLandozer} from "../../../../../../game-object/armdozer/neo-landozer/neo-landozer";
import {neoLandozerAttack} from "./neo-landozer";
import type {Battle} from "gbraver-burst-core/lib/effect/battle/effect/index";

/** 攻撃側スプライトに応じて、戦闘アニメーションを切り替える */
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

  const sprite = attackerTD.sprite;
  if (sprite instanceof ShinBraver) {
    return shinBraverAttack(view, sceneState, gameState);
  } else if (sprite instanceof NeoLandozer) {
    return neoLandozerAttack(view, sceneState, gameState);
  }

  return emptyBattleAnimation(view, sceneState, gameState);
}