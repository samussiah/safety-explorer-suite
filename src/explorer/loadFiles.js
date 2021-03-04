//Simple convienence function to load multiple files in parallel.
// input files is an array of objects structured as follows:
// [
// {path:'myAEs.csv', type:"AE"},
// {path:'myLabs.csv', type:"Labs"}
//]
//

export function loadFiles(dataFiles, sdtm) {
    let remaining = dataFiles.length;
    dataFiles.forEach(function(file) {
        d3.csv(file.path, function(csv) {
            file.raw = csv;
            if (!--remaining) {
                this.init(dataFiles, false, sdtm);
            }
        });
    });
}
