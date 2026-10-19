// Trailing slashes are stripped: "https://api.example.com/" + "/users" would become "//users",
// which the backend's security firewall rejects.
export const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");
