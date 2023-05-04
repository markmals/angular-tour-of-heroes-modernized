import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes, withInMemoryScrolling } from '@angular/router';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './app/services/in-memory-data.service';

import { AppComponent } from './app/app.component';

import { provideHttpClient } from '@angular/common/http';
import { DashboardComponent } from './app/components/dashboard.component';
import { HeroDetailComponent } from './app/components/hero-detail.component';
import { HeroesComponent } from './app/components/heroes.component';

const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent, title: 'Dashboard | Tour of Heroes' },
    {
        path: 'detail/:id',
        component: HeroDetailComponent,
        // TODO: Implement with resolver data to get the name of the hero
        // title(route, state) {
        //     return `${state.hero.name} | Details | Tour of Heroes`;
        // },
        title: 'Hero Details | Tour of Heroes',
    },
    { path: 'heroes', component: HeroesComponent, title: 'My Heroes | Tour of Heroes' },
];

bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })),
        provideHttpClient(),

        // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
        // and returns simulated server responses.
        // Remove it when a real server is ready to receive requests.
        importProvidersFrom(
            HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
                dataEncapsulation: false,
            })
        ),
    ],
});
