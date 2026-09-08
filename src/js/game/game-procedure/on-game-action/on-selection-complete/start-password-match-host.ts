import { SelectionComplete } from "../../../game-actions/selection-complete";
import { GameProps } from "../../../game-props";
import { InProgress } from "../../../in-progress";
import { PasswordMatchHost } from "../../../in-progress/password-match-host";
import { Online } from "../../../network-context/online";
import { startPasswordMatch } from "../../start-password-match";
import { waitUntilPasswordMatchingAsHost } from "../../wait-until-password-matching-as-host";

/**
 * あいことば対戦（ホスト）を開始する
 * @param props ゲームプロパティ
 * @param action アクション
 * @returns inProgress更新結果
 */
export const startPasswordMatchHost = async (
  props: Readonly<
    GameProps & { networkContext: Online; inProgress: PasswordMatchHost }
  >,
  action: Readonly<SelectionComplete>,
): Promise<InProgress> => {
  props.networkContext.hostAnonymousSDK.disconnectWebRTC();
  const battle = await waitUntilPasswordMatchingAsHost(props, action);
  await startPasswordMatch(props, battle);
  return {
    ...props.inProgress,
    passwordMatchHost: { type: "Battle" },
  };
};
