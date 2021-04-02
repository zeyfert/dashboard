import React from 'react';
import { uniqueId } from 'lodash';

class Item extends React.Component {
  render() {
    const { text, time, index, onRemove } = this.props;
    return (    
     <div className="form-row py-2">
       <div className="col-1">
         <div className="form-control text-center">{index + 1}</div>
       </div>
       <div className="col-7">
         <div className="form-control text-center">{text}</div>
       </div>
       <div className="col-2">
         <div className="form-control">{time ? time : '--:--'}</div>
       </div>
       <div className="col-2">
        <button className="btn btn-outline-danger w-100" onClick={onRemove}>Delete</button>
       </div>
     </div>
    );
  }
}

export default class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = { newTask: { text: '', time: '' }, tasks: [] };
  }

  handleChange = ({ target: { type, value }}) => {
    const { newTask } = this.state;
    this.setState({ newTask: { ...newTask, [type]: value } });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { newTask: { text, time }, tasks } = this.state;
    const newTask = { id: uniqueId(), text, time };
    this.setState({ newTask: { text: '', time: '' }, tasks: [newTask, ...tasks] });
  }

  handleRemove = (removingId) => (e) => {
    e.preventDefault();
    const { tasks } = this.state;
    this.setState({ tasks: tasks.filter(({ id }) => id !== removingId) });
  }

  renderInputArea() {
    const { newTask: { text, time } } = this.state;
    return (
      <form className="py-2"onSubmit={this.handleSubmit}>
        <div className="form-row">
          <div className="col-8">
            <input type="text" value={text} required className="form-control" placeholder="Please type a task here" onChange={this.handleChange} />
          </div>
          <div className="col-2">
            <input type="time" value={time} className="form-control" onChange={this.handleChange} />
          </div>
          <div className="col-2">
            <button type="submit" className="btn btn-outline-primary w-100">Add task</button>
          </div>
        </div>
      </form>
    );
  }

  render() {
    const { tasks } = this.state;
    return (
      <div>
        <div className="text-center">
          <h6>Please be informed that all entered data will be lost after page is reloaded</h6>
        </div>
        <div>
          {this.renderInputArea()}
        </div>
        {tasks.map(({ id, text, time }, index) => <Item key={id} text={text} time={time} index={index} onRemove={this.handleRemove(id)}/>)}
      </div>
    );
  }
}