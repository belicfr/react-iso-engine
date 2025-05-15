export default async function login(email: string, password: string) {
  const response = await fetch("http://localhost:5226/api/Auth/Login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      password,
    })
  });

  if (!response.ok) {
    throw new Error(`Login échoué (${response.status})`);
  }

  return;
}