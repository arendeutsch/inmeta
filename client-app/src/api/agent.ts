import axios, { AxiosResponse } from 'axios';
import { NewOrder, Order } from '../models/order';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Orders = {
    list: () => requests.get<Order[]>('/orders'),
    create: (order: NewOrder) => requests.post<void>(`/orders`, order),
    update: (order: Order) => requests.put<void>(`/orders/${order.id}`, order),
    delete: (id: string) => requests.del<void>(`/orders/${id}`),
}

const agent = {
    Orders
};

export default agent;