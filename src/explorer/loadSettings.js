export function loadSettings() {
    //parse the settings object to get the path
    const location = this.config.chartSettings.location.path
        ? this.config.chartSettings.location.path +
          this.config.chartSettings.location.file +
          '.json'
        : 'library';

    //load the settings object
    if (location == 'library') {
        this.config.chartSettings.imported =
            this.settingsLibrary[this.config.chartSettings.location.file];
        this.config.chartSettings.load = false;
        this.charts.init(this);
        this.charts.renderers[0].render();
    } else {
        d3.json(location, (error, json) => {
            if (error) {
                console.log("Couldn't load settings from json.");
                console.log(error);
            } else {
                this.config.chartSettings.imported = json;
                this.config.chartSettings.load = false;
                this.charts.init(this);
                this.charts.renderers[0].render();
            }
        });
    }
}
