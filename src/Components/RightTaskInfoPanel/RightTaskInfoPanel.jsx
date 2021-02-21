import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { historyTasksField } from '../../Services/Tasks/itemsFilterFields';
import { TaskCreator } from '../TaskCreator/TaskCreator';
import done from '../../Assets/Images/blackdone.svg';
import circle from '../../Assets/Images/blackcircle.svg';
import circleHover from '../../Assets/Images/blackcirclehover.svg';
import deletetask from '../../Assets/Images/deletetask.svg';
import { SubtaskBlock } from '../SubtaskBlock/SubtaskBlock';
import './RightTaskInfoPanel.css';

export const RightTaskInfoPanel = (props) => {

    const { task, onCreateTask, onUpdateTask, onDeleteTask } = props;

    const [taskTitle, setTaskTitle] = useState();
    const [deadline, setDeadline] = useState();
    const today = new Date().getFullYear() + "-" + new Date().getMonth() + 1 + "-" + new Date().getDate()

    const [mouseUnderIcon, setMouseUnderIcon] = useState(false);

    const iconStatus = useMemo(() => {
        if (task.done) {
            return done;
        } else if (!task.done && !mouseUnderIcon) {
            return circle;
        } else {
            return circleHover;
        }
    }, [mouseUnderIcon, task.done])

    const onChangeTask = useCallback((title, status) => {
        onUpdateTask(task.id, title, status, deadline);
        setTaskTitle(title);
    }, [task, deadline, onUpdateTask])

    const updateOrNote = useCallback((event) => {
        if (event.key === 'Enter' || event.key === undefined) {
            onChangeTask(event.target.value, task.done);
            event.preventDefault();
        }
    }, [onChangeTask, task.done])

    useEffect(() => {
        setTaskTitle(task.title);
        setDeadline(task.deadline);
    }, [task]);

    return (
        <div className="right_info_panel">
            <div className="right_info_panel__task_and_subtasks">
                <div className="right_info_panel__task_and_subtasks__task">
                    <div className="right_info_panel__task_and_subtasks__task__status"
                        onMouseEnter={() => setMouseUnderIcon(true)}
                        onMouseLeave={() => setMouseUnderIcon(false)}
                        onClick={() => onUpdateTask(task.id, taskTitle, !task.done, deadline)}>
                        <img className="right_info_panel__task_and_subtasks__task__status__img" src={iconStatus} alt="Icon Status" />
                    </div>
                    <textarea type="text"
                        className="right_info_panel__task_and_subtasks__task__text"
                        onKeyPress={(event) => updateOrNote(event)}
                        maxLength="30"
                        defaultValue={taskTitle}
                        onChange={setTaskTitle} />
                    <div className="right_info_panel__task_and_subtasks__task__delete_button"
                        onClick={() => onDeleteTask(task.id)}>
                        <img className="right_info_panel__task_and_subtasks__task__delete_button_img"
                            src={deletetask}
                            alt="deletetask" />
                    </div>
                </div>
                <div className="right_info_panel__task_and_subtasks__subtasks">
                    {props.task.subtasks.map(subtask =>
                        <SubtaskBlock
                            key={subtask.id}
                            subtask={subtask}
                            onUpdateTask={onUpdateTask}
                            onDeleteTask={onDeleteTask} />
                    )}
                    {props.activeFilter !== historyTasksField &&
                        <TaskCreator
                            parent={props.task.id}
                            onCreateTask={onCreateTask} />
                    }
                </div>
            </div>
            {props.activeFilter !== "История" &&
                <div className="right_info_panel__deadline">
                    <input type="date"
                        value={deadline}
                        min={today}
                        onChange={(event) => onUpdateTask(task.id, taskTitle, props.task.done, event.target.value)} />
                    <button className="right_info_panel__deadline__clear_deadline"
                        onClick={() => onUpdateTask(task.id, taskTitle, props.task.done, null)}>
                        x
                    </button>
                </div>
            }
        </div>
    )
}