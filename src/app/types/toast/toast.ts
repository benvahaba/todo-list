import { ToastTheme } from './toast-theme';

export interface Toast {
  header?: string;
  body?: string[];
  date?: Date;
  theme?: ToastTheme;
  timeInMilli?: number;
  noTimer?: boolean;
}
