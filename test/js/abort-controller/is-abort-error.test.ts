import {
  createAbortError,
  isAbortError,
} from "../../../src/js/abort-cntroller/abort-error";

test("createAbortErrorで生成したものはAbortErrorである", () => {
  const error = createAbortError("test");
  expect(isAbortError(error)).toBe(true);
});

test("createAbortErrorで生成していなくても、DOMExceptionかつnameがAbortErrorならAbortErrorである", () => {
  const error = new DOMException("test", "AbortError");
  expect(isAbortError(error)).toBe(true);
});

test("nameプロパティがAbortErrorでもDOMExceptionのインスタンスでなければAbortErrorでない", () => {
  const error = { name: "AbortError" };
  expect(isAbortError(error)).toBe(false);
});

test("DOMExceptionであってもnameがAbortErrorでなければAbortErrorではない", () => {
  const error = new DOMException("test", "NotAbortError");
  expect(isAbortError(error)).toBe(false);
});

test("Errorをインスタンス化したものはAbortErrorでない", () => {
  const error = new Error("test");
  expect(isAbortError(error)).toBe(false);
});

test("nullはAbortErrorでない", () => {
  const error = null;
  expect(isAbortError(error)).toBe(false);
});

test("undefinedはAbortErrorでない", () => {
  const error = undefined;
  expect(isAbortError(error)).toBe(false);
});
