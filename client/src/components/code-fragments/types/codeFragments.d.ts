export interface CustomSelectPropsInterface {
  optionsList: SelectOption[];
  onChange: (ev: React.BaseSyntheticEvent) => void;
}

export interface SelectOption {
  value: string;
  display?: string;
}