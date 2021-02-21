import {
    allTasksField,
    plannedTasksField,
    notAsignedTasksField,
    historyTasksField
} from './Tasks/itemsFilterFields';
import alltasksImg from '../Assets/Images/alltasks.svg';
import activeImg from '../Assets/Images/active.svg';
import noactiveImg from '../Assets/Images/noactive.svg';
import historyImg from '../Assets/Images/history.svg';

export const filterMenu = ([{
    title: "Задачи",
    img: alltasksImg,
    filterField: allTasksField,
}, {
    title: "Запланировано",
    img: activeImg,
    filterField: plannedTasksField,
}, {
    title: "Неназначенно",
    img: noactiveImg,
    filterField: notAsignedTasksField,
}, {
    title: "История",
    img: historyImg,
    filterField: historyTasksField,
}]);