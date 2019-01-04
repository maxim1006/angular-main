const STYLE_MODIFIERS = {
    top: '_position-top',
    bottom: '_position-bottom',
    left: '_position-left',
    right: '_position-right'
};

export class DomHelper {

    private static zIndex = 1000;

    /**
     * hide constructor
     */
    private constructor() {
    }

    public static nextZIndex(): number {
        return ++DomHelper.zIndex;
    }

    public static addClass(element: HTMLElement, className: string): void {
        if (element.classList) {
            element.classList.add(className);
        } else {
            element.className += ' ' + className;
        }
    }

    public static removeClass(element: HTMLElement, className: string): void {
        if (element.classList) {
            element.classList.remove(className);
        } else {
            element.className = element.className.replace(
                new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    }

    public static hasClass(element: HTMLElement, className: string): boolean {
        if (element.classList) {
            return element.classList.contains(className);
        } else {
            return new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className);
        }
    }

    /**
     * Position element according to target in window
     * @param element
     * @param {HTMLElement} target
     */
    public static relativePosition(element: any, target: HTMLElement): void {
        const elementDimensions = element.offsetParent ? {
            width: element.offsetWidth,
            height: element.offsetHeight
        } : DomHelper.getHiddenElementDimensions(element);
        const targetHeight = target.offsetHeight;
        const targetWidth = target.offsetWidth;
        const targetOffset = target.getBoundingClientRect();
        const viewport = DomHelper.getViewport();
        let top, left;

        if ((targetOffset.top + targetHeight + elementDimensions.height) > viewport.height) {
            top = -1 * (elementDimensions.height);
            element.classList.add(STYLE_MODIFIERS.top);
            element.classList.remove(STYLE_MODIFIERS.bottom);
        } else {
            top = targetHeight;
            element.classList.add(STYLE_MODIFIERS.bottom);
            element.classList.remove(STYLE_MODIFIERS.top);
        }

        if ((targetOffset.left + targetWidth - elementDimensions.width) < 0) {
            left = 0;
            element.classList.add(STYLE_MODIFIERS.right);
            element.classList.remove(STYLE_MODIFIERS.left);
        } else {
            left = targetWidth - elementDimensions.width;
            element.classList.add(STYLE_MODIFIERS.left);
            element.classList.remove(STYLE_MODIFIERS.right);
        }

        element.style.top = top + 'px';
        element.style.left = left + 'px';
    }

    /**
     * Position element according to target in document
     * @param element
     * @param {HTMLElement} target
     */
    public static absolutePosition(element: HTMLElement, target: HTMLElement, classes: boolean = false): void {
        const elementDimensions = element.offsetParent ? {
            width: element.offsetWidth,
            height: element.offsetHeight
        } : DomHelper.getHiddenElementDimensions(element);
        const elementOuterHeight = elementDimensions.height;
        const elementOuterWidth = elementDimensions.width;
        const targetOuterHeight = target.offsetHeight;
        const targetOuterWidth = target.offsetWidth;
        const targetOffset = target.getBoundingClientRect();
        const windowScrollTop = DomHelper.getWindowScrollTop();
        const windowScrollLeft = DomHelper.getWindowScrollLeft();
        const viewport = DomHelper.getViewport();
        let top, left;

        if (targetOffset.top + targetOuterHeight + elementOuterHeight > viewport.height) {
            top = targetOffset.top + windowScrollTop - elementOuterHeight;
            element.classList.add(STYLE_MODIFIERS.top);
            element.classList.remove(STYLE_MODIFIERS.bottom);
        } else {
            top = targetOuterHeight + targetOffset.top + windowScrollTop;
            element.classList.add(STYLE_MODIFIERS.bottom);
            element.classList.remove(STYLE_MODIFIERS.top);
        }

        if (targetOffset.left + targetOuterWidth + elementOuterWidth > viewport.width) {
            left = targetOffset.left + windowScrollLeft + targetOuterWidth - elementOuterWidth;
            element.classList.add(STYLE_MODIFIERS.left);
            element.classList.remove(STYLE_MODIFIERS.right);
        } else {
            left = targetOffset.left + windowScrollLeft;
            element.classList.add(STYLE_MODIFIERS.right);
            element.classList.remove(STYLE_MODIFIERS.left);
        }

        element.style.top = top + 'px';
        element.style.left = left + 'px';
    }

    public static getViewport(): any {
        const documentElement = document.documentElement,
            body = document.getElementsByTagName('body')[0],
            width = documentElement.clientWidth || window.innerWidth || body.clientWidth,
            height = documentElement.clientHeight || window.innerHeight || body.clientHeight;

        return {width: width, height: height};
    }

    public static getHiddenElementDimensions(element: HTMLElement): { width: number, height: number } {
        const dimensions: any = {};
        const oldVisibility = element.style.visibility || 'visible';
        const oldDisplay = element.style.display || 'none';

        element.style.visibility = 'hidden';
        element.style.display = 'block';

        dimensions.width = element.offsetWidth;
        dimensions.height = element.offsetHeight;

        element.style.display = oldDisplay;
        element.style.visibility = oldVisibility;

        return dimensions;
    }

    public static fadeIn(element: HTMLElement, duration: number): void {
        element.style.opacity = '0';

        let last = Date.now();
        let opacity = 0;
        const tick = function () {
            opacity = +element.style.opacity + (Date.now() - last) / duration;
            element.style.opacity = '' + opacity;
            last = Date.now();

            if (+opacity < 1) {
                (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
            }
        };

        tick();
    }

    public static fadeOut(element: HTMLElement, duration: number) {
        let opacity = 1,
            interval = 50,
            gap = interval / duration;

        const fading = setInterval(() => {
            opacity = opacity - gap;

            if (opacity <= 0) {
                opacity = 0;
                clearInterval(fading);
            }
            element.style.opacity = '' + opacity;
        }, interval);
    }

    public static getWindowScrollTop(): number {
        const documentElement = document.documentElement;
        return (window.pageYOffset || documentElement.scrollTop) - (documentElement.clientTop || 0);
    }

    public static getWindowScrollLeft(): number {
        const documentElement = document.documentElement;
        return (window.pageXOffset || documentElement.scrollLeft) - (documentElement.clientLeft || 0);
    }

    public static getOuterWidth(element: HTMLElement, margin?: number): number {
        if (!element) {
            return;
        }

        let width = element.offsetWidth;
        if (margin) {
            const style = getComputedStyle(element);
            width += parseFloat(style.marginLeft) + parseFloat(style.marginRight);
        }
        return width;
    }

    public static getOuterHeight(element: HTMLElement, margin?: number): number {
        if (!element) {
            return;
        }

        let height = element.offsetHeight;
        if (margin) {
            const style = getComputedStyle(element);
            height += parseFloat(style.marginTop) + parseFloat(style.marginBottom);
        }
        return height;
    }

    public static appendChild(element: HTMLElement, target: any): void {
        if (DomHelper.isElement(target)) {
            target.appendChild(element);
        } else if (target && target.nativeElement) {
            target.nativeElement.appendChild(element);
        } else {
            throw new Error('Cannot append ' + target + ' to ' + element);
        }
    }

    public static removeChild(element: HTMLElement, target: any): void {

        if (!target && element) {
            element.parentNode && element.parentNode.removeChild(element);
            return;
        }

        if (DomHelper.isElement(target)) {
            target.removeChild(element);
        } else if (target.element && target.element.nativeElement) {
            target.element.nativeElement.removeChild(element);
        } else {
            throw new Error('Cannot remove ' + element + ' from ' + target);
        }
    }

    public static removeChildFromParent(element: HTMLElement): void {
        if (DomHelper.isElement(element) && element.parentNode) {
            element.parentNode.removeChild(element);
        } else {
            throw new Error('Cannot remove ' + element);
        }
    }

    public static isElement(object: any): boolean {
        return (typeof HTMLElement === 'object' ? object instanceof HTMLElement :
                object && typeof object === 'object' && object !== null && object.nodeType === 1 && typeof object.nodeName === 'string'
        );
    }

    /**
     * Returns document relative client rect.
     *
     * @param {Element} element - target element
     * @returns {ClientRect}
     */
    public static getDocumentRelativePosition(element: Element): ClientRect {
        if (!element) { return; }

        const clientRect = element.getBoundingClientRect();

        return {
            left: clientRect.left + pageXOffset,
            right: clientRect.right + pageXOffset,
            top: clientRect.top + pageYOffset,
            bottom: clientRect.bottom + pageYOffset,
            width: clientRect.width,
            height: clientRect.height
        };
    }



    /**
     * Return viewport width and height minus scrollbar width and height.
     *
     * @returns clientSize: {{width: number; height: number}}
     */
    public static getClientSize(container: Element = document.documentElement): { width: number, height: number } {
        return {
            width: container.clientWidth,
            height: container.clientHeight
        };
    }



    public static getScrollbarWidth(): number {
        let scrollDiv, scrollbarWidth;

        scrollDiv = document.createElement('div');
        scrollDiv.style.cssText = 'width: 100px; height: 100px; overflow: scroll; position: absolute; top: -9999px';
        document.body.appendChild(scrollDiv);
        scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        document.body.removeChild(scrollDiv);

        return scrollbarWidth;
    }



    public static checkIfIE(): boolean {
        return navigator.appName === 'Microsoft Internet Explorer'
            || !!(navigator.userAgent.match(/Trident/)
                || navigator.userAgent.match(/rv:11/))
            || /msie/.test(navigator.userAgent.toLowerCase());
    }
}



/**
 * scrollBy polyfill for IE ERROR TypeError: Object doesn't support property or method 'scrollBy'
 * @param {Element} element
 * @param {number} x - x-axis scroll
 * @param {number} y - y-axis scroll
 */
export function uxScrollBy(element: Element, x: number, y: number): void {
    if (typeof element.scrollBy === 'function') {
        element.scrollBy(x, y);
    } else {
        uxScrollByPolyfill(element, x, y);
    }
}



/*helpers*/
function uxScrollByPolyfill(element: Element, x: number, y: number): void {
    element.scrollLeft = element.scrollLeft + x;
    element.scrollTop = element.scrollTop + y;
}
