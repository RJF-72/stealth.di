"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.StealthSIAutonomousClient = void 0;
const vscode = __importStar(require("vscode"));
const path = __importStar(require("path"));
class StealthSIAutonomousClient {
    constructor(context) {
        this.ws = null;
        this.isConnected = false;
        this.autonomousMode = false;
        this.fileSystemAccess = true;
        this.workspaceState = {};
        this.context = context;
        this.outputChannel = vscode.window.createOutputChannel('Stealth.SI Autonomous Pro');
        this.initializeFileSystemAccess();
        this.connectToSIBackend();
    }
    async initializeFileSystemAccess() {
        // Request workspace trust
        if (vscode.workspace.workspaceFolders) {
            this.outputChannel.appendLine('🔮 Stealth.SI: Workspace access granted');
            this.scanWorkspace();
        }
    }
    async scanWorkspace() {
        if (!vscode.workspace.workspaceFolders) {
            return { error: 'No workspace folder open' };
        }
        const workspaceScan = {
            rootFolders: [],
            files: [],
            totalSize: 0,
            fileTypes: {}
        };
        for (const folder of vscode.workspace.workspaceFolders) {
            const folderStats = await this.scanFolder(folder.uri);
            workspaceScan.rootFolders.push({
                name: folder.name,
                path: folder.uri.fsPath,
                ...folderStats
            });
        }
        this.workspaceState.scan = workspaceScan;
        this.outputChannel.appendLine(`🔮 Stealth.SI: Workspace scanned - ${workspaceScan.files.length} files found`);
        return workspaceScan;
    }
    async scanFolder(folderUri) {
        const files = [];
        let totalSize = 0;
        const fileTypes = {};
        try {
            const entries = await vscode.workspace.fs.readDirectory(folderUri);
            for (const [name, type] of entries) {
                const fileUri = vscode.Uri.joinPath(folderUri, name);
                if (type === vscode.FileType.Directory) {
                    const subFolderStats = await this.scanFolder(fileUri);
                    files.push({
                        name,
                        type: 'directory',
                        path: fileUri.fsPath,
                        children: subFolderStats.files,
                        size: subFolderStats.totalSize
                    });
                    totalSize += subFolderStats.totalSize;
                }
                else {
                    const fileStat = await vscode.workspace.fs.stat(fileUri);
                    const fileExt = path.extname(name).toLowerCase() || '.noext';
                    files.push({
                        name,
                        type: 'file',
                        path: fileUri.fsPath,
                        size: fileStat.size,
                        modified: fileStat.mtime,
                        extension: fileExt
                    });
                    totalSize += fileStat.size;
                    fileTypes[fileExt] = (fileTypes[fileExt] || 0) + 1;
                }
            }
        }
        catch (error) {
            this.outputChannel.appendLine(`⚠️ Stealth.SI: Scan error for ${folderUri.fsPath}: ${error}`);
        }
        return { files, totalSize, fileTypes };
    }
    async readFileContent(filePath) {
        try {
            const fileUri = vscode.Uri.file(filePath);
            const content = await vscode.workspace.fs.readFile(fileUri);
            return Buffer.from(content).toString('utf8');
        }
        catch (error) {
            throw new Error(`Failed to read file: ${error}`);
        }
    }
    async writeFileContent(filePath, content) {
        try {
            const fileUri = vscode.Uri.file(filePath);
            const encoder = new TextEncoder();
            const data = encoder.encode(content);
            await vscode.workspace.fs.writeFile(fileUri, data);
            this.outputChannel.appendLine(`✅ Stealth.SI: File written - ${filePath}`);
        }
        catch (error) {
            throw new Error(`Failed to write file: ${error}`);
        }
    }
    async createFile(filePath, content = '') {
        // Ensure directory exists
        const dirPath = path.dirname(filePath);
        await this.createDirectory(dirPath);
        await this.writeFileContent(filePath, content);
    }
    async createDirectory(dirPath) {
        try {
            const dirUri = vscode.Uri.file(dirPath);
            await vscode.workspace.fs.createDirectory(dirUri);
        }
        catch (error) {
            // Directory might already exist
        }
    }
    async uploadFiles(fileUris) {
        const uploadResults = [];
        for (const fileUri of fileUris) {
            try {
                const fileStat = await vscode.workspace.fs.stat(fileUri);
                const content = await this.readFileContent(fileUri.fsPath);
                uploadResults.push({
                    name: path.basename(fileUri.fsPath),
                    path: fileUri.fsPath,
                    size: fileStat.size,
                    type: path.extname(fileUri.fsPath),
                    content: content.substring(0, 50000), // Limit content size for transmission
                    uploaded: new Date().toISOString()
                });
                this.outputChannel.appendLine(`📁 Stealth.SI: File uploaded - ${fileUri.fsPath}`);
            }
            catch (error) {
                uploadResults.push({
                    name: path.basename(fileUri.fsPath),
                    error: error.message
                });
            }
        }
        return uploadResults;
    }
    async processImageFile(imagePath) {
        try {
            const imageUri = vscode.Uri.file(imagePath);
            const imageData = await vscode.workspace.fs.readFile(imageUri);
            return {
                name: path.basename(imagePath),
                path: imagePath,
                size: imageData.length,
                type: 'image',
                base64: Buffer.from(imageData).toString('base64').substring(0, 100000), // Limit size
                dimensions: await this.getImageDimensions(imagePath)
            };
        }
        catch (error) {
            throw new Error(`Failed to process image: ${error}`);
        }
    }
    async getImageDimensions(imagePath) {
        // Basic image dimension detection
        // In production, you'd use a proper image processing library
        return { width: 0, height: 0 }; // Placeholder
    }
    async autonomousChatRequest(message) {
        const context = await this.buildFullContext(message);
        if (!this.isConnected || !this.ws) {
            throw new Error('Stealth.SI is not connected');
        }
        return new Promise((resolve, reject) => {
            this.ws.send(JSON.stringify({
                type: 'autonomous_chat',
                message: message,
                context: context,
                timestamp: new Date().toISOString()
            }));
            const timeout = setTimeout(() => {
                reject('Stealth.SI response timeout');
            }, 60000);
            const messageHandler = (data) => {
                clearTimeout(timeout);
                resolve(data.toString());
                this.ws?.off('message', messageHandler);
            };
            this.ws.on('message', messageHandler);
        });
    }
    async buildFullContext(userMessage) {
        const workspaceScan = this.workspaceState.scan || await this.scanWorkspace();
        const activeEditor = vscode.window.activeTextEditor;
        return {
            userMessage,
            workspace: workspaceScan,
            activeFile: activeEditor ? {
                path: activeEditor.document.uri.fsPath,
                language: activeEditor.document.languageId,
                content: activeEditor.document.getText(),
                selection: activeEditor.selection
            } : null,
            system: {
                platform: process.platform,
                vscodeVersion: vscode.version,
                timestamp: new Date().toISOString()
            },
            permissions: {
                fileSystem: true,
                workspace: true,
                autonomous: true
            }
        };
    }
    async startAutonomousMode(task) {
        this.autonomousMode = true;
        this.outputChannel.appendLine(`🚀 Stealth.SI: Starting autonomous mode - ${task}`);
        const context = await this.buildFullContext(task);
        this.ws?.send(JSON.stringify({
            type: 'start_autonomous',
            task: task,
            context: context,
            permissions: {
                create_files: true,
                modify_files: true,
                execute_commands: true,
                continuous_operation: true
            }
        }));
    }
    async executeSIAction(action) {
        switch (action.type) {
            case 'create_file':
                return await this.createFile(action.path, action.content);
            case 'modify_file':
                return await this.writeFileContent(action.path, action.content);
            case 'read_file':
                return await this.readFileContent(action.path);
            case 'scan_workspace':
                return await this.scanWorkspace();
            case 'run_command':
                return await this.executeTerminalCommand(action.command);
            default:
                throw new Error(`Unknown action type: ${action.type}`);
        }
    }
    async executeTerminalCommand(command) {
        return new Promise((resolve) => {
            const terminal = vscode.window.createTerminal('Stealth.SI Autonomous');
            terminal.show();
            terminal.sendText(command);
            // Note: Capturing terminal output requires more complex setup
            setTimeout(() => {
                resolve(`Command executed: ${command}`);
            }, 2000);
        });
    }
    shutdown() {
        this.autonomousMode = false;
        this.ws?.close();
        this.outputChannel.dispose();
    }
}
exports.StealthSIAutonomousClient = StealthSIAutonomousClient;
//# sourceMappingURL=stealth_extension_core.js.map