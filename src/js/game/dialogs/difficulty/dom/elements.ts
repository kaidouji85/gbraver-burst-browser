import type { DataIDs } from "./data-ids";

/**
 * data-idから要素を抽出する
 * @param root ルート要素
 * @param id  抽出要素のdata-id
 * @returns 抽出結果、見つからない場合は新規作成したdiv要素を返す
 */
const extractHTMLElementByDataID = (
  root: HTMLElement,
  id: string,
): HTMLElement =>
  root.querySelector(`[data-id="${id}"]`) ?? document.createElement("div");

/**
 * 背景を抽出する
 * @param root
 * @param ids
 * @returns
 */
export const extractBackGround = (root: HTMLElement, ids: DataIDs) =>
  extractHTMLElementByDataID(root, ids.backGround);

/**
 * クローザーを抽出する
 * @param root ルート要素
 * @param id  抽出要素のdata-id
 * @returns 抽出結果、見つからない場合は新規作成したdiv要素を返す
 */
export const extractCloser = (root: HTMLElement, ids: DataIDs) =>
  extractHTMLElementByDataID(root, ids.closer);

/**
 * 易アイコンを抽出する
 * @param root ルート要素
 * @param id  抽出要素のdata-id
 * @returns 抽出結果、見つからない場合は新規作成したdiv要素を返す
 */
export const extractEasy = (root: HTMLElement, ids: DataIDs) =>
  extractHTMLElementByDataID(root, ids.easy);

/**
 * 易ボタンを抽出する
 * @param root ルート要素
 * @param id  抽出要素のdata-id
 * @returns 抽出結果、見つからない場合は新規作成したdiv要素を返す
 */
export const extractEasyButton = (root: HTMLElement, ids: DataIDs) =>
  extractHTMLElementByDataID(root, ids.easyButton);

/**
 * 普通アイコンを抽出する
 * @param root ルート要素
 * @param id  抽出要素のdata-id
 * @returns 抽出結果、見つからない場合は新規作成したdiv要素を返す
 */
export const extractNormal = (root: HTMLElement, ids: DataIDs) =>
  extractHTMLElementByDataID(root, ids.normal);

/**
 * 普通ボタンを抽出する
 * @param root ルート要素
 * @param id  抽出要素のdata-id
 * @returns 抽出結果、見つからない場合は新規作成したdiv要素を返す
 */
export const extractNormalButton = (root: HTMLElement, ids: DataIDs) =>
  extractHTMLElementByDataID(root, ids.normalButton);

/**
 * 難アイコンを抽出する
 * @param root ルート要素
 * @param id  抽出要素のdata-id
 * @returns 抽出結果、見つからない場合は新規作成したdiv要素を返す
 */
export const extractHard = (root: HTMLElement, ids: DataIDs) =>
  extractHTMLElementByDataID(root, ids.hard);

/**
 * 難ボタンを抽出する
 * @param root ルート要素
 * @param id  抽出要素のdata-id
 * @returns 抽出結果、見つからない場合は新規作成したdiv要素を返す
 */
export const extractHardButton = (root: HTMLElement, ids: DataIDs) =>
  extractHTMLElementByDataID(root, ids.hardButton);

/**
 * 激アイコンを抽出する
 * @param root ルート要素
 * @param id  抽出要素のdata-id
 * @returns 抽出結果、見つからない場合は新規作成したdiv要素を返す
 */
export const extractVeryHard = (root: HTMLElement, ids: DataIDs) =>
  extractHTMLElementByDataID(root, ids.veryHard);

/**
 * 激ボタンを抽出する
 * @param root ルート要素
 * @param id  抽出要素のdata-id
 * @returns 抽出結果、見つからない場合は新規作成したdiv要素を返す
 */
export const extractVeryHardButton = (root: HTMLElement, ids: DataIDs) =>
  extractHTMLElementByDataID(root, ids.veryHardButton);
