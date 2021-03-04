import defaultSettings from './defaultSettings';

export function prepSettings() {
    // title and instructions
    this.config.title = this.config.title || defaultSettings.title;
    this.config.instructions = this.config.instructions || defaultSettings.instructions;

    // set defaults and update the renderers accordingly
    this.config.renderers =
        this.config.renderers || this.charts.renderers.map(renderer => renderer.name);
    this.config.custom_settings =
        this.config.custom_settings || defaultSettings.custom_settings;

    //only keep the selected renderers (or keep them all if none are specified)
    this.charts.renderers = this.charts.renderers
        .filter(d => this.config.renderers.indexOf(d.name) > -1)
        .sort(
            (a, b) =>
                this.config.renderers.indexOf(a.name) -
                this.config.renderers.indexOf(b.name)
        );

    //chartSettings object
    this.config.chartSettings = this.config.chartSettings || defaultSettings.chartSettings;

    //Map deprecated custom_settings object to config.chartSettings.custom (if no other settings are provided)
    //if (this.config.custom_settings.length & !this.config.chartSettings.custom) {
    //    this.config.chartSettings.custom = this.config.custom_settings;
    //}

    //Attempt to load the settings if a file is specified
    this.config.chartSettings.load = this.config.chartSettings.location.file ? true : false;

    //set initial renderer
    this.config.initial_renderer =
        this.charts.renderers.find(
            renderer => renderer.name === this.config.initial_renderer
        ) || this.charts.renderers[0];

    //customize the settings (or use the default settings if nothing is specified)
    if (this.config.custom_settings) {
        this.config.custom_settings.forEach(custom_setting => {
            var thisRenderer = this.charts.renderers.filter(renderer => {
                return custom_setting.renderer_name == renderer.name;
            })[0];

            if (thisRenderer) thisRenderer.settings = custom_setting;
        });
    }

    // Attach suite-level filters to each module.
    if (Array.isArray(this.config.filters)) {
        this.charts.renderers.forEach(module => {
            // Check for module-level filters.
            const moduleFilters = module.name === 'aeexplorer'
                ? module.settings.variables.filters || []
                : module.settings.filters || [];

            // Add suite-level filters to module-level filters.
            this.config.filters.forEach(filter => {
                const moduleFilter = moduleFilters
                    .find(moduleFilter => moduleFilter.value_col === filter.value_col);
                if (moduleFilter === undefined)
                    moduleFilters.push(filter);
            });

            // Set module-level filters.
            if (module.name === 'aeexplorer')
                module.settings.variables.filters = moduleFilters;
            else
                module.settings.filters = moduleFilters;
        });
    }
}
