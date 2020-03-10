/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import * as path from 'path';
import { workspace, ExtensionContext } from 'vscode';

import {
	LanguageClient,
	LanguageClientOptions,
	ServerOptions,
} from 'vscode-languageclient';

let client: LanguageClient;

export function activate(context: ExtensionContext) {
	// This is the path to your dfx binary 
	const { execSync } = require('child_process');
	let stdout = execSync('dfx cache show');
	let stdoutString = stdout.toString().replace(/(\r\n|\n|\r)/gm, "");
	let dfxBinaryPath =
		path.join(stdoutString+'/dfx')
		;
	// This is the argument for dfx to invoke the language server
	let serverArgsRun = ['_language-service'];

	// If the extension is launched in debug mode then the debug server options are used
	// Otherwise the run options are used
	let serverOptions: ServerOptions = {
		run: { command: dfxBinaryPath, args: serverArgsRun },
		debug: {
			command: dfxBinaryPath,
			args: serverArgsRun,
		}
	};

	// Options to control the language client
	let clientOptions: LanguageClientOptions = {
		// Register the server for motoko code
		documentSelector: [{ scheme: 'file', language: 'motoko' }],
		// synchronize: {
		// 	// Notify the server about file changes to '.mo files contained in the workspace
		// 	// fileEvents: workspace.createFileSystemWatcher('**/*.mo')
		// 	fileEvents: workspace.onDidChangeTextDocument
		// }
	};

	// Create the language client and start the client.
	client = new LanguageClient(
		'dfx-lsp',
		'Motoko Language Client',
		serverOptions,
		clientOptions
	);

	// Start the client. This will also launch the server
	client.start();
}

export function deactivate(): Thenable<void> | undefined {
	if (!client) {
		return undefined;
	}
	return client.stop();
}