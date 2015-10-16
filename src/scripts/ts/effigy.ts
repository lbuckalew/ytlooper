'use strict';

module Effigies {
    export enum REPRESENTATION {Generic, List, Detail, Create}
    var EVENT_STRING_REGEX: RegExp = /(\w*)\b (\S*)\b/;

    export interface ViewEvent {
        selector: string,
        event: string,
        callback: (ev: Event) => any
    }
    export interface ViewOptions {
        rep: REPRESENTATION,
        tpl: string,
        tgt: string,
        evt?: {},
        cbObject?: Apps.Region
    }
    export class View {
        representation: REPRESENTATION;
        templateSelector: string;
        executor: _.TemplateExecutor;
        container: string;
        eventHash: {};
        events: ViewEvent[];
        HTMLcache: HTMLElement;
        constructor(options: ViewOptions) {
            this.representation = options.rep;
            this.templateSelector = options.tpl;
            this.executor = _.template($(options.tpl).html());
            this.container = options.tgt;
            this.eventHash = options.evt;
            this.events = [];
            this.processEvents(options.cbObject);

        }
        compile(attrs: {}): void {
            let html = this.executor(attrs);
            this.HTMLcache = $('<div></div>').append(html).children()[0];
        }
        processEvents(cbObject: Apps.Region): void {
            for (var e in this.eventHash) {
                let r = EVENT_STRING_REGEX.exec(e);
                let cb = this.eventHash[e];
                let event: ViewEvent = {selector: r[2], event: r[1], callback: cbObject[cb]};
                this.events.push(event);
            }
        }
        delegateEvents(): void {
            for(var event in this.events) {
                event = this.events[event];
                console.log(event);
                if (event.event === 'click') {
                    console.log('click event detected');
                    console.log($(this.get()).filter(event.selector));
                }
            }
        }
        get(recompile?: boolean, events = true, attrs?: {}): HTMLElement {
            if (recompile || !this.HTMLcache) {
                this.compile(attrs);
            }
            if (events) this.delegateEvents();

            return this.HTMLcache;
        }
    }

    export interface EffigyRepresentationHash {
        List: View,
        Detail: View,
        Create: View
    }
    export interface EffigyOptions {
        id?: number,
        views: EffigyRepresentationHash
    }
    export class Effigy {
        private _id: number;

        options: EffigyOptions;
        views: EffigyRepresentationHash;
        activeViews: View[];

        constructor(options: EffigyOptions) {
            this.options = options;
            this._id = options.id;
            this.views = options.views;
        }
        validate(): Error[] {return null;}
        serialize(): Object {return null;}
        fetch(): any {return null;}
        save(): Error {return null;}
        attachView(rep: REPRESENTATION, viewOptions: ViewOptions) : void {
            let view = new View({
                rep: viewOptions.rep,
                tpl: viewOptions.tpl,
                tgt: viewOptions.tgt,
                evt: viewOptions.evt
            });
            this.views[rep] = view;
        }
    }




















    export interface LoopOptions extends EffigyOptions {
        name: string,
        start?: number,
        stop?: number
    }
    export class Loop extends Effigy {
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
            if (false) {
                errors.push(new Error('Start time must come before end time.'));
            }
            return errors;
        }
    }

    export interface VideoOptions extends EffigyOptions {
        YTid: string,
        title?: string
    }
    export class Video extends Effigy {
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