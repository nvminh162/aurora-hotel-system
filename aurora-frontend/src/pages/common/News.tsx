import VideoHero from "@/components/custom/VideoHero";
import NewsItem from "@/components/custom/NewsItem";
import { mockNews } from "@/mocks/news";

export default function NewsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <VideoHero 
        title="Tin tức"
        subtitle="Cập nhật những thông tin mới nhất từ Aurora Hotel"
      />

      {/* News List */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockNews.map((news) => (
              <NewsItem
                key={news.id}
                id={news.id}
                slug={news.slug}
                title={news.title}
                description={news.description}
                thumbnailUrl={news.thumbnailUrl}
                publishedAt={news.publishedAt}
                status={news.status}
                createdBy={news.createdBy}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
