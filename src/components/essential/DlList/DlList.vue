<template>
    <component
        :is="tag"
        :id="uuid"
        :class="classes"
    >
        <slot :clickable="clickable" />
    </component>
</template>

<script lang="ts">
import { v4 } from 'uuid'
import { defineComponent } from 'vue-demi'
export default defineComponent({
    name: 'DlList',
    props: {
        bordered: Boolean,
        separator: Boolean,
        padding: Boolean,
        clickable: Boolean,
        tag: {
            type: String,
            default: 'div'
        }
    },
    data() {
        return {
            uuid: `dl-list-${v4()}`
        }
    },
    computed: {
        classes(): string | Record<string, string> {
            return (
                'dl-list' +
                (this.bordered ? ' dl-list--bordered' : '') +
                (this.separator ? ' dl-list--separator' : '') +
                (this.padding ? ' dl-list--padding' : '')
            )
        }
    }
})
</script>

<style scoped lang="scss">
.dl-list {
    padding: 6px 0;
    background-color: var(--dl-color-panel-background);
    &--bordered {
        border: 1px solid var(--dl-color-separator);
    }
    &--separator {
        border-top: 1px solid var(--dl-color-separator);
        & > .dl-list-item {
            padding: 5px 10px;
        }
        & > .list-item-wrapper:not(:first-child) {
            & .separator {
                display: block;
            }
        }
    }
    &--padding {
        padding: 8px 0;
    }
}
</style>
