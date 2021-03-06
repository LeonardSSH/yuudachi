import { sep } from 'path';

import Command, { commandInfo } from './Command';

test('invalid file name', () => {
	expect(commandInfo('foo')).toBeNull();
});

test('non-js file', () => {
	expect(commandInfo('post.rs')).toBeNull();
});

test('instance', () => {
	class TestCommand implements Command {
		public name = 'test';
		public category = 1;

		// eslint-disable-next-line @typescript-eslint/no-empty-function
		public execute(): void {}
	}

	const test = new TestCommand();

	expect(test.name).toBe('test');
	expect(test.category).toBe(1);
});

describe('category', () => {
	test('no category', () => {
		const command = commandInfo('test.js');
		expect(command).not.toBeNull();
		expect(command!.name).toBe('test');
	});

	test('has category', () => {
		const command = commandInfo(`test${sep}test2.js`);
		expect(command).not.toBeNull();
		expect(command!.name).toBe('test2');
	});

	test('nested category', () => {
		const command = commandInfo(`test${sep}test2${sep}test3.js`);
		expect(command).not.toBeNull();
		expect(command!.name).toBe('test3');
	});
});
