export function AutoUnsubscribe(constructor) {
    const origninal = constructor.prototype.ngOnDestroy;

    constructor.prototype.ngOnDestroy = function(){
        for(let prop in this){
            if(prop == "subscriptions") {
                for(let sub of this[prop]) {
                    if(sub && (typeof sub.unsubscribe === "function")) {
                        sub.unsubscribe()
                    }
                }
                break;
            }
        }
        origninal && typeof origninal === "function" && origninal.apply(this, arguments)
    }
}