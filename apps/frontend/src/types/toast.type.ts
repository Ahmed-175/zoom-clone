export type ToastType = "error" | "success";

export interface IMessage {
  content: string;
  type: ToastType;
}

export interface IToastContext {
  message: IMessage | null;
  showSuccess: (content: string) => void;
  showError: (content: string) => void;

}
