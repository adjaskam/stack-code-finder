export interface CustomSelectPropsInterface {
  optionsList: SelectOption[];
  onChange: (ev: React.BaseSyntheticEvent) => void;
  label: string;
}

export interface SelectOption {
  value: string | number;
  display?: string;
}