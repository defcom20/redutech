<script setup>
import { useLayout } from '@/layout/composables/layout';
import { ref, computed } from 'vue';
import AppConfig from '@/layout/AppConfig.vue';

import { useRouter } from 'vue-router';
const router = useRouter();

const { layoutConfig } = useLayout();
const email = ref('');
const password = ref('');
const checked = ref(false);

const logoUrl = computed(() => {
    return `/layout/images/${layoutConfig.darkTheme.value ? 'redutech-logo' : 'redutech-logo'}.png`;
});

const onDashboard = () => {
    if (email.value == 'admin') {
        router.push('/dashboard');
    }
    if (email.value == 'usuario') {
        router.push('/panel');
    }
};

</script>

<template>
    <div
        class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <!-- <img :src="logoUrl" alt="Sakai logo" class="mb-5 w-8rem flex-shrink-0" /> -->
            <div
                style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card px-2 sm:px-4" style="border-radius: 53px">
                    <div class="text-center mb-5">
                        <img src="/layout/images/redutech-logo1.png" alt="Image" height="100" class="mb-3" />
                        <div class="text-900 text-3xl font-medium mb-3">ACCESO DE ENTRADA</div>
                        <!-- <span class="text-600 font-medium">Sign in to continue</span> -->
                    </div>

                    <div>
                        <label for="email1" class="block text-900 text-xl font-medium mb-2">Usuario</label>
                        <InputText id="email1" type="text" placeholder="Ingrese Usuario" class="w-full md:w-30rem mb-5"
                            style="padding: 1rem" v-model="email" />

                        <label for="password1" class="block text-900 font-medium text-xl mb-2">Contraseña</label>
                        <Password @keyup.enter="onDashboard" id="password1" v-model="password"
                            placeholder="Ingrese Contraseña" weakLabel="Débil" mediumLabel="Medio" strongLabel="Fuerte"
                            :toggleMask="true" class="w-full mb-3" inputClass="w-full"
                            :inputStyle="{ padding: '1rem' }"></Password>

                        <!-- <div class="flex align-items-center justify-content-between mb-5 gap-5">
                            <div class="flex align-items-center">
                                <Checkbox v-model="checked" id="rememberme1" binary class="mr-2"></Checkbox>
                                <label for="rememberme1">Remember me</label>
                            </div>
                            <a class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)">Forgot password?</a>
                        </div> -->
                        <Button @click="onDashboard()" label="Iniciar Sesión" class="w-full p-3 text-xl"></Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <AppConfig simple />
</template>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>
