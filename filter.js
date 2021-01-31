/**
 * Array.prototype.filter method is part of the new ECMAScript 5th Edition standard
 * we have to be sure that code will work with browsers without it's support
 */
if (!Array.prototype.filter) {
    Array.prototype.filter = function(fun) {
        if (typeof fun != "function") {
            throw new TypeError();
        }

        let len = this.length >>> 0;
        let res = [];
        let thisp = arguments[1];

        for (let i = 0; i < len; i++) {
            if (i in this) {
                let val = this[i];
                if (fun.call(thisp, val, i, this))
                    res.push(val);
            }
        }
        return res;
    };
}

/**
 *
 * @param dataArray
 * @param filteringObject
 * @param strategy
 * @param nestedStrategy
 * @returns {*}
 */
const customFilter = (dataArray, filteringObject, strategy, nestedStrategy) => {
    if(!strategy) {
        strategy = 'all'; //all properties should match
    }

    if(!nestedStrategy) {
        nestedStrategy = 'any'; //at least one value from property should match
    }

    const fitlersCount = Object.keys(filteringObject).length;

    return dataArray.filter(el => {
        var match = null;
        var matchedKeys = 0;

        for(let key in filteringObject) {
            const  isFilterArray = typeof filteringObject[key] === 'object' && isArrayValue(filteringObject[key]);

            if(match === false){
                return false; // if previous properties hasn't matched - skip next checks
            }

            if(el[key] === undefined) {
                return false; // if filtering property not exists element doesn't match
            } else {
                const isCollection = isCollectionValue(el[key]);

                if(!isCollection) {
                    if(isFilterArray ? filteringObject[key].indexOf(el[key]) > -1 : el[key] === filteringObject[key]){
                        matchedKeys++;
                    }
                } else {
                    const propertiesCount = isArrayValue(el[key]) ? el[key].length : Object.keys(el[key]).length;

                    let collectionMatches;

                    // For better performance compare length for 'all' strategy
                    if(nestedStrategy === 'all' && propertiesCount !== filteringObject[key].length) {
                        collectionMatches = 0;
                    } else {
                        collectionMatches = countCollectionMatches(el, filteringObject, key, isFilterArray);
                    }

                    if(nestedStrategy === 'all' && propertiesCount !== collectionMatches) {
                        collectionMatches = 0;
                    }

                    if(collectionMatches > 0) {
                        matchedKeys++;
                    }
                }
            }
        }

        var match = false;

        if(strategy === 'all') {
            match = fitlersCount <= matchedKeys;
        }

        if(strategy === 'any') {
            match = matchedKeys > 0;
        }

        return match;
    });
}

/**
 *
 * @param el
 * @param filteringObject
 * @param key
 * @param isFilterArray
 * @returns {number}
 */
const countCollectionMatches = (el, filteringObject, key, isFilterArray) => {
    let propertyMatches = 0;
    for(let prop in el[key]) {

        if (isFilterArray && filteringObject[key].indexOf(el[key][prop]) > -1) {
            propertyMatches++;
        } else if (!isFilterArray && el[key][prop] === filteringObject[key]) {
            propertyMatches++;
        }

    }

    return propertyMatches;
}

/**
 *
 * @param value
 * @returns {boolean}
 */
const isCollectionValue = value => {
    const type = typeof value;

    if(type === 'object') {
        return true;
    }

    return false;
}

/**
 *
 * @param value
 * @returns {boolean}
 */
const isArrayValue = value => {
    const type = typeof value;

    if(type === 'object' && Array.isArray(value)) {
        return true;
    }

    return false;
}