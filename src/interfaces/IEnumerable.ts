import { List } from "../Models/List";
export default  interface IEnumerable<T> {
    First():T;
    Where<K extends keyof T>(
        predicate: (item: Pick<T, K>) => boolean
    ,values?:object):IEnumerable<T>;
    ToList():List<T>;
    Select<TResult>( selector:(item: T)=>TResult ):IEnumerable<TResult>
}