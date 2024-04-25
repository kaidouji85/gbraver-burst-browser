import {
  Battle,
  EMPTY_GAME_STATE,
  GameState,
  GameStateX,
  PlayerId,
} from "gbraver-burst-core";

import { hasDeliveredFinishBlow } from "../../../src/js/custom-battle-events/has-delivered-finish-blow";

/**
 * Battleのゲームステートを生成する
 * @param attacker 攻撃側プレイヤーID
 * @param isDeath 防御側が死亡したかどうか、trueで死亡
 * @returns Battleのゲームステート
 */
const createBattle = (
  attacker: PlayerId,
  isDeath: boolean,
): GameStateX<Battle> => ({
  ...EMPTY_GAME_STATE,
  effect: {
    name: "Battle",
    attacker,
    isDeath,
    result: {
      name: "NormalHit",
      damage: 2000,
    },
  },
});

/** プレイヤー01 */
const player01 = "player-01";

/** プレイヤー01 戦闘 相手は存命 */
const player01Battle = createBattle(player01, false);

/** プレイヤー01 戦闘 相手は死亡 */
const player01VictoriousBattle = createBattle(player01, true);

/** プレイヤー02 */
const player02 = "player-02";

/** プレイヤー02 戦闘 相手は存命 */
const player02Battle = createBattle(player02, false);

/** プレイヤー02 戦闘 相手は死亡 */
const player02VictoriousBattle = createBattle(player02, true);

/** それ以外のゲームステート */
const other: GameState = {
  ...EMPTY_GAME_STATE,
  effect: {
    name: "InputCommand",
    players: [],
  },
};

test("指定したプレイヤーが相手を倒した戦闘を検出することができる", () => {
  expect(
    hasDeliveredFinishBlow(
      [
        other,
        player01Battle,
        other,
        other,
        player02Battle,
        other,
        other,
        player01Battle,
        other,
        other,
        player02Battle,
        other,
        other,
        player01VictoriousBattle,
        other,
      ],
      player01,
    ),
  ).toBe(true);
});

test("相手を倒した戦闘が含まれていても、指定したプレイヤーのものでなければfalseを返す", () => {
  expect(
    hasDeliveredFinishBlow(
      [
        other,
        player01Battle,
        other,
        other,
        player02Battle,
        other,
        other,
        player01Battle,
        other,
        other,
        player02VictoriousBattle,
        other,
      ],
      player01,
    ),
  ).toBe(false);
});

test("相手を倒していない戦闘だけステートヒストリーにある場合、falseを返す", () => {
  expect(
    hasDeliveredFinishBlow(
      [other, player01Battle, other, other, player02Battle, other],
      player01,
    ),
  ).toBe(false);
});

test("戦闘がないステートヒストリーなら、falseを返す", () => {
  expect(hasDeliveredFinishBlow([other, other, other, other], player01)).toBe(
    false,
  );
});

test("空のステートヒストリーなら、falseを返す", () => {
  expect(hasDeliveredFinishBlow([other, other, other, other], player01)).toBe(
    false,
  );
});
