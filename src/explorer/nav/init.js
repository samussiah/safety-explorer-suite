export function init() {
    const main = this;

    this.nav.wrap.selectAll('*').remove();

    const chartNav = this.nav.wrap.append('ul').attr('class', 'ses-nav ses-nav-tabs');

    const chartNavItems = chartNav
        .selectAll('li')
        .data(this.charts.renderers)
        .enter()
        .append('li')
        .classed('active', (d,i) => d.name === this.config.initial_renderer.name);

    chartNavItems.append('a').text(d => d.label);

    chartNavItems.on('click', function(d) {
        if (!d3.select(this).classed('active')) {
            main.chartWrap.selectAll('*').remove();
            chartNavItems.classed('active', false);
            d3.select(this).classed('active', true);
            d.render();
        }
    });
}
