import React, { useState, useCallback} from 'react';
import { TaskBlock } from '../TaskBlock/TaskBlock';
import { RightTaskInfoPanel } from '../RightTaskInfoPanel/RightTaskInfoPanel';
import { TaskCreator } from '../TaskCreator/TaskCreator';
import './TasksList.css';

export const TasksList = (props) => {
    const { tasks, onCreateTask, onUpdateTask, onDeleteTask, header } = props;
    const [activeTask, setActiveTask] = useState();
    const [activeTaskIndex, setActiveTaskIndex] = useState();
    const [isOpenPanel, setIsOpenPanel] = useState();

    const onClickOnTaskBlock = useCallback((index, task) => {
        if (activeTaskIndex !== index || isOpenPanel === false) {
            setActiveTaskIndex(index);
            setActiveTask(task);
            setIsOpenPanel(true);
        } else {
            setIsOpenPanel(false);
        }
    }, [activeTaskIndex, isOpenPanel]);

    return (
        <div className="tasks_content">
            <div className="tasks_content__main_block">
                <div className="tasks_content__main_block__header">{header}</div>
                <div className="tasks_content__main_block__tasks_block">
                    {tasks.map((task) =>
                        <TaskBlock
                            key={task.id}
                            task={task}
                            activeItem={activeTaskIndex}
                            onClickOnTaskBlock={onClickOnTaskBlock}
                            onUpdateTask={onUpdateTask}
                        />)}
                </div>
                <TaskCreator
                    onCreateTask={onCreateTask} />
            </div>
            {isOpenPanel &&
                <RightTaskInfoPanel
                    task={activeTask}
                    onCreateTask={onCreateTask}
                    onUpdateTask={onUpdateTask}
                    onDeleteTask={onDeleteTask}
                />
            }
        </div>
    )
}