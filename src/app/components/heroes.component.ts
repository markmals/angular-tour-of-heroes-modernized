import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Hero } from '../models/hero';
import { HeroService } from '../services/hero.service';

@Component({
    selector: 'app-heroes',
    standalone: true,
    imports: [RouterLink],
    template: `
        <header>
            <div class="mx-auto max-w-7xl">
                <h1 class="text-3xl font-semibold leading-tight tracking-tight text-gray-900">
                    My Heroes
                </h1>
            </div>
        </header>

        <div class="mb-12 mt-6 bg-white shadow sm:rounded-lg">
            <div class="px-4 py-5 sm:p-6">
                <h3 class="text-base font-semibold leading-6 text-gray-900">Add A New Hero</h3>
                <div class="mt-2 max-w-xl text-sm text-gray-500">
                    <p>Add a new superhero to your roster and keep track of them below!</p>
                </div>
                <div class="mt-5">
                    <label
                        class="block text-sm font-medium leading-6 text-gray-900"
                        for="hero-name"
                    >
                        Hero Name
                    </label>
                    <div class="sm:flex sm:items-center">
                        <div class="w-full sm:max-w-xs">
                            <input
                                #heroName
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                id="hero-name"
                                name="hero-name"
                                type="text"
                                placeholder="e.g. Wonder Woman, She-Hulk, etc."
                                (keypress)="onEnter($event, button)"
                            />
                        </div>
                        <button
                            #button
                            class="mt-3 inline-flex w-full items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:ml-3 sm:mt-0 sm:w-auto"
                            type="button"
                            (click)="add(heroName.value); heroName.value = ''"
                        >
                            Add Hero
                        </button>
                    </div>
                </div>
            </div>
        </div>

        @if (!heroes().length) {
            <span class="flex flex-row justify-center" role="status">
                <svg
                    class="mr-2 h-7 w-7 animate-spin fill-red-600 text-gray-200"
                    aria-hidden="true"
                    fill="none"
                    viewBox="0 0 100 101"
                >
                    <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                    />
                    <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                    />
                </svg>
                <span class="sr-only">Loading...</span>
            </span>
        } @else {
            <ul
                class="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4"
                role="list"
            >
                @for (hero of heroes(); track hero.id) {
                    <li class="col-span-1 flex rounded-md shadow-sm">
                        <div
                            class="flex w-16 flex-shrink-0 items-center justify-center rounded-l-md bg-red-700 text-sm font-medium text-white"
                        >
                            {{ hero.id }}
                        </div>
                        <div
                            class="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white"
                        >
                            <div class="flex-1 truncate px-4 py-2 text-sm">
                                <a
                                    class="font-medium text-gray-900 hover:text-gray-600"
                                    routerLink="/detail/{{ hero.id }}"
                                >
                                    {{ hero.name }}
                                </a>
                                <p class="text-gray-500">Strength, Laser Vision</p>
                            </div>
                            <div class="flex-shrink-0 pr-2">
                                <button
                                    class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-transparent bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    type="button"
                                    (click)="delete(hero)"
                                >
                                    <span class="sr-only">Delete Hero</span>
                                    <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path
                                            clip-rule="evenodd"
                                            d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                                            fill-rule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </li>
                }
            </ul>
        }
    `,
})
export class HeroesComponent implements OnInit {
    heroes = signal<Hero[]>([]);
    private heroService = inject(HeroService);

    ngOnInit() {
        this.getHeroes();
    }

    getHeroes() {
        this.heroService
            .getHeroes()
            .subscribe(heroes =>
                this.heroes.set(heroes.sort((lhs, rhs) => lhs.name.localeCompare(rhs.name)))
            );
    }

    add(name: string) {
        name = name.trim();
        if (!name) return;

        this.heroService
            .addHero({ id: Math.floor(Math.random() * 90 + 10), name } as Hero)
            .subscribe(hero => {
                this.heroes.update(heroes => [...heroes, hero]);
            });
    }

    delete(hero: Hero) {
        this.heroes.update(heroes => heroes.filter(h => h !== hero));
        this.heroService.deleteHero(hero.id).subscribe();
    }

    onEnter($event: KeyboardEvent, button: HTMLButtonElement) {
        if ($event.key === 'Enter') button.click();
    }
}
