<script setup lang="ts">
import { list_customers } from '../../../services/Administrator';
import { ref, onMounted } from 'vue';
import Modal from './Modal.vue';

const administrators = ref<any>([]);
  const totalSections = ref(1);
  const totalCustomers = ref(1);
  const section = ref<any>(1)

const isModalVisible = ref(false);

const openModal = () => {
  isModalVisible.value = true;
};

const closeModal = () => {
  isModalVisible.value = false;
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && isModalVisible.value) {
    closeModal();
  }
};


 // Declaración de la variable para almacenar los administradores
 const type = ref(null);
 const filter = ref(null);

 const fetchData = async () => {
  let data = {
      type: type.value,
      filter: filter.value,
      section: section.value
  }

  try {
    const response: any = await list_customers(data, token);
    administrators.value = response.data.data
    totalCustomers.value = response.data.totalCustomers;
    totalSections.value = response.data.totalSections;
  } catch (error) {
    console.error('Error fetching administrators:', error);
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
  fetchData(); // Llamar a la función para obtener los datos


});

const names = ref();
const email = ref('');

let token = localStorage.getItem('token')

const filtered = async (type: any) => {
  let data = {
      type,
      filter: type == 'names' ? names.value : email.value,
      section:section.value

  }

  if(type == 'names') {
    const response: any = await list_customers(data, token);
    administrators.value = response.data.data
    totalCustomers.value = response.data.totalCustomers;
    totalSections.value = response.data.totalSections;
  } else if(type == 'email') {
    const response: any = await list_customers(data, token);
    administrators.value = response.data
  }

}

const changePage = async (pageNumber: number) => {
  section.value = pageNumber;
  let data = {
      type: type.value,
      names: filter.value,
      section: section.value

  }
  try {
    const response: any = await list_customers(data, token);
    administrators.value = response.data.data;
    totalCustomers.value = response.data.totalCustomers;
    totalSections.value = response.data.totalSections;
  } catch (error) {
    console.error('Error fetching customers:', error);
  }
};



</script>

<template>
  <div class="container p-10">
    <div class="grid justify-between grid-cols-12 gap-4">
      <div class="col-span-4">
        <label class="block pr-4 mb-2 font-normal" for="inline-full-name">
          Filtrar por nombre
        </label>
        <input class="block w-full px-4 py-2 leading-tight border-2 rounded appearance-none border-secondary-100 bg-secondary-100 focus:outline-none focus:border-primary" placeholder="Nombre" @keyup="filtered('names')" v-model="names" type="text">
      </div>
      <div class="col-span-4">
        <label class="block pr-4 mb-2 font-normal" for="inline-full-name">
          Filtrar por correo electronico
        </label>
        <input class="block w-full px-4 py-2 leading-tight border-2 rounded appearance-none border-secondary-100 bg-secondary-100 focus:outline-none focus:border-primary" placeholder="Email" @keyup="filtered('email')" v-model="email" type="text">
      </div>
      <div class="col-span-4 justify-self-end">
        <div>
          <button class="px-4 py-2 font-medium text-black rounded shadow bg-primary focus:shadow-outline focus:outline-none" type="button" @click="openModal">
            Crear nuevo usuario
          </button>
        </div>
      </div>
    </div>
    <transition name="modal">
      <div v-if="isModalVisible" class="z-20 modal-overlay" @click.self="closeModal">
        <div class="p-10 rounded bg-secondary-100">
          <Modal />
          <!-- <div class="modal-action">
            <button @click="closeModal" class="btn">Close</button>
          </div> -->
        </div>
      </div>
    </transition>
    <div class="my-10">
      <div class="flex flex-col">
        <div class="-m-1.5 overflow-x-auto">
          <div class="p-1.5 min-w-full inline-block align-middle">
            <div class="overflow-hidden">
              <table class="min-w-full">
                <thead>
                  <tr>
                    <th scope="col" class="px-6 py-3 font-medium text-gray-500 text-start">Nombre</th>
                    <th scope="col" class="px-6 py-3 font-medium text-gray-500 text-start">Apellido</th>
                    <th scope="col" class="px-6 py-3 font-medium text-gray-500 text-start">Correo electronico</th>
                    <th scope="col" class="px-6 py-3 font-medium text-gray-500 text-end">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(administrator, index) in administrators" :key="index" class="odd:bg-white even:bg-gray-100 hover:bg-gray-100 dark:odd:bg-neutral-800 dark:even:bg-neutral-700 dark:hover:bg-neutral-700">
                    <td class="px-6 py-4 font-medium text-gray-800 whitespace-nowrap dark:text-neutral-200">{{ administrator.names }}</td>
                    <td class="px-6 py-4 text-gray-800 whitespace-nowrap dark:text-neutral-200">{{ administrator.surnames }}</td>
                    <td class="px-6 py-4 text-gray-800 whitespace-nowrap dark:text-neutral-200">{{ administrator.email }}</td>
                    <td class="px-6 py-4 font-medium whitespace-nowrap text-end">
                      <button type="button" class="items-center p-1 font-semibold border border-transparent rounded text-secondary-900 bg-primary hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none">Editar</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex items-center gap-4">
      <div class="flex items-center gap-2">        
        <button v-for="item in totalSections" :key="item"
        @click="changePage(item)"
        :disabled="item === section"
        :class="[
          'relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded text-center align-middle font-sans text-xs font-medium uppercase transition-all',
          item === section ? 'bg-primary text-gray-900' : 'bg-secondary-100 hover:bg-primary hover:text-gray-900 active:bg-primary'
        ]" type="button">

        <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          {{ item }}
        </span>
        </button>
      </div>
      
    </div> 
  </div>
</template>



<style scoped>
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.5s, transform 0.5s; /* Transición más lenta */
}
.modal-enter-from, .modal-leave-to {
  opacity: 0;
  /* transform: scale(0.9); */
}
.modal-enter-to, .modal-leave-from  {
  opacity: 1;
  /* transform: scale(1); */
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
}



.btn {
  padding: 10px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
