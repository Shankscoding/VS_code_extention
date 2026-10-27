import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "dccn-experiments" is now active!');

	const disposable = vscode.commands.registerCommand('dccn-experiments.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from DCCN Experiments!');
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
