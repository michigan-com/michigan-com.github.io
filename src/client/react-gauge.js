import React from 'react';
import ReactDOM from 'react-dom';
import ReactGauge from 'react-gauge';

renderGauge();
document.getElementById('gauge-input').addEventListener('input', function(e) {
  let value = e.target.value;
  if (value < 0 || value > 100) return;
  renderGauge(this.value);
});

function renderGauge(val=0) {
  ReactDOM.render(
    <ReactGauge value={ val }/>,
    document.getElementById('gauge-tool')
  );
}
