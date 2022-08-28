<template>
    <div>
        <CustomAlert/>
        <form class="form">
            <div class="form-group">
                <input v-model="title" type="text" class="form-control" :placeholder="`${labels.title}...`">
            </div>
            <div class="form-group">
                <textarea v-model="content" type="text" class="form-control" :placeholder="`${labels.content}...`"></textarea>
            </div>
            <div class="form-group">
                <input v-model="author" type="text" class="form-control" :placeholder="`${labels.author}...`">
            </div>
            <button type="submit" class="btn btn-dark" @click="create">{{ labels.create_post }}</button>
        </form>
    </div>
</template>

<script>
import CustomAlert from '@/components/CustomAlert';
import { mapActions } from 'vuex';

export default {
    name: 'CreatePost',
    components: {
        CustomAlert
    },
    data() {
        return {
            labels: {
                title: 'title',
                content: 'content',
                author: 'author',
                create_post: 'Create post'
            },
            title: '',
            content: '',
            author: '',
        }
    },
    methods: {
        ...mapActions(['createPost', 'ADD_ALERT']),
        create(event) {
            if (this.title &&
                this.content &&
                this.author
            ) {
                this.createPost({
                    title: this.title,
                    content: this.content,
                    author: this.author
                })
                this.title = '';
                this.content = '';
                this.author = '';
                this.ADD_ALERT({
                    type: 'success',
                    message: 'Post was successfully added!'
                })
            }
            else {
                this.ADD_ALERT({
                    type: 'danger',
                    message: 'Incorrect data!'
                })
            }
            event.preventDefault();
        }
    }
}
</script>

<style lang="scss" scoped>
@import "bootstrap/dist/css/bootstrap.min.css";
@import "bootstrap";
.form {
    max-width: 800px;
    margin: 100px auto;

    .form-control {
        margin: 15px 0;
    }

    .btn {
        display: block;
        margin: 0 auto;
    }
}

@media only screen and (max-width: 850px){
    .form {
        margin: 100px 30px;
    }
}
</style>