import { Component, inject, OnInit, Signal } from '@angular/core';
import { Event, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs';
import { MessagesComponent } from './components/messages.component';
import { fromObservable } from './utilities/rxjs-interop';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, RouterLink, MessagesComponent],
    template: `
        <div class="min-h-full">
            <nav class="sticky top-0 border-b border-gray-200 bg-white">
                <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div class="flex h-16 justify-between">
                        <div class="flex">
                            <div class="flex flex-shrink-0 items-center">
                                <img
                                    class="h-12 w-auto lg:block"
                                    src="https://upload.wikimedia.org/wikipedia/commons/c/cf/Angular_full_color_logo.svg"
                                    alt="Angular Logo"
                                />
                            </div>
                            <div class="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                                <a
                                    class="inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium"
                                    [class.current]="location() === '/dashboard'"
                                    [class.default]="location() !== '/dashboard'"
                                    routerLink="/dashboard"
                                >
                                    Dashboard
                                </a>
                                <a
                                    class="inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium"
                                    [class.current]="location() === '/heroes'"
                                    [class.default]="location() !== '/heroes'"
                                    routerLink="/heroes"
                                >
                                    Heroes
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div class="flex flex-col gap-8 py-6 px-4 sm:px-6 lg:px-8">
                <router-outlet></router-outlet>

                <div class="relative">
                    <div class="absolute inset-0 flex items-center" aria-hidden="true">
                        <div class="w-full border-t border-gray-300"></div>
                    </div>
                    <div class="relative flex justify-center">
                        <span
                            class="bg-gray-50 px-3 text-base font-semibold leading-6 text-gray-900"
                        >
                            Messages
                        </span>
                    </div>
                </div>

                <app-messages></app-messages>
            </div>
        </div>
    `,
    styles: [
        `
            a.current {
                @apply border-blue-500 text-gray-900;
            }

            a.default {
                @apply border-transparent text-gray-500 
                hover:border-gray-300 hover:text-gray-700;
            }
        `,
    ],
})
export class AppComponent implements OnInit {
    location!: Signal<string>;

    private router = inject(Router);

    ngOnInit() {
        this.location = fromObservable(
            this.router.events.pipe(
                filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd),
                map(event => event.url)
            )
        );
    }
}