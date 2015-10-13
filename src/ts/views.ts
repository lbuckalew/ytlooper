/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/lodash/lodash.d.ts" />

'use strict';

module Views {

    // basic functionality of a view
    export interface ViewOptions {
        template: string,
        container?: HTMLElement,
        model?: Models.Model,
        append?: boolean
    }

    export class View {
        options: ViewOptions;
        executor: _.TemplateExecutor;
        model: Models.Model;
        container: HTMLElement;

        constructor(options: ViewOptions) {
            this.options = options;
            this.executor = _.template(options.template);
            this.container = options.container;
            this.model = options.model;
        }

        compile(): string {
            if (this.model === null) return '';
            // apply context with model attributes
            return this.executor(this.model.serialize());
        }

        render(): void {
            if (this.model === null || this.container === null) return;
            // replace or append container contents with compilation
            let compiled: string = this.compile();
            if (this.options.append) {
                this.container.appendChild(document.createElement(compiled));
            } else {
                this.container.innerHTML = compiled;
            }
        }

        notify(): void {
            this.render();
        }
    }


    export class LoopView extends View {
        model: Models.Loop;
        container: HTMLDivElement;
    }

    export class LoopListView extends View {
    }
}