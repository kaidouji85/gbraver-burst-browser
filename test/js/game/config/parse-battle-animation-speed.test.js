// @flow
import {parseBattleAnimationSpeed} from "../../../../src/js/game/config/browser-config";

test('有効な戦闘アニメ再生速度はパースできる', () => {
  expect(parseBattleAnimationSpeed(1)).toBe(1);
});

test('文字列でも有効な戦闘アニメ再生速度ならパースできる', () => {
  expect(parseBattleAnimationSpeed('2')).toBe(2);
});

test('無効な戦闘アニメ再生速度はパースできない', () => {
  expect(parseBattleAnimationSpeed(1.1)).toBe(null);
});

test('有効な戦闘アニメ再生速度でない文字列はパースできない', () => {
  expect(parseBattleAnimationSpeed('2x')).toBe(null);
});

test('空文字はパースできない', () => {
  expect(parseBattleAnimationSpeed('')).toBe(null);
});

test('nullはパースできない', () => {
  expect(parseBattleAnimationSpeed(null)).toBe(null);
});

test('undefinedはパースできない', () => {
  expect(parseBattleAnimationSpeed(undefined)).toBe(null);
});