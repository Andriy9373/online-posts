<template>
    <div class="post-view">
        <PostsList/>
    </div>
</template>

<script>
import PostsList from '@/components/PostsList';

export default {
    name: 'PostsView',
    components: {
        PostsList
    }
}
</script>

<style lang="scss" scoped></style>