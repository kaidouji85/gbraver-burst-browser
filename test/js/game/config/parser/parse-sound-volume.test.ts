import { parseSoundVolume } from "../../../../../src/js/game/config/parser/sound-volume";
import {SoundVolumes} from "../../../../../src/js/game/config/browser-config";

test("有効な音量ならパースできる", () => {
  SoundVolumes.forEach(v => {
    expect(parseSoundVolume(v)).toBe(v);
  });
});

test("文字列でも有効な音量ならパースできる", () => {
  expect(parseSoundVolume("0.7")).toBe(0.7);
});

test("無効な音量はパースできない", () => {
  expect(parseSoundVolume(2)).toBe(null);
});

test("有効な音量でない文字列はパースできない", () => {
  expect(parseSoundVolume("0.5x")).toBe(null);
});

test("空文字はパースできない", () => {
  expect(parseSoundVolume("")).toBe(null);
});

test("nullはパースできない", () => {
  expect(parseSoundVolume(null)).toBe(null);
});

test("undefinedはパースできない", () => {
  expect(parseSoundVolume(undefined)).toBe(null);
});
