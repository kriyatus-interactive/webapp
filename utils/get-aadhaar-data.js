const getAadhaarData = async (frontUrl, backUrl) => {
    if (!frontUrl || !backUrl) {
        throw new Error("Sufficient parameters are not provided");
    }
    const apiUrl = process.env.NEXT_PUBLIC_AADHAAR_API_URL;
    if (!apiUrl) {
        throw new Error("API URL is not defined in environment variables");
    }
    const endpoint = `${apiUrl}/aadhaar/extract/url?aadhar_front=${encodeURIComponent(frontUrl)}&aadhar_back=${encodeURIComponent(backUrl)}`;
    try {
        const res = await fetch(endpoint);
        const data = await res.json();
        if (res.ok) {
            return data.data;
        } else {
            throw new Error(data?.message || "No data found");
        }
    } catch (error) {
        // Optionally, log the error for debugging
        console.error("getAadhaarData error:", error);
        return null;
    }
};

export { getAadhaarData };
