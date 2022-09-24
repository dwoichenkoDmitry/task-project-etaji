export function GetDate() {
    let curr = new Date();
    curr.setDate(curr.getDate());
    return curr.toISOString().substring(0,10);
}

export function ConvertDate(date: string) {
    let curr = new Date(date);
    curr.setDate(curr.getDate());
    return curr.toISOString().substring(0,10);
}