import React, { useState, useMemo, useCallback } from 'react';
import { getTaskId } from '../../Services/Tasks/getTaskId';
import { getTaskStatus } from '../../Services/Tasks/getTaskStatus';
import { getTaskSubtasksNumber } from '../../Services/Tasks/getTaskSubtasksNumber';
import { getTaskDeadline } from '../../Services/Tasks/getTaskDeadline';
import done from '../../Assets/Images/done.svg';
import circle from '../../Assets/Images/circle.svg';
import circleHover from '../../Assets/Images/circlehover.svg';
import './TaskBlock.css';

export const TaskBlock = (props) => {

    const [mouseUnderIcon, setMouseUnderIcon] = useState(false);
    const { task, onClickOnTaskBlock, onUpdateTask, activeItem } = props;
    const isSubtasksHave = useMemo(() => getTaskSubtasksNumber(task) ? true : false, [task]);
    const isDateHave = useMemo(() => getTaskDeadline(task) ? true : false, [task]);
    const getItemClassName = useCallback((item) => (activeItem === item) ? "active" : "", [activeItem]);

    const iconStatus = useMemo(() => {
        if (getTaskStatus(task)) {
            return done;
        } else if (!getTaskStatus(task) && !mouseUnderIcon) {
            return circle;
        } else {
            return circleHover;
        }
    }, [ mouseUnderIcon, task]);

    return (
        <div className={`task_block_item ${getItemClassName(getTaskId(task))}`}>
            <div className="task_block_item__icon_status"
                onMouseEnter={() => setMouseUnderIcon(true)}
                onMouseLeave={() => setMouseUnderIcon(false)}
                onClick={() => onUpdateTask(task.id, task.title, !task.done, task.deadline)}>
                <img className="task_block_item__icon_status__img" src={iconStatus} alt="Icon Status" />
            </div>
            <div className="task_block__clicked_place"
                onClick={() => onClickOnTaskBlock(task.id, task)}>
                <div className="task_block__clicked_place__info">
                    <div className="task_block__clicked_place__info__title_task">{task.title}</div>
                    <div className="task_block__clicked_place__info__additonal_info">
                        {isSubtasksHave && <div className="number_subtask">{getTaskSubtasksNumber(task)}</div>}
                        {isDateHave && <div className="date_task">{getTaskDeadline(task)}</div>}
                    </div>
                </div>
            </div>
        </div >
    )
}