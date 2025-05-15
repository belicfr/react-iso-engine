export function getPlayerById(id: string) {
  return fetch(`http://localhost:5226/api/Account/GetPlayerById?id=${id}`, {
    method: "GET",
    credentials: "include",            // ← pour accepter le Set-Cookie
    headers: {
      "Content-Type": "application/json"     // ou "application/json" si tu attends du JSON
    },
  });
}