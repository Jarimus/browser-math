export const timeSetName = "Ajan yksiköt"

export const conversionsSet = [
    {
    "name": timeSetName,
    "conversions": [
        {
            name: "s",
            magnitude: 1,
            pairsWith: ["min"]
        },
        {
            name: "min",
            magnitude: 60,
            pairsWith: ["s", "h"]
        },
        {
            name: "h",
            magnitude: 3600,
            pairsWith: ["min", "pv"]
        },
        {
            name: "pv",
            magnitude: 86400,
            pairsWith: ["h"]
        }
    ]
    },
    {
    "name": "Kuutiotilavuudet",
    "conversions": [
        {
            name: "m³",
            magnitude: 1,
            pairsWith: ["dm³"]
        },
        {
            name: "dm³",
            magnitude: 10 ** (-3),
            pairsWith: ["m³", "cm³"]
        },
        {
            name: "cm³",
            magnitude: 10 ** (-6),
            pairsWith: ["dm³", "mm³"]
        },
        {
            name: "mm³",
            magnitude: 10 ** (-9),
            pairsWith: ["cm³"]
        },
    ]
    },
    {
    "name": "Pinta-alat",
    "conversions": [
        {
            name: "km²",
            magnitude: 10 ** 6,
            pairsWith: ["ha", "a"]
        },
        {
            name: "ha",
            magnitude: 10 ** 4,
            pairsWith: ["km²", "a", "m²"]
        },
        {
            name: "a",
            magnitude: 10 ** 2,
            pairsWith: ["km²", "ha", "m²"]
        },
        {
            name: "m²",
            magnitude: 1,
            pairsWith: ["dm²", "a", "ha", "cm²"]
        },
        {
            name: "dm²",
            magnitude: 10 ** (-2),
            pairsWith: ["m²", "cm²", "mm²"]
        },
        {
            name: "cm²",
            magnitude: 10 ** (-4),
            pairsWith: ["m²", "dm²", "mm²"]
        },
        {
            name: "mm²",
            magnitude: 10 ** (-6),
            pairsWith: ["dm²", "cm²"]
        },
    ]
    },
    {
    "name": "Litratilavuudet",
    "conversions": [
        {
            name: "l",
            magnitude: 1,
            pairsWith: ["dl", "cl"]
        },
        {
            name: "dl",
            magnitude: 10 ** (-1),
            pairsWith: ["l", "cl", "ml"]
        },
        {
            name: "cl",
            magnitude: 10 ** (-2),
            pairsWith: ["l", "dl", "ml"]
        },
        {
            name: "ml",
            magnitude: 10 ** (-3),
            pairsWith: ["dl", "cl"]
        },
    ]
    },
    {
    "name": "Painot",
        "conversions": [
        {
            name: "kg",
            magnitude: 1000,
            pairsWith: ["g"]
        },
        {
            name: "g",
            magnitude: 1,
            pairsWith: ["kg", "mg"]
        },
        {
            name: "mg",
            magnitude: 10 ** (-3),
            pairsWith: ["g"]
        },
    ]
    },
    {
    "name": "Pituudet",
    "conversions": [
        {
            name: "km",
            magnitude: 1000,
            pairsWith: ["m"]
        },
        {
            name: "m",
            magnitude: 1,
            pairsWith: ["km", "cm"]
        },
        {
            name: "cm",
            magnitude: 10 ** (-2),
            pairsWith: ["m", "mm"]
        },
        {
            name: "mm",
            magnitude: 10 ** (-3),
            pairsWith: ["m", "cm"]
        },
    ]
    },
]