export default function PageLayout({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        {children}
      </div>
    );
  }
  