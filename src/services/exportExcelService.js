const getAuthToken = () => localStorage.getItem("access_token");


export async function exportExcel() {
  const token = getAuthToken();

  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/exportExcel`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const contentType = response.headers.get("content-type");

  const blob = await response.blob();

  return blob;
}

