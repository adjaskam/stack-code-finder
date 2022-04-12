import { CodeFragmentEntity } from "../models/model-types";

export class CodeFragmentsListDto {
  private items: CodeFragmentEntity[];
  private readonly amount: number;
  private executionTime: number | undefined;
  constructor(
    items: CodeFragmentEntity[],
    amount: number,
    executionTime?: number
  ) {
    this.items = items;
    this.amount = amount;
    if (executionTime) {
      this.executionTime = executionTime;
    }
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
