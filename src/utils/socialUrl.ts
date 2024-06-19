import validator from 'validator';

export function getGithubUsernameFromUrl(url:string) {
    if(!url) return url;
    const pattern = new RegExp('(https://)?(www.)?github.com/([^/?]*)', 'i');
    const matches = url.match(pattern);

    if (matches && matches.length > 3) {
        return matches[3];
    }

    return url
}

export function getLinkedinUsernameFromUrl(url:string) {
    if(!url) return url;
    const pattern = new RegExp('(https://)?(www.)?linkedin.com/in/([^/?]*)', 'i');
    const matches = url.match(pattern);

    if (matches && matches.length > 3) {
        return matches[3];
    }

    return url;
}

export function getLinkedinUrlFromUsername(username:string) {
    if(!username) return username;
    if (validator.isURL(username)) {
        return username;
    }
    return `https://www.linkedin.com/in/${username}`;
}

export function getGithubUrlFromUsername(username: string) {
    if(!username) return username;
    if (validator.isURL(username)) {
        return username;
    }
    return `https://github.com/${username}`;
}

export function makeUrl(url: string): string {
    if (/^http:\/\//i.test(url)) {
        url = url.replace(/^http:\/\//i, 'https://');
    } else if (!/^https?:\/\//i.test(url)) {
        url = 'https://' + url;
    }

    return url;
}
