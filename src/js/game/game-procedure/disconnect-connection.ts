import { GameProps } from "../game-props";

/**
 * ネットワークコンテキストに応じた通信接続の切断を行う
 * @param props ゲームプロパティ
 * @returns 処理が完了したら発火するPromise
 */
export const disconnectConnection = async (
  props: Readonly<GameProps>,
): Promise<void> => {
  if (props.networkContext.type === "online") {
    props.networkContext.hostAnonymousSDK.disconnectWebRTC();
    props.networkContext.hostAnonymousSDK.disconnectWebSocket();
    props.networkContext.guestAnonymousSDK.disconnectWebRTC();
    props.networkContext.guestAnonymousSDK.disconnectWebSocket();
    await props.networkContext.sdk.disconnectWebsocket();
  } else if (props.networkContext.type === "offline-lan") {
    props.networkContext.sdk.closeConnection();
  }
};
