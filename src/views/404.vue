<template>
    <div class="d-flex align-items-center justify-content-center vh-100">
        <div class="text-center">
            <h1 class="display-1 fw-bold">{{labels[404] }}</h1>
            <p class="fs-3"> <span class="text-danger">{{ labels.opps }}</span> {{ labels.page_not_found }}</p>
            <p class="lead">
                {{ labels.page_doesnt_exist }}
              </p>
            <router-link :to="{name: 'posts'}" class="btn btn-dark">{{ labels.posts }}</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: '404Vue',
    data() {
        return {
            labels: {
                '404': '404',
                opps: 'Opps!',
                page_not_found: 'Page not found.',
                page_doesnt_exist: 'The page you’re looking for doesn’t exist.',
                posts: 'Posts'
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import "bootstrap/dist/css/bootstrap.min.css";
@import "bootstrap";
@import "@/styles/mixins.scss";

.btn-dark {
    @include button(#000000);
}

</style>