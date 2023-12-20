import IEnumerable from "./IEnumerable";

export default interface IQueryable<T> {
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
    ):IQueryable<T>;
    ToArray():IEnumerable<T>;
    Select<TResult>(selector:(item: T)=>TResult ):IQueryable<TResult>
    // FirstOrDefault(selector:Function):T;
    // Select(selector:Function):IQueryable<T>;
    // GroupBy(selector:Function):T;
    // Last(selector:Function):T;
    // LastOrDefault(selector:Function):T;
    // Count(selector:Function):number;
    // Max(selector:Function):number;
}