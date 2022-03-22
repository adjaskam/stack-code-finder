import { CodeFragmentEntity } from "../model/codeFragmentModel";

export class CodeFragmentsListDto {
  private items: CodeFragmentEntity[];
  private readonly amount: number;
  constructor(items: CodeFragmentEntity[], amount: number) {
    this.items = items;
    this.amount = amount;
  }

  getItems(): CodeFragmentEntity[] {
    return this.items;
  }
  setItems(items: CodeFragmentEntity[]) {
    this.items = items;
  }
  getAmount(): number {
    return this.amount;
  }
}
