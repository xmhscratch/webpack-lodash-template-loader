var _ = require('lodash');
var loaderUtils = require('loader-utils');
var assign = require('object-assign');
var compile = require('es6-templates').compile;

function getLoaderConfig(context) {
    var query = loaderUtils.getOptions(context) || {};
    var configKey = query.config || 'lodashLoader';
    var config = context.options && context.options.hasOwnProperty(configKey) ? context.options[configKey] : {};

    delete query.config;

    return assign(query, config);
}

module.exports = function (content) {
    this.cacheable && this.cacheable();
    var callback = this.async();
    var config = getLoaderConfig(this);

    ['escape', 'interpolate', 'evaluate'].forEach(function (templateSetting) {
        var setting = config[templateSetting];
        if (_.isString(setting)) {
            config[templateSetting] = new RegExp(setting, 'g');
        }
    });

    content = _.template(`${content}`, config.templateSetting).toString();
    var exportsString = "module.exports = ";
    if (config.exportAsDefault) {
        exportsString = "exports.default = ";
    } else if (config.exportAsEs6Default) {
        exportsString = "export default ";
    }
    content = content.replace(/^function/g, `${exportsString}function`);

    callback(null, content);
};
