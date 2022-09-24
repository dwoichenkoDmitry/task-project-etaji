export default interface IPostObject {
    id: number,
    header: string,
    startDate: string,
    finishDate: string,
    description: string
    defaultFinishDate: string
    status: boolean
}

export default interface IPostObjectsArray {
    item: IPostObject
}

export type PostType = {
    status: boolean
    header: string;
    description: string;
    finishDate: string;
    defaultFinishDate: string;
    defaultStartDate: string;
    id: number;
    startDate: string
}

export default interface IState {
    posts: PostType[]
}