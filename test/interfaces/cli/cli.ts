import test from 'ava';
import { assert, fake, match, SinonSpy } from 'sinon';
import { CliContext } from '../../../src/context/interfaces/cli';
import { run } from '../../../src/interfaces/cli/cli';

const nodeCommand: ReadonlyArray<string> = ['node', 'main.js'];
let generateMosaic: SinonSpy;
let ctx: CliContext;

test.beforeEach(() => {
    generateMosaic = fake.returns(Promise.resolve());
    ctx = { generateMosaic };
});

test('should  ', async () => {
    const argv = nodeCommand.concat('-l', '123');

    await run(argv, ctx);

    assert.calledOnceWithExactly(generateMosaic, '123', match.any);
});
