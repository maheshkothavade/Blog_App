import axios from 'axios'; // HTTP request in ReactJS
import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from '../constants/config';
import { getAccessToken, getRefreshToken, setAccessToken, setRefreshToken, getType } from '../utils/common-utils';

const API_URL = "http://localhost:8000";

// Create an instance of axios with custom configurations
const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    }
});

// Request interceptor
axiosInstance.interceptors.request.use(
    function (config) {
        console.log("Request interceptor triggered:", config); // Debug log

        if (config.TYPE.params) {
            config.params = config.TYPE.params;
        } else if (config.TYPE.query) {
            config.url = config.url + '/' + config.TYPE.query;
        }

        return config;
    },
    function (error) {
        console.error("Error in request interceptor:", error); // Debug log
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    function (response) {
        console.log("Response interceptor triggered:", response); // Debug log
        // Stop global loader here (if any)
        return processResponse(response);
    },
    function (error) {
        console.error("Error in response interceptor:", error); // Debug log
        // Stop global loader here (if any)
        return Promise.reject(processError(error));
    }
);

// Process successful response
const processResponse = (response) => {
    console.log("Processing response:", response); // Debug log

    if (response?.status === 200) {
        return { isSuccess: true, data: response.data };
    } else {
        return {
            isFailure: true,
            status: response?.status,
            msg: response?.msg || "Unexpected error",
            code: response?.code || "N/A"
        };
    }
};

// Process error response
const processError = (error) => {
    console.log("Processing error:", error); // Debug log

    if (error.response) {
        // Received response but it's an error
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.responseFailure,
            code: error.response.status
        };
    } else if (error.request) {
        // Request made but no response received
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.requestFailure,
            code: ""
        };
    } else {
        // Something happened in setting up the request
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.networkError,
            code: ""
        };
    }
};

// Create an API object to map service URLs to axios calls
const API = {};

// Loop through SERVICE_URLS and create axios functions for each
for (const [key, value] of Object.entries(SERVICE_URLS)) {
    API[key] = (body, showUploadProgress, showDownloadProgress) => {
        console.log(`Making API call to: ${value.url}`); // Debug log

        return axiosInstance({
            method: value.method,
            url: value.url,
            data: value.method === 'DELETE' ? {} : body,
            responseType: value.responseType,
            headers: {
                authorization: getAccessToken()
            },
            TYPE: getType(value, body),
            onUploadProgress: function (progressEvent) {
                if (showUploadProgress) {
                    let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    console.log("Upload progress:", percentageCompleted); // Debug log
                    showUploadProgress(percentageCompleted);
                }
            },
            onDownloadProgress: function (progressEvent) {
                if (showDownloadProgress) {
                    let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    console.log("Download progress:", percentageCompleted); // Debug log
                    showDownloadProgress(percentageCompleted);
                }
            }
        })
        .then(response => {
            console.log("API call successful:", response); // Debug log
            return response;
        })
        .catch(error => {
            console.error("API call failed:", error); // Debug log
            throw error;
        });
    }
}

export { API };

