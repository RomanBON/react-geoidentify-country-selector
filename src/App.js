import React, { Component } from 'react';
import CountrySelector from 'components/CountrySelector';

class App extends Component {
    constructor() {
        super();
        this.state = {
            countryName: 'Germany',
            ISOALPHA2Code: 'DE',
            ISOALPHA3Code: 'DEU',
            ISONumericalCode: 276
        }
    }
    getSelectedCountry(coutryObject) {
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
                    // defaultISOALPHA2Code="KZ"
                    // defaultISOALPHA3Code="KEN"
                    // defaultISONumericalCode={410}
                    getSelectedCountry={coutryObject =>
                        this.getSelectedCountry(coutryObject)}
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
