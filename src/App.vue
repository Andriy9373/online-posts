<template>
    <Header/>
    <CustomAlert/>
    <router-view/>
    <Footer/>
</template>

<script>
import Header from '@/components/Header';
import CustomAlert from '@/components/CustomAlert';
import Footer from '@/components/Footer';

export default {
    name: 'App',
    components: {
        Header,
        CustomAlert,
        Footer,
    }
}
</script>

<style leng="scss" scoped></style>