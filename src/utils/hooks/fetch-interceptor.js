// // fetch-interceptor.js

// const originalFetch = window.fetch;

// window.fetch = async (...args) => {
//   try {
//     const response = await originalFetch(...args);

//     // // If the server responded with an error status
//     // if (!response.ok) {
//     //   // switch (response.status) {
//     //   //   // case 404:
//     //   //   //   window.location.href = '/error';
//     //   //   //   break;
//     //   //   // case 500:
//     //   //   //   window.location.href = '/error';
//     //   //   //   break;
//     //   //   // default:
//     //   //   //   window.location.href = '/error';
//     //   // }
//     // }

//     return response;
//   } catch (error) {
//     // Handle network errors (like server down, timeout, DNS fail)
//     console.error('Global fetch error:', error);
//     window.location.href = '/error';
//     throw error;
//   }
// };
// fetch-interceptor.js

// const originalFetch = window.fetch;

// window.fetch = async (...args) => {
//   try {
//     const response = await originalFetch(...args);
//     return response; // Never redirect here, even if 404/500
//   } catch (error) {
//     console.error('Global fetch error:', error);

//     // Detect true "backend unreachable" cases
//     // Safari throws TypeError for these, Chrome throws NetworkError/Failed to fetch
//     const isNetworkError =
//       error instanceof TypeError || error.name === 'NetworkError';

//     if (isNetworkError && window.location.pathname !== '/error') {
//       window.location.href = '/error';
//     }

//     throw error;
//   }
// };
const originalFetch = window.fetch;

window.fetch = async (...args) => {
  try {
    const response = await originalFetch(...args);

    // ✅ Always return response (even 404/500)
    return response;
  } catch (error) {
    console.error('Global fetch error:', error);

    // Safari often throws TypeError on tab switch / backgrounding
    const isNetworkError =
      error instanceof TypeError || error.name === 'NetworkError';

    if (isNetworkError) {
      // Extra safety: only redirect if user is NOT already on /error
      if (window.location.pathname !== '/error') {
        // window.location.href = '/error';
      }
    } else {
      // For unexpected errors, just log them (don’t redirect)
      console.warn('Non-network fetch error ignored:', error);
    }

    throw error;
  }
};
