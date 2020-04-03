export function cloneObj(c: any): any {
    let r: any = {};
    for (let prop in c) {
            r[prop] = c[prop];
    }
    return r;
}