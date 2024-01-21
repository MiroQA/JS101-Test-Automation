function handleInput(input) {

    let splitInput = input
        .map((juice) => {
            let infoSplit = juice.split(' => ');
            return {
                name: infoSplit[0],
                qty: +infoSplit[1],
            }
        });

    let bottles = [];

    function caluculateBottles(acc, cur) {
        let count = 0;
        while ((acc[cur.name].qty - 1000) >= 0) {
            count++;
            acc[cur.name].qty = acc[cur.name].qty - 1000;
        };

        if (count > 0) {
            if (!bottles[cur.name]) {
                let obj = {
                    name: cur.name,
                    bottles: count
                };
                bottles[cur.name] = obj;
                return acc;
            };

            if (bottles[cur.name].name === cur.name) {
                bottles[cur.name].bottles += count;
            }
        };
    }

    let totalQty = splitInput
        .reduce((acc, cur) => {

            if (!acc[cur.name]) {
                acc[cur.name] = cur;

                caluculateBottles(acc, cur);

                return acc;
            };

            if (acc[cur.name].name === cur.name) {
                acc[cur.name].qty += cur.qty;

            };

            caluculateBottles(acc, cur);
            return acc;

        }, []);

    Object.keys(bottles)
        .forEach((key) => {
            console.log(`${key} => ${bottles[key].bottles}`);
        });
};

export {
    handleInput
};