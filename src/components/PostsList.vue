<template>
    <div>PostsList</div>
    {{ posts }}
</template>

<script>
export default {
    name: 'PostsList',
    data() {
        return {
            posts: null
        }
    },
    methods: {
        loadPosts() {
            this.$store.dispatch('getPosts')
                .then(posts => this.posts = posts)
                .catch(error => console.log(error))
        }
    },
    mounted() {
        this.loadPosts();
    }
}
</script>

<style></style>