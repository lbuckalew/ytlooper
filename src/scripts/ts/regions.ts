/// <reference path="../../../typings/jquery/jquery.d.ts" />
/// <reference path="../../../typings/lodash/lodash.d.ts" />

'use strict';

module Apps {
    export interface RegionOptions {
        rep: Effigies.REPRESENTATION,
        tgt: string,
        tpl?: string,
        evt?: {}
    }
    export class Region {
        options: RegionOptions;
        representation: Effigies.REPRESENTATION;
        selector: string;
        el: HTMLElement;
        auxView: Effigies.View;
        auxEventsHash: {};

        constructor(options: RegionOptions) {
            this.options = options;
            this.representation = options.rep;
            this.selector = options.tgt;
            this.el = $(this.selector)[0];
            if (options.tpl) {
                this.auxEventsHash = options.evt;
                this.auxView = new Effigies.View({
                    rep: Effigies.REPRESENTATION.Generic,
                    tpl: options.tpl,
                    tgt: this.selector,
                    evt: this.auxEventsHash,
                    cbObject: this
                });
            }
        }
        show(): void {
            // change innerHTML of region
            this.el.replaceChild(this.auxView.get(), this.el.firstChild);
            this.onShow();
        }
        onShow(): void {
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
class YTLApp extends Apps.Region {
    constructor(options: Apps.RegionOptions) {
        super(options);
    }
    onShow(): void {
        $(this.selector).find('.dropdown-button').dropdown();
    }
    closeApp(): void {
        alert('smoke a grav nigga');
    }
}
$( document ).ready(function() {
    YTL['App'] = new YTLApp({
        rep: Effigies.REPRESENTATION.Generic,
        tgt: '#appContainer',
        tpl: '#app-tpl',
        evt: {'click #appClose': 'closeApp'}
    });
    YTL['App'].show();
    console.log(YTL['App'])
});