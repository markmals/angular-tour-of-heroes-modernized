# Angular Tour of Heroes (Modernized)

This project contains a completed version of the web app from [Angular's Tour of Heroes tutorial](https://angular.io/tutorial/tour-of-heroes), with modifications to showcase the latest built-in Angular features as of [version `16.0.0`](https://angular.io/guide/update-to-version-16). Those changes include:

-   [Standalone components](https://angular.io/guide/standalone-components#creating-standalone-components), [application](https://angular.io/guide/standalone-components#bootstrapping-an-application-using-a-standalone-component), and [routing](https://angular.io/guide/standalone-components#routing-and-lazy-loading)
-   Inline templates and styles
-   [`inject()`](https://angular.io/api/core/inject) dependency injection function
-   [ESBuild-based Angular builder](https://angular.io/guide/esbuild) (`@angular-devkit/build-angular:browser-esbuild`)
-   [Vite-based Angular development server](https://angular.io/guide/esbuild#vite-as-a-development-server)
-   [Signals](https://angular.io/guide/signals) for state management
-   [`OnPush` change detection](https://angular.io/guide/signals#reading-signals-in-onpush-components) in the root component, so only components with signal dependencies that update get marked for check by the change detector
-   [`toSignal()` and `toObservable()`](https://angular.io/guide/rxjs-interop) interoperability functions
-   [Tailwind CSS](https://tailwindcss.com/docs/guides/angular) atomic styling with a [TypeScript configuration file](https://tailwindcss.com/blog/tailwindcss-v3-3#esm-and-typescript-support)
-   [Tailwind UI](https://tailwindui.com/components) design system components
-   Placeholder loading elements to prevent [cumulative layout shift](https://web.dev/cls/)
