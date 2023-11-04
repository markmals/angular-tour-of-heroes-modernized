import { Location, NgClass } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hero } from '../models/hero';
import { HeroService } from '../services/hero.service';

@Component({
    selector: 'app-hero-detail',
    standalone: true,
    imports: [NgClass],
    template: `
        <div class="mb-6 flex flex-row">
            <button
                class="inline-flex items-center gap-x-1.5 rounded-md bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-600 shadow-sm hover:bg-blue-100"
                type="button"
                (click)="goBack()"
            >
                <svg
                    class="-ml-0.5 h-5 w-5 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        clip-rule="evenodd"
                        d="M9.53 2.47a.75.75 0 010 1.06L4.81 8.25H15a6.75 6.75 0 010 13.5h-3a.75.75 0 010-1.5h3a5.25 5.25 0 100-10.5H4.81l4.72 4.72a.75.75 0 11-1.06 1.06l-6-6a.75.75 0 010-1.06l6-6a.75.75 0 011.06 0z"
                        fill-rule="evenodd"
                    />
                </svg>
                Go Back
            </button>
        </div>

        <div class="overflow-hidden bg-white shadow sm:rounded-lg">
            <div class="px-4 py-5 sm:px-6">
                <h3 class="text-base font-semibold leading-6 text-gray-900">
                    @if (!hero()) {
                        <span class="flex h-6 w-40 animate-pulse bg-gray-300"></span>
                    } @else {
                        <span>{{ hero()?.name }} Details</span>
                    }
                </h3>
            </div>
            <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl class="divide-y divide-gray-200">
                    <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                        <dt class="text-sm font-medium text-gray-500">ID</dt>

                        <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            @if (!hero()) {
                                <span class="flex h-5 w-6 animate-pulse bg-gray-300"></span>
                            } @else {
                                <span>{{ hero()?.id }}</span>
                            }
                        </dd>
                    </div>
                </dl>

                <dl class="divide-y divide-gray-200">
                    <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                        <dt class="text-sm font-medium text-gray-500">Hero name</dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            <!-- FIXME: View encapsulation is causing this input to not pickup @tailwindcss/forms styles -->
                            <!-- I had to manually add x-axis padding and it's still applying browser default styles -->
                            <!-- meaning that the reset isn't being picked up for this input either 🤔 -->
                            <input
                                #nameInput
                                id="hero-name"
                                placeholder="Hero name"
                                [ngClass]="[
                                    'block',
                                    'w-full',
                                    'rounded-md',
                                    'border-0',
                                    'py-1.5',
                                    'text-gray-900',
                                    'shadow-sm',
                                    'ring-1',
                                    'ring-inset',
                                    'ring-gray-300',
                                    'placeholder:text-gray-400',
                                    'focus:ring-2',
                                    'focus:ring-inset',
                                    'focus:ring-red-600',
                                    'sm:text-sm',
                                    'sm:leading-6',
                                    'px-3'
                                ]"
                                [value]="hero()?.name"
                                (input)="onInput(nameInput.value)"
                            />
                        </dd>
                    </div>
                </dl>

                <dl class="divide-y divide-gray-200">
                    <div class="flex flex-row justify-end p-6">
                        <button
                            class="w-1/6 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                            type="button"
                            (click)="save()"
                        >
                            Save
                        </button>
                    </div>
                </dl>
            </div>
        </div>
    `,
})
export class HeroDetailComponent implements OnInit {
    hero = signal<Hero | undefined>(undefined);

    private route = inject(ActivatedRoute);
    private heroService = inject(HeroService);
    private location = inject(Location);

    ngOnInit() {
        this.getHero();
    }

    onInput(value: string) {
        this.hero.update(hero => {
            if (hero) hero.name = value;
            return hero;
        });
    }

    getHero() {
        let id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
        this.heroService.getHero(id).subscribe(hero => this.hero.set(hero));
    }

    goBack() {
        this.location.back();
    }

    save() {
        let hero = this.hero();

        if (hero) {
            this.heroService.updateHero(hero).subscribe(() => this.goBack());
        }
    }
}
