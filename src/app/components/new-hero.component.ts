import { Component, inject, model } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Hero } from '../models/hero';
import { HeroService } from '../services/hero.service';

@Component({
    selector: 'app-new-hero',
    standalone: true,
    imports: [RouterLink],
    template: `
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
    `,
})
export class NewHeroComponent {
    heroes = model.required<Hero[]>();
    private heroService = inject(HeroService);

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
