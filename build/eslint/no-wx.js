var astUtils = require('eslint/lib/rules/utils/ast-utils');

module.exports = {
  meta: {
    type: 'suggestion',
    fixable: 'code',
    schema: [
      {
        type: 'object',
        properties: {
          allow: {
            type: 'array',
            items: {
              type: 'string'
            },
            minItems: 1,
            uniqueItems: true
          }
        },
        additionalProperties: false
      }
    ],
    messages: {
      unexpected: 'Unexpected wx statement.Please use mpx'
    }
  },
  create(context) {
    const options = context.options[0] || {};
    const allowed = options.allow || [];

    /**
     * Checks whether the given reference is 'console' or not.
     * @param {eslint-scope.Reference} reference The reference to check.
     * @returns {boolean} `true` if the reference is 'console'.
     */
    function isWX(reference) {
      const id = reference.identifier;

      return id && id.name === 'wx';
    }

    /**
     * Checks whether the property name of the given MemberExpression node
     * is allowed by options or not.
     * @param {ASTNode} node The MemberExpression node to check.
     * @returns {boolean} `true` if the property name of the node is allowed.
     */
    function isAllowed(node) {
      const propertyName = astUtils.getStaticPropertyName(node);

      return propertyName && allowed.indexOf(propertyName) !== -1;
    }

    /**
     * Checks whether the given reference is a member access which is not
     * allowed by options or not.
     * @param {eslint-scope.Reference} reference The reference to check.
     * @returns {boolean} `true` if the reference is a member access which
     *      is not allowed by options.
     */
    function isMemberAccessExceptAllowed(reference) {
      const node = reference.identifier;
      const parent = node.parent;

      return (
        parent.type === 'MemberExpression' &&
        parent.object === node &&
        !isAllowed(parent)
      );
    }

    /**
     * Reports the given reference as a violation.
     * @param {eslint-scope.Reference} reference The reference to report.
     * @returns {void}
     */
    function report(reference) {
      const node = reference.identifier.parent;

      context.report({
        node,
        loc: node.loc,
        messageId: 'unexpected',
        fix(fixer) {
          return fixer.replaceText(reference.identifier, 'mpx');
        }
      });
    }

    return {
      'Program:exit'() {
        const scope = context.getScope();
        const wxVar = astUtils.getVariableByName(scope, 'wx');
        const shadowed = wxVar && wxVar.defs.length > 0;

        /*
         * 'scope.through' includes all references to undefined
         * variables. If the variable 'console' is not defined, it uses
         * 'scope.through'.
         */
        const references = wxVar
          ? wxVar.references
          : scope.through.filter(isWX);

        if (!shadowed) {
          references.filter(isMemberAccessExceptAllowed).forEach(report);
        }
      }
    };
  }
};
