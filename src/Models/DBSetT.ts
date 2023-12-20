import IList from "../types/IListT";
import IQueryable from "../types/IQueryableT";
import { List } from "./List";
type Filters<T> = (item: T) => boolean; 
type Selectors<T, TResult> = (item: T) => TResult;
export default class DBSet<T extends object> implements IQueryable<T> {
    private predicates: Filters<T>[] = [];
    private selectors: Function[] =[]; 
    private currentType: new () => T;
    private TableName: string;

    constructor(typeConstructor: new () => T) {
        this.currentType = typeConstructor;
        this.TableName = this.currentType.name;
    }
    Select<TResult>(selector: Selectors<T, TResult>): IQueryable<TResult> {
        this.selectors?.push(selector);
        return this as unknown as IQueryable<TResult>;
    }
    First(): T {
        throw new Error("Method not implemented.");
    }
    Add(item: T): T {
       

        return new this.currentType();
    }
    
    Where<K extends keyof T>(
        predicate: (item: Pick<T, K>) => boolean
    ): IQueryable<T> {
        this.predicates.push(predicate);
        return this as IQueryable<T>;
        
    }
    
    
    ToArray(): any {
        const selectors=this.selectors?.join(" ");
        console.log(selectors);

        const combinedPredicate = this.predicates.join(' AND ');
        console.log(combinedPredicate);
        return "";

    }
}
