<template>
    <div
        ref="jsonEditorRef"
        class="json-editor"
    />
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'
import { JSONEditor, Mode } from 'vanilla-jsoneditor'
import { debounce } from 'lodash'

export default defineComponent({
    model: {
        prop: 'modelValue',
        event: 'update:modelValue'
    },
    props: {
        /**
         * The string to display and modify as JSON
         */
        modelValue: {
            type: String,
            default: '{}'
        },
        /**
         *  When this prop is false, the editor will not refresh, paired with the update-prevent event
         * it helps with controlling when the editor refreshes
         */
        preventUpdate: {
            type: Boolean,
            default: null
        }
    },
    emits: ['update:modelValue', 'update-prevent', 'align-text'],
    data() {
        return {
            jsonEditor: {} as JSONEditor,
            preventOnChange: false
        }
    },
    watch: {
        modelValue: {
            handler(val) {
                if (this.preventUpdate === false) {
                    this.setJsonText(val)
                }
            }
        }
    },
    mounted() {
        this.initJsonEditor()
        this.setJsonText(this.modelValue)
        this.$emit('align-text')
    },
    methods: {
        initJsonEditor() {
            const initialAttrs: any = {
                onChange: debounce(
                    (updatedContent: { text: string; json: any }) => {
                        if (this.preventOnChange) {
                            this.preventOnChange = false
                            return
                        }
                        this.$emit('update:modelValue', updatedContent.text)
                        if (this.preventUpdate !== null) {
                            this.$emit('update-prevent', true)
                        }
                    },
                    100
                ),
                mode: Mode.text,
                mainMenuBar: false,
                navigationBar: false,
                statusBar: false
            }

            // There is type instantiation issue with JSONEditor,
            // it gives excessively deep and possibly infinite error
            // @ts-ignore
            this.jsonEditor = new JSONEditor({
                target: this.$refs.jsonEditorRef
                    ? (this.$refs.jsonEditorRef as Element)
                    : document.createElement('div'),
                props: initialAttrs
            })
        },
        setJsonText(text: string) {
            this.jsonEditor?.set({
                text
            })
        }
    }
})
</script>

<style lang="scss" scoped>
.json-editor {
    --jse-text-color: var(--dl-color-tooltip-background);
    --jse-delimiter-color: var(--dl-color-tooltip-background);
    --jse-key-color: var(--dl-color-negative);
    --jse-background-color: var(--dl-color-tooltip-text);
    --jse-value-color-boolean: #ae6307;
    --jse-value-color-string: #337433;
    --jse-panel-background: var(--dl-color-fill);
    --jse-panel-border: var(--dl-color-separator);
    height: 100%;
    .jse-error {
        display: none !important;
    }
    .cm-gutters {
        display: none !important;
    }
}
</style>
