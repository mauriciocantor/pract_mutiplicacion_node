import fs from "fs";

interface Options {
    fileContent: string;
    fileDestination?: string;
    fileName?: string;
}

export interface SaveFileUsecase {
    execute: (options: Options) => boolean
}

export class SaveFile implements SaveFileUsecase{

    constructor(
        /**
         * repository: StorageRepository
         * */
    ) {
    }
    execute({
                fileContent,
                fileDestination='outputs',
                fileName=`tabla`
    }: Options): boolean {

        try {
            fs.mkdirSync(fileDestination, {recursive: true});
            fs.writeFileSync(`${fileDestination}/${fileName}.txt`,fileContent);
            return true;
        }catch (e) {
            console.log(e);
            return false;
        }

    }
}