import {CreateTable} from "../domain/useCases/createTable.usecase";
import {SaveFile} from "../domain/useCases/saveFile.usecase";

interface RunOptions{
    base:number;
    limit: number;
    showTable: boolean;
    name: string;
    destination: string;
}

export class ServerApp {
    static run({base, limit, showTable, name, destination}: RunOptions){
        console.log('Server Run')
        const table = new CreateTable().execute({base, limit});
        const wasCreated = new SaveFile().execute({
            fileContent:table,
            fileName:name,
            fileDestination:destination
        });

        if(showTable) console.log(table);

        (wasCreated)
            ? console.log('File Created!!')
            : console.log('File not Created!!');
    }
}