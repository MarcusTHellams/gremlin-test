import {
	withGremlinPromise,
	CallbackParams,
	Args,
} from './utils/withGremlinPromise';

const withGremlinPromiseFn: (
	obj: CallbackParams,
	label: string,
	name: string
) => Promise<string> = async ({ g }, label: string) => {
	const result = await g.V().hasLabel(label).limit(1).valueMap(true).next();
	console.log('result: ', result.value);
	return 'hello';
};

// export const getSomeThings = async (
// 	wgp: typeof withGremlinPromise,
// 	label: string,
// 	name: string
// ) => {
// 	return wgp<string>(withGremlinPromiseFn)(label, name);
// };

// getSomeThings(withGremlinPromise, 'airport', 'Marcus').then(() => {
// 	process.exit(0);
// });

withGremlinPromise(async ({ g }, str) => {
	const _str = str as string;
	const result = await g.V().hasLabel(_str).limit(1).valueMap(true).next();
	console.log('result: ', result.value);
})('airport').then(() => {
	process.exit(0);
});
