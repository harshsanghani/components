<template>
    <div class="root-container">
        <div>
            <dl-button
                v-if="hasBackButton"
                dense
                label="Back"
                icon="icon-dl-arrow-left"
                flat
                text-color="dl-color-medium"
                style="padding: 0; margin-bottom: 10px"
                @click.stop.prevent="$emit('onClose')"
            />
            <h2
                v-if="hasTitle"
                class="title"
            >
                <slot name="title">
                    {{ title }}
                </slot>
            </h2>
            <p
                v-if="hasSubtitle"
                class="subtitle"
            >
                <slot name="subtitle">
                    {{ subtitle }}
                </slot>
            </p>
        </div>
        <dl-button
            v-if="closeButton"
            class="close-button"
            icon="icon-dl-close"
            size="s"
            flat
            text-color="dl-color-darker"
            @click="$emit('onClose')"
        />
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue-demi'
import { DlButton } from '../../../basic'

export default defineComponent({
    name: 'DlDialogBoxHeader',
    components: {
        DlButton
    },
    props: {
        title: { type: String, default: '' },
        subtitle: { type: String, default: '' },
        closeButton: { type: Boolean, default: true },
        hasBackButton: Boolean
    },
    emits: ['onClose'],
    setup(props, { slots }) {
        const hasTitle = computed(() => !!props.title || !!slots.title)
        const hasSubtitle = computed(() => !!props.subtitle || !!slots.subtitle)
        return { hasTitle, hasSubtitle }
    }
})
</script>

<style lang="scss" scoped>
.root-container {
    display: flex;
    width: 100%;
    align-items: flex-start;
    justify-content: space-between;
}

.title {
    font-size: var(--dl-font-size-h2);
    margin: 0;
    color: var(--dl-color-darker);
    line-height: 2rem !important;
}

.subtitle {
    font-size: var(--dl-font-size-body);
    color: var(--dl-color-medium);
    margin: 0;
}

.close-button {
    margin-top: 5px;
}
</style>
