// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
	app(input) {
		return {
			name: 'totalstudio',
			removal: input?.stage === 'production' ? 'retain' : 'remove',
			home: 'aws'
		};
	},
	async run() {
		const bucket = new sst.aws.Bucket('MyBucket', {
			public: true
		});
		new sst.aws.SvelteKit('MyWeb', {
			link: [bucket]
		});
	}
});
