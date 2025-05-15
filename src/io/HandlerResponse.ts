export type Handler = (response: HandlerResponse) => void;

export type HandlerResponse = {
  code: HandlerResponseCode,
  message: string,
  props: any[],
};

export enum HandlerResponseCode {
  FAIL,
  SUCCESS,
}