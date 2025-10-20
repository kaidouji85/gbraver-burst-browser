import { BattleAnimationTimeScales } from "../../../../../src/js/game/config/browser-config";
import { BattleAnimationTimeScaleSchema } from "../../../../../src/js/game/config/parser/battle-animation-time-scale";

test("有効な戦闘アニメタイムスケールはパースできる", () => {
  BattleAnimationTimeScales.forEach((v) => {
    expect(BattleAnimationTimeScaleSchema.parse(v)).toBe(v);
  });
});

test("文字列でも有効な戦闘アニメタイムスケールならパースできる", () => {
  expect(BattleAnimationTimeScaleSchema.parse("0.5")).toBe(0.5);
});

test("無効な戦闘アニメタイムスケールはパースできない", () => {
  expect(() => BattleAnimationTimeScaleSchema.parse(0.8)).toThrow();
});

test("有効な戦闘アニメタイムスケールでない文字列はパースできない", () => {
  expect(() => BattleAnimationTimeScaleSchema.parse("0.5x")).toThrow();
});

test("空文字はパースできない", () => {
  expect(() => BattleAnimationTimeScaleSchema.parse("")).toThrow();
});

test("nullはパースできない", () => {
  expect(() => BattleAnimationTimeScaleSchema.parse(null)).toThrow();
});

test("undefinedはパースできない", () => {
  expect(() => BattleAnimationTimeScaleSchema.parse(undefined)).toThrow();
});
