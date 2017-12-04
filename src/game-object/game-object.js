// @flow

/** ゲームオブジェクト */
export interface GameObject<Target> {
  /** 操作対象となるスプライト、メッシュなど */
  target: Target;
  /** ゲームオブジェクトの状態 */
  state: GameObjectState<Target>;
}

/** ゲームオブジェクトの状態 */
export interface GameObjectState<Target> {
  gameLoop(target: Target): void;
}