// @flow
import {parseBattleAnimationTimeScale} from "../../../../src/js/game/config/browser-config";

test('有効な戦闘アニメタイムスケールはパースできる', () => {
  expect(parseBattleAnimationTimeScale(1)).toBe(1);
});

test('文字列でも有効な戦闘アニメタイムスケールならパースできる', () => {
  expect(parseBattleAnimationTimeScale('0.5')).toBe(0.5);
});

test('無効な戦闘アニメタイムスケールはパースできない', () => {
  expect(parseBattleAnimationTimeScale(0.8)).toBe(null);
});

test('有効な戦闘アニメタイムスケールでない文字列はパースできない', () => {
  expect(parseBattleAnimationTimeScale('0.5x')).toBe(null);
});

test('空文字はパースできない', () => {
  expect(parseBattleAnimationTimeScale('')).toBe(null);
});

test('nullはパースできない', () => {
  expect(parseBattleAnimationTimeScale(null)).toBe(null);
});

test('undefinedはパースできない', () => {
  expect(parseBattleAnimationTimeScale(undefined)).toBe(null);
});