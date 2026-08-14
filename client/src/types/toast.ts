export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  variant: ToastVariant;
  message: string;
}

export type ShowToast = (variant: ToastVariant, message: string) => void;
