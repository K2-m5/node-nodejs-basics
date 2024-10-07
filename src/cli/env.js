const parseEnv = () => {
    const rssVariables = Object.entries(process.env)
        .filter(([key]) => key.startsWith('RSS_'))
        .map(([key, value]) => `${key}=${value}`)

    console.log(rssVariables.join('; '))
};

parseEnv();