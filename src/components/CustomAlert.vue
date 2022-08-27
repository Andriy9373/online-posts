<template>
    <div class="alert-content">
        <div v-for="(item, index) in alerts" :key="index" :class="`alert alert-${item.type}`">
            <p>{{ item.message }}</p>
            <p class="close" @click="closeAlert(item.id)">&times;</p>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    name: 'CustomAlert',
    computed: {
        ...mapState({
            alerts: 'alerts'
        })
    },
    methods: {
        ...mapActions({
            REMOVE_ALERT: 'REMOVE_ALERT'
        }),
        closeAlert(value) {
            this.REMOVE_ALERT(value);
        }
    },
}
</script>

<style lang="scss" scoped>

p {
    margin-bottom: 0;
}

.alert-content {
    position: fixed;
    z-index: 99999999;
    top: 30px;
    right: 30px;
    width: 300px;

    .alert {
        display: flex;
        justify-content: space-between;
        word-break: break-word;

        .close {
            cursor: pointer;
        }
    }
}
</style>