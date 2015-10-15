'use strict';

module Effigies {
    export enum Representation {Generic, List, Detail, Create}

    export interface ViewOptions {
        type: Representation,
        template: string,
        container: string,
        events: {}
    }
    export class View {
        type: Representation,
        template: string,
        container: string,
        events: {}

        constructor(options: ViewOptions) {
            this.type = options.type;
            this.template = options.template,
            this.container = options.container,
            this.events = options.events;
        }
    }

    export interface EffigyOptions {
        id?: number,
        views: View[]
    }
    export class Model {
        private _id: number;

        options: ModelOptions;
        executors: {};
        views: Views[];
        activeViews: [];

        constructor(options: ModelOptions) {
            this.options = options;
            this._id = options.id;
            this.views = options.views;
            for (var item of this.views) {
                this.executors[Representation[item.type]] = _.template($(item.template).html());
            }
        }
        validate(): Error[] {return null;}
        serialize(): Object {return null;}
        fetch(): any {return null;}
        save(): Error {return null;}

        render(): void {}
    }

    export interface LoopOptions {
        name: string,
        start?: number,
        stop?: number
    }

    export class Loop extends Model {
        private _name: string;
        private _start: number;
        private _stop: number;
        constructor(options: LoopOptions) {
            super(options);
            this._name = options.name;
            this._start = options.start;
            this._stop = options.stop;
        }
        set name(value: string) {
            this._name = value;
        }
        set start(value: number) {
            this._start = value;
        }
        set stop(value: number) {
            this._stop = value;
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
            let errors: Error[];
            if (this.start >= this.stop) {
                errors.push(new Error('Start time must come before end time.'));
            }
            return errors;
        }
    }

    export interface VideoOptions {
        YTid: string,
        title?: string
    }
    export class Video extends Model {
        private _YTid: string;
        private _title: string;
        constructor(options: VideoOptions) {
            super(options);
            this._YTid = options.YTid;
            this._title = options.title;
        }
        set id(value: number) {
            this.id = value;
        }
        set YTid(value: string) {
            this.YTid = value;
        }
        set title(value: string) {
            this.title = value;
        }
        get id(): number { return this.id; }
        get YTid(): string { return this.YTid; }
        get title(): string { return this.title; }
        serialize(): Object {
            return {
                title: this.title,
                YTid: this.YTid,
                id: this.id
            };
        }
    }
}