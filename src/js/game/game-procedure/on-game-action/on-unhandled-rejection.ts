import { isAbortError } from "../../../abort-cntroller/abort-error";
import { UnhandledRejection } from "../../game-actions/unhandled-rejection";
import { GameProps } from "../../game-props";

/** オプション */
type Options = {
  /** ゲームプロパティ */
  props: GameProps;
  /** アクション */
  action: UnhandledRejection;
};

/**
 * Promise rejectionが処理されなかった時の処理
 * @param options オプション
 */
export function onUnhandledRejection(options: Options): void {
  const event = options.action.event;

  // AbortErrorの場合はPromiseを中断したとみなし、例外を握りつぶす
  if (isAbortError(event.reason)) {
    event.preventDefault();
    return;
  }

  throw event.reason;
}
