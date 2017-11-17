export function request(endpoint) {
    console.log("fetching data...");
    return fetch(endpoint, { method: 'GET' })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error("Error occured while trying to retrieve data.");
    })
    .catch(error => {
        console.log(error);
        return null;
    });
}

export function buildDetails(model, detailMap) {
    let details = [];
    Object.keys(detailMap).forEach(function(attr) {
        if (!model[attr]) {
            return;
        }
        let result = {};
        result.title = detailMap[attr];
        if (attr === "genres") {
            if (model.genres.length > 0) {
                result.content = model.genres[0].name;
            }
        }
        else if (attr === "games") {
            if (model.games.length > 0) {
                model.games.sort(function(a, b) {
                    return b.rating - a.rating;
                });
                result.content = model.games[0].name;
            }
        } else if (attr === "rating" || attr === "average_rating") {
            result.content = model[attr] + "/100";
        } else {
            result.content = model[attr];
        }
        details.push(result);
    });
    return details;
}

export function buildFilter(rangeFilters, attrMap) {
    let result = [];
        Object.keys(rangeFilters).forEach(function(key) {
            let filter = rangeFilters[key];
            result.push({
                "name": attrMap[key],
                "op": "ge",
                "val": filter.low
            });
            result.push({
                "name": attrMap[key],
                "op": "le",
                "val": filter.high
            })
        });
        return result;
}