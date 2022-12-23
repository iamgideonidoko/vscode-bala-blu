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
        edit.insert(selection.start, loremIpsum({ ...loremIpsumParams, words: WORDS }));
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
