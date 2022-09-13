<template>
    <div v-if="loaded">
        <div class="post" v-if="post">
            <img class="image" :src="`../../files/${post.image}`"/>
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
        </div>
        <NotFound v-else/>
    </div>
</template>

<script>
import NotFound from '@/views/404.vue';

export default {
    name: 'PostView',
    components: { NotFound },
    data() {
        return {
            labels: {
                author: 'Author',
                created_at: 'Created at'
            },
            post: null,
            loaded: false,
        }
    },
    methods: {
        loadPost() {
            this.$store.dispatch('getSinglePost', {id: this.$route.params.id})
                .then(post => this.post = post)
                .then(() => this.loaded = true)
                .catch(error => console.log(error))
        }
    },
    created() {
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

.post {
    margin: 69px 0;

    .image {
        display: block;
        margin: 0 auto;
        margin-bottom: 15px;
        height: 100px;
        width: 100px;
        border-radius: 100%;
        border: 5px solid #d2d2d2;
        object-fit: cover;
        object-position: center;
    }

    .card {
        max-width: 800px;
        margin: 0 auto;

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
}

@media only screen and (max-width: 850px){
    .post {
        margin-left: 30px;
        margin-right: 30px;
    }
}

@media only screen and (max-width: 600px){
    .card-text {
        &.author, &.date {
            position: static !important;
        }

        &.author {
            max-width: 100% !important;
        }
    }
}
</style>