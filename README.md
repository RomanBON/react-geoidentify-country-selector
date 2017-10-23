[**Support me with a Follow**](https://github.com/RomanBON/followers)

# react-geoidentify-country-selector
The best country selector on react with Identifier geocoder of current position.

This component support the display 3 standard:
* ISO Alpha-2:               "ISOALPHA2Code": "GE"
* ISO Alpha-3:               "ISOALPHA3Code": "GEO"
* ISO Numeric Country Codes: "ISONumericalCode": 268

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
                    defaultCountry="Georgia" // First priority
                    // defaultISOALPHA2Code="KZ" // Second priority
                    // defaultISOALPHA3Code="KEN" // Third priority
                    // defaultISONumericalCode={410} // Fourth priority
                    getSelectedCountry={coutryObject => this.getSelectedCountry(coutryObject)}
                />
            </div>
        );
    }
}

export default App;
```

##See Also

* [ISO 3166-1](http://en.wikipedia.org/wiki/ISO_3166-1)
* [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)
* [ISO 3166-1 alpha-3](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-3)
* [ISO 3166-1 numeric](http://en.wikipedia.org/wiki/ISO_3166-1_numeric)

## Licence
[MIT](https://github.com/RomanBON/react-geoidentify-country-selector/blob/master/LICENSE.md)
