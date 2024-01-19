export interface DateSelectionProps {
  disabled: boolean;
  setDate: (date: string) => void;
  date: string;
}

export type FormattedDateType = {
  original: string;
  formatted: string;
};
