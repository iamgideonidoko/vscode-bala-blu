// VS Code extensibility API module
import * as vscode from 'vscode';

// called when the extension is activated
export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "bala-blu" is now active!');

  const generateLine = () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      console.log('should generate line');
      editor.edit((edit) =>
        editor.selections.forEach((selection) => {
          edit.delete(selection);
          edit.insert(selection.start, 'Bala blu dummy text');
        }),
      );
    }
  };

  /**
   * Register line insertion (callbacks will be run every time the registered commands are executed)
   * The command has been defined in the package.json file
   * The commandId parameter must match the command field in package.json
   * */
  const insertLineDisposable = vscode.commands.registerCommand('bala-blu.line', generateLine);

  // add disposables
  context.subscriptions.push(insertLineDisposable);
}

// called when the extension is deactivated
// eslint-disable-next-line @typescript-eslint/no-empty-function
export function deactivate() {}
