import type { GameEnd } from "gbraver-burst-core";

import { EndBattle } from "../../src/js/game/game-actions/end-battle";

// TODO gbraver-burst-coreと共有する
/**
 * 空のGameEnd
 */
const EMPTY_GAME_END: GameEnd = {
  name: "GameEnd",
  result: {
    type: "GameOver",
    winner: "",
  },
};

/** 空の戦闘終了アクション */
export const EMPTY_END_BATTLE: EndBattle = {
  type: "EndBattle",
  gameEnd: EMPTY_GAME_END,
  animationTimeScale: 1,
};
