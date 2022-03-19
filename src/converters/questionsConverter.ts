export function getCodeBlocksContainsPhrase(
  fetchedCodeBlocks: string[],
  searchPhrase: string
): string[] {
  return fetchedCodeBlocks.filter((codeBlock) =>
    codeBlock.includes(searchPhrase)
  );
}
