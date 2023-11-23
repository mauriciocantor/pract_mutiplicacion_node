import {SaveFile} from "../../../domain/useCases/saveFile.usecase";
import fs from "fs";

describe('saveFile file test', ()=>{
    const customOptions = {
        fileContent: 'custom content',
        fileDestination: 'custom-outputs/file-destination',
        fileName: 'custom-table-name',
    };
    beforeEach(()=>{

    });

    afterEach(()=>{
        if(fs.existsSync('outputs')) fs.rmSync('outputs', {recursive:true});
        if(fs.existsSync('custom-outputs')) fs.rmSync('custom-outputs', {recursive:true});
    });

    test('Should create instance',()=>{
        const saveFile = new SaveFile();
        expect(saveFile).toBeInstanceOf(SaveFile);
    });

    test('Should save file with default values',()=>{
        const saveFile = new SaveFile();
        const filePath = 'outputs/tabla.txt';
        const options = {
            fileContent: 'test content'
        };

        const fileExist = saveFile.execute(options);
        const checkFile = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, {encoding:'utf-8'});

        expect(fileExist).toBeTruthy();
        expect(checkFile).toBeTruthy();
        expect(fileContent).toBe(options.fileContent);
    });

    test('Should save file with custom values',()=>{
        const saveFile = new SaveFile();
        const pathFile = customOptions.fileDestination+"/"+customOptions.fileName+'.txt';

        const fileExist = saveFile.execute(customOptions);
        const checkFile = fs.existsSync(pathFile);
        const fileContent = fs.readFileSync(pathFile, {encoding:'utf-8'});

        expect(fileExist).toBeTruthy();
        expect(checkFile).toBeTruthy();
        expect(fileContent).toBe(customOptions.fileContent);
    });

    test('Should return false if directory could not created', ()=>{
        const saveFile = new SaveFile();
        const mkdirSpy = jest.spyOn(fs, 'mkdirSync')
            .mockImplementation(()=>{
                throw new Error('error');
            });

        const fileExist = saveFile.execute(customOptions);
        expect(fileExist).toBe(false);
        mkdirSpy.mockRestore();
    });

    test('Should return false if file could not created', ()=>{
        const saveFile = new SaveFile();
        const mkdirSpy = jest.spyOn(fs, 'writeFileSync')
            .mockImplementation(()=>{
                throw new Error('error');
            });

        const fileExist = saveFile.execute({fileContent: 'hola'});
        expect(fileExist).toBe(false);
        mkdirSpy.mockRestore();
    });
});