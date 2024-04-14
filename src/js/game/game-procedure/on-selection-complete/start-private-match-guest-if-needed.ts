import { PrivateMatchGuestDialog } from "../../../dom-dialogs/private-match-guest";
import { privateMatchGuestDialogConnector } from "../../action-connector/private-match-guest-dialog-connector";
import { SelectionComplete } from "../../game-actions/selection-complete";
import { GameProps } from "../../game-props";
import { InProgress } from "../../in-progress/in-progress";

/** プライベートマッチ（ゲスト）を開始した */
type IsPrivateMatchGuestStarted = {
  isStarted: true;
  /** InProgress更新結果 */
  inProgress: InProgress;
};

/** プライベートマッチ（ゲスト）を開始していない */
type IsNotPrivateatchGuestStarted = {
  isStarted: false;
};

/** プライベートマッチ（ゲスト）開始情報 */
type Ret = IsPrivateMatchGuestStarted | IsNotPrivateatchGuestStarted;

/**
 * 条件を満たした場合、プライベートマッチ（ゲスト）を開始する
 * @param props ゲームプロパティ
 * @param action アクション
 * @return プライベートマッチ（ゲスト）開始情報
 */
export async function startPrivateMatchGuestIfNeeded(
  props: Readonly<GameProps>,
  action: Readonly<SelectionComplete>,
): Promise<Ret> {
  if (props.inProgress.type !== "PrivateMatchGuest") {
    return { isStarted: false };
  }

  props.domDialogBinder.bind(
    new PrivateMatchGuestDialog(props),
    privateMatchGuestDialogConnector,
  );
  return {
    isStarted: true,
    inProgress: {
      ...props.inProgress,
      privateMatchGuest: {
        type: "Entry",
        armdozerId: action.armdozerId,
        pilotId: action.pilotId,
      },
    },
  };
}
