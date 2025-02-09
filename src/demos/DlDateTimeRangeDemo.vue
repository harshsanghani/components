<template>
    <div class="dl-dtr">
        <div class="dl-dtr--options">
            <span class="dl-dtr--options_title">General Configuration</span>
            <div class="dl-dtr--option">
                <span class="dl-dtr--option_title">Show time:</span>
                <dl-switch
                    v-model="switchState"
                    value="showTime"
                    left-label="No"
                    right-label="Yes"
                    class="dl-dtr--option_switch"
                />
            </div>
            <div class="dl-dtr--option">
                <span class="dl-dtr--option_title">Type:</span>
                <dl-switch
                    v-model="switchState"
                    value="type"
                    left-label="Day"
                    right-label="Month"
                    class="dl-dtr--option_switch"
                />
            </div>
            <div class="dl-dtr--option">
                <span class="dl-dtr--option_title">Mode:</span>
                <dl-switch
                    v-model="switchState"
                    value="mode"
                    left-label="Single"
                    right-label="Multi"
                    class="dl-dtr--option_switch"
                />
            </div>
            <div
                style="margin-top: 10px"
                class="dl-dtr--option__range"
            >
                <span class="dl-dtr--option_title">Available Range: </span>
                <dl-switch
                    v-model="switchState"
                    value="range"
                    class="dl-dtr--option_switch"
                    @input="handleRange"
                />
                <span class="dl-dtr--option_title">Auto Close: </span>
                <dl-switch
                    v-model="switchState"
                    value="auto-close"
                    class="dl-dtr--option_switch"
                />
                <br>
                <span>From</span>
                <input
                    type="date"
                    :disabled="!range"
                    :value="availableRangeFrom"
                    class="dl-dtr--range-input"
                    placeholder="from"
                    @input="setRangeFrom"
                >
                <span style="margin-left: 5px">To</span>
                <input
                    :disabled="!range"
                    type="date"
                    :value="availableRangeTo"
                    class="dl-dtr--range-input"
                    placeholder="to"
                    @input="setRangeTo"
                >
            </div>
        </div>
        <div class="dl-dtr--input">
            <dl-date-time-range
                v-model="date"
                :type="type"
                :available-range="range ? availableRange : null"
                :mode="mode"
                :show-time="showTime"
                :auto-close="autoClose"
                @set-type="handleSetType"
                @change="handleModelValueUpdate"
            />
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue-demi'
import { DlSwitch, DlDateTimeRange } from '../components'
import { DateInterval } from '../components/types'

export default defineComponent({
    components: {
        DlSwitch,
        DlDateTimeRange
    },
    data(): {
        date: DateInterval
        switchState: any[]
        availableRange: Partial<DateInterval>
    } {
        const from = new Date()
        from.setDate(from.getDate() - 35)
        const to = new Date()
        to.setDate(to.getDate() + 35)

        return {
            date: null,
            availableRange: {
                from,
                to
            },
            switchState: ['range']
        }
    },
    computed: {
        type(): string {
            return this.switchState.includes('type') ? 'month' : 'day'
        },
        mode(): string {
            return this.switchState.includes('mode') ? 'multi' : 'single'
        },
        showTime(): boolean {
            return this.switchState.includes('showTime')
        },
        range(): boolean {
            return this.switchState.includes('range')
        },
        availableRangeFrom(): string {
            return this.availableRange?.from?.toISOString().split('T')[0] ?? ''
        },
        availableRangeTo(): string {
            return this.availableRange?.to?.toISOString().split('T')[0] ?? ''
        },
        autoClose(): boolean {
            return this.switchState.includes('auto-close')
        }
    },
    methods: {
        handleModelValueUpdate(value: DateInterval) {
            console.log('Date: ', value)
        },
        handleSetType(value: string) {
            if (value === 'day') {
                const typeIndex = this.switchState.findIndex(
                    (t) => t === 'type'
                )
                if (typeIndex > -1) {
                    this.switchState.splice(typeIndex, 1)
                }
            } else {
                this.switchState.push('type')
            }
        },
        setRangeFrom({ target }: { target: HTMLInputElement }) {
            this.availableRange = {
                from: target.value ? new Date(target.value) : null,
                to: this.availableRange?.to
            }
        },
        setRangeTo({ target }: { target: HTMLInputElement }) {
            this.availableRange = {
                to: target.value ? new Date(target.value) : null,
                from: this.availableRange?.from
            }
        },
        handleRange({ target }: { target: HTMLInputElement }) {
            if (!target.checked) this.availableRange = null
        }
    }
})
</script>
<style lang="scss" scoped>
.dl-dtr {
    display: flex;
    justify-content: center;
    padding-top: 30px;

    &--range-input {
        height: 18px;
        padding: 5px;
        color: darkgray;
        margin-top: 10px;
        margin-left: 5px;
    }

    &--options {
        color: var(--dl-color-darker);
        display: flex;
        flex-direction: column;
        padding: 0 30px 0 0;
        text-align: left;

        &_title {
            font-size: 20px;
        }
    }

    &--option {
        padding: 8px;

        &__range {
            font-size: 12px;
        }
    }

    &--option_title {
        font-size: 14px;
    }

    &--option_switch {
        font-size: 12px;
    }

    &--input {
        display: flex;
        justify-content: center;
    }
}
</style>
