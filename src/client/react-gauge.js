import React from 'react';
import ReactDOM from 'react-dom';
import ReactGauge from 'react-gauge';

class ReactGaugeTool extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value
    }
  }

  updateValue(e) {
    e.preventDefault();
    e.stopPropagation();

    let value = e.target.value;
    if (value < 0 || value > 100) return;
    this.setState({ value });
  }

  render() {
    return (
      <div className='gauge-tool'>
        <ReactGauge value={ this.state.value }/>

        <div className='input'>
          <input type='number' onChange={ this.updateValue.bind(this) } value={ this.state.value }/>
        </div>
      </div>
    )
  }
}
ReactGaugeTool.defaultProps = { min: 0, max: 100, value: 0 }

ReactDOM.render(
  <ReactGaugeTool/>,
  document.getElementById('gauge-tool')
)
