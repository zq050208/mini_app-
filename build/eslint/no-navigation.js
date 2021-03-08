var astUtils = require('eslint/lib/rules/utils/ast-utils');

var UN_AllOWED_METHODS = ['redirectTo' , 'switchTab' , 'navigateTo' , 'reLaunch']

module.exports = {
  meta: {
    type: 'suggestion',
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
      unexpected: '不允许业务代码中使用跳转API，请使用 /utils/router'
    }
  },
  create(context) {
    const options = context.options[0] || {};
    const unAllowed = options.unallow || UN_AllOWED_METHODS;

    /**
     * Checks whether the given reference is 'console' or not.
     * @param {eslint-scope.Reference} reference The reference to check.
     * @returns {boolean} `true` if the reference is 'console'.
     */
    function isMPX(reference) {
      const id = reference.identifier;

      return id && id.name === 'mpx';
    }

    /**
     * Checks whether the property name of the given MemberExpression node
     * is allowed by options or not.
     * @param {ASTNode} node The MemberExpression node to check.
     * @returns {boolean} `true` if the property name of the node is allowed.
     */
    function isUnAllowed(node) {
      const propertyName = astUtils.getStaticPropertyName(node);

      return propertyName && unAllowed.indexOf(propertyName) !== -1;
    }

    /**
     * Checks whether the given reference is a member access which is not
     * allowed by options or not.
     * @param {eslint-scope.Reference} reference The reference to check.
     * @returns {boolean} `true` if the reference is a member access which
     *      is not allowed by options.
     */
    function isMemberAccessExceptUnAllowed(reference) {
      const node = reference.identifier;
      const parent = node.parent;

      return (
        parent.type === 'MemberExpression' &&
        parent.object === node &&
        isUnAllowed(parent)
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
        messageId: 'unexpected'
      });
    }

    return {
      'Program:exit'() {
        const scope = context.getScope();
        const mpxVar = astUtils.getVariableByName(scope, 'mpx');
        const shadowed = mpxVar && mpxVar.defs.length > 0;

        /*
         * 'scope.through' includes all references to undefined
         * variables. If the variable 'console' is not defined, it uses
         * 'scope.through'.
         */
        const references = mpxVar
          ? mpxVar.references
          : scope.through.filter(isMPX);

        if (!shadowed) {
          references.filter(isMemberAccessExceptUnAllowed).forEach(report);
        }
      }
    };
  }
};
