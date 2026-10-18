import { Observable, Subject, Unsubscribable } from "rxjs";

/**
 * アクション管理オブジェクト
 * @template X 通知オブジェクトのデータ型
 */
export interface ActionManager<X> {
  /**
   * アクションを接続する
   * @param actions 接続するアクション
   * @returns アンサブスクライバ
   */
  connect(actions: Observable<X>[]): Unsubscribable[];

  /**
   * アクションを通知する
   * @returns 通知ストリーム
   */
  notify(): Observable<X>;
}

/** ActionManagerのシンプルな実装 */
class SimpleActionManager<X> implements ActionManager<X> {
  /** アクション通知ストリーム */
  #action: Subject<X>;

  /**
   * コンストラクタ
   */
  constructor() {
    this.#action = new Subject();
  }

  /** @override */
  connect(actions: Observable<X>[]) {
    return actions.map((a) => a.subscribe(this.#action));
  }

  /** @override */
  notify(): Observable<X> {
    return this.#action;
  }
}

/**
 * アクション管理オブジェクトを生成する
 * @template X 通知オブジェクトのデータ型
 * @returns 生成結果
 */
export function createActionManager<X>(): ActionManager<X> {
  return new SimpleActionManager<X>();
}
