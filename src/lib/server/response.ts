export class HttpResponse<TData> {
	readonly code!: number;
	readonly success!: boolean;
	readonly message?: string;
	readonly data?: TData;

	private constructor(init: Partial<HttpResponse<TData>>) {
		Object.assign(this, init);
	}

	static success<TData>(data: TData) {
		return new HttpResponse<TData>({
			code: 0,
			success: true,
			data
		});
	}

	static error(message: string) {
		return new HttpResponse<never>({
			code: 1,
			success: false,
			message
		});
	}
}
