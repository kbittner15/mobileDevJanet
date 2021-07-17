"use strict";
exports.__esModule = true;
var ajv = require("ajv");
var fromIntrospectionQuery_1 = require("../lib/fromIntrospectionQuery");
var test_utils_1 = require("../test-utils");
describe('GraphQL to JSON Schema', function () {
    var _a = test_utils_1.getTodoSchemaIntrospection(), introspection = _a.introspection, schema = _a.schema;
    xtest('from GraphQLSchema object');
    test('from IntrospectionQuery object', function () {
        var result = fromIntrospectionQuery_1.fromIntrospectionQuery(introspection);
        expect(result).toMatchObject(test_utils_1.todoSchemaAsJsonSchema);
        var validator = new ajv();
        validator.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'));
        expect(validator.validateSchema(result)).toBe(true);
    });
});
