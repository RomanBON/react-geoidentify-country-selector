import React, { Component } from 'react';
import CountrySelector from 'components/CountrySelector';

class App extends Component {
    getSelectedCountry(coutryObject) {
        console.log(coutryObject);
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
