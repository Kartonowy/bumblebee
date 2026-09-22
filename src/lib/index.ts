export type Card = {
    name: string | null;
    url: string | null;
    rank: string | null;
    series: string | null;
    explaination: string | null;
}

export type Media = {
	type: "anime" | "books" | "games" | "manga" | "movies" | "series",
	name: string,
	url: string,
	year: Date 
}

export type Post = {
	title: string,
	content: string,
	language: "en" | "pl" | "jp",
	tags: string[] | null,
	published: boolean | null
}