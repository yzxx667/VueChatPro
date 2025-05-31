import {
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElMessage
} from "./chunk-3F4KIG2F.js";
import {
  arrow_up_bold_default,
  circle_close_filled_default,
  loading_default,
  opportunity_default,
  success_filled_default
} from "./chunk-RYIGFXRD.js";
import {
  Fragment,
  Transition,
  computed,
  createBaseVNode,
  createBlock,
  createCommentVNode,
  createElementBlock,
  createSlots,
  createTextVNode,
  createVNode,
  defineComponent,
  mergeProps,
  nextTick,
  normalizeClass,
  normalizeStyle,
  onMounted,
  onUnmounted,
  openBlock,
  ref,
  renderList,
  renderSlot,
  resolveComponent,
  resolveDynamicComponent,
  shallowRef,
  toDisplayString,
  unref,
  useSlots,
  vShow,
  watch,
  watchEffect,
  withCtx,
  withDirectives
} from "./chunk-K3RWG4H5.js";
import "./chunk-G3PMV62Z.js";

// node_modules/.pnpm/vue-chat-pro@0.0.0/node_modules/vue-chat-pro/es/vue-chat.js
function De(s, d, n, t, e) {
  let i = `${s}-${d}`;
  return n && (i += `-${n}`), i;
}
function G(s) {
  const d = "Vc";
  return {
    namespace: d,
    b: (t = "") => De(d, s, t)
  };
}
var Fe = ["src"];
var Ke = defineComponent({
  __name: "Welcome",
  props: {
    classNames: {},
    description: {},
    extra: {},
    icon: {},
    rootClassName: {},
    styles: {},
    title: {},
    variant: { default: "filled" },
    directions: {}
  },
  setup(s) {
    const d = s, n = G("welcome"), t = computed(() => [
      d.rootClassName,
      {
        [n.b("filled")]: d.variant === "filled",
        [n.b("borderless")]: d.variant === "borderless",
        [n.b("left")]: d.directions === "left",
        [n.b("right")]: d.directions === "right"
      }
    ]);
    return (e, i) => {
      var f, y, m, _, u, $, o, g;
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([unref(n).b(), t.value])
      }, [
        e.$slots.icon || e.icon ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass([unref(n).b("icon"), (f = e.classNames) == null ? void 0 : f.icon]),
          style: normalizeStyle((y = e.styles) == null ? void 0 : y.icon)
        }, [
          renderSlot(e.$slots, "icon", {}, () => [
            typeof e.icon == "string" ? (openBlock(), createElementBlock("img", {
              key: 0,
              src: e.icon,
              alt: "欢迎图标"
            }, null, 8, Fe)) : (openBlock(), createBlock(resolveDynamicComponent(e.icon), { key: 1 }))
          ], true)
        ], 6)) : createCommentVNode("", true),
        createBaseVNode("div", {
          class: normalizeClass(unref(n).b("content-wrapper"))
        }, [
          e.$slots.title || e.title ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass([unref(n).b("title"), (m = e.classNames) == null ? void 0 : m.title, (e.$slots.extra || e.extra) && "extra"]),
            style: normalizeStyle((_ = e.styles) == null ? void 0 : _.title)
          }, [
            renderSlot(e.$slots, "title", {}, () => [
              createBaseVNode("h4", null, toDisplayString(e.title), 1)
            ], true),
            e.$slots.extra || e.extra ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: normalizeClass([unref(n).b("extra"), (u = e.classNames) == null ? void 0 : u.extra]),
              style: normalizeStyle(($ = e.styles) == null ? void 0 : $.extra)
            }, [
              renderSlot(e.$slots, "extra", {}, () => [
                createTextVNode(toDisplayString(e.extra), 1)
              ], true)
            ], 6)) : createCommentVNode("", true)
          ], 6)) : createCommentVNode("", true),
          createBaseVNode("span", {
            class: normalizeClass([unref(n).b("description"), (o = e.classNames) == null ? void 0 : o.description]),
            style: normalizeStyle((g = e.styles) == null ? void 0 : g.description)
          }, [
            renderSlot(e.$slots, "description", {}, () => [
              createTextVNode(toDisplayString(e.description), 1)
            ], true)
          ], 6)
        ], 2)
      ], 2);
    };
  }
});
var H = (s, d) => {
  const n = s.__vccOpts || s;
  for (const [t, e] of d)
    n[t] = e;
  return n;
};
var le = H(Ke, [["__scopeId", "data-v-f9b19b9d"]]);
le.install = (s) => {
  s.component("Welcome", le);
};
var Me = ["disabled"];
var He = defineComponent({
  __name: "Thinking",
  props: {
    content: { default: "" },
    modelValue: { type: Boolean, default: true },
    status: { default: "start" },
    autoCollapse: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    duration: { default: "0.2s" },
    buttonWidth: { default: "160px" },
    maxWidth: { default: "500px" },
    backgroundColor: {},
    color: { default: "#00" },
    isBorder: { type: Boolean, default: false },
    lb: { type: Boolean, default: true }
  },
  emits: ["update:modelValue", "change"],
  setup(s, { emit: d }) {
    const n = G("thinking"), t = s, e = computed(() => t.status === "start" ? "开始思考" : t.status === "thinking" ? "思考中" : t.status === "end" ? "思考完成" : "思考失败"), i = d, f = useSlots(), y = computed({
      get() {
        return t.modelValue;
      },
      set(o) {
        i("update:modelValue", o);
      }
    }), m = () => {
      y.value = !y.value, i("change", !y.value, t.status);
    }, _ = computed(() => {
      const o = {};
      return t.buttonWidth && (o.width = t.buttonWidth), t.isBorder && (o.border = "1px solid var(--border-color)"), o;
    }), u = computed(() => {
      const o = {};
      return t.maxWidth && (o.maxWidth = t.maxWidth), t.backgroundColor && (t.backgroundColor.includes("linear-gradient") ? o.background = t.backgroundColor : o.backgroundColor = t.backgroundColor), t.color && (o.color = t.color), o;
    }), $ = computed(() => ({
      transition: t.duration ? `transform ${t.duration} ease` : "transform $motion-duration-slow ease"
    }));
    return watch(
      () => t.status,
      (o) => {
        t.autoCollapse && o === "end" && (y.value = false, console.log("isOpen.value", y.value));
      }
    ), watch(
      () => y.value,
      (o) => {
        console.log("Watch isOpen.value", o);
      }
    ), (o, g) => {
      const b = resolveComponent("el-icon");
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(unref(n).b())
      }, [
        createBaseVNode("div", null, [
          createBaseVNode("button", {
            class: normalizeClass(unref(n).b("top")),
            disabled: o.disabled,
            style: normalizeStyle(_.value),
            onClick: m
          }, [
            createBaseVNode("span", {
              class: normalizeClass(unref(n).b("icon"))
            }, [
              renderSlot(o.$slots, "icon", { status: o.status }, () => [
                o.status === "start" ? (openBlock(), createBlock(b, {
                  key: 0,
                  style: { color: "var(--start-color)" }
                }, {
                  default: withCtx(() => [
                    createVNode(unref(opportunity_default))
                  ]),
                  _: 1
                })) : o.status === "thinking" ? (openBlock(), createBlock(b, {
                  key: 1,
                  style: { color: "var(--thinking-color)" },
                  class: "thinking-loading"
                }, {
                  default: withCtx(() => [
                    createVNode(unref(loading_default))
                  ]),
                  _: 1
                })) : o.status === "end" ? (openBlock(), createBlock(b, {
                  key: 2,
                  style: { color: "var(--end-color)" }
                }, {
                  default: withCtx(() => [
                    createVNode(unref(success_filled_default))
                  ]),
                  _: 1
                })) : o.status === "error" ? (openBlock(), createBlock(b, {
                  key: 3,
                  style: { color: "var(--error-color)" }
                }, {
                  default: withCtx(() => [
                    createVNode(unref(circle_close_filled_default))
                  ]),
                  _: 1
                })) : createCommentVNode("", true)
              ], true)
            ], 2),
            createBaseVNode("span", {
              class: normalizeClass(unref(n).b("label"))
            }, [
              renderSlot(o.$slots, "label", { status: o.status }, () => [
                createTextVNode(toDisplayString(e.value), 1)
              ], true)
            ], 2),
            createBaseVNode("span", {
              class: normalizeClass([unref(n).b("arrow"), { "is-open": y.value }]),
              style: normalizeStyle($.value)
            }, [
              renderSlot(o.$slots, "arrow", {}, () => [
                createVNode(b, { class: "el-icon-center" }, {
                  default: withCtx(() => [
                    createVNode(unref(arrow_up_bold_default))
                  ]),
                  _: 1
                })
              ], true)
            ], 6)
          ], 14, Me)
        ]),
        createVNode(Transition, { name: "thinking-content" }, {
          default: withCtx(() => [
            withDirectives(createBaseVNode("div", {
              class: normalizeClass([
                unref(n).b("content"),
                { [unref(n).b("content-lb")]: o.lb }
              ]),
              style: normalizeStyle(u.value)
            }, [
              unref(f).error && o.status === "error" ? renderSlot(o.$slots, "error", { key: 0 }, void 0, true) : renderSlot(o.$slots, "content", {
                key: 1,
                status: o.status,
                content: o.content
              }, () => [
                createTextVNode(toDisplayString(o.content), 1)
              ], true)
            ], 6), [
              [vShow, y.value]
            ])
          ]),
          _: 3
        })
      ], 2);
    };
  }
});
var se = H(He, [["__scopeId", "data-v-144544e5"]]);
se.install = (s) => {
  s.component("Thinking", se);
};
function We(s) {
  return computed(() => {
    if (!s) return [false, 0, 0];
    let n = {
      step: 1,
      interval: 50
    };
    return typeof s == "object" && (n = { ...n, ...s }), [true, n.interval, n.step];
  }).value;
}
var me = (s) => typeof s == "string";
var Pe = (s, d, n, t) => {
  let e = ref(""), i = ref(1);
  const f = ref(d && me(s.value));
  watch(
    () => s.value,
    () => {
      console.log(s.value), console.log(e.value), !f.value && me(s.value) ? i.value = s.value.length : f.value && s.value.indexOf(e.value) !== 0 && (i.value = 1), e.value = s.value;
    }
  ), watchEffect(() => {
    if (f.value && i.value < s.value.length) {
      const _ = setTimeout(() => {
        const u = ($) => $ + n;
        i.value = u(i.value);
      }, t);
      return () => clearTimeout(_);
    }
  });
  const y = computed(() => f.value && i.value < s.value.length ? () => s.value.slice(0, i.value) : () => s.value), m = computed(() => f.value && i.value < s.value.length);
  return [y, m];
};
var Ue = {};
var ze = { class: "vk-wapper-dot" };
var je = {
  key: "item-1",
  class: normalizeClass("vk-wapper-dot-item")
};
var Ge = {
  key: "item-2",
  class: normalizeClass("vk-wapper-dot-item")
};
var qe = {
  key: "item-3",
  class: normalizeClass("vk-wapper-dot-item")
};
function Xe(s, d) {
  return openBlock(), createElementBlock("span", ze, [
    (openBlock(), createElementBlock("i", je)),
    (openBlock(), createElementBlock("i", Ge)),
    (openBlock(), createElementBlock("i", qe))
  ]);
}
var pe = H(Ue, [["render", Xe], ["__scopeId", "data-v-88aadeec"]]);
var Je = ["innerHTML"];
var Qe = ["innerHTML"];
var Ye = defineComponent({
  inheritAttrs: false,
  __name: "Bubble",
  props: {
    avatar: { default: "" },
    className: {},
    content: { default: "" },
    loading: { type: Boolean, default: false },
    loadingRender: { type: Function, default: void 0 },
    messageRender: {},
    placement: { default: "start" },
    shape: {},
    styles: {},
    typing: { type: [Boolean, Object], default: false },
    variant: { default: "filled" },
    transparent: { type: Boolean, default: false }
  },
  emits: ["onTypingComplete", "onUpdate"],
  setup(s, { expose: d, emit: n }) {
    const t = s;
    console.log("bubble props", t);
    const e = n, i = G("bubble"), f = useSlots();
    console.log("bubble slots", f);
    const y = ref(), m = computed(() => t.content), [_, u, $] = We(t.typing), [o, g] = Pe(
      m,
      _,
      $,
      u
    );
    console.log("typedContent.value", o.value);
    const b = computed(
      () => {
        var r;
        return t.messageRender ? t.messageRender(((r = o.value) == null ? void 0 : r.call(o)) ?? "") : o.value;
      }
    );
    function N(r) {
      return typeof r == "string";
    }
    const p = ref(false);
    return watch(
      () => g.value || t.loading,
      () => {
        !g.value && !t.loading ? p.value || (p.value = true, e("onTypingComplete")) : p.value = false;
      }
    ), watch(
      () => o.value(),
      () => e("onUpdate")
    ), d({
      nativeElement: y
    }), (r, E) => {
      var V, F, K, X, x, ee, te, h, U, J, Q, Y;
      const D = resolveComponent("el-avatar");
      return openBlock(), createElementBlock("div", {
        ref_key: "divRef",
        ref: y,
        class: normalizeClass([unref(i).b(), unref(i).b(r.placement)])
      }, [
        r.avatar || unref(f).avatar ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass([unref(i).b("avatar"), (V = t.className) == null ? void 0 : V.avatar]),
          style: normalizeStyle((F = t.styles) == null ? void 0 : F.avatar)
        }, [
          renderSlot(r.$slots, "avatar", {}, () => [
            typeof r.avatar == "string" ? (openBlock(), createBlock(D, {
              key: 0,
              size: 32,
              src: r.avatar
            }, null, 8, ["src"])) : (openBlock(), createBlock(resolveDynamicComponent(r.avatar), { key: 1 }))
          ], true)
        ], 6)) : createCommentVNode("", true),
        unref(f).header || unref(f).footer ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass([unref(i).b("content-wrapper")])
        }, [
          unref(f).header ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass([unref(i).b("header"), (K = t.className) == null ? void 0 : K.header]),
            style: normalizeStyle((X = t.styles) == null ? void 0 : X.header)
          }, [
            renderSlot(r.$slots, "header", {}, void 0, true)
          ], 6)) : createCommentVNode("", true),
          createBaseVNode("div", {
            class: normalizeClass([
              unref(i).b("content"),
              unref(i).b(`content-${t.variant}`),
              (x = t.className) == null ? void 0 : x.content,
              t.shape && unref(i).b(`content-${t.placement}-${t.shape}`),
              {
                [unref(i).b("content-filled-transparent")]: t.transparent
              }
            ]),
            style: normalizeStyle((ee = t.styles) == null ? void 0 : ee.content)
          }, [
            t.loading ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              unref(f).loading ? renderSlot(r.$slots, "loading", { key: 0 }, void 0, true) : r.loadingRender ? (openBlock(), createBlock(resolveDynamicComponent(r.loadingRender()), { key: 1 })) : (openBlock(), createBlock(pe, { key: 2 }))
            ], 64)) : createCommentVNode("", true),
            t.loading ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              unref(f).content ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                unref(f).content ? renderSlot(r.$slots, "content", { key: 0 }, void 0, true) : createCommentVNode("", true)
              ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                N(b.value) ? (openBlock(), createElementBlock("div", {
                  key: 1,
                  innerHTML: b.value
                }, null, 8, Je)) : (openBlock(), createBlock(resolveDynamicComponent(b.value), { key: 0 }))
              ], 64))
            ], 64))
          ], 6),
          unref(f).footer ? (openBlock(), createElementBlock("div", {
            key: 1,
            class: normalizeClass([unref(i).b("footer"), (te = t.className) == null ? void 0 : te.footer]),
            style: normalizeStyle((h = t.styles) == null ? void 0 : h.footer)
          }, [
            renderSlot(r.$slots, "footer", {}, void 0, true)
          ], 6)) : createCommentVNode("", true)
        ], 2)) : (openBlock(), createElementBlock(Fragment, { key: 2 }, [
          createBaseVNode("div", {
            class: normalizeClass([
              unref(i).b("content"),
              unref(i).b(`content-${t.variant}`),
              (U = t.className) == null ? void 0 : U.content,
              t.shape && unref(i).b(`content-${t.placement}-${t.shape}`),
              {
                [unref(i).b("content-filled-transparent")]: t.transparent
              }
            ]),
            style: normalizeStyle((J = t.styles) == null ? void 0 : J.content)
          }, [
            t.loading ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              unref(f).loading ? renderSlot(r.$slots, "loading", { key: 0 }, void 0, true) : r.loadingRender ? (openBlock(), createBlock(resolveDynamicComponent(r.loadingRender()), { key: 1 })) : (openBlock(), createBlock(pe, { key: 2 }))
            ], 64)) : createCommentVNode("", true),
            t.loading ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              unref(f).content ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                unref(f).content ? renderSlot(r.$slots, "content", { key: 0 }, void 0, true) : createCommentVNode("", true)
              ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                N(b.value) ? (openBlock(), createElementBlock("div", {
                  key: 1,
                  innerHTML: b.value
                }, null, 8, Qe)) : (openBlock(), createBlock(resolveDynamicComponent(b.value), { key: 0 }))
              ], 64))
            ], 64))
          ], 6),
          unref(f).footer ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass([unref(i).b("footer"), (Q = t.className) == null ? void 0 : Q.footer]),
            style: normalizeStyle((Y = t.styles) == null ? void 0 : Y.footer)
          }, [
            renderSlot(r.$slots, "footer", {}, void 0, true)
          ], 6)) : createCommentVNode("", true)
        ], 64))
      ], 2);
    };
  }
});
var ke = H(Ye, [["__scopeId", "data-v-354cdaa2"]]);
var Ze = defineComponent({
  __name: "BubbleList",
  props: {
    autoScroll: { type: Boolean, default: true },
    className: {},
    items: { default: () => [] },
    rootClassName: {}
  },
  setup(s, { expose: d }) {
    const n = s;
    console.log("bubblelist props", n);
    const t = ref(), e = ref(0), i = ref({}), f = useSlots(), y = G("bubble-list"), m = ref(false), _ = ref(1), u = ref(true), $ = (p) => {
      const r = p.target;
      m.value = r.scrollHeight - Math.abs(r.scrollTop) - r.clientHeight <= _.value;
    }, o = (p, r) => {
      r != null && (p ? Reflect.set(i.value, r, p) : Reflect.deleteProperty(i.value, r));
    };
    watch(
      () => e.value,
      () => {
        n.autoScroll && t.value && m.value && t.value.scrollTo({
          top: t.value.scrollHeight,
          behavior: "smooth"
        });
      }
    );
    function g() {
      n.autoScroll && (e.value = e.value + 1);
    }
    watch(() => n.items.length, () => {
      nextTick(() => {
        n.autoScroll && (e.value += 1, m.value = true);
      });
    });
    const b = (p) => {
      var r;
      p.key && ((r = p == null ? void 0 : p.onTypingComplete) == null || r.call(p));
    }, N = ({
      key: p,
      offset: r,
      behavior: E = "smooth",
      block: D
    }) => {
      var V;
      if (typeof r == "number")
        (V = t.value) == null || V.scrollTo({
          top: r,
          behavior: E
        });
      else if (p !== void 0) {
        const F = i.value[n.items[p].key];
        if (F) {
          const K = n.items.findIndex(
            (X) => X.key === `persit_${p}`
          );
          console.log("index", K, n.items), m.value = K === n.items.length - 1, F.$el.scrollIntoView({
            behavior: E,
            block: D
          });
        }
      }
    };
    return onMounted(() => {
      nextTick(() => {
        N({ offset: t.value.scrollHeight, behavior: "auto" });
      });
    }), d({
      nativeElement: t.value,
      scrollTo: N
    }), (p, r) => (openBlock(), createElementBlock("div", {
      ref_key: "listRef",
      ref: t,
      class: normalizeClass([
        unref(y).b(),
        p.rootClassName,
        p.className,
        m.value ? unref(y).b("reach-end") : ""
      ]),
      onScroll: $
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(n.items, (E) => (openBlock(), createBlock(ke, mergeProps({
        key: E.key,
        ref_for: true
      }, E, {
        onOnUpdate: g,
        ref_for: true,
        ref: (D) => o(D, E.key),
        "on-typing-complete": () => b(E),
        typing: u.value ? E.typing : false
      }), createSlots({ _: 2 }, [
        renderList(f, (D, V) => ({
          name: V,
          fn: withCtx(() => [
            renderSlot(p.$slots, V, { info: E }, void 0, true)
          ])
        }))
      ]), 1040, ["on-typing-complete", "typing"]))), 128))
    ], 34));
  }
});
var xe = H(Ze, [["__scopeId", "data-v-4e30e9cd"]]);
function et(s, d = []) {
  const n = computed(
    () => {
      if (!s)
        return [false, void 0, void 0];
      let e = {
        sort: void 0,
        title: void 0
      };
      return typeof s == "object" && (e = { ...e, ...s }), [true, e.sort, e.title];
    }
  );
  return console.log(n.value), computed(() => {
    const e = n.value[0];
    if (!e)
      return [[
        {
          name: "unGroup",
          data: d,
          title: void 0
        }
      ], e];
    const i = d.reduce(
      (m, _) => {
        const u = _.group || "unGroup";
        return m[u] || (m[u] = []), m[u].push(_), m;
      },
      {}
    );
    return [(n.value[1] && typeof n.value[1] != "boolean" ? Object.keys(i).sort(n.value[1]) : Object.keys(i)).map((m) => ({
      name: m === "unGroup" ? void 0 : m,
      data: i[m],
      title: n.value[2]
    })), n.value[0]];
  }).value;
}
var tt = defineComponent({
  props: {
    vNode: {
      type: [String, Object],
      require: true
    }
  },
  setup(s) {
    return () => s.vNode;
  }
});
var nt = defineComponent({
  __name: "Dropdown",
  props: {
    placement: {},
    trigger: {},
    disabled: { type: Boolean, default: false },
    menu: { default: () => [] }
  },
  emits: ["onOpenChange"],
  setup(s, { emit: d }) {
    const n = s, t = d;
    return (e, i) => (openBlock(), createBlock(unref(ElDropdown), {
      onVisibleChange: i[0] || (i[0] = (f) => t("onOpenChange", f))
    }, {
      dropdown: withCtx(() => [
        createVNode(unref(ElDropdownMenu), null, {
          default: withCtx(() => [
            (openBlock(true), createElementBlock(Fragment, null, renderList(n.menu, (f, y) => (openBlock(), createBlock(unref(ElDropdownItem), mergeProps({
              key: y,
              ref_for: true
            }, f), {
              default: withCtx(() => [
                createTextVNode(toDisplayString(f.label), 1)
              ]),
              _: 2
            }, 1040))), 128))
          ]),
          _: 1
        })
      ]),
      default: withCtx(() => [
        renderSlot(e.$slots, "default")
      ]),
      _: 3
    }));
  }
});
var ot = defineComponent({
  __name: "ConversationItem",
  props: {
    direction: {},
    className: {},
    active: { type: Boolean },
    info: {},
    menu: {},
    inEllipsis: { type: Boolean, default: true },
    line: { default: 1 }
  },
  emits: ["click"],
  setup(s, { emit: d }) {
    const n = s, t = d, e = ref(false), i = computed(() => {
      var o, g;
      return [
        n.className,
        $.b("item"),
        { [$.b("item-active")]: n.active && !((o = n.info) != null && o.disabled) },
        { [$.b("item-disabled")]: (g = n.info) == null ? void 0 : g.disabled }
      ];
    }), f = () => {
      var o;
      (o = n.info) != null && o.disabled || t("click", n.info);
    }, y = () => {
      var o, g, b, N, p;
      if ((o = n.info) != null && o.disabled) {
        e.value = false;
        return;
      }
      u.value && (e.value = ((g = u.value) == null ? void 0 : g.scrollWidth) > ((b = u.value) == null ? void 0 : b.offsetWidth) || ((N = u.value) == null ? void 0 : N.scrollHeight) > ((p = u.value) == null ? void 0 : p.offsetHeight));
    }, m = (o) => {
      var g, b;
      Array.isArray(n.menu) || n.info && ((b = (g = n.menu) == null ? void 0 : g.onClick) == null || b.call(g, { ...n.info, key: o }));
    }, _ = (o) => {
      o.stopPropagation();
    }, u = ref(), $ = G("conversations");
    return (o, g) => {
      var D;
      const b = resolveComponent("el-icon"), N = resolveComponent("More"), p = resolveComponent("ElIcon"), r = resolveComponent("ElButton"), E = resolveComponent("el-tooltip");
      return openBlock(), createBlock(E, {
        visible: e.value,
        "onUpdate:visible": g[0] || (g[0] = (V) => e.value = V),
        content: (D = o.info) == null ? void 0 : D.label,
        disabled: o.inEllipsis && !e.value,
        placement: o.direction === "ltr" ? "left" : "right"
      }, {
        default: withCtx(() => {
          var V, F;
          return [
            createBaseVNode("li", {
              class: normalizeClass(i.value),
              onClick: f
            }, [
              renderSlot(o.$slots, "icon", { class: "icon" }, () => [
                o.info.icon ? (openBlock(), createElementBlock("div", {
                  key: 0,
                  class: normalizeClass(unref($).b("icon"))
                }, [
                  typeof o.info.icon == "string" ? (openBlock(), createBlock(b, { key: 0 }, {
                    default: withCtx(() => [
                      (openBlock(), createBlock(resolveDynamicComponent(o.info.icon)))
                    ]),
                    _: 1
                  })) : (openBlock(), createBlock(resolveDynamicComponent(o.info.icon), { key: 1 }))
                ], 2)) : createCommentVNode("", true)
              ], true),
              createBaseVNode("div", {
                ref_key: "textRef",
                ref: u,
                class: normalizeClass(unref($).b("label")),
                style: normalizeStyle({ textOverflow: "ellipsis", "-webkit-line-clamp": o.line }),
                onMouseenter: y
              }, [
                renderSlot(o.$slots, "label", { item: o.info }, () => [
                  createTextVNode(toDisplayString(o.info.label), 1)
                ], true)
              ], 38),
              o.menu && !((V = o.info) != null && V.disabled) ? (openBlock(), createBlock(nt, {
                key: 0,
                disabled: (F = o.info) == null ? void 0 : F.disabled,
                menu: Array.isArray(o.menu) ? o.menu : o.menu.items,
                placement: o.direction === "rtl" ? "bottom-start" : "bottom-end",
                trigger: "click",
                onCommand: m
              }, {
                default: withCtx(() => {
                  var K;
                  return [
                    createVNode(r, {
                      disabled: (K = o.info) == null ? void 0 : K.disabled,
                      link: "",
                      onClick: _
                    }, {
                      default: withCtx(() => [
                        createVNode(p, {
                          class: normalizeClass(unref($).b("menu-icon"))
                        }, {
                          default: withCtx(() => [
                            createVNode(N)
                          ]),
                          _: 1
                        }, 8, ["class"])
                      ]),
                      _: 1
                    }, 8, ["disabled"])
                  ];
                }),
                _: 1
              }, 8, ["disabled", "menu", "placement"])) : createCommentVNode("", true)
            ], 2)
          ];
        }),
        _: 3
      }, 8, ["visible", "content", "disabled", "placement"]);
    };
  }
});
var ye = H(ot, [["__scopeId", "data-v-2b5b7ab3"]]);
var lt = defineComponent({
  __name: "Conversation",
  props: {
    style: {},
    className: {},
    direction: {},
    groupable: { type: [Boolean, Object] },
    items: {},
    activeKey: {},
    defaultActiveKey: {},
    onActiveChange: { type: Function },
    classNames: {},
    styles: {},
    menu: { type: [Function, Array] }
  },
  emits: ["update:activeKey"],
  setup(s, { emit: d }) {
    const n = s, t = d, e = G("conversations"), i = computed(() => n.activeKey || n.defaultActiveKey || "");
    console.log(n.items);
    const [f, y] = et(n.groupable, n.items);
    console.log(f, y);
    const m = computed(() => [
      e.b(),
      n.className,
      {
        [e.b("rtl")]: n.direction === "rtl"
      }
    ]);
    function _(u) {
      n.onActiveChange && n.onActiveChange(u.key) === false || t("update:activeKey", u.key);
    }
    return (u, $) => (openBlock(), createElementBlock("ul", {
      class: normalizeClass(m.value),
      style: normalizeStyle(n.style)
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(unref(f), (o, g) => (openBlock(), createElementBlock(Fragment, { key: g }, [
        unref(y) ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          (openBlock(), createElementBlock("li", {
            key: o.name || `key-${g}`
          }, [
            o.title ? (openBlock(), createBlock(unref(tt), {
              key: 0,
              vNode: o.title
            }, null, 8, ["vNode"])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createTextVNode(toDisplayString(o.name), 1)
            ], 64))
          ])),
          createBaseVNode("ul", {
            class: normalizeClass([unref(e).b("list")])
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(o.data, (b, N) => {
              var p, r;
              return openBlock(), createBlock(ye, {
                key: b.key || `key-${N}`,
                active: i.value === b.key,
                "class-name": (p = n.classNames) == null ? void 0 : p.item,
                direction: n.direction,
                info: b,
                menu: typeof n.menu == "function" ? n.menu(b) : n.menu,
                style: normalizeStyle((r = n.styles) == null ? void 0 : r.item),
                onClick: _
              }, {
                label: withCtx(({ item: E }) => [
                  renderSlot(u.$slots, "item", { item: E }, void 0, true)
                ]),
                icon: withCtx(() => [
                  renderSlot(u.$slots, "icon", {}, void 0, true)
                ]),
                _: 2
              }, 1032, ["active", "class-name", "direction", "info", "menu", "style"]);
            }), 128))
          ], 2)
        ], 64)) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(o.data, (b, N) => {
          var p, r;
          return openBlock(), createBlock(ye, {
            key: b.key || `key-${N}`,
            active: i.value === b.key,
            "class-name": (p = n.classNames) == null ? void 0 : p.item,
            direction: n.direction,
            info: b,
            menu: typeof n.menu == "function" ? n.menu(b) : n.menu,
            style: normalizeStyle((r = n.styles) == null ? void 0 : r.item),
            onClick: _
          }, {
            label: withCtx(({ item: E }) => [
              renderSlot(u.$slots, "item", { item: E }, void 0, true)
            ]),
            icon: withCtx(() => [
              renderSlot(u.$slots, "icon", {}, void 0, true)
            ]),
            _: 2
          }, 1032, ["active", "class-name", "direction", "info", "menu", "style"]);
        }), 128))
      ], 64))), 128))
    ], 6));
  }
});
var st = H(lt, [["__scopeId", "data-v-2078bce4"]]);
var at = {};
var it = {
  color: "currentColor",
  viewBox: "0 0 1000 1000",
  xmlns: "http://www.w3.org/2000/svg",
  xmlnsXlink: "http://www.w3.org/1999/xlink"
};
function rt(s, d) {
  return openBlock(), createElementBlock("svg", it, d[0] || (d[0] = [
    createBaseVNode("title", null, "停止", -1),
    createBaseVNode("rect", {
      fill: "currentColor",
      height: "250",
      rx: "24",
      ry: "24",
      width: "250",
      x: "375",
      y: "375"
    }, null, -1),
    createBaseVNode("circle", {
      cx: "500",
      cy: "500",
      fill: "none",
      r: "450",
      stroke: "currentColor",
      "stroke-width": "100",
      opacity: "0.45"
    }, null, -1),
    createBaseVNode("circle", {
      cx: "500",
      cy: "500",
      fill: "none",
      r: "450",
      stroke: "currentColor",
      "stroke-width": "100",
      "stroke-dasharray": "600 9999999"
    }, [
      createBaseVNode("animateTransform", {
        attributeName: "transform",
        dur: "1s",
        from: "0 500 500",
        repeatCount: "indefinite",
        to: "360 500 500",
        type: "rotate"
      })
    ], -1)
  ]));
}
var be = H(at, [["render", rt]]);
var ut = { class: "foo" };
var ct = defineComponent({
  __name: "Sender",
  props: {
    modelValue: {},
    className: {},
    placeholder: {},
    disabled: { type: Boolean },
    readonly: { type: Boolean },
    rootClassName: {},
    styles: {},
    loading: { type: Boolean },
    variants: { default: "default" },
    submitType: { default: "enter" },
    onInput: {},
    onSubmit: {}
  },
  emits: ["update:modelValue", "on-input", "on-submit"],
  setup(s, { expose: d, emit: n }) {
    const t = G("sender"), e = s, i = ref(), f = ref(false), y = ref(), m = ref(), _ = ref(false), u = n, $ = useSlots(), o = computed(() => {
      var h;
      return [
        t.b("input"),
        (h = e == null ? void 0 : e.className) == null ? void 0 : h.input
      ];
    }), g = computed(() => [
      t.b("container"),
      {
        [t.b("default")]: e.variants === "default",
        [t.b("updown")]: e.variants === "updown"
      }
    ]);
    function b(h) {
      u("update:modelValue", h);
    }
    const N = (h) => {
      u("on-input", h);
    }, p = (h) => {
      u("on-submit", h);
    }, r = computed({
      get: () => e.modelValue,
      set: (h) => b(h)
    }), E = (h) => {
      if (e.submitType === "enter" && !(e != null && e.loading) && h.key === "Enter" && !h.shiftKey && (h.preventDefault(), p(e.modelValue)), e.submitType === "shiftEnter") {
        if (h.key === "Enter" && !h.shiftKey && !(e != null && e.loading))
          return;
        h.key === "Enter" && h.shiftKey && (h.preventDefault(), p(e.modelValue));
      }
    };
    return d({
      handleHeaderClose: () => {
        f.value = false;
      },
      handleHeaderOpen: () => {
        f.value = true;
      },
      handleFocusDefault: () => {
        var h;
        (h = y.value) == null || h.focus();
      },
      handleFocusupDown: () => {
        var h;
        (h = m.value) == null || h.focus();
      },
      handleFooterClose: () => {
        _.value = false;
      },
      handleFooterOpen: () => {
        _.value = true;
      },
      handleInputSubmit: () => {
        r.value && p(r.value);
      },
      handleInputClear: () => {
        r.value = "";
      }
    }), (h, U) => {
      var ce, de;
      const J = resolveComponent("el-input"), Q = resolveComponent("ElIcon"), Y = resolveComponent("ElButton"), ie = resolveComponent("Promotion"), re = resolveComponent("el-icon"), ue = resolveComponent("el-button");
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([unref(t).b(), e == null ? void 0 : e.rootClassName]),
        ref_key: "senderRef",
        ref: i
      }, [
        createVNode(Transition, { name: "header-slide" }, {
          default: withCtx(() => [
            f.value ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: normalizeClass([unref(t).b("header")])
            }, [
              renderSlot(h.$slots, "header", {}, void 0, true)
            ], 2)) : createCommentVNode("", true)
          ]),
          _: 3
        }),
        createBaseVNode("div", {
          class: normalizeClass(g.value)
        }, [
          e.variants === "default" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            unref($).prefix ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: normalizeClass([unref(t).b("prefix")])
            }, [
              renderSlot(h.$slots, "prefix", {}, void 0, true)
            ], 2)) : createCommentVNode("", true),
            createVNode(J, {
              ref_key: "inputRefDefault",
              ref: y,
              modelValue: r.value,
              "onUpdate:modelValue": U[0] || (U[0] = (ne) => r.value = ne),
              placeholder: e == null ? void 0 : e.placeholder,
              disabled: e == null ? void 0 : e.disabled,
              autosize: "",
              resize: "none",
              type: "textarea",
              readonly: (e == null ? void 0 : e.readonly) || (e == null ? void 0 : e.loading),
              class: normalizeClass(o.value),
              style: normalizeStyle({ ...(ce = e == null ? void 0 : e.styles) == null ? void 0 : ce.input }),
              submitType: e == null ? void 0 : e.submitType,
              onInput: N,
              onKeypress: E
            }, null, 8, ["modelValue", "placeholder", "disabled", "readonly", "class", "style", "submitType"]),
            unref($).actionsList ? (openBlock(), createElementBlock("div", {
              key: 1,
              class: normalizeClass([unref(t).b("actionsList")])
            }, [
              renderSlot(h.$slots, "actionsList", {}, void 0, true)
            ], 2)) : e != null && e.loading ? (openBlock(), createElementBlock("div", {
              key: 2,
              class: normalizeClass([unref(t).b("actionsList")])
            }, [
              createVNode(Y, {
                circle: "",
                type: "primary",
                disabled: !r.value
              }, {
                default: withCtx(() => [
                  createVNode(Q, {
                    color: "white",
                    size: "32"
                  }, {
                    default: withCtx(() => [
                      createVNode(be)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["disabled"])
            ], 2)) : (openBlock(), createElementBlock("div", {
              key: 3,
              class: normalizeClass([unref(t).b("actionsList-default")])
            }, [
              createVNode(ue, {
                circle: "",
                type: "primary",
                disabled: (e == null ? void 0 : e.disabled) || !r.value
              }, {
                default: withCtx(() => [
                  createVNode(re, null, {
                    default: withCtx(() => [
                      createVNode(ie, { onClick: p })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["disabled"])
            ], 2))
          ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            createVNode(J, {
              ref_key: "inputRefupDown",
              ref: m,
              modelValue: r.value,
              "onUpdate:modelValue": U[1] || (U[1] = (ne) => r.value = ne),
              placeholder: e == null ? void 0 : e.placeholder,
              disabled: e == null ? void 0 : e.disabled,
              autosize: "",
              resize: "none",
              type: "textarea",
              readonly: (e == null ? void 0 : e.readonly) || (e == null ? void 0 : e.loading),
              class: normalizeClass(o.value),
              style: normalizeStyle({ ...(de = e == null ? void 0 : e.styles) == null ? void 0 : de.input }),
              submitType: e == null ? void 0 : e.submitType,
              onInput: N,
              onKeypress: E
            }, null, 8, ["modelValue", "placeholder", "disabled", "readonly", "class", "style", "submitType"]),
            createBaseVNode("div", ut, [
              createBaseVNode("div", {
                class: normalizeClass([unref(t).b("prefix")])
              }, [
                renderSlot(h.$slots, "prefix", {}, void 0, true)
              ], 2),
              unref($).actionsList ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: normalizeClass([unref(t).b("actionsList")])
              }, [
                renderSlot(h.$slots, "actionsList", {}, void 0, true)
              ], 2)) : e != null && e.loading ? (openBlock(), createElementBlock("div", {
                key: 1,
                class: normalizeClass([unref(t).b("actionsList")])
              }, [
                createVNode(Y, {
                  circle: "",
                  type: "primary",
                  disabled: !r.value
                }, {
                  default: withCtx(() => [
                    createVNode(Q, {
                      color: "white",
                      size: "32"
                    }, {
                      default: withCtx(() => [
                        createVNode(be)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["disabled"])
              ], 2)) : (openBlock(), createElementBlock("div", {
                key: 2,
                class: normalizeClass([unref(t).b("actionsList-default")])
              }, [
                createVNode(ue, {
                  circle: "",
                  type: "primary",
                  disabled: (e == null ? void 0 : e.disabled) || !r.value
                }, {
                  default: withCtx(() => [
                    createVNode(re, null, {
                      default: withCtx(() => [
                        createVNode(ie, { onClick: p })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["disabled"])
              ], 2))
            ])
          ], 64))
        ], 2),
        createVNode(Transition, { name: "header-slide" }, {
          default: withCtx(() => [
            _.value ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: normalizeClass([unref(t).b("footer")])
            }, [
              renderSlot(h.$slots, "footer", {}, void 0, true)
            ], 2)) : createCommentVNode("", true)
          ]),
          _: 3
        })
      ], 2);
    };
  }
});
var dt = H(ct, [["__scopeId", "data-v-0d237e86"]]);
function Ct(s) {
  const {
    lang: d = "zh-CN",
    continuous: n = true,
    interimResults: t = true,
    onError: e,
    onStart: i,
    onEnd: f,
    onResult: y
  } = s, m = ref(""), _ = ref(false), u = ref(null), $ = () => {
    "webkitSpeechRecognition" in window ? (u.value = new webkitSpeechRecognition(), u.value.continuous = n, u.value.interimResults = t, u.value.lang = d, u.value.onstart = () => {
      _.value = true, m.value = "", i == null || i();
    }, u.value.onend = () => {
      _.value = false, f == null || f(m.value);
    }, u.value.onerror = (g) => {
      _.value = false, e == null || e(g);
    }, u.value.onresult = (g) => {
      let b = "";
      for (let N = 0; N < g.resultIndex + 1; N++)
        b += g.results[N][0].transcript;
      m.value = b, y == null || y(b);
    }, u.value.start()) : ElMessage.error("当前浏览器不支持语音识别");
  }, o = () => {
    u.value && u.value.stop();
  };
  return onUnmounted(() => {
    o(), u.value = null;
  }), { start: $, stop: o, value: m, loading: _ };
}
var ft = `

`;
var vt = `
`;
var ge = ":";
var ae = (s) => (s ?? "").trim() !== "";
function mt() {
  let s = "";
  return new TransformStream({
    /**
         *
         * @param streamChunk
         * @param controller
         * 类型：controller 是 TransformStreamDefaultController 类型。它提供了对流处理的控制能力。
    
          描述：controller 用于控制当前的流处理状态。它允许你：
    
          向下游发送数据：通过调用 controller.enqueue() 将转换后的数据传递到流的下一个阶段（比如下游的 WritableStream）。
    
          终止流：通过调用 controller.terminate() 可以提前终止流。
    
          关闭流：通过调用 controller.close() 来关闭流，这意味着没有更多的数据会被传递。
    
          在 transform 方法中的作用：controller 用于控制流的输出。你可以使用它将处理后的数据（比如解析后的事件块）排入下一个流处理阶段，或者最终输出到可消费的地方。
         */
    transform(d, n) {
      s += d, console.log("buffer", s);
      const t = s.split(ft);
      console.log("parts", t), t.slice(0, -1).forEach((e) => {
        ae(e) && n.enqueue(e);
      }), s = t[t.length - 1];
    },
    flush(d) {
      ae(s) && d.enqueue(s);
    }
  });
}
function pt() {
  return new TransformStream({
    transform(s, d) {
      const t = s.split(vt).reduce((e, i) => {
        const f = i.indexOf(ge);
        if (f === -1)
          throw new Error(
            `键值分隔符 "${ge}" 在sse行块中找不到!`
          );
        const y = i.slice(0, f);
        if (!ae(y)) return e;
        const m = i.slice(f + 1);
        return { ...e, [y]: m };
      }, {});
      Object.keys(t).length !== 0 && d.enqueue(t);
    }
  });
}
function _t() {
  const s = ref([]), d = ref(null), n = ref(false), t = shallowRef(null), e = shallowRef(null);
  return {
    startStream: async (y) => {
      const { readableStream: m } = y;
      n.value = true, d.value = null, s.value = [], t.value = new AbortController();
      const _ = new TextDecoderStream();
      e.value = m.pipeThrough(_).pipeThrough(mt()).pipeThrough(pt()), e.value[Symbol.asyncIterator] = async function* () {
        var $;
        const u = this.getReader();
        for (; ; ) {
          if (($ = t.value.signal) != null && $.aborted) {
            await u.cancel();
            break;
          }
          const { done: o, value: g } = await u.read();
          if (o) break;
          g && (yield g);
        }
      };
      try {
        for await (const u of e.value)
          s.value.push(u);
      } catch (u) {
        u instanceof Error && (d.value = u);
      } finally {
        n.value = false, e.value = null, t.value = null;
      }
    },
    cancel: () => {
      t.value && t.value.abort();
    },
    // 新增中断方法
    data: s,
    error: d,
    isLoading: n
  };
}
var yt = [
  le,
  se,
  ke,
  xe,
  st,
  dt
];
var bt = (s) => {
  yt.forEach((d) => {
    s.component(d.__name, d);
  });
};
var $t = { install: bt };
export {
  ke as Bubble,
  xe as BubbleList,
  st as Conversation,
  dt as Sender,
  se as Thinking,
  le as Welcome,
  $t as default,
  Ct as useAudio,
  _t as useStream
};
//# sourceMappingURL=vue-chat-pro.js.map
