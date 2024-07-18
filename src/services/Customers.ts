// APIConfiguration.ts
import axiosInstance from './APIConfiguration';  // Asegúrate de que esta ruta es correcta

export const apAdministrator = () => {
  return axiosInstance.get('/users');
};

export const administrator_customer_registration = async (data: any, token: any) => {
  const response = await axiosInstance.post(
    '/administrator_customer_registration',
    data,
    {
      headers: {
        'Authorization': token, // Asegúrate de que el formato del token es correcto
        'Content-Type': 'application/json'  // Opcional, pero recomendado para JSON
      }
    }
  );
  return response;
};

