import { EMPTY_PLAYER } from "gbraver-burst-core";

import { DefaultStage } from "../../../../src/js/game/npc-battle/stages/default-stage";
import { updateNPCBattleState } from "../../../../src/js/game/npc-battle/updated-npc-battle-state";

/** テストプレイヤー情報 */
const player = { ...EMPTY_PLAYER, playerId: "npc-battle-player" };

/** ステージ情報 */
const stages = [DefaultStage, DefaultStage, DefaultStage];

test("ステージクリアしたらインデックスに+1される", () => {
  const state = { player, stages, stageIndex: 0 };
  expect(updateNPCBattleState(state, "StageClear")).toEqual({
    ...state,
    stageIndex: 1,
  });
});

test("ステージミスしたらステートは変わらない", () => {
  const state = { player, stages, stageIndex: 0 };
  expect(updateNPCBattleState(state, "StageMiss")).toEqual(state);
});

test("最終ステージをクリアしてもインデックスに+1されず、結果としてステートは変わらない", () => {
  const state = { player, stages, stageIndex: 2 };
  expect(updateNPCBattleState(state, "StageClear")).toEqual(state);
});

test("最終ステージでミスをしてもステートは変わらない", () => {
  const state = { player, stages, stageIndex: 2 };
  expect(updateNPCBattleState(state, "StageMiss")).toEqual(state);
});
