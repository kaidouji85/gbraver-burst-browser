import { EMPTY_PLAYER } from "gbraver-burst-core";

import { getNPCBattleResult } from "../../../../src/js/game/arcade-mode/npc-battle-result";
import { DefaultStage } from "../../../../src/js/game/arcade-mode/stages/default-stage";

/** テストプレイヤー情報 */
const player = { ...EMPTY_PLAYER, playerId: "arcade-mode-player" };

/** ステージ情報 */
const stages = [DefaultStage, DefaultStage, DefaultStage];

test("プレイヤーが勝利した場合はステージクリアである", () => {
  const state = { player, stages, stageIndex: 0 };
  expect(
    getNPCBattleResult(state, {
      type: "GameOver",
      winner: "arcade-mode-player",
    }),
  ).toEqual("StageClear");
});

test("プレイヤーが敗北した場合はステージミスである", () => {
  const state = { player, stages, stageIndex: 0 };
  expect(
    getNPCBattleResult(state, { type: "GameOver", winner: "enemy" }),
  ).toEqual("StageMiss");
});

test("引き分けの場合はステージミスである", () => {
  const state = { player, stages, stageIndex: 0 };
  expect(getNPCBattleResult(state, { type: "EvenMatch" })).toEqual("StageMiss");
});

test("最終ステージでプレイヤーが勝利した場合はNPCバトルコンプリートとなる", () => {
  const state = { player, stages, stageIndex: 2 };
  expect(
    getNPCBattleResult(state, {
      type: "GameOver",
      winner: "arcade-mode-player",
    }),
  ).toEqual("NPCBattleComplete");
});

test("最終ステージでプレイヤーが敗北した場合でもステージミスである", () => {
  const state = { player, stages, stageIndex: 2 };
  expect(
    getNPCBattleResult(state, {
      type: "GameOver",
      winner: "enemy",
    }),
  ).toEqual("StageMiss");
});

test("最終ステージで引き分けた場合でもステージミスである", () => {
  const state = { player, stages, stageIndex: 2 };
  expect(getNPCBattleResult(state, { type: "EvenMatch" })).toEqual("StageMiss");
});
