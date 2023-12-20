import IList from "../interfaces/IListT";
import IQueryable from "../interfaces/IQueryable";
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
    
    
    
    ToList(): List<T> {
        const selectors=this.selectors?.join(" ");
        console.log(selectors);
        console.log(this.createWhereClause(this.predicates));
        return new List<T>();

    }
    processPredicate(predicate:string) {
            const word= predicate.substring(0,predicate.indexOf("=>")).trim();
            const replaceRegex = new RegExp(`(?:^|\\s)${word}\\b`, 'g');
            const removeRegex= new RegExp("\\s*"+word+"\\s*=>");
            const operators= {
                '===': ' = ',
                '==': ' = ',
                '!=': ' != ',
                '>=': ' >= ',
                '<=': ' <= ',
                '>': ' > ',
                '<': ' < ',
                '&&': ' AND ',
                '\\|\\|': ' OR '
              };
              predicate=predicate.replace(removeRegex,'').replace(replaceRegex,this.TableName);
              for (let ope in operators) {
                const replaceOpeRegex = new RegExp(ope,'g');
                predicate=predicate.replace(replaceOpeRegex,operators[ope as keyof typeof operators]);
              }
            return predicate;
    }
    createWhereClause(predicates: Filters<T>[] ) {
        
        let processed=predicates.map(predicate=>this.processPredicate(predicate.toString()));
        let whereClause=" WHERE "+ processed.join(' AND ');
        console.log(whereClause);
        return whereClause
      }
}
