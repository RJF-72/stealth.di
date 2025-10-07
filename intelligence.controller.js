"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntelligenceController = void 0;
// apps/api/src/intelligence/intelligence.controller.ts
const common_1 = require("@nestjs/common");
let IntelligenceController = (() => {
    let _classDecorators = [(0, common_1.Controller)('api/v1/intelligence')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _generateCode_decorators;
    let _analyzeProject_decorators;
    let _getLivePreview_decorators;
    let _deployProject_decorators;
    var IntelligenceController = _classThis = class {
        constructor(codeFontService) {
            this.codeFontService = (__runInitializers(this, _instanceExtraInitializers), codeFontService);
        }
        async generateCode(request) {
            const result = await this.codeFontService.executeModule('autonomous_coding', request);
            return { code: result.code, explanation: result.explanation };
        }
        async analyzeProject(request) {
            const analysis = await this.codeFontService.executeModule('project_analysis', request);
            return analysis;
        }
        async getLivePreview(projectId) {
            return this.codeFontService.generatePreview(projectId);
        }
        async deployProject(request) {
            const deployment = await this.codeFontService.executeModule('deployment_orchestration', request);
            return deployment;
        }
    };
    __setFunctionName(_classThis, "IntelligenceController");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _generateCode_decorators = [(0, common_1.Post)('generate-code')];
        _analyzeProject_decorators = [(0, common_1.Post)('analyze-project')];
        _getLivePreview_decorators = [(0, common_1.Get)('live-preview')];
        _deployProject_decorators = [(0, common_1.Post)('deploy')];
        __esDecorate(_classThis, null, _generateCode_decorators, { kind: "method", name: "generateCode", static: false, private: false, access: { has: obj => "generateCode" in obj, get: obj => obj.generateCode }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _analyzeProject_decorators, { kind: "method", name: "analyzeProject", static: false, private: false, access: { has: obj => "analyzeProject" in obj, get: obj => obj.analyzeProject }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getLivePreview_decorators, { kind: "method", name: "getLivePreview", static: false, private: false, access: { has: obj => "getLivePreview" in obj, get: obj => obj.getLivePreview }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _deployProject_decorators, { kind: "method", name: "deployProject", static: false, private: false, access: { has: obj => "deployProject" in obj, get: obj => obj.deployProject }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        IntelligenceController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return IntelligenceController = _classThis;
})();
exports.IntelligenceController = IntelligenceController;
//# sourceMappingURL=intelligence.controller.js.map