// Set renderers.settings using the following (in order or preference):
// chartSettings.custom
// chartSettings.imported
// renderer.settings

export function prepSettings() {
    this.charts.renderers.forEach(renderer => {
        const customMatch = this.config.chartSettings.custom
            ? this.config.chartSettings.custom.filter(f => f.renderer_name == renderer.name)
            : [];
        const importedMatch = this.config.chartSettings.imported
            ? this.config.chartSettings.imported.filter(f => f.renderer_name == renderer.name)
            : [];

        if (customMatch.length) {
            renderer.settings = customMatch[0];
        } else if (importedMatch.length) {
            renderer.settings = importedMatch[0];
        }
    });

    //initialize user settings customizations
    this.events.onChartconfig.call(this);
}
