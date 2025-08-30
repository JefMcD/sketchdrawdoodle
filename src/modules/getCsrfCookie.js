

// Function to get the Django CSRF token from the browser cookies
export default function getCookie(name="csrftoken"){

  const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith(name))
      ?.split('=')[1];
  console.log("React: getCookie() document.cookie",document.cookie)

  return cookieValue || '';
} // Function to get the Django CSRF token from the browser cookies
