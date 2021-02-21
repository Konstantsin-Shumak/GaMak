import React, { useCallback } from 'react';
import { filterMenu } from '../../Services/leftMenuFilter';
import { getNumberOfTheTasks } from '../../Services/Tasks/getNumberOfTheTasks';
import './LeftFilterPanel.css';

export const LeftFilterPanel = (props) => {
    const { activeFilter, onActiveFilter } = props;
    const getNumber = useCallback((filter) => getNumberOfTheTasks(props.tasks, filter), [props.tasks]);
    const getItemClassName = useCallback((filter) => (activeFilter === filter) ? "active" : "", [activeFilter]);

    return (
        <div className="left_filter_panel">
            <ul className="left_filter_panel__menu">
                {filterMenu.map(filter =>
                    <div key={filter.filterField}
                        className={`left_filter_panel__menu__block ${getItemClassName(filter.filterField)}`}
                        onClick={() => onActiveFilter(filter.filterField, filter.title)}>
                        <li className="left_filter_panel__menu__block__li">
                            <img className="left_filter_panel__menu__block__li__img" src={filter.img} alt="All tasks" />
                            <p className="left_filter_panel__menu__block__li__text">{filter.title}</p>
                        </li>
                        <div className="left_filter_panel__menu__block__number_of_the_task">{getNumber(filter.filterField)}</div>
                    </div>
                )}
            </ul>
        </div>
    )
}