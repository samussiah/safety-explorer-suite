import { loadFiles } from './loadFiles';
import { loadSettings } from './loadSettings';
import mergeData from './mergeData';

export function init(dataArray, loadcsv = false, sdtm = false) {
    if (loadcsv) loadFiles.call(this, dataArray, sdtm);
    // load the csvs if requested
    else {
        //otherwise initialize the charts
        this.dataArray = dataArray;

        //Merge SDTM data.
        if (sdtm) mergeData.call(this);
        this.data = this.dataArray;
        console.log(this.data);

        //Initialize data customizations callback
        this.events.onDatatransform.call(this);

        // prep settings & customize renderers
        this.prepSettings.call(this);

        //layout the divs
        this.layout.call(this);

        //draw nav
        this.nav.init.call(this);

        //load chart settings (if needed) and then prep the renderers and draw first codebook
        if (this.config.chartSettings.load) loadSettings.call(this);
        else {
            this.charts.init.call(this);
            this.config.initial_renderer.render();
        }
    }
}
