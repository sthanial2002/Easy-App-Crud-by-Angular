import { Sources } from './source.model';

export class Data {

    constructor(public sources: Sources,
                public title: string,
                public description: string,
                public url: string,
                public urlToImage: string,
                public publishedAt: string,
                public content: string) { }
}