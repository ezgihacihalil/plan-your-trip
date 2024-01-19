export interface DateSelectionProps {
  disabled: boolean;
  setDate: (date: string) => void;
}

export type FormattedDateType = {
  original: string;
  formatted: string;
};
