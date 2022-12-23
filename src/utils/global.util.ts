import * as vscode from 'vscode';
import { loremIpsum } from 'lorem-ipsum';
import type { ILoremIpsumParams } from 'lorem-ipsum';
import { WORDS } from '../constants/words.contant';

export const addTextToEditor = (loremIpsumParams: Omit<ILoremIpsumParams, 'words'>) => {
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    editor.edit((edit) =>
      editor.selections.forEach((selection) => {
        edit.delete(selection);
        edit.insert(selection.start, addPrefix(lowerFirstLetter(loremIpsum({ ...loremIpsumParams, words: WORDS }))));
      }),
    );
  }
};

export const addLine = () =>
  addTextToEditor({
    count: 1,
    units: 'sentences',
  });

export const addParagraph = () =>
  addTextToEditor({
    count: 1,
    units: 'paragraphs',
  });

export const addManyParagraphs = async () => {
  const items = [];
  for (let i = 2; i <= 10; i++) {
    items.push(i.toString());
  }

  const count = await vscode.window.showQuickPick(items, { placeHolder: 'Number of paragraphs?' });
  if (!count) {
    return;
  }

  addTextToEditor({
    count: Number.parseInt(count),
    units: 'paragraphs',
  });
};

export const textCompletionProvider: vscode.CompletionItemProvider = {
  provideCompletionItems: async (document, position) => {
    const currentWord = getCurrentWord(document, position);
    const triggerRegex = /bala+[0-9]{0,3}$/gi;
    if (currentWord.match(triggerRegex)) {
      const wordCount = Number(currentWord.replace('bala', ''));
      const completion = new vscode.CompletionItem(`bala${wordCount || ''}`.trim());
      const textToInsert =
        !wordCount || wordCount === 1
          ? 'Bala'
          : wordCount === 2
          ? 'Bala blu'
          : addPrefix(
              lowerFirstLetter(
                loremIpsum({ count: wordCount - 2, units: wordCount ? 'words' : 'sentences', words: WORDS }),
              ),
            );
      completion.insertText = new vscode.SnippetString(textToInsert);
      return [completion];
    }
    return [];
  },
};

export const getCurrentWord = (document: vscode.TextDocument, position: vscode.Position): string => {
  const wordAtPosition = document.getWordRangeAtPosition(position);
  let currentWord = '';
  if (wordAtPosition && wordAtPosition.start.character < position.character) {
    const word = document.getText(wordAtPosition);
    currentWord = word.substr(0, position.character - wordAtPosition.start.character);
  }

  return currentWord;
};

export const addPrefix = (text: string): string => `Bala blu ${text}`;

export const lowerFirstLetter = (text: string): string => text.charAt(0).toLowerCase() + text.slice(1);
