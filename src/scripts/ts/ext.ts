'use strict';

interface Array<T> {
    remove(item: T): Array<T>;
}

Array.prototype['remove'] = function(item) {
    let i = this.indexOf(item);
    this.splice(i, 1);
    return this;
};