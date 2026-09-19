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