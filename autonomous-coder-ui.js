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
exports.AutonomousCoderUI = void 0;
// src/autonomousCoderUI.ts
const vscode = __importStar(require("vscode"));
class AutonomousCoderUI {
    constructor(diModel) {
        this.diModel = diModel;
    }
    async createCompleteProject() {
        const description = await vscode.window.showInputBox({
            prompt: '🎯 Describe the complete project you want to create:',
            placeHolder: 'e.g., "A real-time collaborative code editor with AI pair programming"',
            ignoreFocusOut: true
        });
        if (!description)
            return;
        // Show progress
        await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: "🚀 Creating Complete Project...",
            cancellable: false
        }, async (progress) => {
            progress.report({ increment: 0, message: "Developing creative concept..." });
            try {
                // Autonomous project creation
                const project = await this.diModel.executeProject(description);
                progress.report({ increment: 50, message: "Generating project structure..." });
                // Create project in workspace
                await this.generateProjectInWorkspace(project);
                progress.report({ increment: 100, message: "Project created successfully!" });
                vscode.window.showInformationMessage(`✅ Project "${project.name}" created successfully!`, "Open Project").then(selection => {
                    if (selection === "Open Project") {
                        this.openProject(project);
                    }
                });
            }
            catch (error) {
                vscode.window.showErrorMessage(`❌ Project creation failed: ${error}`);
            }
        });
    }
    async inventNewAlgorithm() {
        const problem = await vscode.window.showInputBox({
            prompt: '💡 What problem do you want to solve with a new algorithm?',
            placeHolder: 'e.g., "More efficient way to sort partially ordered data"',
            ignoreFocusOut: true
        });
        if (!problem)
            return;
        const algorithm = await this.diModel.inventAlgorithm(problem);
        // Show the novel algorithm
        const doc = await vscode.workspace.openTextDocument({
            content: `// 🎯 Novel Algorithm for: ${problem}\n\n${algorithm.implementation}\n\n// 💡 Innovation: ${algorithm.innovation}\n// 🚀 Performance: ${algorithm.performance}`,
            language: 'typescript'
        });
        await vscode.window.showTextDocument(doc);
    }
    async solveImpossibleProblem() {
        const problem = await vscode.window.showInputBox({
            prompt: '🎯 Describe the "impossible" programming problem:',
            placeHolder: 'e.g., "Process 1TB of data in real-time on a single machine"',
            ignoreFocusOut: true
        });
        if (!problem)
            return;
        const solution = await this.diModel.breakConstraints(problem);
        // Show breakthrough solution
        const doc = await vscode.workspace.openTextDocument({
            content: `// 💥 BREAKTHROUGH SOLUTION\n// Problem: ${problem}\n\n// 🔓 Constraint Analysis: ${solution.constraintAnalysis}\n\n// 🎯 Reframed Problem: ${solution.reframedProblem}\n\n// 🚀 Implementation:\n${solution.implementation}\n\n// 💡 Key Insight: ${solution.keyInsight}`,
            language: 'typescript'
        });
        await vscode.window.showTextDocument(doc);
    }
    async generateProjectInWorkspace(project) {
        if (!vscode.workspace.workspaceFolders) {
            vscode.window.showErrorMessage('Please open a workspace first');
            return;
        }
        const workspacePath = vscode.workspace.workspaceFolders[0].uri.fsPath;
        const projectPath = vscode.Uri.joinPath(vscode.Uri.file(workspacePath), project.name);
        // Create project directory
        await vscode.workspace.fs.createDirectory(projectPath);
        // Generate all project files
        for (const file of project.files) {
            const fileUri = vscode.Uri.joinPath(projectPath, file.path);
            await vscode.workspace.fs.writeFile(fileUri, Buffer.from(file.content));
        }
        // Open the main file
        const mainFile = project.files.find((f) => f.isMain);
        if (mainFile) {
            const mainUri = vscode.Uri.joinPath(projectPath, mainFile.path);
            const doc = await vscode.workspace.openTextDocument(mainUri);
            await vscode.window.showTextDocument(doc);
        }
    }
    openProject(project) {
        // Implementation to open the created project
        vscode.commands.executeCommand('vscode.openFolder', vscode.Uri.file(project.path));
    }
}
exports.AutonomousCoderUI = AutonomousCoderUI;
//# sourceMappingURL=autonomous-coder-ui.js.map