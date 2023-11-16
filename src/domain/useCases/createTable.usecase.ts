interface CreateTableOptions {
    base: number;
    limit?: number;
}

export interface CreateTableUseCase {
    execute: (options: CreateTableOptions)=> string
}


export class CreateTable implements CreateTableUseCase{
    constructor(
        /**
         * DI - Dependency Injection
         * */
    ) {

    }

    execute({base, limit=10}: CreateTableOptions){
        let text = '';
        for(let i= 1; i<=( limit ); i++){
            text +=  `${base} X ${i} = ${base * i} \n`;
        }

        return text;
    }
}