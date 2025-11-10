/**
 * Base service class for API services
 */
export class BaseService {
	protected apiPath: string;

	constructor(basePath: string) {
		this.apiPath = basePath;
	}
}
