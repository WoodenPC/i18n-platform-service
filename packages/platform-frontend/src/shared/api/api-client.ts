class ApiClient {
    private static instance: ApiClient | null = null;
    private headers: Record<string, string> = {};

    static API_URL:string = 'localhost:8000/api';

    static getInstance() {
        if (!ApiClient.instance) {
            ApiClient.instance = new ApiClient();
        }

        return ApiClient.instance;
    }

    setBearerToken(token: string) {
        this.headers['Authorization'] = `Bearer ${token}`;
    }

    async fetch(endpoint: RequestInfo | URL, args?: RequestInit) {
        const originalRes = await window.fetch(endpoint, {
            ...(args || {}),
            credentials: 'include',
            headers: this.headers
        });

        if (originalRes.status === 401) {
            // interceptor for bearer refresh attempt
            const authRes = await window.fetch(`${ApiClient.API_URL}/auth/refresh`, {
                credentials: 'include'
            });

            const data = await authRes.json();
            this.setBearerToken(data.token);

            return await window.fetch(endpoint, {
                ...(args || {}),
                credentials: 'include',
                headers: this.headers
            });
        }

        return originalRes;
    }
}





export { ApiClient };