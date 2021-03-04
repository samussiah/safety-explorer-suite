Promise.all(data.map(dataset => fetch(dataset.path).then(response => response.text())))
    .then(texts => texts.map((text,i) => ({
        raw: d3.csv.parse(text),
        type: data.find((d,j) => j === i).type,
    })))
    .then(datasets => {
        // Initialize library.
        safetyExplorerSuite
            .createExplorer(
                '#container', // element
                settings // settings
            )
            .init(
                datasets, // array of data files
                false, // load .csv files?
                true // SDTM-structured data files?
            );
    });
