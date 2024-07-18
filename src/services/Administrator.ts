// APIConfiguration.ts
import axiosInstance from './APIConfiguration';  // Asegúrate de que esta ruta es correcta

export const apAdministrator = () => {
  return axiosInstance.get('/users');
};

export const login = (data: any) => {  // Aquí asegúrate de exportar 'login' correctamente
  return axiosInstance.post('/administrator_login', data);
};

export const list_customers = async (data: any, token: any) => {
  const response = await axiosInstance.get(`/list_customers/${data.section}/${data.type}/${data.filter}`, {
    headers: {
      'Authorization': token
    }
  });
  return response;
};

export const updateUser = (id: string, userData: any) => {
  return axiosInstance.put(`/users/${id}`, userData);
};

export const deleteUser = (id: string) => {
  return axiosInstance.delete(`/users/${id}`);
};
