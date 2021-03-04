import { prepSettings } from './prepSettings';

export function init() {
    prepSettings.call(this);
    this.charts.renderers.forEach(renderer => {
        //link the data
        if (renderer.name == 'web-codebook') {
            renderer.settings.files = this.data.map(d => {
                d['Data'] = d.type;
                d.Rows = d.raw.length;
                d.Columns = Object.keys(d.raw[0]).length;
                d.json = d.raw;
                return d;
            });
            renderer.dataFile = null;
        } else {
            renderer.dataFile = this.data.filter(d => {
                return d.type == renderer.data;
            })[0];
        }

        //add render method
        //     var mainFunction = cat.controls.mainFunction.node().value;
        renderer.render = () => {
            if (renderer.sub) {
                //var subFunction = cat.controls.subFunction.node().value;
                this.currentChart = window[renderer.main][renderer.sub](
                    this.element + ' .chartWrap',
                    renderer.settings
                );
            } else {
                this.currentChart = window[renderer.main](
                    this.element + ' .chartWrap',
                    renderer.settings
                );
            }
            this.currentChart.key = renderer.name;
            this.currentChart.renderer = renderer;

            if (renderer.dataFile) {
                this.currentChart.init(renderer.dataFile.raw.map(d => Object.assign({}, d)));
            } else {
                this.currentChart.init();
            }

            //call the chartinit callback
            this.events.onChartinit.call(this);
        };

        //add destroy method
        renderer.destroy = () => {};
    });
}
