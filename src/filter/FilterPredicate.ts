import {PostType} from "../interfaces/PostsInterface";
import {ConvertDate} from "../dates/dateWork";
import {Statuses} from "../screens/HomeScreen";

interface IParameters {
    header: string
    startDate: string
    finishDate: string
}

export function FilterPredicate(item: PostType, filterParameters: IParameters, filterStatus: string): boolean {
    console.log(((filterParameters.startDate !== '' ?
            ConvertDate(item.defaultStartDate) > ConvertDate(filterParameters.startDate) : true) &&
        (filterParameters.finishDate !== '' ?
            ConvertDate(item.defaultFinishDate) < ConvertDate(filterParameters.finishDate) : true) &&
        (filterParameters.header !== '' ?
            item.header.indexOf(filterParameters.header) !== -1 : true) &&
        (filterStatus === Statuses.all ? true : filterStatus === Statuses.InProcess ? !item.status : item.status)))
    return ((filterParameters.startDate !== '' ?
        ConvertDate(item.defaultStartDate) > ConvertDate(filterParameters.startDate) : true) &&
    (filterParameters.finishDate !== '' ?
        ConvertDate(item.defaultFinishDate) < ConvertDate(filterParameters.finishDate) : true) &&
    (filterParameters.header !== '' ?
        item.header.indexOf(filterParameters.header) !== -1 : true) &&
    (filterStatus === Statuses.all ? true : filterStatus === Statuses.InProcess ? !item.status : item.status))
}