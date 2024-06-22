import { PrivateMatchGuestDialog } from "../../../../dom-dialogs/private-match-guest";
import { SelectionComplete } from "../../../game-actions/selection-complete";
import { GameProps } from "../../../game-props";
import { InProgress } from "../../../in-progress";
import { switchPrivateMatchGuestDialog } from "../../switch-dialog/switch-private-match-guest-dialog";

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
 * @returns プライベートマッチ（ゲスト）開始情報
 */
export async function startPrivateMatchGuestIfNeeded(
  props: Readonly<GameProps>,
  action: Readonly<SelectionComplete>,
): Promise<Ret> {
  if (props.inProgress.type !== "PrivateMatchGuest") {
    return { isStarted: false };
  }

  switchPrivateMatchGuestDialog(props, new PrivateMatchGuestDialog(props));
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
