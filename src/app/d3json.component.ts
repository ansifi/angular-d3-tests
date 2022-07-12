import { Component, OnInit, Type } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class D3jsonComponent implements OnInit {
 
  ngOnInit(): void {
    //Read JSON and draw the real graph
     d3.json("data.json", (data => {
      this.drawGraph(data);
    }));
  }


  drawGraph(data): void {
    //Initialize the SVG
      var svg;
      var margin = 50;
      var width = 750 - (margin * 2);
      var height = 400 - (margin * 2);

      //create SVG
       svg = d3.select("#jsonGraph")
      .append("svg")
      .attr("width", width + (margin * 2))
      .attr("height", height + (margin * 2))
      .append("g")
      .attr("transform", "translate(" + margin + "," + margin + ")");

      //Draw Plot
      //Add X axis
      const x = d3.scaleLinear()
      .domain([100, 2000])
      .range([ 0, width ]);
      svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).tickFormat(d3.format("d")));

      // Add Y axis
      const y = d3.scaleLinear()
      .domain([0, 30])
      .range([ height, 0]);
      svg.append("g")
      .call(d3.axisLeft(y));

      // Add dots
      const dots = svg.append('g');

      dots.selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", d => x(d.Timestamp))
      .attr("cy", d => y(d.Temperature))
      .attr("r", 7)
      .style("opacity", .5)
      .style("fill", "#69b3a2");

      dots.selectAll("text")
      .data(data)
      .enter()
      .append("text")
      // .text(d => d.Reading)
      .attr("x", d => x(d.Timestamp))
      .attr("y", d => y(d.Temperature))
  }
}