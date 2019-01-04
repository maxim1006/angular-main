import {Inject} from '@angular/core';
import {HAMMER_GESTURE_CONFIG, HammerGestureConfig, ɵHammerGesturesPlugin} from '@angular/platform-browser';
import {DOCUMENT} from '@angular/common';

import 'hammerjs/hammer';

/**
 * Hot fix of built-in HammerGesturesPlugin to avoid memory leaks,
 * Added proper events queue and event.stopPropagation() support
 * https://github.com/angular/angular/issues/22155
 * https://github.com/angular/angular/pull/22156
 * @todo update after fix in angular
 */
export class HammerPluginPatch extends ɵHammerGesturesPlugin {
    constructor(@Inject(DOCUMENT) doc: any,
                @Inject(HAMMER_GESTURE_CONFIG) private config: HammerGestureConfig) {
        super(doc, config, {log(message: string) {}, warn(message: string) {}});
    }

    addEventListener(element: HTMLElement, eventName: string, handler: Function): Function {
        const self = this;

        const zone = this.manager.getZone();
        eventName = eventName.toLowerCase();

        if (!element['uxEvents']) {
            element['uxEvents'] = {};
        }

        // store handlers for each event
        element['uxEvents'][eventName] = handler;

        return zone.runOutsideAngular(() => {
            // Creating the manager bind events, must be done outside of angular
            const mc = this.config.buildHammer(element);

            const callback = function (eventObj: any): void {
                // add stopPropagation handling
                eventObj.stopPropagation = () => {
                    eventObj.srcEvent.propagationStopped = true;
                };

                zone.runGuarded(function () {
                    // triggering our events instead of angular's handler(eventObj);
                    self.triggerEvents(eventObj, element, eventName);
                    // handler(eventObj);
                });
            };

            mc.on(eventName, callback);

            return () => {
                mc.off(eventName, callback);
                // destroy mc to prevent memory leak
                if (typeof mc['destroy'] === 'function') {
                    mc['destroy']();
                }

                // delete uxEvents from element
                delete element['uxEvents'][eventName];
            };
        });
    }

    /**
     * Instead of default Angular handlers we'll trigger our handlers in a
     * right order and with working stopPropagation();
     * @param eventObj
     * @param {HTMLElement} element
     * @param {string} eventName
     */
    private triggerEvents(eventObj: any, element: HTMLElement, eventName: string): void {
        const elements = this.getElements(eventObj, element);

        if (!eventObj.srcEvent.triggered) {

            for (let i = 0; i < elements.length; i++) {
                if (elements[i]['uxEvents'] && elements[i]['uxEvents'][eventName]) {

                    if (eventObj.srcEvent.propagationStopped) {
                        break;
                    }

                    elements[i]['uxEvents'][eventName](eventObj);
                }
            }

            eventObj.srcEvent.triggered = true;
        }
    }

    /**
     * In Chrome Event object has path property with all tree of parent nodes started from
     * the lement where event was triggered. If browser doesn't support Event.path, polyfill is used.
     * @param eventObj
     * @param {HTMLElement} element
     * @returns {HTMLElement[]}
     */
    private getElements(eventObj: any, element: HTMLElement): HTMLElement[] {

        if (Array.isArray(eventObj.srcEvent.path)) {
            return eventObj.srcEvent.path;
        } else {  // for IE
            let arr = [],
                parent = eventObj.target;

            arr.push(parent);

            while (parent !== window.document.body) {
                parent = parent.parentElement || parent.parentNode;
                arr.push(parent);
            }

            return arr;
        }
    }

    public supports(eventName: string): boolean {
        if (eventName === 'doubletap') {
            return true;
        }
        return super.supports(eventName);
    }

}


// Allow user selection
delete window['Hammer'].defaults.cssProps.userSelect;

/*if browser supports touch-action set it to "pan-x pan-y" to allow control
for touch devices (allow scroll within zooming on touch devices, scrolls on page or blocks), because Hammer makes touch-action="none" by default.
If you need Hammer 'swipe' action, you should disable touch-action on exact block like this:

.block-with-swipe {
    touch-action: none !important;
}

*/
window['Hammer'].defaults.touchAction = 'pan-x pan-y';
