import {View} from 'react-native';
import React from 'react';
import Plot from 'react-native-plotly';

const MyPlotly = () => {
  const data = [
    {
      x: [1, 2, 3, 4, 5],
      y: [2, 3, 5, 4, 7],
      type: 'scatter',
      mode: 'lines',
      marker: {color: 'red'},
    },
  ];

  const layout = {
    title: 'A Simple Plotly Chart',
    xaxis: {
      title: 'X Axis',
    },
    yaxis: {
      title: 'Y Axis',
    },
  };
  return (
    <View>
      <View>
        <Plot data={data} layout={layout} />
      </View>
    </View>
  );
};

export default MyPlotly;
