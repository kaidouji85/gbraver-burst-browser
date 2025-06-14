import {
  Battle,
  EMPTY_GAME_STATE,
  GameState,
  GameStateX,
  PlayerId,
} from "gbraver-burst-core";

import { getPlayerBattleCount } from "../../../src/js/custom-battle-events/get-battle-count";

/**
 * Battleのゲームステートを生成する
 * @param attacker 攻撃側プレイヤーID
 * @returns Battleのゲームステート
 */
const createBattle = (attacker: PlayerId): GameStateX<Battle> => ({
  ...EMPTY_GAME_STATE,
  effect: {
    name: "Battle",
    attacker,
    isDeath: false,
    result: {
      name: "NormalHit",
      damage: 2000,
    },
  },
});

/** プレイヤー01 */
const player01 = "player-01";

/** プレイヤー01の戦闘 */
const player01Battle = createBattle(player01);

/** プレイヤー02 */
const player02 = "player-02";

/** プレイヤー02の戦闘 */
const player02Battle = createBattle(player02);

/** それ以外のゲームステート */
const other: GameState = {
  ...EMPTY_GAME_STATE,
  effect: {
    name: "InputCommand",
    players: [],
  },
};

test("指定したプレイヤーの戦闘回数を正しくカウントすることができる", () => {
  expect(
    getPlayerBattleCount(
      [
        other,
        player01Battle,
        other,
        other,
        player02Battle,
        other,
        player01Battle,
        other,
        player01Battle,
        other,
        other,
      ],
      player01,
    ),
  ).toBe(3);
});

test("ステートに戦闘があっても指定したプレイヤーのものでなければカウントされない", () => {
  expect(
    getPlayerBattleCount(
      [
        other,
        other,
        other,
        player02Battle,
        other,
        other,
        player02Battle,
        other,
        other,
      ],
      player01,
    ),
  ).toBe(0);
});

test("ステートヒストリーにバトルがない場合は0回とみなす", () => {
  expect(
    getPlayerBattleCount([other, other, other, other, other], player01),
  ).toBe(0);
});

test("ステートヒストリーが空配列の場合は0回とみなす", () => {
  expect(getPlayerBattleCount([], player01)).toBe(0);
});
