class AutonomousAssetGenerator:
    def __init__(self, image_codefont: VisualGeniusCodeFont):
        self.image_cf = image_codefont
        self.asset_pipeline = AssetGenerationPipeline()
    
    async def generate_complete_assets(self, project_plan: ProjectPlan) -> ProjectAssets:
        """Generate all visual assets for a project"""
        
        assets = {}
        
        # 1. GENERATE LOGO & BRAND ASSETS
        assets['branding'] = await self.generate_brand_assets(project_plan.branding)
        
        # 2. GENERATE ICON SET
        assets['icons'] = await self.generate_icon_set(project_plan.ui_elements)
        
        # 3. GENERATE CONTENT IMAGES
        assets['content_images'] = await self.generate_content_images(project_plan.content)
        
        # 4. GENERATE FAVICONS
        assets['favicons'] = await self.generate_favicon_package(assets['branding'].logo)
        
        # 5. OPTIMIZE ALL ASSETS
        assets['optimized'] = await self.optimize_assets(assets)
        
        return assets
    
    async def generate_brand_assets(self, branding: BrandingSpec) -> BrandAssets:
        """Create complete brand identity"""
        logo = await self.image_cf.generate_logo({
            'name': branding.company_name,
            'industry': branding.industry,
            'styles': branding.preferred_styles,
            'colors': branding.color_palette
        })
        
        return {
            'logo': logo,
            'color_palette': await self.generate_color_palette(logo),
            'typography': await self.suggest_typography(logo),
            'brand_guidelines': await self.create_brand_guidelines(logo)
        }
    
    async def generate_icon_set(self, ui_elements: UIElementSpec) -> IconSet:
        """Generate complete icon set for the application"""
        icons = {}
        
        for element in ui_elements:
            icons[element.name] = await self.image_cf.generate_icon_set(
                concept=element.description,
                styles=element.styles
            )
        
        return icons
    
    async def generate_favicon_package(self, logo: Image) -> FaviconPackage:
        """Create multi-format favicon package"""
        return await self.image_cf.generate_favicon(
            logo_image=logo,
            sizes=[16, 32, 64, 128, 256, 512]
        )