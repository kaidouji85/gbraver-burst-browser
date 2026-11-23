import { GameProps } from "../game-props";
import { OfflineLAN } from "../network-context/offline-lan";
import { Online } from "../network-context/online";

/**
 * オンラインですべての通信接続を切断する
 * @param networkContext オンラインのネットワークコンテキスト
 * @returns 処理が完了したら発火するPromise
 */
const disconnectAllOnline = async (networkContext: Online) => {
  networkContext.hostAnonymousSDK.disconnectWebRTC();
  networkContext.hostAnonymousSDK.disconnectWebSocket();
  networkContext.guestAnonymousSDK.disconnectWebRTC();
  networkContext.guestAnonymousSDK.disconnectWebSocket();
  await networkContext.sdk.disconnectWebsocket();
};

/**
 * オフラインLANですべての通信接続を切断する
 * @param networkContext オフラインLANのネットワークコンテキスト
 */
const disconnectAllOfflineLan = (networkContext: OfflineLAN) => {
  networkContext.sdk.closeConnection();
};

/**
 * ネットワークコンテキストに応じて、すべての通信接続の切断を行う
 * @param props ゲームプロパティ
 * @returns 処理が完了したら発火するPromise
 */
export const disconnectAll = async (
  props: Readonly<GameProps>,
): Promise<void> => {
  if (props.networkContext.type === "online") {
    await disconnectAllOnline(props.networkContext);
  } else if (props.networkContext.type === "offline-lan") {
    disconnectAllOfflineLan(props.networkContext);
  }
};
