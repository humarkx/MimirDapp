// import { Api } from "./services/api"

let ReactotronDev
if (__DEV__) {
	const { Reactotron } = require('./index')
	ReactotronDev = Reactotron
}

/**
 * The environment is a place where services and shared dependencies between
 * models live.  They are made available to every model via dependency injection.
 */
export class Environment {
	constructor() {
		// create each service
		if (__DEV__) {
			// dev-only services
			this.reactotron = new ReactotronDev()
		}
		// this.api = new Api()
	}

	async setup() {
		// allow each service to setup
		if (__DEV__) {
			await this.reactotron.setup()
		}
		// await this.api.setup()
	}

	/**
	 * Reactotron is only available in dev.
	 */
	reactotron: typeof ReactotronDev

	/**
	 * Our api.
	 */
	// api: Api
}

/**
 * Setup the environment that all the models will be sharing.
 *
 * The environment includes other functions that will be picked from some
 * of the models that get created later. This is how we loosly couple things
 * like events between models.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-function
export async function createEnvironment() {}
