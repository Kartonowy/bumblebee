export type Card = {
	rowid: number | null | unknown,
    name: string | null;
    url: string | null;
    rank: string | null;
    series: string | null;
    explaination: string | null;
}

export type Media = {
	rowid: number | null | unknown,
	type: "anime" | "books" | "games" | "manga" | "movies" | "series",
	name: string,
	url: string,
	year: Date 
}

export type Post = {
	rowid: number | null | unknown,
	title: string,
	content: string,
	language: "en" | "pl" | "jp",
	tags: string[] | null,
	published: boolean | null,
	publishedAt: string | null,
	lastEditedAt: string | null,
}

export const defaultPost = {
	rowid: null,
	publishedAt: null,
	lastEditedAt: null
}