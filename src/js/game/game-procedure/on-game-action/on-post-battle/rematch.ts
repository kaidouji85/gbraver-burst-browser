import { WaitingDialog } from "../../../dialogs/waiting/waiting-dialog";
import { GameProps } from "../../../game-props";
import { CasualMatch } from "../../../in-progress/casual-match";
import { Rematch } from "../../../post-battle";
import { startOnlineBattle } from "../../start-online-battle";
import { switchWaitingDialog } from "../../switch-dialog/switch-waiting-dialog";

/**
 * カジュアルマッチから再戦を行う
 * 本関数はprops.inProgressを変更する副作用を持つ
 * @param options オプション
 * @param options.props ゲームプロパティ
 * @param options.postAction 再戦アクション
 */
const rematchCasualMatch = async (options: {
  props: GameProps & { inProgress: CasualMatch };
  postAction: Readonly<Rematch>;
}) => {
  const { props, postAction } = options;
  const { inProgress } = props;
  if (inProgress.casualMatch.type !== "Rematch") {
    return;
  }

  const { rematchRoom } = inProgress.casualMatch;
  const dialog = new WaitingDialog("通信中......");
  switchWaitingDialog(props, dialog);
  const battle = await rematchRoom.requestRematch(postAction);
  props.inProgress = {
    ...props.inProgress,
    casualMatch: { type: "Battle", battle },
  };
  await startOnlineBattle(props, battle, "再戦");
};

/**
 * 再戦を行う
 * 本関数はprops.inProgressを変更する副作用を持つ
 * @param options オプション
 * @param options.props ゲームプロパティ
 * @param options.postAction 再戦アクション
 */
export const rematch = async (options: {
  props: GameProps;
  postAction: Readonly<Rematch>;
}) => {
  const { props, postAction } = options;
  const { inProgress } = props;
  switch (inProgress.type) {
    case "CasualMatch":
      await rematchCasualMatch({ props: { ...props, inProgress }, postAction });
      break;
  }
};
