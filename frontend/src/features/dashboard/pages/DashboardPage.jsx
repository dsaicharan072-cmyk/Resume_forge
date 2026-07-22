export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted text-sm">Overview of your career progress.</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Placeholder cards */}
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="card p-6 flex flex-col justify-between space-y-4">
            <div className="h-4 w-1/2 bg-muted/20 rounded animate-pulse"></div>
            <div className="h-8 w-3/4 bg-muted/20 rounded animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
