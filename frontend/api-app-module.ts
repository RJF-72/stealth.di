// apps/api/src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { IntelligenceController } from './intelligence/intelligence.controller';
import { CodeFontService } from './codefont/codefont.service';
import { PreviewService } from './preview/preview.service';
import { DeploymentService } from './deployment/deployment.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [IntelligenceController],
  providers: [CodeFontService, PreviewService, DeploymentService],
})
export class AppModule {}