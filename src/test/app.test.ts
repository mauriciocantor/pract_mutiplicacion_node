import {ServerApp} from "../presentation/serverApp";

describe('Test app file', ()=>{
    test('Should call server.run with values', async () => {

        const serverRunMock = jest.fn();

        ServerApp.run = serverRunMock;

        process.argv = ['node', 'app.ts', '-b', '10', '-l', '20', '-s', 'true', '-n', 'multiplication-table-5', '-d', 'outputs/table-5']


        await import('./../app');

        expect(serverRunMock).toHaveBeenCalledWith({
            base:10,
            limit:20,
            showTable:true,
            name:'multiplication-table-5',
            destination:'outputs/table-5'
        });

    });
})