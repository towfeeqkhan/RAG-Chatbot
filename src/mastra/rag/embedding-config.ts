export const formatDocument = (text: string, title = "none") =>
  `title: ${title} | text: ${text}`;

export const formatQuery = (query: string) =>
  `task: search result | query: ${query}`;
