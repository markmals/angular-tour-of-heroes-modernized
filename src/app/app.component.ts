import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Event, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs';
import { MessagesComponent } from './components/messages.component';

@Component({
    selector: 'app-root',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
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
                                    src="/assets/angular-signals.png"
                                    alt="Angular Logo"
                                />
                            </div>
                            <div class="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                                <a
                                    class="inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium"
                                    routerLink="/dashboard"
                                    [class.current]="isDashboard()"
                                    [class.default]="!isDashboard()"
                                >
                                    Dashboard
                                </a>
                                <a
                                    class="inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium"
                                    routerLink="/heroes"
                                    [class.current]="isHeroes()"
                                    [class.default]="!isHeroes()"
                                >
                                    Heroes
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div class="flex flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8">
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
                color: theme('colors.gray.900');
                border-color: theme('colors.blue.500');
            }

            a.default {
                color: theme('colors.gray.500');
                border-color: transparent;
            }

            a.default:hover {
                color: theme('colors.gray.700');
                border-color: theme('colors.gray.300');
            }
        `,
    ],
})
export class AppComponent {
    private router = inject(Router);

    location = toSignal(
        this.router.events.pipe(
            filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd),
            map(event => event.url),
        ),
    );

    isHeroes = () => this.location() === '/heroes';
    isDashboard = () => this.location() === '/dashboard';
}
