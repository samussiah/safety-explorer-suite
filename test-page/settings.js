const settings = {
    initial_renderer: window && window.location && window.location.hash
        ? window.location.hash.substring(1)
        : null, // allow linking to each renderer
    filters,
    groups: filters.map(filter => ({...filter})),
    custom_settings: [
        {
            renderer_name: 'aeexplorer',
            variables: {
                filters: [
                    {
                        value_col: 'AESER',
                        label: 'Serious?',
                        type: 'event',
                        start: null
                    },
                    {
                        value_col: 'AESEV',
                        label: 'Severity',
                        type: 'event',
                        start: null
                    },
                    {
                        value_col: 'AEREL',
                        label: 'Relationship',
                        type: 'event',
                        start: null
                    },
                    {
                        value_col: 'AEOUT',
                        label: 'Outcome',
                        type: 'event',
                        start: null
                    },
                ].concat(filters.map(filter => ({...filter}))),
            },
            defaults: {
                placeholderFlag: {
                    value_col: 'AETERM',
                    values: [''],
                },
            },
        },
        {
            renderer_name: 'ae-timelines',
            filters: [
                {
                    value_col: 'AESER',
                    label: 'Serious?',
                    type: 'event',
                    start: null
                },
                {
                    value_col: 'AESEV',
                    label: 'Severity',
                    type: 'event',
                    start: null
                },
                {
                    value_col: 'AEREL',
                    label: 'Relationship',
                    type: 'event',
                    start: null
                },
                {
                    value_col: 'AEOUT',
                    label: 'Outcome',
                    type: 'event',
                    start: null
                },
            ].concat(filters.map(filter => ({...filter}))),
        },
        {
            renderer_name: 'safety-histogram',
            //filters: filters.map(filter => ({...filter})),
            displayNormalRange: true,
        },
        {
            renderer_name: 'safety-outlier-explorer',
            //filters: filters.map(filter => ({...filter})),
        },
        {
            renderer_name: 'paneled-outlier-explorer',
            //filters: filters.map(filter => ({...filter})),
        },
        {
            renderer_name: 'safety-results-over-time',
            //groups: filters.map(filter => ({...filter})),
            //filters: filters.map(filter => ({...filter})),
        },
        {
            renderer_name: 'safety-shift-plot',
            //filters: filters.map(filter => ({...filter})),
        },
        {
            renderer_name: 'safety-delta-delta',
            //filters: filters.map(filter => ({...filter})),
            visits:{comparison:["WEEK 26"],baseline:[]}
        },
        {
            renderer_name: 'hep-explorer',
            //groups: filters.map(filter => ({...filter})),
            //filters: filters.map(filter => ({...filter})),
            measure_values:{
                'ALT':'Alanine Aminotransferase',
                'AST':'Aspartate Aminotransferase',
                'TB':'Bilirubin',
                'ALP':'Alkaline Phosphatase'
            },
        },
    ],
};
