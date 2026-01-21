'use client';

import { useEffect, useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ordersApi } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface Order {
  id: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  description: string;
  status: string;
  created_at: string;
}

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      router.push('/');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user?.role === 'admin') {
      ordersApi.getAll()
        .then(setOrders)
        .catch(console.error)
        .finally(() => setFetching(false));
    }
  }, [user]);

  if (loading || fetching) {
    return (
      <Container size="lg">
        <div className="text-center py-20">Загрузка...</div>
      </Container>
    );
  }

  if (!user || user.role !== 'admin') {
    return null;
  }

  const statusColors: Record<string, string> = {
    new: 'bg-blue-100 text-blue-800',
    in_progress: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  const updateStatus = async (id: string, status: string) => {
    await ordersApi.updateStatus(id, status);
    setOrders(orders.map(o => o.id === id ? { ...o, status } : o));
  };

  return (
    <section className="py-16">
      <Container size="lg">
        <h1 className="text-4xl font-bold mb-8">Панель администратора</h1>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Заявки ({orders.length})</h2>
          
          {orders.length === 0 ? (
            <Card>Заявок пока нет</Card>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <Card key={order.id}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold">{order.client_name}</h3>
                      <p className="text-sm text-gray-500">{order.client_email}</p>
                      {order.client_phone && (
                        <p className="text-sm text-gray-500">{order.client_phone}</p>
                      )}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${statusColors[order.status] || 'bg-gray-100'}`}>
                      {order.status}
                    </span>
                  </div>
                  
                  <p className="mb-4">{order.description}</p>
                  
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant={order.status === 'new' ? 'primary' : 'outline'}
                      onClick={() => updateStatus(order.id, 'new')}
                    >
                      Новая
                    </Button>
                    <Button 
                      size="sm" 
                      variant={order.status === 'in_progress' ? 'primary' : 'outline'}
                      onClick={() => updateStatus(order.id, 'in_progress')}
                    >
                      В работе
                    </Button>
                    <Button 
                      size="sm" 
                      variant={order.status === 'completed' ? 'primary' : 'outline'}
                      onClick={() => updateStatus(order.id, 'completed')}
                    >
                      Готово
                    </Button>
                    <Button 
                      size="sm" 
                      variant={order.status === 'cancelled' ? 'primary' : 'outline'}
                      onClick={() => updateStatus(order.id, 'cancelled')}
                    >
                      Отменено
                    </Button>
                  </div>
                  
                  <p className="text-xs text-gray-400 mt-4">
                    {new Date(order.created_at).toLocaleString()}
                  </p>
                </Card>
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}