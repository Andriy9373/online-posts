<template>
    <div>
        <form class="form">
            <div class="form-group">
                <input v-model="form.title" type="text" class="form-control" :placeholder="`${labels.title}...`">
            </div>
            <div class="form-group">
                <textarea v-model="form.content" type="text" class="form-control" :placeholder="`${labels.content}...`"></textarea>
            </div>
            <div class="form-group">
                <input v-model="form.author" type="text" class="form-control" :placeholder="`${labels.author}...`">
            </div>
            <div class="form-group">
                <input class="form-control" type="file" ref="fileUpload" @input="handleFile"/>
            </div>
            <button type="submit" class="btn btn-dark" @click="create">{{ labels.create_post }}</button>
        </form>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'CreatePost',
    data() {
        return {
            labels: {
                title: 'title',
                content: 'content',
                author: 'author',
                create_post: 'Create post',
                are_needed: 'are needed',
                is_needed: 'is needed',
                incorrect_file_format: 'Incorrect file format',
            },
            form: {
                title: '',
                content: '',
                author: '',
                file: ''
            }
        }
    },
    methods: {
        ...mapActions(['createPost', 'ADD_ALERT']),
        create(event) {
            let formData = new FormData();
            formData.append('title', this.form.title);
            formData.append('content', this.form.content);
            formData.append('author', this.form.author);
            formData.append('file', this.form.file);

            this.createPost(formData)
                .then( res => {
                    if ( res.success ) {
                        this.ADD_ALERT({
                            type: 'success',
                            message: res.message
                        })
                        this.form.title = '';
                        this.form.content = '';
                        this.form.author = '';
                        this.form.file = '';
                        this.$refs.fileUpload.value=null;
                    } 
                    else {
                        if (res.errors.length) {
                            let isPlural = null;
                            res.errors.length > 1 ? isPlural = true : isPlural = false;
                            this.ADD_ALERT({
                                type: 'danger',
                                message: res.errors[0] === 'incorrect_file_format' ?
                                this.labels[res.errors[0]] :
                                `${res.errors.join(", ")} ${isPlural ?
                                this.labels.are_needed : this.labels.is_needed}`
                            })
                        }
                    }
                } )
                .catch( err => console.error( err ) );

            event.preventDefault();
        },
        handleFile(e) {
            this.form.file = e.target.files[0];
        }
    }
}
</script>

<style lang="scss" scoped>
@import "bootstrap/dist/css/bootstrap.min.css";
@import "bootstrap";
@import "@/styles/mixins.scss";

.form {
    max-width: 800px;
    margin: 100px auto;

    .form-control {
        margin: 15px 0;
    }
}

.btn-dark {
    display: block;
    margin: 0 auto;
    @include button(#000000);
}

@media only screen and (max-width: 850px){
    .form {
        margin: 100px 30px;
    }
}
</style>