export function getAllPromotions() {
  return fetch(`http://localhost:5226/api/Promotion/All`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
  });
}