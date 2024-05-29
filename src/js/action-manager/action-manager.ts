import { Observable, Subject, Unsubscribable } from "rxjs";

/**
 * アクション接続関数
 * @template X 通知オブジェクトのデータ型
 * @param action アクションのサブジェクト
 * @returns 通知ストリーム
 */
export type ActionConnector<X> = (action: Subject<X>) => Observable<X>[];

/** 
 * アクション管理オブジェクト
 * @template X 通知オブジェクトのデータ型
 */
export interface ActionManager<X> {
  /**
   * アクションを接続する
   * @param fn 接続関数
   * @returns アンサブスクライバ
   */
  connect(fn: ActionConnector<X>): Unsubscribable[];

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
  connect(fn: ActionConnector<X>) {
    return fn(this.#action).map((s) => s.subscribe(this.#action));
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
