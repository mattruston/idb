export function request(endpoint, callback) {
    console.log("fetching data...");
    return fetch(endpoint, { method: 'GET' })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Error occured while trying to retrieve data.");
        })
        .then(response => {
            callback(response);
        })
        .catch(error => {
            console.log(error);
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

export function topModels(array, path, idKey) {
    let result = [];
    array.sort(function(a, b) {
        return b.average_rating - a.average_rating;
    });
    for (var i = 0; i < array.length; i++) {
        let obj = array[i];
        result.push({
            text: obj.name,
            link: path + obj[idKey]
        });
        if (i === 4)
            break;
    }   
    return result; 
}

export function gameItemsFromArray(gameArray, gameDetailMap) {
        let result = [];
         gameArray.sort(function(a, b) {
            return b.rating - a.rating;
        });
        for (var i = 0; i < gameArray.length; i++) {
            let obj = gameArray[i];
            result.push({
                name: obj.name,
                img: obj.thumb_url,
                url: "/games/" + obj.game_id,
                details: buildDetails(obj, gameDetailMap)
            });
            if (i === 9)
                break;
        }
        return result;
    }