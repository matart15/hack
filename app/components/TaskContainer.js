import React, { Component } from 'react';
import { ListItem } from 'material-ui/List';
import PropTypes from 'prop-types';
import Task from './Task';

class TaskContainer extends Component {
  static propTypes = {
    addTask: PropTypes.func.isRequired,
    updateTask: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
    task: PropTypes.shape({
      text: PropTypes.string,
      indexPath: PropTypes.arrayOf(PropTypes.number),
      active: PropTypes.bool,
      complete: PropTypes.bool,
      childTasks: PropTypes.array
    })
  };

  static defaultProps = {
    task: []
  }

  render() {
    // TODO: css 切り出し
    const childTasks = [];
    for (let i = 0; i < this.props.task.childTasks.length; i += 1) {
      const childTask = this.props.task.childTasks[i];
      if (childTask != null) {
        childTasks.push(
          <TaskContainer
            key={i}
            addTask={this.props.addTask}
            updateTask={this.props.updateTask}
            switchTaskActive={this.switchTaskActive}
            deleteTask={this.props.deleteTask}
            task={childTask}
          />);
      }
    }

    return (
      <ListItem
        initiallyOpen
        nestedItems={childTasks}
      >
        <Task {...this.props} />
      </ListItem>
    );
  }
}
export default TaskContainer;
