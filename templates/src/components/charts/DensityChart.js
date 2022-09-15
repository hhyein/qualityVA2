import React, { useEffect, useRef } from 'react'

export default function DensityChart(props) {
  const { data } = props
  const svgRef = useRef()
  const d3 = window.d3v4

  useEffect(() => {
    d3.select('.density-wrapper').selectAll('*').remove()

    const margin = {top: 20, right: 20, bottom: 20, left: 20},
      width = 200 - margin.left - margin.right,
      height = 200 - margin.top - margin.bottom;

    const svg = d3
      .select('.density-wrapper')
      .append('svg')
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_doubleHist.csv", function(data) {
      const x = d3
      .scaleLinear()
        .domain([-10,15])
        .range([0, width]);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

      const y = d3
        .scaleLinear()
        .range([height, 0])
        .domain([0, 0.12]);
      svg
        .append("g")
        .call(d3.axisLeft(y));

      const kde = kernelDensityEstimator(kernelEpanechnikov(7), x.ticks(60))
      const density1 =  kde( data
          .filter( function(d){return d.type === "variable 1"} )
          .map(function(d){  return d.value; }) )
      const density2 =  kde( data
          .filter( function(d){return d.type === "variable 2"} )
          .map(function(d){  return d.value; }) )

      svg
      .append("path")
      .attr("class", "mypath")
      .datum(density1)
      .attr("fill", "#69b3a2")
      .attr("opacity", ".6")
      .attr("stroke", "#000")
      .attr("stroke-width", 1)
      .attr("stroke-linejoin", "round")
      .attr("d",  d3.line()
        .curve(d3.curveBasis)
          .x(function(d) { return x(d[0]); })
          .y(function(d) { return y(d[1]); })
      );

      svg
      .append("path")
      .attr("class", "mypath")
      .datum(density2)
      .attr("fill", "#404080")
      .attr("opacity", ".6")
      .attr("stroke", "#000")
      .attr("stroke-width", 1)
      .attr("stroke-linejoin", "round")
      .attr("d",  d3.line()
        .curve(d3.curveBasis)
          .x(function(d) { return x(d[0]); })
          .y(function(d) { return y(d[1]); })
      );
    });

    function kernelDensityEstimator(kernel, X) {
      return function(V) {
        return X.map(function(x) {
          return [x, d3.mean(V, function(v) { return kernel(x - v); })];
        });
      };
    }
    function kernelEpanechnikov(k) {
      return function(v) {
        return Math.abs(v /= k) <= 1 ? 0.75 * (1 - v * v) / k : 0;
      };
    }
  }, [data, svgRef])

  return (
    <div className="density-wrapper" />
  )
}
