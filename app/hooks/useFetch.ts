import useAsync from "./useAsync";

const DEFAULT_OPTIONS = {
  headers: { "Content-Type": "application/json" },
};

export default function useFetch(
  url: string | URL | Request,
  options = {},
  dependencies: any[] = [],
) {
  return useAsync(async () => {
    const res = await fetch(url, { ...DEFAULT_OPTIONS, ...options });
    const json = await res.json();
    if (res.ok) return json;
    return Promise.reject(json);
  }, dependencies);
}
