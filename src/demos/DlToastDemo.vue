<template>
    <div style="width: 950px; padding-top: 20px">
        <div class="flex">
            <div>
                <dl-text-area
                    v-model="message"
                    title="Message"
                />
                <dl-input
                    v-model="duration"
                    type="number"
                    title="Duration seconds"
                />
                <dl-input
                    v-model="collapseCount"
                    type="number"
                    title="Collapse count"
                />
                <dl-input
                    v-model="width"
                    title="Custom width for toast item"
                />
            </div>
            <div class="flex">
                <div>
                    Type
                    <dl-radio
                        v-model="type"
                        value="success"
                        label="Success"
                    />
                    <dl-radio
                        v-model="type"
                        value="warning"
                        label="Warning"
                    />
                    <dl-radio
                        v-model="type"
                        value="error"
                        label="Error"
                    />
                    <dl-radio
                        v-model="type"
                        value="info"
                        label="Info"
                    />
                </div>
                <div>
                    Position
                    <dl-radio
                        v-model="position"
                        value="bottom"
                        label="Bottom"
                    />
                    <dl-radio
                        v-model="position"
                        value="bottom-left"
                        label="Bottom left"
                    />
                    <dl-radio
                        v-model="position"
                        value="bottom-right"
                        label="Bottom right"
                    />
                    <dl-radio
                        v-model="position"
                        value="top"
                        label="Top"
                    />
                    <dl-radio
                        v-model="position"
                        value="top-left"
                        label="Top left"
                    />
                    <dl-radio
                        v-model="position"
                        value="top-right"
                        label="Top right"
                    />
                </div>
                <div>
                    <dl-switch
                        v-model="closable"
                        left-label="Closable"
                    />
                </div>
            </div>
        </div>
        <dl-button @click="showToastMessage">
            Show Toast Message
        </dl-button>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue-demi'
import {
    DlButton,
    DlInput,
    DlRadio,
    DlSwitch,
    DlTextArea,
    DlToast
} from '../components'
import { DlToastPositions, DlToastTypes } from '../components/types'

export default defineComponent({
    name: 'DlToast',
    components: {
        DlTextArea,
        DlSwitch,
        DlRadio,
        DlInput,
        DlButton
    },
    setup() {
        const message = ref(
            'This is a sample message with a <a href="https://google.com/">link</a>'
        )
        const duration = ref(10)
        const type = ref('success')
        const position = ref('bottom')
        const closable = ref(true)
        const width = ref('auto')
        const collapseCount = ref(null)
        function showToastMessage() {
            DlToast.open({
                message: message.value,
                position: position.value as DlToastPositions,
                type: type.value as DlToastTypes,
                duration: Number(duration.value) || 1000,
                closable: closable.value,
                width: width.value,
                collapseCount: collapseCount.value
            })
        }
        return {
            showToastMessage,
            message,
            duration,
            type,
            position,
            closable,
            width,
            collapseCount
        }
    }
})
</script>

<style scoped>
.flex {
    display: flex;
}
</style>
