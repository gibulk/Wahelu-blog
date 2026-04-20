import { createClient } from '@/lib/supabase/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export default async function DashboardPage() {
  const supabase = createClient();
  const { count: articleCount } = await supabase
    .from('articles')
    .select('*', { count: 'exact', head: true });

  const { count: subscriberCount } = await supabase
    .from('newsletter_subscribers')
    .select('*', { count: 'exact', head: true });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Total Artikel</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{articleCount || 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Subscriber Newsletter</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{subscriberCount || 0}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
