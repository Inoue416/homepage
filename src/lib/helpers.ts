export function trimText(input: string, maxLength = 100): string {
	if (input.length <= maxLength) return input;
	return `${input.substring(0, maxLength - 3)}...`;
}
export function getCurrentTime(): Date {
	// Create a date object with the current UTC time
	const now = new Date();

	now.setHours(now.getUTCHours());

	return now;
}

export function formatTimeForJp(date: Date): string {
	const options: Intl.DateTimeFormatOptions = {
		hour: "numeric",
		minute: "2-digit",
		second: "2-digit",
		hour12: true, // This will format the time in 12-hour format with AM/PM
		timeZone: "Asia/Tokyo",
	};

	let formattedTime = new Intl.DateTimeFormat("en-US", options).format(date);

	// Append the time zone abbreviation. You can automate this with libraries like `moment-timezone`.
	// For simplicity, here I'm just appending "CET", but do remember that Italy switches between CET and CEST.
	formattedTime += " JST";

	return formattedTime;
}

export function formatDate(date: Date): string {
	return date.toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}
