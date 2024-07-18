<script setup lang="ts">
import { ref } from 'vue';
import { administrator_customer_registration } from '../../../services/Customers';
import { useToast, POSITION } from 'vue-toastification';

const toast = useToast();

const user = ref({
  names: '',
  surnames: '',
  email: '',
  password: '',
  profil: '',
  phone: '',
});



let token = localStorage.getItem('token')

console.log(token)

const handleCreateUser = async () => {

if (!errors.value.email && !errors.value.password) {
  let data = {
  names: user.value.names, // Acceso correcto a los valores reactivos
  surnames: user.value.surnames,
  email: user.value.email,
  password: user.value.password,
  profil: user.value.profil,
  phone: user.value.phone,
};



  try {
    const response: any = await administrator_customer_registration(data, token);
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

      localStorage.setItem('token', response.data.token)
    }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || 'An unexpected error occurred';
    toast.warning(errorMessage, {
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
} else {
  toast.warning('Los campos no estas validados', {
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
};

const errors = ref({
  names: '',
  surnames: '',
  email: '',
  password: '',
  profil: '',
  phone: '',
});

const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

const handleSubmit = () => {
  // Reset errors
  errors.value = {
    names: '',
    surnames: '',
    email: '',
    password: '',
    profil: '',
    phone: '',
  };

  let valid = true;

  if (!user.value.names) {
    errors.value.names = 'Nombres es requerido';
    valid = false;
  }

  if (!user.value.surnames) {
    errors.value.surnames = 'Apellidos es requerido';
    valid = false;
  }

  if (!user.value.email) {
    errors.value.email = 'Email es requerido';
    valid = false;
  } else if (!validateEmail(user.value.email)) {
    errors.value.email = 'Email no es válido';
    valid = false;
  }

  if (!user.value.password) {
    errors.value.password = 'Contraseña es requerida';
    valid = false;
  }

  if (!user.value.profil) {
    errors.value.profil = 'Perfil es requerido';
    valid = false;
  }

  if (!user.value.phone) {
    errors.value.phone = 'Teléfono es requerido';
    valid = false;
  }

  if (valid) {
    // Lógica para enviar el formulario
    console.log('Formulario válido:', user.value);
  }
}
</script>

<template>
  <form class="grid grid-cols-12 gap-4" @submit.prevent="handleCreateUser">
    <div class="col-span-4">
      <label class="block pr-4 mb-2 font-normal" for="inline-full-name">Nombres</label>
      <input 
        class="block w-full px-4 py-2 leading-tight border-2 rounded appearance-none border-secondary-900 bg-secondary-900 focus:outline-none focus:border-primary" 
        v-model="user.names" 
        placeholder="Nombre" 
        type="text"
      >
      <span class="text-red-500">{{ errors.names }}</span>
    </div>
    <div class="col-span-4">
      <label class="block pr-4 mb-2 font-normal" for="inline-full-name">Apellidos</label>
      <input 
        class="block w-full px-4 py-2 leading-tight border-2 rounded appearance-none border-secondary-100 bg-secondary-900 focus:outline-none focus:border-primary" 
        v-model="user.surnames" 
        placeholder="Apellidos" 
        type="text"
      >
      <span class="text-red-500">{{ errors.surnames }}</span>
    </div>
    <div class="col-span-4">
      <label class="block pr-4 mb-2 font-normal" for="inline-full-name">Email</label>
      <input 
        class="block w-full px-4 py-2 leading-tight border-2 rounded appearance-none border-secondary-100 bg-secondary-900 focus:outline-none focus:border-primary" 
        v-model="user.email" 
        placeholder="Email" 
        type="text"
      >
      <span class="text-red-500">{{ errors.email }}</span>
    </div>
    <div class="col-span-4">
      <label class="block pr-4 mb-2 font-normal" for="inline-full-name">Contraseña</label>
      <input 
        class="block w-full px-4 py-2 leading-tight border-2 rounded appearance-none border-secondary-100 bg-secondary-900 focus:outline-none focus:border-primary" 
        v-model="user.password" 
        placeholder="Contraseña" 
        type="password"
      >
      <span class="text-red-500">{{ errors.password }}</span>
    </div>
    <div class="col-span-4">
      <label class="block pr-4 mb-2 font-normal" for="inline-full-name">Perfil</label>
      <input 
        class="block w-full px-4 py-2 leading-tight border-2 rounded appearance-none border-secondary-100 bg-secondary-900 focus:outline-none focus:border-primary" 
        v-model="user.profil" 
        placeholder="Perfil" 
        type="text"
      >
      <span class="text-red-500">{{ errors.profil }}</span>
    </div>
    <div class="col-span-4">
      <label class="block pr-4 mb-2 font-normal" for="inline-full-name">Teléfono</label>
      <input 
        class="block w-full px-4 py-2 leading-tight border-2 rounded appearance-none border-secondary-100 bg-secondary-900 focus:outline-none focus:border-primary" 
        v-model="user.phone" 
        placeholder="Teléfono" 
        type="text"
      >
      <span class="text-red-500">{{ errors.phone }}</span>
    </div>
    <div class="flex justify-center col-span-12">
      <button class="px-4 py-2 rounded shadow text-secondary-900 bg-primary focus:shadow-outline focus:outline-none" type="submit">
        Crear usuario
      </button>
    </div>
  </form>
</template>

<style scoped>
/* Estilos del componente */
</style>
