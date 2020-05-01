import {Observable} from 'rxjs';

const hasSupport = 'IntersectionObserver' in window;

const inViewHelper = (
    element: Element,
    options: IntersectionObserverInit = {
        root: null,
        threshold: 0.5,
    }
) => {
    return new Observable((subscriber) => {
        if (!hasSupport) {
            subscriber.next(true);
            subscriber.complete();
        }

        const observer = new IntersectionObserver(([entry]) => {
            subscriber.next(entry.isIntersecting);
        }, options);

        observer.observe(element);

        return () => observer.disconnect();
    });
};

export default inViewHelper;
