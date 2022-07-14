export default function authHeader() {
    const token = localStorage.getItem("token");
    if (token) {
        return { headers: { "x-token": token } };
    } else {
        return {};
    }
}