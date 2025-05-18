export function getPlayerById(id: string) {
  return fetch(`http://localhost:5226/api/Account/GetPlayerById?id=${id}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
  });
}