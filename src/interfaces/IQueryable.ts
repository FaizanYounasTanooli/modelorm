import { List } from "../Models/List";
import IEnumerable from "./IEnumerable";

export default interface IQueryable<T> extends IEnumerable<T> {
    First():T;
    Where<K extends keyof T>(
        predicate: (item: Pick<T, K>) => boolean
    ):IQueryable<T>;
    ToList():List<T>;
    Select<TResult>(selector:(item: T)=>TResult ):IQueryable<TResult>
}