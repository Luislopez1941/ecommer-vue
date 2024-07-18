<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { RouterLink } from 'vue-router';

const showMenu = ref(false);
const showSubmenu = ref(false);

const toggleMenu = () => {
  showMenu.value = !showMenu.value;
}

const toggleSubmenu = () => {
  showSubmenu.value = !showSubmenu.value;
}
</script>

<template>
  <div  class="sidebar"
    :class="['xl:h-[100vh]', '', 'fixed', 'xl:static', 'w-[80%]', 'md:w-[40%]', 'lg:w-[30%]', 'xl:w-auto', 'h-full', 'top-0', 'bg-secondary-100', 'p-4', 'flex', 
      'flex-col', 'justify-between', 'z-50', showMenu ? 'left-0' : '-left-full', 'transition-all']">
    <div>
      <h1 class="mb-10 text-2xl font-bold text-center text-white">
        Admin
        <span class="text-4xl text-primary">.</span>
      </h1>
      <ul>
        <li>
          <RouterLink to="/" class="flex items-center gap-4 px-4 py-3 transition-colors rounded-lg cursor-pointer hover:bg-secondary-900">
            <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#BDEB00"><path d="M560-600q-17 0-28.5-11.5T520-640v-160q0-17 11.5-28.5T560-840h240q17 0 28.5 11.5T840-800v160q0 17-11.5 28.5T800-600H560ZM160-440q-17 0-28.5-11.5T120-480v-320q0-17 11.5-28.5T160-840h240q17 0 28.5 11.5T440-800v320q0 17-11.5 28.5T400-440H160Zm400 320q-17 0-28.5-11.5T520-160v-320q0-17 11.5-28.5T560-520h240q17 0 28.5 11.5T840-480v320q0 17-11.5 28.5T800-120H560Zm-400 0q-17 0-28.5-11.5T120-160v-160q0-17 11.5-28.5T160-360h240q17 0 28.5 11.5T440-320v160q0 17-11.5 28.5T400-120H160Z"/></svg>
            <p class="text-primary">Dashboard</p>
          </RouterLink>
        </li>
        <li>
          <button @click="toggleSubmenu" class="flex items-center justify-between w-full px-4 py-3 transition-colors rounded-lg hover:bg-secondary-900">
            <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#BDEB00"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-240v-32q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v32q0 33-23.5 56.5T720-160H240q-33 0-56.5-23.5T160-240Z"/></svg>
            <p class="text-primary">Users</p>
            <RiArrowRightSLine :class="['mt-1', showSubmenu ? 'rotate-90' : '', 'transition-all']" />
          </button>
          <ul :class="[showSubmenu ? 'h-[130px]' : 'h-0', 'overflow-y-hidden', 'transition-all']">
            <li>
              <RouterLink to="/root/administrative" class="cursor-pointer py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-primary before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 hover:text-white transition-colors">
                <p class="text-primary">Administrativos</p>
              </RouterLink>
            </li>
            <li>
              <Link to="/" class="cursor-pointer text-primary py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-gray-500 before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100 hover:text-primary transition-colors">
                Clientes
              </Link>
            </li>
            <li>
              <Link to="/" class="cursor-pointer text-primary py-2 px-4 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-gray-500 before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-secondary-100  hover:text-primary transition-colors">
                Perfiles
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/tickets" class="flex items-center gap-4 px-4 py-3 transition-colors rounded-lg cursor-pointer hover:bg-secondary-900">
            <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#BDEB00"><path d="M280-640q-33 0-56.5-23.5T200-720v-80q0-33 23.5-56.5T280-880h400q33 0 56.5 23.5T760-800v80q0 33-23.5 56.5T680-640H280Zm40-80h320q16 0 22.5-14.5T680-760q0-17-11.5-28.5T640-800H320q-17 0-28.5 11.5T280-760q11 11 17.5 25.5T320-720ZM160-80q-33 0-56.5-23.5T80-160v-40h800v40q0 33-23.5 56.5T800-80H160ZM80-240l139-313q10-22 30-34.5t43-12.5h376q23 0 43 12.5t30 34.5l139 313H80Zm260-80h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm0-80h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm0-80h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm120 160h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm0-80h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm0-80h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm120 160h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm0-80h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Zm0-80h40q8 0 14-6t6-14q0-8-6-14t-14-6h-40q-8 0-14 6t-6 14q0 8 6 14t14 6Z"/></svg>
            <p class="text-primary">Ventas</p>
        </Link>
        </li>
        <li>
          <Link
            to="/"
            class="flex items-center gap-4 px-4 py-3 transition-colors rounded-lg hover:bg-secondary-900"
          >
            <RiCalendarTodoLine class="text-primary" /> Calendario
          </Link>
        </li>
      </ul>
    </div>
    <nav>
      <Link
        to="/"
        class="flex items-center gap-4 px-4 py-3 transition-colors rounded-lg hover:bg-secondary-900">
        <RiLogoutCircleRLine class="text-primary" /> Cerrar sesión
      </Link>
    </nav>
  </div>
  <button
    @click="toggleMenu"
    class="fixed z-50 p-3 text-black rounded-full xl:hidden bottom-4 right-4 bg-primary"
  >
    <component :is="showMenu ? RiCloseLine : RiMenu3Line" />
  </button>
</template>

<style scoped>
.sidebar {
  z-index: -1;
}
</style>
