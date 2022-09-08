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
                post_was_successfully_added: 'Post was successfully added!',
                are_needed: 'are needed',
                is_needed: 'is needed',
                file_must_be_one_of_these_extensions: 'File must be one of these extensions',
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
            const extensions = ['png', 'jpg', 'jpeg', 'svg', 'gif'];

            let formData = new FormData();

            let file_extension = null;
            if (this.form.file) {
                const splited_file = this.form.file.name.split('.');
                file_extension = splited_file[splited_file.length - 1];
            }

            if (this.form.title &&
                this.form.content &&
                this.form.author &&
                (extensions.includes(file_extension) || file_extension === null)
            ) {
                formData.append('title', this.form.title);
                formData.append('content', this.form.content);
                formData.append('author', this.form.author);
                formData.append('file', this.form.file);
                this.createPost(formData)
                this.form.title = '';
                this.form.content = '';
                this.form.author = '';
                this.form.file = '';
                this.$refs.fileUpload.value=null;
                this.ADD_ALERT({
                    type: 'success',
                    message: this.labels.post_was_successfully_added
                })
            }
            else {
                let needed = [];
                const form = JSON.parse(JSON.stringify(this.form));
                Object.entries(form).forEach(([key, value]) => {
                    if (key !== 'file' && value === '') needed.push(key);
                });
                if (needed.length) {
                    let isPlural = null;
                    needed.length > 1 ? isPlural = true : isPlural = false;
                    this.ADD_ALERT({
                        type: 'danger',
                        message: `${needed.join(", ")} ${isPlural ? this.labels.are_needed : this.labels.is_needed}`
                    })
                }
                else {
                    this.ADD_ALERT({
                        type: 'danger',
                        message: `${this.labels.file_must_be_one_of_these_extensions}: ${extensions.join(", ")}`
                    })
                }
            }
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