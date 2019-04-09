const vscode = require('vscode');

function createBody(code) {
  return code.replace(/\t/g, '\\t').split('\n');
}

async function gatherSnippet() {
  const editor = vscode.window.activeTextEditor;
  const selection = editor.selection;

  if (!editor || selection.isEmpty) {
    vscode.window.showWarningMessage(
      'Cannot create snippet from empty string. Select some text first.'
    );
    return;
  }

  const prefix = await vscode.window.showInputBox({
    prompt: 'Enter snippet prefix'
  });

  const description = await vscode.window.showInputBox({
    prompt: 'Enter snippet description'
  });

  return {
    language: editor.document.languageId,
    prefix,
    description,
    body: createBody(editor.document.getText(selection))
  };
}

module.exports = gatherSnippet;
