'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

var ReactScrollDetectContext = React.createContext({
    onChange: function (_) { },
    addSection: function (_) { },
    sections: [],
    index: 0,
    triggerPoint: 'center'
});

var ReactScrollDetect = function (props) {
    var _a = props.onChange, onChange = _a === void 0 ? function () { } : _a, _b = props.index, index = _b === void 0 ? 0 : _b, _c = props.triggerPoint, triggerPoint = _c === void 0 ? 'center' : _c;
    var _d = React.useState([]), sections = _d[0], setSections = _d[1];
    var numSections = 0;
    var addSection = function (section) {
        setSections(function (sections) { return __spreadArrays(sections, [__assign(__assign({}, section), { index: numSections++ })]); });
    };
    var providerValue = {
        onChange: onChange,
        addSection: addSection,
        sections: sections,
        index: index,
        triggerPoint: triggerPoint,
    };
    return (React__default.createElement(ReactScrollDetectContext.Provider, { value: providerValue },
        React__default.createElement(_ScrollContainer, null, props.children)));
};
var WINDOW_HEIGHT = window.innerHeight;
var _ScrollContainer = function (props) {
    var _a = React.useContext(ReactScrollDetectContext), sections = _a.sections, onChange = _a.onChange, index = _a.index, triggerPoint = _a.triggerPoint;
    var _b = React.useState([]), sectionEntryPoints = _b[0], setSectionEntryPoints = _b[1];
    var _c = React.useState(0), currentIndex = _c[0], setCurrentIndex = _c[1];
    var TRIGGER_CONST = triggerPoint === 'center' ? WINDOW_HEIGHT / 2 : triggerPoint === 'top' ? 0 : WINDOW_HEIGHT;
    React.useEffect(function () {
        initializeEntryPoints();
    }, [sections]);
    React.useEffect(function () {
        if (index !== currentIndex) {
            setCurrentIndex(index);
            onChange(index);
        }
        window.scrollTo({ top: sectionEntryPoints[index] || 0, behavior: 'smooth' });
    }, [index]);
    var initializeEntryPoints = function () {
        var _sectionEntryPoints = [];
        if (sections.length === 0)
            return;
        // console.log("first section height", sections[0].ref.offsetTop, sections[0].ref)
        var prev = sections[0].ref.offsetTop;
        sections.forEach(function (section) {
            _sectionEntryPoints.push(prev);
            prev = prev + section.height;
        });
        setSectionEntryPoints(_sectionEntryPoints);
    };
    var findIndex = function (posTop) {
        var _index = 0;
        sectionEntryPoints.forEach(function (p, i) {
            if (posTop > p && posTop < (sectionEntryPoints[i + 1] || 99999))
                _index = i;
        });
        return _index;
    };
    var onWheel = function (e) {
        var top = (e.pageY - e.clientY) + (TRIGGER_CONST);
        var newIndex = findIndex(top);
        if (newIndex !== currentIndex) {
            setCurrentIndex(newIndex);
            onChange(newIndex);
        }
    };
    return (React__default.createElement("div", { onWheel: onWheel }, props.children));
};

var DetectSection = function (props) {
    var ref = React.useRef(null);
    var addSection = React.useContext(ReactScrollDetectContext).addSection;
    React.useEffect(function () {
        if (!ref.current)
            return;
        var height = ref.current.clientHeight || 0;
        addSection({ height: height, ref: ref.current });
    }, [ref]);
    return (React__default.createElement("div", { ref: ref }, props.children));
};

exports.DetectSection = DetectSection;
exports.default = ReactScrollDetect;
//# sourceMappingURL=index.js.map
