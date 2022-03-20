import { DocumentDefinition } from "mongoose";
import { CodeFragmentDocument } from "../model/codeFragmentModel";

export class CodeFragmentsListDto {
  private items: DocumentDefinition<CodeFragmentDocument>[];
  private readonly amount: number;
  constructor(
    items: DocumentDefinition<CodeFragmentDocument>[],
    amount: number
  ) {
    this.items = items;
    this.amount = amount;
  }

  getItems(): DocumentDefinition<CodeFragmentDocument>[] {
    return this.items;
  }
  setItems(items: DocumentDefinition<CodeFragmentDocument>[]) {
    this.items = items;
  }
  getAmount(): number {
    return this.amount;
  }
}
