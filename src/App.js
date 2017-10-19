import React, { Component } from 'react';
import CountrySelector from 'components/CountrySelector';

class App extends Component {
    constructor() {
        super();
        this.state = {
            countryName: "Georgia",
            ISOALPHA2Code: "GE",
            ISOALPHA3Code: "GEO",
            ISONumericalCode: 268
        }
    }
    getSelectedCountry(coutryObject) {
        // console.log(coutryObject);
        this.setState({
            countryName: coutryObject.countryName,
            ISOALPHA2Code: coutryObject.ISOALPHA2Code,
            ISOALPHA3Code: coutryObject.ISOALPHA3Code,
            ISONumericalCode: coutryObject.ISONumericalCode
        });
    }
    render() {
        return (
            <div>
                <CountrySelector
                    defaultCountry="Georgia"
                    getSelectedCountry={coutryObject => this.getSelectedCountry(coutryObject)}
                />
                {
                    `
                    ${this.state.countryName}
                    ${this.state.ISOALPHA2Code}
                    ${this.state.ISOALPHA3Code}
                    ${this.state.ISONumericalCode}
                    `
                }
            </div>
        );
    }
}

export default App;
