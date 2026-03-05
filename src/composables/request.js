import { ref } from 'vue';

export function useRequest(url, headers, method, query, body) {
  /**
   * Преобразовать объект в строку типа query-параметров
   * @param {*} queries Произвольный объект или список query-параметров запроса
   * @returns список query-параметров, которые отделены от url знаком «?», а друг от друга знаком «&».
   */
  function getQueryText(queries) {
    let queryText = "";

    if (typeof queries === "object" && Object.keys(queries).length > 0) {
      queryText = "?";

      for (const key in queries) {
        if (!Object.hasOwn(queries, key)) continue;

        queryText += `${key}=${queries[key]}&`;
      }

      // Убрать последний символ &
      queryText = queryText.substring(0, queryText.length - 1);
    } else if (typeof queries === "string") {
      queryText = queries;
    }

    return queryText;
  }

  /**
   * Асинхронный запрос
   */
  async function request() {
    let response;

    isInit.value = false;
    isLoading.value = true;

    try {
      response = await fetch(new Request(url + getQueryText(query), options));
    } catch (error) {
      isError.value = true;
      throw new Error(error)
    } finally {
      isLoading.value = false;
    }

    if (!response.ok) {
      isError.value = true;
      error.value = `${response.status} : ${response.statusText}`;
      throw new Error(error.value);
    }

    isLoaded.value = true;

    const contentType = response.headers.get("Content-Type");

    if (contentType.includes("text")) {
      data.value = await response.text();
    } else if (contentType.includes("json")) {
      data.value = await response.json();
    } else if (contentType.includes("image")) {
      data.value = await response.blob();
    }
  }

  const data = ref(null);
  const error = ref("");
  const isInit = ref(true);
  const isLoading = ref(false);
  const isLoaded = ref(false);
  const isError = ref(false);

  const options = {
    method: method ?? "GET",
    body: body,
  }

  if (headers) {
    options.headers = headers;
  }

  return { request, data, error, isInit, isLoading, isLoaded, isError };
}
