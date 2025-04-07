import { ApplicationConfig, importProvidersFrom, NgZone, inject } from '@angular/core'; // Import NgZone and inject
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { routes } from './app.routes';
import { GraphQLModule } from './graphql.module';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideHttpClient(withFetch()),
        importProvidersFrom(FormsModule, GraphQLModule),
        {
            provide: Apollo,
            useFactory: (httpLink: HttpLink, ngZone: NgZone) => { // Inject NgZone
                const cache = new InMemoryCache();

                const http = createHttpLink({
                    uri: 'http://localhost:4000/graphql'
                });

                const apolloClient = new ApolloClient({
                    cache: cache,
                    link: http
                });

                return new Apollo(ngZone).client = apolloClient; // Correct way to set the client
            },
            deps: [HttpLink, NgZone] // Add NgZone to deps
        }
    ],
};