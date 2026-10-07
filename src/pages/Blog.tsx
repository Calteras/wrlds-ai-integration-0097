import PageLayout from "@/components/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import BlogPostCard from "@/components/BlogPostCard";
import { useBlogPosts } from "@/hooks/useBlogPosts";

const Blog = () => {
  const { data: posts = [], isLoading } = useBlogPosts();

  const featuredPost = posts[0] ?? null;
  const otherPosts = posts.slice(1);

  return (
    <PageLayout>
      <SEO
        title="Calterras Holdings — Insights on Technology & Business Innovation"
        description="Stay updated with the latest insights on F&B technology, HR systems, healthcare procurement, and agricultural innovation from Calterras Holdings."
        imageUrl={
          featuredPost?.imageUrl ||
          "/lovable-uploads/526dc38a-25fa-40d4-b520-425b23ae0464.png"
        }
        keywords={[
          "Calterras Holdings",
          "business technology",
          "TerraPOS",
          "Acheron HR On",
          "Orion Health Gateway",
          "Evita Agriculture",
          "industry innovation",
          "F&B technology",
          "HR system",
          "healthcare procurement",
          "agribusiness",
        ]}
        type="website"
      />

      <div className="w-full pt-24 pb-12 bg-gradient-to-br from-slate-900 via-blue-900 to-blue-500 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Calterras News &amp; Insights
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              The latest thinking on business technology, industry innovation,
              and how our portfolio companies are shaping the future
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-80 bg-gray-100 animate-pulse rounded-lg ${i === 0 ? "col-span-1 md:col-span-2 lg:col-span-3 h-64" : ""}`}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPost && (
              <Link
                to={`/blog/${featuredPost.slug}`}
                className="col-span-1 md:col-span-2 lg:col-span-3"
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full">
                  <div className="grid md:grid-cols-2 h-full">
                    <div
                      className="bg-cover bg-center h-64 md:h-full p-8 flex items-center justify-center"
                      style={{
                        backgroundImage: `url('${featuredPost.imageUrl}')`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                      }}
                    >
                      <div className="text-white text-center bg-black/30 backdrop-blur-sm p-4 rounded-lg">
                        <span className="px-3 py-1 bg-white/10 rounded-full text-sm font-medium inline-block mb-4">
                          Featured
                        </span>
                        <h3 className="text-2xl md:text-3xl font-bold">
                          {featuredPost.title}
                        </h3>
                      </div>
                    </div>
                    <CardContent className="p-8">
                      <p className="text-gray-500 text-sm mb-2">
                        Published: {featuredPost.date}
                      </p>
                      <p className="text-gray-700 mb-6">{featuredPost.excerpt}</p>
                      <Button variant="outline" className="group">
                        Read more
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </CardContent>
                  </div>
                </Card>
              </Link>
            )}

            {otherPosts.map((post) => (
              <BlogPostCard
                key={post.id}
                title={post.title}
                excerpt={post.excerpt}
                imageUrl={post.imageUrl}
                date={post.date}
                slug={post.slug}
                category={post.category}
              />
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Blog;
