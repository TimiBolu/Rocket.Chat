import { MongoClient, Collection } from 'mongodb';

type MongoHelperConfig = {
	uri: null | string;
	client: null | MongoClient;
	connect(uri: string): Promise<void>;
	disconnect(): Promise<void>;
	getCollection<T>(name: string): Promise<Collection<T>>;
	dropDatabase(): Promise<void>;
};

export const MongoHelper: MongoHelperConfig = {
	uri: null,
	client: null,

	async connect(uri: string) {
		this.uri = uri;
		this.client = await MongoClient.connect(uri);
	},

	async dropDatabase(): Promise<void> {
		if (this.client) {
			await this.client.db('meteor').dropDatabase();
		}
	},

	async disconnect() {
		if (this.client) {
			this.client.close();
			this.client = null;
		}
	},

	async getCollection<T>(name: string): Promise<Collection<T>> {
		if (this.client) {
			return this.client.db().collection<T>(name);
		}

		return {} as Collection<T>;
	},
};
