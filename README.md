[**Support me with a Follow**](https://github.com/RomanBON/followers)

# react-geoidentify-country-selector

The best Identifier geocoder for country selector on react

[See Demo](https://romanbon.github.io/react-geoidentify-country-selector.github.io/)

## Installation
```bash
$ npm i react-geoidentify-country-selector --save
```
or
```bash
$ yarn add react-geoidentify-country-selector
```
## Basic Usage

#### ES6 with JSX example
```javascript
import React from 'react';
import CountrySelector from 'react-geoidentify-country-selector';

class App extends React.Component {
    getSelectedCountry(coutryObject) {
        console.log(coutryObject);
        /*
            {
                countryName: "Georgia",
                ISOALPHA2Code: "GE",
                ISOALPHA3Code: "GEO",
                ISONumericalCode: 268
            }
        */
    }
    render() {
        return (
            <div>
                <CountrySelector
                    defaultCountry="Georgia"
                    getSelectedCountry={coutryObject => this.getSelectedCountry(coutryObject)}
                />
            </div>
        );
    }
}

export default App;
```

## Licence
[MIT](https://github.com/RomanBON/react-geoidentify-country-selector/blob/master/LICENSE.md)
