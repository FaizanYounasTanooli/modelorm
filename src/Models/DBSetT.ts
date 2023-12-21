import IList from "../interfaces/IListT";
import IQueryable from "../interfaces/IQueryable";
import { List } from "./List";
type Filters<T> = (item: T) => boolean;
type Selectors<T, TResult> = (item: T) => TResult;
export default class DBSet<T extends object> implements IQueryable<T> {
    private predicates: { predicate: Filters<T>, values?: object }[] = [];
    private selectors: Function[] = [];
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
        , values?: object): IQueryable<T> {
        this.predicates.push({ predicate, values })
        return this as IQueryable<T>;
    }



    ToList(): List<T> {
        const selectors = this.selectors?.join(" ");
        //console.log(selectors);
        console.log(this.createWhereClause(this.predicates));
        return new List<T>();

    }
    processPredicate(predicate: string, values: object | undefined) {
        const word = predicate.substring(0, predicate.indexOf("=>")).trim();
        const replaceRegex = new RegExp(`(?:^|\\s)${word}\\b`, 'g');
        const removeRegex = new RegExp("\\s*" + word + "\\s*=>");
        for (let variable in values) {

            const varRegex = new RegExp("\\b" + variable + "\\b", 'g');
            predicate = predicate.replace(varRegex, values[variable as keyof typeof values])
        }
        const operators = {
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
        predicate = predicate.replace(removeRegex, '').replace(replaceRegex, this.TableName);
        for (let ope in operators) {
            const replaceOpeRegex = new RegExp(ope, 'g');
            predicate = predicate.replace(replaceOpeRegex, operators[ope as keyof typeof operators]);
        }
        return predicate;
    }

    processSelector(select: string) {
        const word = select.substring(0, select.indexOf("=>")).trim();
        const replaceRegex = new RegExp(`(?:^|\\s)${word}\\.\\b`, 'g');
        const removeRegex = new RegExp("\\s*" + word + "\\s*=>");

        select = select.replace(removeRegex, '').replace(replaceRegex, "");

        return select;
    }
    createSelectClause(selectors: Function[]): string {
        let processed = selectors.map(sel => this.processSelector(sel.toString()))
        let selectClause = processed.join(' , ')
        return selectClause;
    }
    createWhereClause(predicates: { predicate: Filters<T>, values?: object }[]) {

        let processed = predicates.map(predicate => this.processPredicate(predicate.predicate.toString(), predicate.values));
        let whereClause = " WHERE " + processed.join(' AND ');
        let columns = this.createSelectClause(this.selectors);

        let query = `SELECT ${columns} FROM ${this.TableName} ${whereClause}`;
        console.log(query);
        return query;
    }
}
