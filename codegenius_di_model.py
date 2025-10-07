class CodeGeniusDIModel:
    def __init__(self, codefont_path: str):
        self.codefont = CodeGeniusCodeFont(codefont_path)
        self.agents = self._initialize_agents()
        self.context_manager = DevelopmentContextManager()
        
    def _initialize_agents(self) -> dict:
        return {
            'completion_agent': CodeCompletionAgent(),
            'generation_agent': CodeGenerationAgent(),
            'analysis_agent': CodeAnalysisAgent(),
            'refactoring_agent': RefactoringAgent(),
            'learning_agent': PatternLearningAgent()
        }
    
    def process_developer_request(self, request: DevRequest) -> DevResponse:
        """Main entry point for all code intelligence tasks"""
        
        # 1. ANALYZE DEVELOPMENT CONTEXT
        context = self.context_manager.analyze_context(request)
        
        # 2. SELECT APPROPRIATE INTELLIGENCE MODULES
        modules = self._select_modules_for_request(request, context)
        
        # 3. EXECUTE THROUGH SPECIALIZED AGENTS
        results = {}
        for module_type, module in modules.items():
            agent = self.agents[module_type]
            results[module_type] = agent.execute(module, request, context)
        
        # 4. SYNTHESIZE FINAL RESPONSE
        return self._synthesize_response(results, request, context)
    
    def _select_modules_for_request(self, request: DevRequest, context: DevContext) -> dict:
        """Intelligently select which CodeFont modules to use"""
        module_map = {
            'completion': ['code_completion', 'api_discovery'],
            'generation': ['function_generation', 'test_generation'],
            'refactoring': ['code_refactoring', 'performance_optimization'],
            'analysis': ['bug_detection', 'architecture_analysis'],
            'explanation': ['code_explanation', 'dependency_mapping']
        }
        return {mod: self.codefont.get_program(mod) for mod in module_map[request.type]}