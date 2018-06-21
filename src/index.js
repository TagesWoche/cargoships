import { select } from 'd3-selection'
import { transition } from 'd3-transition'
import enterView from 'enter-view'

const container = select('#scrolly-overlay')
const stepSel = container.selectAll('.step')
const containerWidth = container.node().getBoundingClientRect().width
container.select('#slide-1').style('transform', `translateX(${-containerWidth}px)`)
container.select('#slide-2').style('transform', `translateX(${(-containerWidth * 2)}px)`)
container.select('#slide-3').style('transform', `translateX(${(-containerWidth * 3)}px)`)

const ships1987 = select('#shipswrapper_1987').attr('transform', 'translate(0,-20)')

const ships2017 = select('#shipswrapper_2017').attr('transform', 'translate(0,-20)')

function updateSlideShow(index) {
  const translateValue = index * containerWidth;
  stepSel.classed('is-active', (d, i) => i === index);
  container.select('#slides').transition().style('transform', `translateX(${translateValue}px)`)
}

function showChart() {
  select('#ship_1987').style('opacity', 0)
  select('#ship_2017').style('opacity', 0)
  select('#year_1987').style('opacity', 0)
  select('#Container_15000').style('opacity', 0)
  select('#year_2017').style('opacity', 0)
  select('#Container_138000').style('opacity', 0)

  const data2017 = [
    {
      'x': 41,
      'y': 25,
      'animation_time': 100
    },
    {
      'x': 68,
      'y': 25,
      'animation_time': 200
    },
    {
      'x': 95,
      'y': 25,
      'animation_time': 300
    },
    {
      'x': 41,
      'y': 8,
      'animation_time': 400
    },
    {
      'x': 68,
      'y': 8,
      'animation_time': 500
    },
    {
      'x': 95,
      'y': 8,
      'animation_time': 600
    },
    {
      'x': 41,
      'y': -9,
      'animation_time': 700
    },
    {
      'x': 68,
      'y': -9,
      'animation_time': 800
    },
    {
      'x': 95,
      'y': -9,
      'animation_time': 900
    },
    {
      'x': 41,
      'y': -26,
      'animation_time': 1000
    },
    {
      'x': 68,
      'y': -26,
      'animation_time': 1100
    },
    {
      'x': 95,
      'y': -26,
      'animation_time': 1200
    },
    {
      'x': 41,
      'y': -43,
      'animation_time': 1300
    },
    {
      'x': 68,
      'y': -43,
      'animation_time': 1400
    },
    {
      'x': 95,
      'y': -43,
      'animation_time': 1500
    },
    {
      'x': 41,
      'y': -60,
      'animation_time': 1600
    },
    {
      'x': 68,
      'y': -60,
      'animation_time': 1700
    },
    {
      'x': 95,
      'y': -60,
      'animation_time': 1800
    },
    {
      'x': 41,
      'y': -77,
      'animation_time': 1900
    },
    {
      'x': 68,
      'y': -77,
      'animation_time': 2000
    },
    {
      'x': 95,
      'y': -77,
      'animation_time': 2100
    },
    {
      'x': 41,
      'y': -94,
      'animation_time': 2200
    },
    {
      'x': 68,
      'y': -94,
      'animation_time': 2300
    },
    {
      'x': 95,
      'y': -94,
      'animation_time': 2400
    }
  ]

  const data1987 = [
    {
      'x': 41,
      'y': 25,
      'animation_time': 100
    },
    {
      'x': 68,
      'y': 25,
      'animation_time': 200
    },
    {
      'x': 95,
      'y': 25,
      'animation_time': 300
    }
  ]

  select('#ship_1987').transition().style('opacity', 1)
  select('#ship_2017').transition().style('opacity', 1)

  const shipContainer1987 = ships1987.selectAll('.ship-container').data(data1987)
  const shipContainer1987Enter = shipContainer1987.enter().append('rect').attr('class', 'ship-container')

  const shipContainer1987Update = shipContainer1987.merge(shipContainer1987Enter);

  shipContainer1987Update.attr('width', 24.26)
    .style('fill', '#37A271')
    .attr('height', 14.73)
    .attr('x', 50)
    .attr('y', -150)
    .style('opacity', 0)
    .transition()
    .delay(d => d.animation_time)
    .duration(100)
    .style('opacity', 1)
    .attr('x', d => d.x )
    .attr('y', d => d.y )

  select('#year_1987').transition().delay(3500).style('opacity', 1)
  select('#Container_15000').transition().delay(3500).style('opacity', 1)


  const shipContainer2017 = ships2017.selectAll('.ship-container').data(data2017);
  const shipContainer2017Enter = shipContainer2017.enter().append('rect').attr('class', 'ship-container');

  const shipContainer2017Update = shipContainer2017.merge(shipContainer2017Enter);

  shipContainer2017Update.attr('width', 24.26)
    .style('fill', '#37A271')
    .attr('height', 14.73)
    .attr('x', 50)
    .attr('y', -150)
    .style('opacity', 0)
    .transition()
    .delay(d => d.animation_time + 500)
    .duration(100)
    .style('opacity', 1)
    .attr('x', d => d.x )
    .attr('y', d => d.y )

  select('#year_2017').transition().delay(3500).style('opacity', 1)
  select('#Container_138000').transition().delay(3500).style('opacity', 1)
}

const cargoContainer = select('#cargo-container')

function init() {

  enterView({
    selector: stepSel.nodes(),
    offset: 0.1,
    enter: el => {
      const index = +select(el).attr('data-index');
      updateSlideShow(index);
    },
    exit: el => {
      let index = +select(el).attr('data-index');
      index = Math.max(0, index - 1);
      updateSlideShow(index);
    }
  });

  enterView({
    selector: cargoContainer.nodes(),
    offset: 0.3,
    enter: el => {
      showChart(el);
    },
    once: true
  });
}

init();

module.hot.accept()
