<script>
/**
 * Клонирует узел
 * Код из исходников Vue: https://github.com/vuejs/vue/blob/dev/src/core/vdom/vnode.js#L89
 * @param {VNode} vnode
 * @returns {VNode} клонированный узел
 */
function cloneVNode(vnode) {
  // Мы не можем импортировать VMode из пакета Vue
  // Он не экспортируется в пакете,
  // а исходники требуют сборки из Flow
  // Но мы можем получить конструктор из прототипа экземпляра
  const VNode = vnode.__proto__.constructor;
  const cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory,
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned;
}

export default {
  name: 'FadeTransitionGroup',

  inheritAttrs: false,

  render(h) {
    return h(
      'transition-group',
      {
        on: this.$listeners,
        attrs: this.$attrs,
        props: {
          name: 'fade-list',
        },
        class: 'fade-list',
      },
      this.$slots.default.map((vnode) => {
        const clonedNode = cloneVNode(vnode);
        if (clonedNode.data.staticClass) {
          if (!/\bfade-list-item\b/.test(clonedNode.data.staticClass)) {
            clonedNode.data.staticClass += ' fade-list-item';
          }
        } else {
          clonedNode.data.staticClass = 'fade-list-item';
        }
        return clonedNode;
      }),
    );
  },
};
</script>

<style scoped>
.fade-list {
  position: relative;
}

.fade-list >>> .fade-list-item {
  opacity: 1;
  transition: opacity 0.3s ease-out;
}

.fade-list >>> .fade-list-leave-active {
  position: absolute !important;
  left: 0;
  right: 0;
}

.fade-list >>> .fade-list-enter,
.fade-list >>> .fade-list-leave-to {
  opacity: 0;
}

.fade-list >>> .fade-list-move {
  transition: transform 0.3s;
}
</style>
