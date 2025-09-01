const BASE_URL = "https://api.jikan.moe/v4";

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function getLatestAnime(page = 1) {
  try {
    const data = await fetchJson(
      `${BASE_URL}/anime?order_by=popularity&sort=asc&page=${page}`
    );

    return {
      anime: data.data,
      hasNext: data.pagination?.has_next_page || false,
    };
  } catch (err) {
    console.error("Error fetching latest anime:", err);
    return { anime: [], hasNext: false };
  }
}
export async function searchAnime(query, page = 1) {
  try {
    const data = await fetchJson(
      `${BASE_URL}/anime?q=${encodeURIComponent(query)}&page=${page}`
    );

    return {
      anime: data.data,
      hasNext: data.pagination?.has_next_page || false,
    };
  } catch (err) {
    console.error("Error searching anime:", err);
    return { anime: [], hasNext: false };
  }
}

export async function getAnimeById(id) {
  try {
    const res = await fetch(`${BASE_URL}/anime/${id}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.error("Error fetching anime details:", err);
    return null;
  }
}

export async function getAnimeEpisodes(animeId, page = 1) {
  try {
    const res = await fetch(
      `https://api.jikan.moe/v4/anime/${animeId}/episodes?page=${page}`
    );
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.error("Error fetching episodes:", err);
    return [];
  }
}
