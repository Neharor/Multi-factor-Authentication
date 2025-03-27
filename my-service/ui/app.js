document.getElementById('login-button').addEventListener('click', () => {
    // Redirect to the Cognito login page
    window.location.href = window.location.href = window.location.href = 'https://twitterproject.auth.ap-south-1.amazoncognito.com/login?client_id=32ua8gmpk4n2737tlif1v32rfp&response_type=token&scope=email+openid+phone&redirect_uri=http%3A%2F%2Flocalhost%3A3000';


});

// Extract tokens from URL after redirect
function getTokenFromUrl() {
    const hash = window.location.hash.substring(1);
    const result = hash.split('&').reduce((res, item) => {
        let parts = item.split('=');
        res[parts[0]] = parts[1];
        return res;
    }, {});
    return result.access_token;
}

const token = getTokenFromUrl();

// Example function to fetch user data
async function fetchUserData(email) {
    const response = await fetch(`https://exy3k510hb.execute-api.ap-south-1.amazonaws.com/dev/users/${email}`, {
        method: 'GET',
        headers: {
            'Authorization': token,
        },
    });

    const data = await response.json();
    console.log('User Data:', data);
}

// Example function to create a new user
async function createUser(email, username) {
    const response = await fetch('https://exy3k510hb.execute-api.ap-south-1.amazonaws.com/dev/users', {
        method: 'POST',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username }),
    });

    const data = await response.json();
    console.log('Create User Response:', data);
}
