'use strict';

module Models {


    // Observer pattern (subject)
    export class Model {
        private observers: Views.View[];

        constructor() {
            this.observers = [];
        }

        register(observer: Views.View): void {
            this.observers.push(observer);
        }

        unregister(observer: Views.View): void {
            this.observers.remove(observer);
        }

        notify(): void {
            for (let i = 0; i < this.observers.length; i++) {
                this.observers[i].notify();
            }
        }

        validate(): Error[] {return null;}
        serialize(): Object {return null;}
        fetch(): any {return null;}
        save(): Error {return null;}
    }


    export class Loop extends Model {
        private _name: string;
        private _start: number;
        private _stop: number;

        constructor(name: string) {
            super();
            this._name = name;
            this._start = 0;
            this._stop = 0;
        }

        set name(value: string) {
            this._name = value;
            // notify the view of a change on the model
            this.notify();
        }
        set start(value: number) {
            this._start = value;
            this.notify();
        }
        set stop(value: number) {
            this._stop = value;
            this.notify();
        }
        get name(): string { return this._name; }
        get start(): number { return this._start; }
        get stop(): number { return this._stop; }

        serialize(): Object {
            return {
                name:   this.name,
                start:  this.start,
                stop:    this.stop
            };
        }

        validate(): Error[] {
            let errors = [];
            if (this.start >= this.stop) {
                errors.push(new Error('Start time must come before end time.'));
            }
            return errors;
        }

    }


    export class Video extends Model {
        name: string;
        id: string;

        constructor() {
            super();
        }

        serialize(): Object {
            return {
                name:   this.name,
                id:     this.id
            };
        }

    }
}