/// <reference path="../../../typings/jquery/jquery.d.ts" />
/// <reference path="../../../typings/lodash/lodash.d.ts" />

'use strict';

module Views {
    export enum TypeChoices {Generic, List, Detail, Create}

    // basic functionality of a view
    export interface ViewOptions {
        template: string,
        model?: Models.Model,
        append?: boolean
    }

    export class View {
        options: ViewOptions;
        executor: _.TemplateExecutor;
        model: Models.Model;

        constructor(options: ViewOptions) {
            this.options = options;
            this.executor = _.template($(options.template).html()) || _.template('');
            this.model = options.model;
        }

        compile(): string {
            if (this.model === null) return this.executor({});
            return this.executor(this.model.serialize());
        }

        render(): HTMLElement {
            let el = document.createElement("div");
            el.innerHTML = this.compile();
            return el;
        }

        notify(): void {
            this.render();
        }
    }


    export class LoopItemView extends View {
        model: Models.Loop;
    }
}