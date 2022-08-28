<template>
    <nav class="d-flex justify-content-center navbar navbar-light bg-light header">
        <form class="form-inline">
            <button
                type="button"
                :class="[ 'btn btn-outline', { active: $route.name === 'posts' } ]"
                @click="route1"
            >
                Posts
            </button>
            <button
                type="button"
                :class="[ 'btn btn-outline', { active: $route.name === 'create-post' } ]"
                @click="route2"
            >
                Create Post
            </button>
        </form>
    </nav>
</template>

<script>
export default {
    name: 'HeaderVue',
    methods: {
        route1() {
            if (this.$route.name !== 'posts') this.$router.push({name: 'posts'});
        },
        route2() {
            if (this.$route.name !== 'create-post') this.$router.push({name: 'create-post'});
        }
    }
}
</script>

<style lang="scss" scoped>
.header {
    position: fixed;
    top: 0;
    width:100%;
    z-index: 1000;

    .form-inline {
        display: flex;
        gap: 20px;

        .btn-outline {
            background-color: #000000;
            color: #ffffff;

            &:hover {
                background-color: #f7f7f7;
                color: #000000;
                border: 1px solid #000000;
            }

            &.active {
                background-color: #f7f7f7;
                color: #000000;
            }
        }
    }
}
</style>