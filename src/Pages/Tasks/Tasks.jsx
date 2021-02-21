import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { sortTasks } from '../../Services/Tasks/sortTasks';
import { filterMenu } from '../../Services/leftMenuFilter';
import { allTasksField } from '../../Services/Tasks/itemsFilterFields';
import { fetchTasksAsync } from '../../Services/Backend/fetchTasksAsync';
import { putTaskAsync } from '../../Services/Backend/Task/putTaskAsync';
import { postTaskAsync } from '../../Services/Backend/Task/postTaskAsync';
import { deleteTaskAsync } from '../../Services/Backend/Task/deleteTaskAsync';
import { getUserId } from '../../Services/Login/getUserId';
import { LeftFilterPanel } from '../../Components/LeftFilterPanel/LeftFilterPanel';
import { TasksList } from '../../Components/TasksList/TasksList';
import './Tasks.css';

export const Tasks = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState(allTasksField);
    const [filterTitle, setFilterTitle] = useState(filterMenu[0].title);

    const onCreateTask = useCallback((taskTitle, deadline, parent) => postTaskAsync(taskTitle, deadline, parent)
        .then((json) => setTasks([...tasks, json])),
        [tasks]);

    const onUpdateTask = useCallback((taskId, taskTitle, status, deadline) => putTaskAsync(taskId, taskTitle, status, deadline)
        .then(json => setTasks(tasks.map(task => (task.id === taskId) ? json : task))),
        [tasks]);

    const onDeleteTask = useCallback((taskId) => {
        var result = [];
        tasks.forEach(task => {
            (taskId === task.id || taskId === task?.parent?.id) ?
                deleteTaskAsync(task.id) : result.push(task)
        });
        setTasks(result);
    }, [tasks]);

    const sortedTasks = useMemo(() => sortTasks(tasks, filter), [tasks, filter]);

    useEffect(() => {
        setIsLoading(true);
        fetchTasksAsync(getUserId())
            .then(tasks => setTasks(tasks))
            .finally(setIsLoading(false));
    }, []);

    const changeActiveTasks = useCallback((filter, title) => {
        setFilter(filter);
        setFilterTitle(title);
    }, []);

    return (
        <div className="content">
            {isLoading &&
                <span>Загрузка...</span>
            }
            {!isLoading &&
                <>
                    <LeftFilterPanel
                        activeFilter={filter}
                        onActiveFilter={changeActiveTasks}
                        tasks={tasks} />
                    <TasksList
                        key={filter}
                        tasks={sortedTasks}
                        header={filterTitle}
                        onCreateTask={onCreateTask}
                        onUpdateTask={onUpdateTask}
                        onDeleteTask={onDeleteTask}
                    />
                </>
            }
        </div>
    );
}