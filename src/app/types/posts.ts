export interface Post {
  id?: number;
  title: string;
  body: string;
}

export function blankPost(): Post {
  return {
    title: '',
    body: '',
  };
}
