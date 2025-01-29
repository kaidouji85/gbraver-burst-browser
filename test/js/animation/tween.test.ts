import { tween } from "../../../src/js/animation/tween";

test("シンプルなTweenの再生時間が正しくセットされている", () => {
  const v = tween({}, (t) => t.to({}, 500));
  expect(v.time).toBe(500);
});

test("チェインした場合でも、正しい再生時間がセットされている", () => {
  const v = tween({}, (t) => t.to({}, 500)).chain(
    tween({}, (t) => t.to({}, 500)),
  );
  expect(v.time).toBe(1000);
});
