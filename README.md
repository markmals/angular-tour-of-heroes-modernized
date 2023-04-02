# Angular Tour of Heroes (Modernized)

This project contains a completed version of the web app from [Angular's Tour of Heroes tutorial](https://angular.io/tutorial/tour-of-heroes), with modifications to showcase the latest built-in Angular features as of [version `16.0.0-next`](https://github.com/angular/angular/releases/tag/16.0.0-next.5). Those changes include:

-   [Standalone components](https://angular.io/guide/standalone-components#creating-standalone-components), [application](https://angular.io/guide/standalone-components#bootstrapping-an-application-using-a-standalone-component), and [routing](https://angular.io/guide/standalone-components#routing-and-lazy-loading)
-   Inline templates and styles
-   [`inject()`](https://angular.io/api/core/inject) dependency injection function
-   [ESBuild-based Angular builder](https://blog.angular.io/angular-v14-is-now-available-391a6db736af#:~:text=Experimental%20ESM%20Application%20Builds) (`@angular-devkit/build-angular:browser-esbuild`)
-   [Signals](https://github.com/angular/angular/tree/main/packages/core/src/signals) for state management
-   [`fromObservable()` and `fromSignal()`](https://github.com/angular/angular/tree/fa3909e8b4b982423357a6e3d6c1d719ea6fa378/packages/core/rxjs-interop) interoperability functions
-   [Tailwind CSS](https://tailwindcss.com/docs/guides/angular) atomic styling
-   [Tailwind UI](https://tailwindui.com/components) design system components
-   Placeholder loading elements to prevent [cumulative layout shift](https://web.dev/cls/)
