import { EMPTY_PLAYER } from "gbraver-burst-core";

import { DefaultStage } from "../../../src/js/game/npc-battle/courses/npc-battle-stage";
import { updateNPCBattleState } from "../../../src/js/game/npc-battle/npc-battle";

const player = { ...EMPTY_PLAYER, playerId: "npc-battle-player" };
const stages = [DefaultStage, DefaultStage, DefaultStage];

test("ステージクリアの処理が正しい", () => {
  const state = {
    player,
    stages,
    stageIndex: 0,
  };
  expect(
    updateNPCBattleState(state, {
      type: "GameOver",
      winner: player.playerId,
    }),
  ).toEqual({
    state: { ...state, stageIndex: 1 },
    result: "StageClear",
  });
});

test("ステージミスの処理が正しい", () => {
  const state = {
    player,
    stages,
    stageIndex: 0,
  };
  expect(
    updateNPCBattleState(state, {
      type: "GameOver",
      winner: "not-player",
    }),
  ).toEqual({
    state,
    result: "StageMiss",
  });
});

test("引き分けはステージミスとみなす", () => {
  const state = {
    player,
    stages,
    stageIndex: 0,
  };
  expect(
    updateNPCBattleState(state, {
      type: "EvenMatch",
    }),
  ).toEqual({
    state,
    result: "StageMiss",
  });
});

test("最終ステージクリアの処理が正しい", () => {
  const state = {
    player,
    stages,
    stageIndex: 2,
  };
  expect(
    updateNPCBattleState(state, {
      type: "GameOver",
      winner: player.playerId,
    }),
  ).toEqual({
    state,
    result: "NPCBattleComplete",
  });
});

test("最終ステージミスの処理が正しい", () => {
  const state = {
    player,
    stages,
    stageIndex: 2,
  };
  expect(
    updateNPCBattleState(state, {
      type: "GameOver",
      winner: "not-player",
    }),
  ).toEqual({
    state,
    result: "StageMiss",
  });
});

test("最終ステージでも引き分けはミスとみなす", () => {
  const state = {
    player,
    stages,
    stageIndex: 2,
  };
  expect(
    updateNPCBattleState(state, {
      type: "EvenMatch",
    }),
  ).toEqual({
    state,
    result: "StageMiss",
  });
});

test("ステート不整合の場合はnullを返す", () => {
  const state = {
    player,
    stages,
    stageIndex: 4,
  };
  expect(
    updateNPCBattleState(state, {
      type: "GameOver",
      winner: player.playerId,
    }),
  ).toEqual(null);
});
