import { seedVertices } from './seed-vertices';

describe('Testing seedVertices function', () => {
	it('should complete', async () => {
		const gremlin: any = {
			g: {
				V: vi.fn(() => {
					return gremlin.g;
				}),
				E: vi.fn(() => {
					return gremlin.g;
				}),
				drop: vi.fn(() => {
					return gremlin.g;
				}),
				addV: vi.fn(() => {
					return gremlin.g;
				}),
				property: vi.fn(() => {
					return gremlin.g;
				}),
				iterate: vi.fn(() => {
					return Promise.resolve(undefined);
				}),
			},
			process: {
				t: {
					id: 'any',
				},
				cardinality: {
					single: 'any',
				},
			},
		};
		const result = await seedVertices(gremlin);
		console.log('result: ', result);
	});
	it('should error out', async () => {
		const gremlin: any = {
			g: {
				V: vi.fn(() => {
					return gremlin.g;
				}),
				E: vi.fn(() => {
					return gremlin.g;
				}),
				drop: vi.fn(() => {
					return gremlin.g;
				}),
				addV: vi.fn(() => {
					return gremlin.g;
				}),
				property: vi.fn(() => {
					return gremlin.g;
				}),
				iterate: vi.fn(() => {
					return Promise.reject('Shit is fucked up');
				}),
			},
			process: {
				t: {
					id: 'any',
				},
				cardinality: {
					single: 'any',
				},
			},
		};
		try {
			await seedVertices(gremlin);
		} catch (error) {
			const err = <Error>error;
			expect(err.message).toBe(undefined);
		}
	});
});
