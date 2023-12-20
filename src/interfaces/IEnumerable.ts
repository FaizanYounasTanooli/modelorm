import { List } from "../Models/List";

export default interface IEnumerable<T> {
    First():T;
    // FirstOrDefault():T;
    // GroupBy():T;
    // Last():T;
    // LastOrDefault():T;
    // Count():number;
    // Max():number;


    //First(selector:Function):T;
    Where<K extends keyof T>(
        predicate: (item: Pick<T, K>) => boolean
    ):IEnumerable<T>;
    ToList():List<T>;
    Select<TResult>( selector:(item: T)=>TResult ):IEnumerable<TResult>
    // FirstOrDefault(selector:Function):T;
    // Select(selector:Function):IQueryable<T>;
    // GroupBy(selector:Function):T;
    // Last(selector:Function):T;
    // LastOrDefault(selector:Function):T;
    // Count(selector:Function):number;
    // Max(selector:Function):number;
}