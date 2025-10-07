// apps/api/src/intelligence/intelligence.controller.ts
import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { CodeFontService } from '../codefont/codefont.service';

@Controller('api/v1/intelligence')
export class IntelligenceController {
  constructor(private readonly codeFontService: CodeFontService) {}

  @Post('generate-code')
  async generateCode(@Body() request: GenerateCodeRequest) {
    const result = await this.codeFontService.executeModule(
      'autonomous_coding',
      request
    );
    return { code: result.code, explanation: result.explanation };
  }

  @Post('analyze-project')
  async analyzeProject(@Body() request: AnalyzeProjectRequest) {
    const analysis = await this.codeFontService.executeModule(
      'project_analysis', 
      request
    );
    return analysis;
  }

  @Get('live-preview')
  async getLivePreview(@Query('projectId') projectId: string) {
    return this.codeFontService.generatePreview(projectId);
  }

  @Post('deploy')
  async deployProject(@Body() request: DeployRequest) {
    const deployment = await this.codeFontService.executeModule(
      'deployment_orchestration',
      request
    );
    return deployment;
  }
}