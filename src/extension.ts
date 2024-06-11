import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('extension.listDir', async () => {
		const options = await showDirectoryOptions();
		if (options) {
			const { dir, ignoredDirs, createFile } = options;
			try {
				const result = await listFiles(dir, '', ignoredDirs);
				if (createFile) {
					const workspaceFolder = vscode.workspace.workspaceFolders ? vscode.workspace.workspaceFolders[0].uri.fsPath : '';
					const outputFile = path.join(workspaceFolder, 'list_dir_output.txt');
					fs.writeFileSync(outputFile, result);
					vscode.window.showInformationMessage(`Directory listing completed and saved to ${outputFile}`);
				}
				showResultWindow(result);
			} catch (error) {
				vscode.window.showErrorMessage(`Error listing files: ${(error as Error).message}`);
			}
		}
	});

	context.subscriptions.push(disposable);
}

async function showDirectoryOptions(): Promise<{ dir: string, ignoredDirs: Set<string>, createFile: boolean } | undefined> {
	const workspaceFolder = vscode.workspace.workspaceFolders ? vscode.workspace.workspaceFolders[0].uri.fsPath : '';

	if (!workspaceFolder) {
		vscode.window.showErrorMessage('No workspace folder found. Please open a folder in VS Code.');
		return undefined;
	}

	const dir = await vscode.window.showInputBox({ prompt: 'Enter the directory to list (default is project root):' }) || workspaceFolder;
	const ignoredDirsInput = await vscode.window.showInputBox({ prompt: 'Enter directories to ignore, separated by commas (default is .git,node_modules,vendor,.idea,.vsc):' }) || '.git,node_modules,vendor,.idea,.vsc';
	const ignoredDirs = new Set(ignoredDirsInput.split(',').map(s => s.trim()));
	const createFileSelection = await vscode.window.showQuickPick(['Yes', 'No'], { placeHolder: 'Create file list_dir_output.txt?' });
	const createFile = createFileSelection === 'Yes';

	return { dir, ignoredDirs, createFile };
}

async function listFiles(dir: string, prefix: string, ignoredDirs: Set<string>): Promise<string> {
	let result = `/${path.basename(dir)}/\n`;
	const entries = fs.readdirSync(dir, { withFileTypes: true });

	for (const entry of entries) {
		if (ignoredDirs.has(entry.name)) continue;

		const output = `${prefix}|-- ${entry.name}\n`;
		result += output;

		if (entry.isDirectory()) {
			result += await listFiles(path.join(dir, entry.name), `${prefix}|   `, ignoredDirs);
		}
	}

	return result;
}

function showResultWindow(result: string) {
	const panel = vscode.window.createWebviewPanel('dirList', 'Directory Listing Result', vscode.ViewColumn.One, {});
	panel.webview.html = `<html lang="en"><body><pre>${result}</pre></body></html>`;
}

export function deactivate() {}
