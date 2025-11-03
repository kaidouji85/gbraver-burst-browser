import { EMPTY_PLAYER, GameEnd } from "gbraver-burst-core";

import { EmptyCustomBattleEvent } from "../../../../src/js/custom-battle-events/empty-custom-battle-event";
import { Episode } from "../../../../src/js/game/story/episode";
import { isPlayerWin } from "../../../../src/js/game/story/is-player-win";
import { createEmptyNPC } from "../../../data/npc";

/** テストプレイヤー */
const testPlayer = {
  ...EMPTY_PLAYER,
  playerId: "test-player",
};

/** テストエネミー */
const testEnemy = {
  ...EMPTY_PLAYER,
  playerId: "test-enemy",
};

/** テスト用エピソード */
const currentEpisode: Episode = {
  id: "test-episode",
  type: "Episode",
  number: "1.0",
  isTutorial: true,
  title: "Test Episode",
  introduction: "This is a test episode.",
  imageCutPathId: "test-path",
  npc: createEmptyNPC(),
  player: testPlayer,
  bgm: "test-bgm",
  isLosingEvent: false,
  event: () => new EmptyCustomBattleEvent(),
};

test("プレイヤーが勝利した場合は、trueを返す", () => {
  const gameEnd: GameEnd = {
    name: "GameEnd",
    result: { type: "GameOver", winner: testPlayer.playerId },
  };
  expect(isPlayerWin({ currentEpisode, gameEnd })).toBe(true);
});

test("敵が勝利した場合は、falseを返す", () => {
  const gameEnd: GameEnd = {
    name: "GameEnd",
    result: { type: "GameOver", winner: testEnemy.playerId },
  };
  expect(isPlayerWin({ currentEpisode, gameEnd })).toBe(false);
});

test("引き分けの場合は、falseを返す", () => {
  const gameEnd: GameEnd = {
    name: "GameEnd",
    result: { type: "EvenMatch" },
  };
  expect(isPlayerWin({ currentEpisode, gameEnd })).toBe(false);
});
