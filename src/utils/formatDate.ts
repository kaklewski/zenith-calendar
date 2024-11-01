export function formatDate(date: Date, options?: Intl.DateTimeFormatOptions) {
	return new Intl.DateTimeFormat('en-CA', options).format(date)
}
