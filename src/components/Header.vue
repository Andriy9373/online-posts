<template>
    <nav class="d-flex justify-content-center navbar navbar-light bg-light header">
        <form class="form-inline">
            <button
                type="button"
                :class="[ 'btn btn-dark', { active: $route.name === 'posts' } ]"
                @click="posts_route"
            >
                {{ labels.posts }}
            </button>
            <button
                type="button"
                :class="[ 'btn btn-dark', { active: $route.name === 'create-post' } ]"
                @click="create_post_route"
            >
                {{ labels.create_post }}
            </button>
        </form>
    </nav>
</template>

<script>
export default {
    name: 'HeaderVue',
    data() {
        return {
            labels: {
                posts: 'Posts',
                create_post: 'Create post'
            }
        }
    },
    methods: {
        posts_route() {
            if (this.$route.name !== 'posts') this.$router.push({name: 'posts'});
        },
        create_post_route() {
            if (this.$route.name !== 'create-post') this.$router.push({name: 'create-post'});
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/styles/mixins.scss";

.header {
    position: fixed;
    top: 0;
    width:100%;
    z-index: 1000;

    .form-inline {
        display: flex;
        gap: 20px;
    }
}

.btn-dark, .btn-dark.active {
    @include button(#000000);
}
</style>