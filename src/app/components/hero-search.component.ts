import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Hero } from '../models/hero';
import { HeroService } from '../services/hero.service';

@Component({
    selector: 'app-hero-search',
    standalone: true,
    imports: [RouterLink],
    template: `
        <div class="w-1/2">
            <label class="block text-sm font-medium leading-6 text-gray-900" for="search-box">
                Hero Search
            </label>
            <div class="mt-2">
                <input
                    #searchBox
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                    id="search-box"
                    type="text"
                    placeholder="e.g. Superman, Captain Marvel, Batman, Spider-man"
                    (input)="search(searchBox.value)"
                />
            </div>

            @if (heroes().length) {
                <ul
                    class="border-1 mt-2 divide-y divide-gray-200 rounded border border-gray-300 bg-white"
                    role="list"
                >
                @for (hero of heroes(); track hero.id; let first = $first; let last = $last) {
                    <li
                        class="flex py-4 hover:cursor-pointer hover:bg-gray-100"
                        routerLink="/detail/{{ hero.id }}"
                        [class.rounded-b]="last"
                        [class.rounded-t]="first"
                    >
                        <span class="px-2 py-0.5 text-sm font-medium text-gray-900">
                            {{ hero.name }}
                        </span>
                    </li>
                }
                </ul>
            }
        </div>
    `,
})
export class HeroSearchComponent {
    private heroService = inject(HeroService);
    private searchTerm = signal<string>('');

    heroes = toSignal(
        toObservable(this.searchTerm).pipe(
            // wait 300ms after each keystroke before considering the term
            debounceTime(300),
            // ignore new term if same as previous term
            distinctUntilChanged(),
            // switch to new search observable each time the term changes
            switchMap((term: string) => this.heroService.searchHeroes(term))
        ),
        { initialValue: [] as Hero[] }
    );

    search(term: string) {
        this.searchTerm.set(term);
    }
}
