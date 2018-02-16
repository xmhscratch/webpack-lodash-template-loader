var _ = require('lodash');
var loaderUtils = require('loader-utils');

function getLoaderConfig(context) {
    var query = loaderUtils.getOptions(context) || {};
    var configKey = query.config || 'lodashLoader';
    var config = context.options && context.options.hasOwnProperty(configKey) ? context.options[configKey] : {};

    delete query.config;

    return assign(query, config);
}

module.exports = function (source) {
    this.cacheable && this.cacheable();
    var config = getLoaderConfig(this);

    ['escape', 'interpolate', 'evaluate'].forEach(function (templateSetting) {
        var setting = config[templateSetting];
        if (_.isString(setting)) {
            config[templateSetting] = new RegExp(setting, 'g');
        }
    });

    var template = _.template(source, config.templateSetting);
    var exportsString = "module.exports = ";
    if (config.exportAsDefault) {
        exportsString = "exports.default = ";
    } else if (config.exportAsEs6Default) {
        exportsString = "export default ";
    }
    return `${exportsString} ${template}`;
};
