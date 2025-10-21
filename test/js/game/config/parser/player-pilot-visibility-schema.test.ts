import { PlayerPilotVisibilitySchema } from "../../../../../src/js/game/config/parser/player-pilot-visibility";

test("visibleはパースできる", () => {
  expect(PlayerPilotVisibilitySchema.parse("visible")).toBe("visible");
});

test("hiddenはパースできる", () => {
  expect(PlayerPilotVisibilitySchema.parse("hidden")).toBe("hidden");
});

test("無効な文字列はパースできない", () => {
  expect(() => PlayerPilotVisibilitySchema.parse("invalid")).toThrow();
});

test("空文字はパースできない", () => {
  expect(() => PlayerPilotVisibilitySchema.parse("")).toThrow();
});

test("nullはパースできない", () => {
  expect(() => PlayerPilotVisibilitySchema.parse(null)).toThrow();
});

test("undefinedはパースできない", () => {
  expect(() => PlayerPilotVisibilitySchema.parse(undefined)).toThrow();
});

test("数値はパースできない", () => {
  expect(() => PlayerPilotVisibilitySchema.parse(123)).toThrow();
});

test("オブジェクトはパースできない", () => {
  expect(() => PlayerPilotVisibilitySchema.parse({})).toThrow();
});
