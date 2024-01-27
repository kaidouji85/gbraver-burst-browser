import {
  EMPTY_ARMDOZER_STATE,
  EMPTY_PLAYER_STATE,
  PlayerId,
  PlayerState,
} from "gbraver-burst-core";

import { isAllPlayerNoDamage } from "../../../src/js/custom-battle-events/is-all-player-no-damage";

/**
 * ノーダメージのプレイヤーを生成する
 * @param playerId プレイヤーID
 * @return 生成結果
 */
const noDamagePlayer = (playerId: PlayerId): PlayerState => ({
  ...EMPTY_PLAYER_STATE,
  playerId,
  armdozer: {
    ...EMPTY_ARMDOZER_STATE,
    hp: 3100,
    maxHp: 3100,
  },
});

/**
 * ダメージを負ったプレイヤーを生成する
 * @param playerId プレイヤーID
 * @return 生成結果
 */
const damagedPlayer = (playerId: PlayerId): PlayerState => ({
  ...EMPTY_PLAYER_STATE,
  playerId,
  armdozer: {
    ...EMPTY_ARMDOZER_STATE,
    hp: 2000,
    maxHp: 3100,
  },
});

test("ゲーム参加プレイヤー全員であることを判定できる", () => {
  expect(
    isAllPlayerNoDamage([noDamagePlayer("p1"), noDamagePlayer("p2")]),
  ).toBe(true);
});

test("一人でもダメージを負っていたら、falseを返す", () => {
  expect(isAllPlayerNoDamage([noDamagePlayer("p1"), damagedPlayer("p2")])).toBe(
    false,
  );
});

test("全員ダメージを負っていたら、falseを返す", () => {
  expect(isAllPlayerNoDamage([damagedPlayer("p1"), damagedPlayer("p2")])).toBe(
    false,
  );
});
