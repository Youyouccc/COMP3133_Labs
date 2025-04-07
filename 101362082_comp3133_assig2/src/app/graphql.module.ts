import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core';
import { HttpClientModule } from '@angular/common/http';

const uri = 'http://localhost:4000/graphql';

export function createApollo(httpLink: any) {
    return new ApolloClient({
        link: httpLink.create({ uri }),
        cache: new InMemoryCache(),
    });
}

@NgModule({
    exports: [HttpClientModule],
    providers: [
        {
            provide: APOLLO_OPTIONS,
            useFactory: createApollo,
            deps: [createHttpLink],
        },
    ],
})
export class GraphQLModule { }