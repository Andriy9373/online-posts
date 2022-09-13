<template>
    <div class="block">
        <div
            class="card"
            v-for="(item, index) in posts"
            :key="index"
        >
            <div class="d-flex justify-content-between card-header">
                <p>{{ item.title }}</p>
                <p class="delete" @click="deleteMe($event, item._id)">&times;</p>
            </div>
            <div class="card-body" @click="openPost(item._id)">
                <p class="card-text content">{{ item.content }}</p>
                <p class="card-text author">{{ labels.author }}: {{ item.author }}</p>
                <p class="card-text date">{{ labels.created_at }}: {{ item.createdAt }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'PostsList',
    data() {
        return {
            posts: null,
            labels: {
                author: 'Author',
                created_at: 'Created at'
            }
        }
    },
    methods: {
        ...mapActions(['getPosts', 'deletePost']),
        loadPosts() {
            this.getPosts()
                .then(posts => this.posts = posts)
                .catch(error => console.log(error))
        },
        deleteMe(event, id) {
            this.deletePost(id);
            this.loadPosts();
            event.stopPropagation();
        },
        openPost(id) {
            this.$router.push({name: 'post', params: {id}});
        },
        calculateDate(date) {
            const sth = new Date(date)
            console.log(sth.getFullYear(), sth.getMonth(), sth.getDate())
        }
    },
    mounted() {
        this.loadPosts();
    }
}
</script>

<style lang="scss" scoped>
@import "bootstrap/dist/css/bootstrap.min.css";
@import "bootstrap";

p {
    margin-bottom: 0;
}

%hidden {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.block {
    margin: 100px 0;
    .card {
        max-width: 800px;
        margin: 0 auto;
        margin-bottom: 30px;

        &-header > p, &-body > p {
            max-width: 95%;
            @extend %hidden;
        }

        .delete, &-body {
            cursor: pointer;
        }

        .content {
            margin-bottom: 20px;
        }

        .author {
            position: absolute;
            left: 3px;
            bottom: 0;
            max-width: calc(100% - 200px);;
            @extend %hidden;
        }

        .date {
            position: absolute;
            right: 3px;
            bottom: 0;
        }
    }
}
</style>