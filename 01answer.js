d3.csv('ue_industry.csv', data => {

    const industries = ['Agriculture'];

    const colors = ['#000'];

    const totalYmax = d3.sum(
        industries.map(
            d => d3.max(data, e => +e[d])
        )
    );

    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => +d.index))
        .range([20, 1180]);

    const yScale = d3.scaleLinear()
        .domain([0, totalYmax])
        .range([580, 20]);

    const fillScale = d3.scaleOrdinal()
        .domain(industries)
        .range(colors);

    const stackLayout = d3.stack()
        .keys(industries);

    const stackArea = d3.area()
        .x((d, i) => xScale(i))
        .y0(d => yScale(d[0]))
        .y1(d => yScale(d[1]));

    d3.select('#answer1')
        .selectAll('path')
        .data(stackLayout(data))
        .enter().append('path')
        .attr('d', d => stackArea(d))
        .style('stroke', d => fillScale(d.key))

});
