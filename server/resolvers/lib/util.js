const fetch = require('node-fetch');

const requestGithubToken = (credentials) => {
    return fetch(
        'https://github.com/login/oauth/access_token',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(credentials)
        },
    ).then((res) => {
        return res.json();
    }).catch((err) => {
        throw new Error(JSON.stringify(err));
    })
}

const requestGithubUserAccount = (token) => {
    return fetch(`https://api.github.com/user?access_token=${token}`)
    .then((res) => {
        return res.json()
    }).catch((err) => {
        throw new Error(JSON.stringify(err));
    })
}

const authorizeWithGithub = async (credentials) => {
    const { access_token } = await requestGithubToken(credentials);
    const githubUser = await requestGithubUserAccount(access_token);
    return { ...githubUser, access_token }
}

module.exports = {
    authorizeWithGithub
}
