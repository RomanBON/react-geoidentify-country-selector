'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _yaGeocoder = require('../../functions/ya-geocoder');

var _yaGeocoder2 = _interopRequireDefault(_yaGeocoder);

var _Countries = require('../../constants/Countries');

require('./styles/bootstrap.min.css');

require('./styles/flags.css');

require('./styles/CountrySelector.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by roman on 19.10.17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var CountrySelector = function (_React$Component) {
    _inherits(CountrySelector, _React$Component);

    function CountrySelector(props) {
        _classCallCheck(this, CountrySelector);

        var _this = _possibleConstructorReturn(this, (CountrySelector.__proto__ || Object.getPrototypeOf(CountrySelector)).call(this, props));

        _this.hide = _this.hide.bind(_this);
        _this.show = _this.show.bind(_this);
        var defaultCountry = {};
        if (_this.props.defaultCountry) {
            defaultCountry = _Countries.COUNTRIES.find(function (item) {
                return item.countryName === _this.props.defaultCountry;
            });
        } else if (_this.props.defaultISOALPHA2Code) {
            defaultCountry = _Countries.COUNTRIES.find(function (item) {
                return item.ISOALPHA2Code === _this.props.defaultISOALPHA2Code;
            });
        } else if (_this.props.defaultISOALPHA3Code) {
            defaultCountry = _Countries.COUNTRIES.find(function (item) {
                return item.ISOALPHA3Code === _this.props.defaultISOALPHA3Code;
            });
        } else if (_this.props.defaultISONumericalCode) {
            defaultCountry = _Countries.COUNTRIES.find(function (item) {
                return item.ISONumericalCode === _this.props.defaultISONumericalCode;
            });
        }

        _this.state = {
            defaultPropsCountry: defaultCountry,
            currentCountry: Object.keys(defaultCountry).length ? defaultCountry.countryName : 'United States of America',
            ISOALPHA2Code: Object.keys(defaultCountry).length ? defaultCountry.ISOALPHA2Code : 'US',
            ISOALPHA3Code: Object.keys(defaultCountry).length ? defaultCountry.ISOALPHA3Code : 'USA',
            ISONumericalCode: Object.keys(defaultCountry).length ? defaultCountry.ISONumericalCode : 840,
            displayedCountries: _Countries.COUNTRIES,
            isListVisible: false,
            isFirst: true
        };
        return _this;
    }

    _createClass(CountrySelector, [{
        key: 'componentWillUpdate',
        value: function componentWillUpdate(nextProps, nextState) {
            if (this.state.currentCountry !== nextState.currentCountry && this.state.ISOALPHA2Code !== nextState.ISOALPHA2Code && this.state.ISOALPHA3Code !== nextState.ISOALPHA3Code && this.state.ISONumericalCode !== nextState.ISONumericalCode) {
                this.props.getSelectedCountry({
                    countryName: nextState.currentCountry,
                    ISOALPHA2Code: nextState.ISOALPHA2Code,
                    ISOALPHA3Code: nextState.ISOALPHA3Code,
                    ISONumericalCode: nextState.ISONumericalCode
                });
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            if (typeof window !== 'undefined') {
                this.props.getSelectedCountry({
                    countryName: this.state.defaultPropsCountry.countryName,
                    ISOALPHA2Code: this.state.defaultPropsCountry.ISOALPHA2Code,
                    ISOALPHA3Code: this.state.defaultPropsCountry.ISOALPHA3Code,
                    ISONumericalCode: this.state.defaultPropsCountry.ISONumericalCode
                });
                var yaGeocoder = new _yaGeocoder2.default();
                navigator.geolocation.getCurrentPosition(function (position) {
                    if (position) {
                        yaGeocoder.resolve(position.coords.longitude + ',' + position.coords.latitude, function (err, collection) {
                            if (err) throw err;
                            var currentCountry = _Countries.COUNTRIES.find(function (item) {
                                return item.ISOALPHA2Code === collection[0].country_code;
                            });
                            _this2.setState(_extends({}, _this2.state, {
                                currentCountry: currentCountry.countryName,
                                ISOALPHA2Code: currentCountry.ISOALPHA2Code,
                                ISOALPHA3Code: currentCountry.ISOALPHA3Code,
                                ISONumericalCode: currentCountry.ISONumericalCode
                            }));
                            _this2.props.getSelectedCountry({
                                countryName: currentCountry.countryName,
                                ISOALPHA2Code: currentCountry.ISOALPHA2Code,
                                ISOALPHA3Code: currentCountry.ISOALPHA3Code,
                                ISONumericalCode: currentCountry.ISONumericalCode
                            });
                        });
                    }
                });
            }
        }
    }, {
        key: 'handleSelectCountry',
        value: function handleSelectCountry(countryName, ISOALPHA2Code, ISOALPHA3Code, ISONumericalCode) {
            this.setState(_extends({}, this.state, {
                currentCountry: countryName,
                ISOALPHA2Code: ISOALPHA2Code,
                ISOALPHA3Code: ISOALPHA3Code,
                ISONumericalCode: ISONumericalCode
            }));
        }
    }, {
        key: 'handleChangeCountry',
        value: function handleChangeCountry(e) {
            var query = e.target.value.toLowerCase().trim();

            var displayedCountries = _Countries.COUNTRIES.filter(function (item) {
                return item.countryName.toLowerCase().search(query) >= 0;
            });
            this.setState({
                displayedCountries: displayedCountries
            });
        }
    }, {
        key: 'focusInput',
        value: function focusInput(component) {
            if (component) {
                component.focus();
            }
        }
    }, {
        key: 'show',
        value: function show(e) {
            this.setState(_extends({}, this.state, {
                isListVisible: true
            }));
            if (typeof window !== 'undefined' && e.target.tagName.toUpperCase() !== 'INPUT') {
                document.addEventListener("click", this.hide);
            }
        }
    }, {
        key: 'hide',
        value: function hide(e) {
            if (typeof window !== 'undefined' && e.target.tagName.toUpperCase() !== 'INPUT') {
                this.setState(_extends({}, this.state, {
                    isListVisible: false
                }));
                document.removeEventListener("click", this.hide);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            return _react2.default.createElement(
                'div',
                { className: 'form-group' },
                _react2.default.createElement(
                    'div',
                    { className: 'dropdown' },
                    _react2.default.createElement(
                        'div',
                        { className: 'btn dropdown-toggle c-select', onClick: this.show },
                        _react2.default.createElement(
                            'span',
                            null,
                            _react2.default.createElement('img', {
                                className: this.state.ISOALPHA2Code ? 'flag ' + this.state.ISOALPHA2Code.toLowerCase() + ' fnone c-dropdown-flag' : 'c-dropdown-flag'
                            }),
                            this.state.currentCountry
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        {
                            className: 'dropdown-menu c-dropdown-menu',
                            style: this.state.isListVisible ? { display: 'block' } : { display: 'none' }
                        },
                        _react2.default.createElement('input', {
                            className: 'c-dropdown-input',
                            type: 'text',
                            ref: function ref(component) {
                                return _this3.focusInput(component);
                            },
                            onInput: this.handleChangeCountry.bind(this)
                        }),
                        _react2.default.createElement(
                            'div',
                            { className: 'c-dropdown-menu-overflow' },
                            _react2.default.createElement(
                                'ul',
                                { className: 'c-dropdown-ul' },
                                this.state.displayedCountries.map(function (item, index) {
                                    var flag = item.ISOALPHA2Code.toLowerCase();
                                    return _react2.default.createElement(
                                        'li',
                                        {
                                            tabIndex: index,
                                            className: 'dropdown-item c-dropdown-item',
                                            key: item.ISOALPHA2Code,
                                            onClick: function onClick(countryName, ISOALPHA2Code, ISOALPHA3Code, ISONumericalCode) {
                                                return _this3.handleSelectCountry(item.countryName, item.ISOALPHA2Code, item.ISOALPHA3Code, item.ISONumericalCode);
                                            }
                                        },
                                        _react2.default.createElement(
                                            'a',
                                            { 'data-option': '' + item.ISOALPHA2Code },
                                            _react2.default.createElement('img', { className: 'flag ' + flag + ' fnone c-dropdown-flag' }),
                                            ' ',
                                            item.countryName
                                        )
                                    );
                                })
                            )
                        )
                    )
                )
            );
        }
    }]);

    return CountrySelector;
}(_react2.default.Component);

CountrySelector.propTypes = {
    defaultCountry: _propTypes2.default.string,
    defaultISOALPHA2Code: _propTypes2.default.string,
    defaultISOALPHA3Code: _propTypes2.default.string,
    defaultISONumericalCode: _propTypes2.default.number,
    getSelectedCountry: _propTypes2.default.func
};

exports.default = CountrySelector;