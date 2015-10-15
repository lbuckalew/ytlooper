/// <reference path="../../../typings/jquery/jquery.d.ts" />
/// <reference path="../../../typings/lodash/lodash.d.ts" />

'use strict';

module Apps {
    export interface RegionOptions {
        rep: Effigies.REPRESENTATION,
        tgt: string,
        tpl?: string
    }
    export class Region {
        options: RegionOptions;
        representation: Effigies.REPRESENTATION;
        selector: string;
        el: HTMLElement;
        auxView: Effigies.View;

        constructor(options: RegionOptions) {
            this.options = options;
            this.representation = options.rep;
            this.selector = options.tgt;
            this.el = $(this.selector)[0];
            if (options.tpl) {
                this.auxView = new Effigies.View({
                    rep: Effigies.REPRESENTATION.Generic,
                    tpl: options.tpl,
                    tgt: this.selector
                });
            };
        }
        show(): void {
            // change innerHTML of region
            this.el.replaceChild(this.auxView.get(), this.el.firstChild);
        }
        reset(): void {
            // clear the container
            this.el.innerHTML = '';
        }

    }
    export interface EffigyRegionOptions extends RegionOptions {
        effigies?: Effigies.Effigy[],
    }
    export class EffigyRegion extends Region {
        effigies: Effigies.Effigy[];

        constructor(options: EffigyRegionOptions) {
            super(options);
            this.effigies = options.effigies;
        }
        show(): void {
            // determine type of view
            // for each tracked model get cached HTML - re-render on failure
            // re-render newest model
            // if a model was supplied then re-render it
            // save html to content cache on region
            // change innerHTML of region
        }
        watch(): void {
            // add an effigy to be represented actively by this region
            // render the new model based on this regions type
        }
    }
}

var YTL = {};
$( document ).ready(function() {
    YTL.App = new Apps.Region({
        rep: Effigies.REPRESENTATION.Generic,
        tgt: '#appContainer',
        tpl: '#app-tpl'
    });
    YTL.App.show();
    $('.dropdown-button').dropdown();
});