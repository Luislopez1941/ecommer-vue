<script setup lang="ts">
import { ref } from 'vue';
import { login } from '../services/Administrator';
import { useRouter, useRoute } from 'vue-router'
import { useToast, POSITION } from 'vue-toastification';
import { useAuthStore } from '../stores/store'; // Importar la tienda
import { onMounted } from 'vue';

const authStore = useAuthStore();

onMounted(() => {

  

  console.log(authStore.loggedIn); // Accede directamente al estado loggedIn
});

const toast = useToast();
const router = useRouter();
const route = useRoute();



const user = ref({
  email: '',
  password: ''
});

const errors = ref({
  email: '',
  password: ''
});

const validateEmail = () => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  errors.value.email = emailPattern.test(user.value.email) ? '' : 'Correo electrónico inválido';
};

const handleSubmit = async () => {

  if (!errors.value.email && !errors.value.password) {
    let data = {
      email: user.value.email,
      password: user.value.password
    };

    try {
      const response: any = await login(data);
      if (response.data.status == 'warning') {
        toast.warning(response.data.message, {
          timeout: 2000,
          position: POSITION.TOP_RIGHT,
          pauseOnFocusLoss: true,
          pauseOnHover: true,
          draggable: true,
          draggablePercent: 0.6,
          showCloseButtonOnHover: false,
          hideProgressBar: true,
          closeButton: "button",
          icon: true,
        });
      }
      if (response.data.status == 'success') {
        toast.success(response.data.message, {
          timeout: 2000,
          position: POSITION.TOP_RIGHT,
          pauseOnFocusLoss: true,
          pauseOnHover: true,
          draggable: true,
          draggablePercent: 0.6,
          showCloseButtonOnHover: false,
          hideProgressBar: true,
          closeButton: "button", 
          icon: true,
        });
        // Actualizar el estado de autenticación en Pinia
        authStore.changeState(true);
        localStorage.setItem('token', response.data.token)
  
        router.push('/root');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  } else {
    console.log('Errores de validación', errors.value);
  }
};
</script>


<template>
    <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-secondary-100 p-8 rounded-xl shadow-2xl w-auto lg:w-[450px]">
          <h1 className="text-3xl text-center uppercase font-bold tracking-[5px] text-white mb-8">
            Iniciar <span className="text-primary">sesión</span>
          </h1>
          <form className="mb-8" @submit.prevent="handleSubmit">
            <button className="flex items-center justify-center py-3 px-4 gap-4 bg-secondary-900 w-full rounded-full mb-8 text-gray-100">
              <img
                src="https://rotulosmatesanz.com/wp-content/uploads/2017/09/2000px-Google_G_Logo.svg_.png"
                className="w-4 h-4"
              />
              Ingresa con google
            </button>
            <div className="relative mb-4">
              <RiMailLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
              <input
                type="email"
                v-model="user.email" @input="validateEmail"
                className="py-3 pl-8 pr-4 bg-secondary-900 w-full outline-none rounded-lg"
                placeholder="Correo electrónico"
              />
              <span v-if="errors.email">{{ errors.email }}</span>
            </div>
            <div className="relative mb-8">
              <RiLockLine className="absolute top-1/2 -translate-y-1/2 left-2 text-primary" />
              <input
                v-model="user.password"
                type='text'
                className="py-3 px-8 bg-secondary-900 w-full outline-none rounded-lg"
                placeholder="Contraseña"
              />
              <!-- {showPassword ? (
                <RiEyeOffLine
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer text-primary"
                />
              ) : (
                <RiEyeLine
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 -translate-y-1/2 right-2 hover:cursor-pointer text-primary"
                />
              )} -->
            </div>
            <div>
              <button
                type="submit"
                className="bg-primary text-black uppercase font-bold text-sm w-full py-3 px-4 rounded-lg"
              >
                Ingresar
              </button>
            </div>
          </form>
          <div className="flex flex-col items-center gap-4">
            <Link
              to="/olvide-password"
              className="hover:text-primary transition-colors"
            >
              ¿Olvidaste tu contraseña?
            </Link>
            <span className="flex items-center gap-2">
              ¿No tienes cuenta?{" "}
              <Link
                to="/registro"
                className="text-primary hover:text-gray-100 transition-colors"
              >
                Registrate
              </Link>
            </span>
          </div>
        </div>
      </div>
    
</template>

<style scoped>
  /* Estilos del componente */
  </style>
  