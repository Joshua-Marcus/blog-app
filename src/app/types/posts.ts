export interface Post {
  id: string;
  title: string;
  body: string;
}

export function blankPost(): Post {
  return {
    id: '',
    title: '',
    body: '',
  };
}
