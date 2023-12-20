import IList from "../interfaces/IListT";
import IQueryable from "../interfaces/IQueryableT";
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

        console.log(this.createWhereClause(this.predicates));
        return "";

    }
    processPredicate(predicate:string) {
            const word= predicate.substring(0,predicate.indexOf("=>")).trim();
            const replaceRegex = new RegExp(word, 'g');
            const removeRegex= new RegExp("\\s*"+word+"\\s*=>");
            return predicate.replace(removeRegex,'').replace(replaceRegex,this.TableName);
    }
    createWhereClause(predicates: Filters<T>[] ) {
        const operators= {
          '==': '=',
          '!=': '!=',
          '>=': '>=',
          '<=': '<=',
          '>': '>',
          '<': '<',
          '&&': 'AND',
          '||': 'OR'
        };
        let processed=predicates.map(predicate=>this.processPredicate(predicate.toString()))
        console.log(processed);
        return processed
      }
}
