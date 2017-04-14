const MicroBusinessParseServerCommon = {};

MicroBusinessParseServerCommon.BaseObject = require('./schema/base-object').default;
MicroBusinessParseServerCommon.ParseWrapperService = require('./parse-wrapper-service').default;

/* For legacy requires, of the form
 * `var MicroBusinessParseServerCommon = require('micro-business-parse-server-common').MicroBusinessParseServerCommon` */
MicroBusinessParseServerCommon.MicroBusinessParseServerCommon = MicroBusinessParseServerCommon;

module.export = MicroBusinessParseServerCommon;
