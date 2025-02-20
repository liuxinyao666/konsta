<template>
  <component :is="Component" ref="rippleElRef" :class="c.base">
    <slot />
  </component>
</template>
<script>
  import { ref, computed } from 'vue';
  import { useTouchRipple } from '../shared/use-touch-ripple.js';
  import { useThemeClasses } from '../shared/use-theme-classes.js';
  import { useTheme } from '../shared/use-theme.js';
  import { useDarkClasses } from '../shared/use-dark-classes.js';
  import { ActionsButtonClasses } from '../../shared/classes/ActionsButtonClasses.js';
  import { ActionsButtonColors } from '../../shared/colors/ActionsButtonColors.js';

  export default {
    name: 'k-actions-button',
    props: {
      component: {
        type: String,
        default: 'button',
      },
      colors: {
        type: Object,
      },
      ios: {
        type: Boolean,
        default: undefined,
      },
      material: {
        type: Boolean,
        default: undefined,
      },
      // Anchor props
      href: {
        type: [Boolean, String],
        default: undefined,
      },
      touchRipple: {
        type: Boolean,
        default: true,
      },
      dividers: { type: Boolean, default: undefined },
      bold: { type: Boolean, default: undefined },
      boldIos: { type: Boolean, default: false },
      boldMaterial: { type: Boolean, default: false },
      fontSizeIos: { type: String, default: 'text-xl' },
      fontSizeMaterial: { type: String, default: 'text-base' },
    },
    setup(props, ctx) {
      const rippleElRef = ref(null);
      const Component = computed(() => {
        let c = props.component;
        if (
          typeof props.component === 'undefined' &&
          (props.href || props.href === '')
        ) {
          c = 'a';
        }
        return c;
      });

      useTouchRipple(rippleElRef, props);

      const colors = computed(() =>
        ActionsButtonColors(props.colors || {}, useDarkClasses)
      );

      const theme = useTheme();

      const isDividers = computed(() =>
        typeof props.dividers === 'undefined'
          ? theme.value === 'ios'
          : props.dividers
      );

      const isBold = computed(() =>
        typeof props.bold === 'undefined'
          ? theme.value === 'ios'
            ? props.boldIos
            : props.boldMaterial
          : props.bold
      );

      const c = useThemeClasses(
        props,
        () =>
          ActionsButtonClasses(
            { ...props, bold: isBold.value, dividers: isDividers.value },
            colors.value,
            useDarkClasses
          ),
        ctx.attrs.class
      );

      return {
        c,
        Component,
        rippleElRef,
      };
    },
  };
</script>
