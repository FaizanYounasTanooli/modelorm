import IEnumerable from "../interfaces/IEnumerable";
import IList from "../interfaces/IListT";

type Filters<TEntity> = (item: TEntity) => boolean; 
export class List<T> implements IList<T> {
    private predicates: Filters<T>[] = [];
    private selectors: Function[] | null = null; 
    Select<TResult>(selector: (item: T) => TResult): IEnumerable<TResult> {
        this.selectors?.push(selector);
        throw new Error("asd")
    }
    Add(item: T): void {
        throw new Error("Method not implemented.");
    }
    First(): T {
        throw new Error("Method not implemented.");
    }
    ToList(): List<T> {
        throw new Error("")
    }
    ToArray(): T[] {
        throw new Error("Method not implemented.");
    }
    list:T[]=[];
    Where<K extends keyof T>(
        predicate: (item: Pick<T, K>) => boolean
    ): IEnumerable<T> {
        throw new Error("Method not implemented.");
    }
    

}