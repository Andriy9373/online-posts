<template>
    <div class="modal fade show" :style="{display: showPopup ? 'block' : 'none'}">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h6 class="modal-title">
                        <slot name="header"></slot>
                    </h6>
                    <p class="delete" @click="closePopup">&times;</p>
                </div>
                <div class="modal-body">
                    <slot name="body"></slot>
                </div>
                <div class="modal-footer">
                    <slot name="footer"></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PopupVue',
    props: {
        showPopup: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        closePopup() {
            this.$emit('close')
        }
    }
}
</script>

<style lang="scss" scoped>
p {
    margin-bottom: 0;
}

.modal {
    backdrop-filter: blur(2px);
    user-select: none;

    &-header {
        color: #000000;
        background-color: #f7f7f7;

        .delete {
            cursor: pointer;
        }
    }

    &-footer {
        border-top: none;
    }
}
</style>