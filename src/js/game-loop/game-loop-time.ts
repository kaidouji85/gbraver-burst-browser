/** ゲームループの時間管理オブジェクト */
export interface GameLoopTime {
  /**
   * タイムスケールを設定する
   * タイムスケールが3の場合、1フレームが3フレーム分の時間が経過したとみなされる
   * @param timeScale タイムスケール
   */
  setTimeScale(timeScale: number): void;

  /**
   * 各種時刻を更新する
   * 本メソッドはrequestAnimationFrameのコールバック内で呼び出すことを想定している
   * @param now 現在時刻、requestAnimationFrameのコールバック内で取得した値を渡す
   */
  tick: (now: number) => void;

  /**
   * ゲームループ上での現在時刻を取得する
   * @returns ゲームループ上での現在時刻
   */
  get(): number;
}

/** ゲームループの時間管理オブジェクトの実装 */
class GameLoopTimeImpl implements GameLoopTime {
  /** タイムスケール */
  #timeScale: number = 1;
  /** 現実での時間 */
  #realTime: number;
  /** ゲームループ上の時間 */
  #gameLoopTime: number;

  /**
   * コンストラクタ
   * @param now 現在時刻
   */
  constructor(now: number) {
    this.#timeScale = 1;
    this.#realTime = now;
    this.#gameLoopTime = now;
  }

  /** @override */
  setTimeScale(timeScale: number): void {
    this.#timeScale = timeScale;
  }

  /** @override */
  tick(now: number): void {
    const previous = this.#realTime;
    const delta = (now - previous) * this.#timeScale;
    this.#gameLoopTime += delta;
    this.#realTime = now;

    // TODO 動作確認用コード、後で削除する
    console.log(`now: ${now}, gameLoopTime: ${this.#gameLoopTime}`);
    if (now !== this.#gameLoopTime) {
      console.error("diff!!");
    }
  }

  /** @override */
  get(): number {
    return this.#gameLoopTime;
  }
}

/**
 * ゲームループの時間管理オブジェクトを生成する
 * @param now 現在時刻
 * @returns ゲームループの時間管理オブジェクト
 */
export const createGameLoopTime = (now?: number): GameLoopTime =>
  new GameLoopTimeImpl(now ?? performance.now());
