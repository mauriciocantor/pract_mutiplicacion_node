import {ServerApp} from "../../presentation/serverApp";
import {CreateTable} from "../../domain/useCases/createTable.usecase";
import {SaveFile} from "../../domain/useCases/saveFile.usecase";

describe('Server App',()=>{
    const options = {
        base:2,
        limit:10,
        showTable:false,
        destination: 'test-destination',
        name:'test-filename'
    }
    test('Should create ServerApp', ()=>{
        const serverApp = new ServerApp();
        expect(serverApp).toBeInstanceOf(ServerApp);
        expect(typeof ServerApp.run).toBe('function');
    });

    test('should run ServerApp with options', ()=>{
        const logSpy = jest.spyOn(console,'log');
        const createTableSpy = jest.spyOn(CreateTable.prototype,'execute');
        const saveFileSpy = jest.spyOn(SaveFile.prototype,'execute');

        const options = {
            base:2,
            limit:10,
            showTable:false,
            destination: 'test-destination',
            name:'test-filename'
        }

        ServerApp.run(options);

        expect(logSpy).toHaveBeenCalledTimes(2);
        expect(logSpy).toHaveBeenCalledWith('Server Run');
        expect(logSpy).toHaveBeenCalledWith('File Created!!');

        expect(createTableSpy).toHaveBeenCalledTimes(1);
        expect(createTableSpy).toHaveBeenCalledWith({
            base: options.base,
            limit:options.limit
        });

        expect(saveFileSpy).toHaveBeenCalledTimes(1);
        expect(saveFileSpy).toHaveBeenCalledWith({
            fileContent: expect.any(String),
            fileDestination:options.destination,
            fileName:options.name
        });
    });

    test('Should run with custom values mocked',()=>{
        const logMock = jest.fn();
        const logErrorMock = jest.fn();
        const createMock = jest.fn().mockReturnValue('1 X 1 = 1');
        const saveFileMock = jest.fn().mockReturnValue(true);

        console.log=logMock;
        console.error=logErrorMock;
        CreateTable.prototype.execute=createMock;
        SaveFile.prototype.execute=saveFileMock;

        ServerApp.run(options);

        expect(logMock).toHaveBeenCalledWith('Server Run');
        expect(createMock).toHaveBeenCalledWith({"base": options.base, "limit": options.limit});
        expect(saveFileMock).toHaveBeenCalledWith({
            "fileContent": "1 X 1 = 1",
            "fileDestination": options.destination,
            "fileName": options.name
        });
        expect(logMock).toHaveBeenCalledWith('File Created!!');
        expect(logErrorMock).not.toBeCalledWith();
    })
});