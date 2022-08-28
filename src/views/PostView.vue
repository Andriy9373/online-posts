<template>
    <div class="card">
        <div class="d-flex justify-content-between card-header">
            <p>{{ post.title }}</p>
        </div>
        <div class="card-body">
            <p class="card-text text">{{ post.content }}</p>
            <p class="card-text author">{{ labels.author }}: {{ post.author }}</p>
            <p class="card-text date">{{ labels.created_at }}: {{ post.createdAt }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PostView',
    data() {
        return {
            labels: {
                author: 'Author',
                created_at: 'Created at'
            },
            post: {}
        }
    },
    methods: {
        loadPost() {
            this.$store.dispatch('getSinglePost', {id: this.$route.params.id})
                .then(res => this.post = res)
                .catch(error => console.log(error))
        }
    },
    mounted() {
        this.loadPost();
    }
}
</script>

<style lang="scss" scoped>
@import "bootstrap/dist/css/bootstrap.min.css";
@import "bootstrap";

p {
    margin-bottom: 0;
}

.card {
    max-width: 800px;
    margin-bottom: 30px;
    margin: 100px auto;

    &-header {
        word-break: break-all;
    }

    .text {
        margin-bottom: 20px;
    }

    .author {
        position: absolute;
        left: 3px;
        bottom: 0;
        max-width: 70%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .date {
        position: absolute;
        right: 3px;
        bottom: 0;
    }
}

@media only screen and (max-width: 850px){
    .card {
        margin: 100px 30px;
    }
}
</style>