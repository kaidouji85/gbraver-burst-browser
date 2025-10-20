import { GameProps } from "../../game-props";

/**
 * 通信接続を切断する
 * @param props ゲームプロパティ
 * @returns 処理が完了したら発火するPromise
 */
export const disconnectConnection = async (
  props: Readonly<GameProps>,
): Promise<void> => {
  if (props.networkContext.type === "online") {
    await props.networkContext.sdk.disconnectWebsocket();
  } else if (props.networkContext.type === "offline-lan") {
    props.networkContext.sdk.closeConnection();
  }
};
