export class TaggedFragmentDto {
  private readonly tag: string;
  private readonly searchPhrase: string;
  private readonly amount: number;
  constructor(tag: string, searchPhrase: string, amount: number) {
    this.tag = tag;
    this.searchPhrase = searchPhrase;
    this.amount = amount;
  }

  getTag(): string {
    return this.tag;
  }
  getSearchPhrase(): string {
    return this.searchPhrase;
  }
  getAmount(): number {
    return this.amount;
  }
}
