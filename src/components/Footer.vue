<template>
    <nav class="d-flex justify-content-center navbar navbar-light bg-light footer">
        <a
            v-for="(item, index) in contacts"
            :key="index"
            :href="item.link"
            target="_blank"
            class="contacts"
        >
            <font-awesome-icon :icon="`fa-brands fa-${item.name.toLowerCase()}`" />
            <span>{{ item.name }}</span>
        </a>
    </nav>
</template>

<script>
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';

/* import specific icons */
import { faLinkedin, faTelegram, faGithub } from '@fortawesome/free-brands-svg-icons';

/* add icons to the library */
library.add(faLinkedin, faTelegram, faGithub);

export default {
    name: 'FooterVue',
    data() {
        return {
            contacts: []
        }
    },
    methods: {
        loadContacts() {
            this.$store.dispatch('getContacts')
                .then(contacts => this.contacts = contacts)
                .catch(error => console.log(error))
        }
    },
    mounted() {
        this.loadContacts();
    }
}
</script>

<style lang="scss" scoped>
.footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 54px;
    gap: 50px;
    z-index: 1000;

    .contacts {
        display: flex;
        align-items: center;
        gap: 8px;
        text-decoration: none;
        color: #000000;
        transition: .3s;

        &:hover {
            opacity: .6;
        }
    }
}

@media only screen and (max-width: 375px){
    .footer {
        gap: 10px;
    }
}
</style>