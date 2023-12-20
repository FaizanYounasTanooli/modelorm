import IEnumerable from "./IEnumerable";
export default interface IList<T> extends IEnumerable<T> {
    Add(item:T):void;
    ToArray():T[];

}