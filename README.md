# BurzeDzis.net-Node.js


## API Reference

### How to use?

```javascript
client.connect().then(methods => {
    // logic
});
```
Where methods is following that return Promise (ES6)

```javascript
    methods.searchLightningByCoords
    
    methods.searchCoordsByCityName
    
    methods.searchWarningsByCoords
```

## Params and output

| Method        | Input           | Output  |
|:-------------:|:-------------:|:-----:|
| methods.searchLightningByCoords     | x:number, y:number, range:number | count:number, distance:number, direction:string, time:string |
| methods.searchCoordsByCityName     | city:string      | x:number, y:number |
| methods.searchWarningsByCoords | x:number, y:number    |  frost:number, frostOf:string, frostTo:string, heat:number, heatOf:string, heatTo:string, wind:number, windOf:string, windTo:string, rainfall:number, rainfallOf:string, rainfallTo:string, storm:number, stormOf:string, stormTo:string, whirlwind:number, whirlwindOf:string, whirlwindTo:string |