export const lengths = {
    "name": "lengths",
    "conversions": [
        {
            name: "km",
            magnitude: 1000
        },
        {
            name: "m",
            magnitude: 1
        },
        {
            name: "cm",
            magnitude: 0.01
        },
        {
            name: "mm",
            magnitude: 0.001
        },
    ]
}

export const weights = {
    "name": "weights",
        "conversions": [
        {
            name: "kg",
            magnitude: 1000
        },
        {
            name: "g",
            magnitude: 1
        },
        {
            name: "mg",
            magnitude: 0.001
        },
    ]
}

export const times = {
    "name": "times",
        "conversions": [
        {
            name: "s",
            magnitude: 1
        },
        {
            name: "min",
            magnitude: 60
        },
        {
            name: "h",
            magnitude: 3600
        },
        {
            name: "pv",
            magnitude: 86400
        }
    ]
}

export const bigTimes = {
    "name": "big times",
        "conversions": [
        {
            name: "pv",
            magnitude: 1,
        },
        {
            name: "vko",
            magnitude: 7,
        },
        {
            name: "kk",
            magnitude: 30
        },
        {
            name: "a",
            magnitude: 365
        }
    ]
}

export default { lengths, weights, times, bigTimes }