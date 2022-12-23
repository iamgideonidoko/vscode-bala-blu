// VS Code extensibility API module
import * as vscode from 'vscode';
import { addLine, addParagraph, addManyParagraphs, textCompletionProvider } from './utils/global.util';

// called when the extension is activated
export function activate(context: vscode.ExtensionContext) {
  console.log('Bala blu is active!');

  /**
   * Register line insertion (callbacks will be run every time the registered commands are executed)
   * The command has been defined in the package.json file
   * The commandId parameter must match the command field in package.json
   * */
  const addLineDisposable = vscode.commands.registerCommand('bala-blu.line', addLine);
  const addParagraphDisposable = vscode.commands.registerCommand('bala-blu.paragraph', addParagraph);
  const addManyParagraphDisposable = vscode.commands.registerCommand('bala-blu.manyParagraphs', addManyParagraphs);
  const textCompletionDisposable = vscode.languages.registerCompletionItemProvider(
    { pattern: '** ' },
    textCompletionProvider,
  );

  // add disposables
  context.subscriptions.push(
    addLineDisposable,
    addParagraphDisposable,
    addManyParagraphDisposable,
    textCompletionDisposable,
  );
}

// called when the extension is deactivated
// eslint-disable-next-line @typescript-eslint/no-empty-function
export function deactivate() {}
