<template>
    <Popup :show-popup="showPopup" @close="showPopup = false">
        <template v-slot:header>
            {{ labels.warning }}
        </template>
        <template v-slot:body>
            {{ labels.are_you_sure_you_want_to_delete_this_post }}
        </template>
        <template v-slot:footer>
            <button type="button" class="btn btn-dark" @click="showPopup = false">{{ labels.cancel }}</button>
            <button type="button" class="btn btn-danger" @click="deleteCurrentPost">{{ labels.delete }}</button>
        </template>

    </Popup>
    <div class="block" v-if="loaded">
        <div v-if="posts.length" class="block__wrapper">
            <div
                class="card"
                v-for="(item, index) in posts"
                :key="index"
            >
                <div class="d-flex justify-content-between card-header">
                    <p>{{ item.title }}</p>
                    <p class="delete" @click="deleteMe(item._id, item.image)">&times;</p>
                </div>
                <div class="card-body" @click="openPost(item._id)">
                    <img class="card-text image" :src="`../../files/${item.image}`"/>
                    <p class="card-text content">{{ item.content }}</p>
                    <p class="card-text author">{{ labels.author }}: {{ item.author }}</p>
                    <p class="card-text date">{{ labels.created_at }}: {{ item.createdAt }}</p>
                </div>
            </div>
        </div>
        <div v-else class="d-flex align-items-center justify-content-center vh-100">
            <div class="text-center">
                <h1 class="display-1 fw-bold">{{ labels.no_posts }}</h1>
                <p class="fs-3"> <span class="text-danger">{{ labels.opps }}</span> {{ labels.here_are_no_posts }}</p>
                <p class="lead">
                    {{ labels.you_can_create_post_below }}
                </p>
                <router-link :to="{name: 'create-post'}" class="btn btn-dark">{{ labels.create_post }}</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import Popup from '@/components/Popup';
import { mapActions } from 'vuex';

export default {
    name: 'PostsList',
    components: {
        Popup
    },
    data() {
        return {
            deleteForm: {
                id: '',
                imageName: ''
            },
            showPopup: false,
            loaded: false,
            posts: null,
            labels: {
                warning: 'Warning!',
                are_you_sure_you_want_to_delete_this_post: 'Are you sure you want to delete this post?',
                post_was_successfully_deleted: 'Post was successfully deleted!',
                cancel: 'Cancel',
                delete: 'Delete',
                author: 'Author',
                created_at: 'Created at',
                no_posts: 'No Posts!',
                opps: 'Opps!',
                here_are_no_posts: 'Here are no posts.',
                you_can_create_post_below: 'You can create a post below.',
                create_post: 'Create post'
            }
        }
    },
    methods: {
        ...mapActions(['getPosts', 'deletePost', 'ADD_ALERT']),
        loadPosts() {
            this.getPosts()
                .then(posts => this.posts = posts)
                .then(() => this.loaded = true)
                .catch(error => console.log(error))
        },
        deleteMe(id, imageName) {
            this.deleteForm.id = id;
            this.deleteForm.imageName = imageName;
            this.showPopup = true;
        },
        deleteCurrentPost() {
            this.deletePost(this.deleteForm);
            this.loadPosts();
            this.showPopup = false;
            this.ADD_ALERT({
                type: 'success',
                message: this.labels.post_was_successfully_deleted
            })
        },
        openPost(id) {
            this.$router.push({name: 'post', params: {id}});
        }
    },
    created() {
        this.loadPosts();
    }
}
</script>

<style lang="scss" scoped>
@import "bootstrap/dist/css/bootstrap.min.css";
@import "bootstrap";
@import "@/styles/mixins.scss";

p {
    margin-bottom: 0;
}

.btn-dark {
    @include button(#000000);
}

.btn-danger {
    @include button(#dc3545);
}

%hidden {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.block {

    &__wrapper {
        margin: 100px 0;
    }

    .card {
        max-width: 800px;
        margin: 0 auto;
        margin-bottom: 30px;
        user-select: none;

        &-header > p, &-body > p {
            max-width: 90%;
            @extend %hidden;
        }

        .delete, &-body {
            cursor: pointer;
        }

        .image {
            position: relative;
            top: -14px;
            left: -6px;
            height: 50px;
            width: 50px;
            border-radius: 50%;
            object-fit: cover;
            object-position: center;
        }

        .content {
            margin-bottom: 10px;
            display: inline-block;
            margin-left: 10px;
        }

        .author {
            position: absolute;
            left: 3px;
            bottom: 0;
            max-width: calc(100% - 200px);
            @extend %hidden;
        }

        .date {
            position: absolute;
            right: 3px;
            bottom: 0;
        }
    }

    .text-center {

        .fs-3, .lead {
            margin-bottom: 1rem;
        }  
    }
}

@media only screen and (max-width: 850px){
    .block {
        margin: 100px 30px;
    }
}

@media only screen and (max-width: 710px){
    .card {
        &-header > p, &-body > p {
            max-width: 70% !important;
        }

        .author {
            max-width: 40% !important;
        }
    }
}

@media only screen and (max-width: 375px){
    .card {
        &-header > p, &-body > p {
            max-width: 50% !important;
        }
    }
}
</style>