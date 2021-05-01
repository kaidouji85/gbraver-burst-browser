// @flow

import type {ArmDozerSprite} from "../../../../../../game-object/armdozer/armdozer-sprite";
import type {ArmdozerEffect, GameStateX, PlayerId, UpdateRemainingTurn} from "gbraver-burst-core";
import type {TDArmdozerObjects} from "../../../view/td/armdozer-objects/armdozer-objects";
import {BattleSceneView} from "../../../view";

/**
 * アームドーザ効果終了アニメーション パラメータ
 * 本タイプは引数、戻り値などに直接使ってはいけない
 *
 * @template SPRITE スプライト
 * @template TD_ARMDOZER 3Dレイヤーアームドーザ固有オブジェクト
 * @template EFFECT 終了したアームドーザ効果
 */
export type EndArmdozerEffectParamX<SPRITE: ArmDozerSprite, TD_ARMDOZER: TDArmdozerObjects, EFFECT> = {
  /** @deprecated */
  sprite: SPRITE,
  tdArmdozer: TD_ARMDOZER,
  endArmdozerEffect: EFFECT
};

/**
 * アームドーザ効果終了アニメーション パラメータ
 */
export type EndArmdozerEffectParam = EndArmdozerEffectParamX<ArmDozerSprite, TDArmdozerObjects, ArmdozerEffect>;

/**
 * 指定したプレイヤーからアニメパラメータ配列を生成する
 * 生成できない場合はnullを返す
 *
 * @param playerId プレイヤーID
 * @param view ビュー
 * @param gameState ゲームステート
 * @return 生成結果
 */
export function toEndArmDozerEffectParams(playerId: PlayerId, view: BattleSceneView, gameState: GameStateX<UpdateRemainingTurn>): EndArmdozerEffectParam[] {
  const tdArmdozer = view.td.armdozerObjects.find(v => v.playerId === playerId);
  const endArmdozerEffects = gameState.effect.endArmdozerEffects.filter(v => v.playerId === playerId);
  if (!tdArmdozer) {
    return [];
  }

  return endArmdozerEffects.map(v => ({
    sprite: tdArmdozer.sprite(),
    tdArmdozer: tdArmdozer,
    endArmdozerEffect: v.effect
  }));
}