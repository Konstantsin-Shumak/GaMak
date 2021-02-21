import React, { useState, useCallback, useRef, useMemo, useEffect } from 'react';
import plus from '../../Assets/Images/plus.svg';
import circle from '../../Assets/Images/circle.svg';
import dateImg from '../../Assets/Images/adddate.svg';
import addTaskImg from '../../Assets/Images/addtask.svg';
import './TaskCreator.css';

import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ru from "date-fns/locale/ru";
registerLocale("ru", ru);

export const TaskCreator = (props) => {

    const ExampleCustomInput = React.forwardRef(({ onClick }, ref) => (
        <button ref={ref} className="task_creator__buttons__add_date" onClick={onClick}>
            <img className="task_creator__buttons__add_date__img" src={dateImg} alt="date" />
        </button>
    ));

    const [inputActive, setInputActive] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState();
    const [deadline, setDeadline] = useState(null);
    const [parent, setParent] = useState();
    const [taskCreatorButtonVisible, setTaskCreatorButtonVisible] = useState();
    const [isSubtask, setIsSubtask] = useState();
    const [today, setToday] = useState();

    const { onCreateTask } = props;

    const taskCreatorInput = useRef(null);
    const ref = React.createRef();

    const iconStatus = useMemo(() => {
        if (inputActive) {
            return circle;
        } else {
            return plus;
        }
    }, [inputActive])

    const onTextInputChange = useCallback((event) => {
        const taskText = event.target.value;
        if (taskText.length > 0) {
            setTaskCreatorButtonVisible(true);
        } else {
            setTaskCreatorButtonVisible(false);
        }
        setNewTaskTitle(taskText);
    }, [])

    const addNewTask = useCallback(() => {
        onCreateTask(newTaskTitle, deadline, parent);
    }, [onCreateTask, newTaskTitle, deadline, parent])

    const sendTaskOrNot = useCallback((event) => {
        if (event.key === 'Enter' || event.key === undefined) {
            if (newTaskTitle !== null) {
                addNewTask();
            }
            event.target.value = "";
            setNewTaskTitle(null);
        }
    }, [addNewTask, newTaskTitle])

    useEffect(() => {
        if (!props.parent) {
            setParent(null);
            setIsSubtask(false);
        } else {
            setParent(props.parent);
            setIsSubtask(true);
        }
        const day = new Date();
        setToday(day.toISOString().substring(0, 10));
    }, [props.parent])

    return (
        <div className="task_creator"
            onClick={() => taskCreatorInput.current.focus()}>
            <div className="task_creator__icon_status">
                <img className="task_creator__icon_status__img" src={iconStatus} alt="Icon Status" />
            </div>
            <input className="task_creator__input_text"
                ref={taskCreatorInput}
                type="text"
                placeholder="Добавить задачу"
                onFocus={() => {
                    setInputActive(true);
                    taskCreatorInput.current.placeholder = "";
                }}
                onBlur={() => {
                    setInputActive(false);
                    taskCreatorInput.current.placeholder = "Добавить задачу";
                }}
                onKeyPress={(event) => sendTaskOrNot(event)}
                onChange={onTextInputChange}
            />
            {taskCreatorButtonVisible &&
                <div className="task_creator__buttons">
                    {!isSubtask &&
                        <DatePicker
                            className="task_creator__buttons__add_date"
                            locale="ru"
                            popperModifiers={{
                                preventOverflow: {
                                    enabled: true,
                                },
                            }}
                            onFocus
                            value={today}
                            onChange={setDeadline}
                            minDate={new Date()}
                            customInput={<ExampleCustomInput
                                ref={ref} />}
                        />
                    }

                    <button className="task_creator__buttons__add_task"
                        onClick={() => addNewTask()}>
                        <img className="task_creator__buttons__add_task__img" src={addTaskImg} alt="addtask" />
                    </button>
                </div>}
        </div>
    )
}