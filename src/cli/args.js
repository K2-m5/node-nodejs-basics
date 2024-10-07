const parseArgs = () => {
    const args = process.argv.slice(2);

    const result = args.reduce((acc, current, index, array) => {
        if (current.startsWith('--') && index + 1 < array.length) {
            const propName = current.slice(2);
            const propValue = array[index + 1];
            acc.push(`${propName} is ${propValue}`);
        }
        
        return acc;
    }, []);

    console.log(result.join(', '));
};

parseArgs();