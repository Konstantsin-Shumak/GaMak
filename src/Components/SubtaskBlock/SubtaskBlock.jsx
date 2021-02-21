import React, { useState, useMemo, useEffect, useCallback } from 'react';
import done from '../../Assets/Images/blackdone.svg';
import circle from '../../Assets/Images/blackcircle.svg';
import circleHover from '../../Assets/Images/blackcirclehover.svg';
import deletesubtask from '../../Assets/Images/deletesubtask.svg';
import './SubtaskBlock.css';

export const SubtaskBlock = (props) => {

    const { onUpdateTask, onDeleteTask,subtask } = props;

    const [mouseOverDiv, setMouseOverDiv] = useState(false);
    const [mouseUnderIcon, setMouseUnderIcon] = useState(false);
    const [subtaskTitle, setSubtaskTitle] = useState();

    const iconStatus = useMemo(() => {
        if (subtask.done) {
            return done;
        } else if (!subtask.done && !mouseUnderIcon) {
            return circle;
        } else {
            return circleHover;
        }
    }, [mouseUnderIcon, subtask.done])

    const updateOrNot = useCallback((event) => {
        if (event.key === 'Enter' || !event.key) {
            onUpdateTask(subtask.id, event.target.value, subtask.done, null);
            event.preventDefault();
        }
    }, [onUpdateTask, subtask])

    useEffect(() => {
        setSubtaskTitle(subtask.title);
    }, [subtask, subtask.done])

    return (
        <div className="subtask"
            onMouseEnter={() => setMouseOverDiv(true)}
            onMouseLeave={() => setMouseOverDiv(false)}
        >
            <div className="subtask__icon_status"
                onMouseEnter={() => setMouseUnderIcon(true)}
                onMouseLeave={() => setMouseUnderIcon(false)}
                onClick={() => onUpdateTask(subtask.id, subtaskTitle, !subtask.done, null)}>
                <img className="subtask_icon_status__img" src={iconStatus} alt="Icon Status" />
            </div>
            <textarea className="subtask__text" type="text" key={subtask.id}
                onKeyPress={(event) => updateOrNot(event)}
                maxLength="30"
                defaultValue={subtask.title}
                onChange={setSubtaskTitle} />
            {mouseOverDiv &&
                <div className="subtask__delete_button"
                    onClick={() => {onDeleteTask(subtask.id) }}>
                    <img className="subtask__delete_button__img"
                        src={deletesubtask}
                        alt="deletesubtask" />
                </div>
            }
        </div>
    )
}