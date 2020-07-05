import { Component, OnInit } from "@angular/core";

/* Префетч и прелоад. Прелоад - загружаю сразу с высоким преоритетом, префетч с низким. Прелоаад нужен для
 ресурсов которые очень скроро понадобятся (на текущей странице) а префетч на следующей (логин => префетч модулей). Также важно отемтить что префетч как и прелоад только загружает файлы но не выполняет, чтобы
 выполнить вставляю их через скрипт

 Preload directive has a bunch of differences compared to prefetch:

A preloaded chunk starts loading in parallel to the parent chunk. A prefetched chunk starts after the parent chunk finishes loading.
A preloaded chunk has medium priority and is instantly downloaded. A prefetched chunk is downloaded while the browser is idle.
A preloaded chunk should be instantly requested by the parent chunk. A prefetched chunk can be used anytime in the future.
Browser support is different.
 */

type LoadEntity = {
    href: string;
    rel: string;
    as: string;
};

type appendEntity = {
    src: string;
};

@Component({
    selector: "m-prefetch-preload",
    template: `<div class="m-prefetch-preload">
        Hello prefetch-preload
    </div>`,
})
export class MPrefetchPreloadComponent implements OnInit {
    ngOnInit() {
        this.linkPrefetch();
        this.webpackPrefetch();

        this.linkPreload();
        this.webpackPreload();
    }

    linkPrefetch() {
        // this.loadScript({ href: "/assets/scripts/prefetch-preload/prefetch.js", rel: "prefetch", as: "script" });
        // this.loadScript({ href: "/assets/scripts/prefetch-preload/prefetch.css", rel: "prefetch", as: "style" });
        //
        // setTimeout(_ => {
        //     // возьмутся из (prefetch cache)
        //     this.appendScript({ src: "/assets/scripts/prefetch-preload/prefetch.js" });
        //     this.appendLink({ src: "/assets/scripts/prefetch-preload/prefetch.css" });
        // }, 1000);
    }
    async webpackPrefetch() {
        /* префетчит и сразу загружает, при чем префетчит в последовательности чем больше цифра в webpackPrefetch
        тем раньше, а аппендит в последовательности импортов (webpackPrefetch: true)
         */
        import(/* webpackPrefetch: 1 */ "../../../../../assets/scripts/prefetch-preload/prefetch.js").then(
            e => console.log(e) // тут придет {default: Array}
        );
        import(/* webpackPrefetch: 2 */ "../../../../../assets/scripts/prefetch-preload/prefetch3.js");
        import(/* webpackPrefetch: 3 */ "../../../../../assets/scripts/prefetch-preload/prefetch2.js");
        import(/* webpackPrefetch: 4 */ "../../../../../assets/scripts/prefetch-preload/prefetch1.js");
    }
    async linkPreload() {
        // // Загрузятся сразу но не выполнятся, имеет более высокий приоритет чем префетч
        // this.loadScript({ href: "/assets/scripts/prefetch-preload/preload.js", rel: "preload", as: "script" });
        // this.loadScript({ href: "/assets/scripts/prefetch-preload/preload.css", rel: "preload", as: "style" });
        //
        // // нужно чтобы выполнились скрипты, второй загрузки не будет
        // setTimeout(_ => {
        //     // возьмутся из (prefetch cache)
        //     this.appendScript({ src: "/assets/scripts/prefetch-preload/preload.js" });
        //     this.appendLink({ src: "/assets/scripts/prefetch-preload/preload.css" });
        // }, 1000);
    }
    async webpackPreload() {
        // Загрузится до всех префетчей так как имеет больший приоритет
        // import(/* webpackPreload: true */ "../../../../../assets/scripts/prefetch-preload/preload.js").then(e =>
        //     console.log(e)
        // );
    }

    loadScript({ href, rel, as }: LoadEntity): void {
        const link = document.createElement("link");
        link.href = href;
        link.rel = rel;
        link.as = as;
        document.head.appendChild(link);
    }

    appendScript({ src }: appendEntity) {
        // скрипты по умолчанию ведут себя как c async
        const preloadedScript = document.createElement("script");
        preloadedScript.src = src;
        document.body.appendChild(preloadedScript);
    }

    appendLink({ src }: appendEntity) {
        const preloadedLink = document.createElement("link");
        preloadedLink.href = src;
        preloadedLink.type = "text/css";
        preloadedLink.rel = "stylesheet";
        document.head.appendChild(preloadedLink);
    }
}
