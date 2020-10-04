// @flow
import type {EndBattle} from "../../src/js/game/td-scenes/battle/action/end-battle";
import type {GameEnd} from "gbraver-burst-core";

// TODO gbraver-burst-coreと共有する
/**
 * 空のGameEnd
 */
const EMPTY_GAME_END: GameEnd = {
  name: 'GameEnd',
  result: {
    type: 'GameOver',
    winner: ''
  }
};
/** 空の戦闘終了アクション */
export const EMPTY_END_BATTLE: EndBattle = {
  type: 'endBattle',
  gameEnd: EMPTY_GAME_END
};