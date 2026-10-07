import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import SEO from "@/components/SEO";
import EnhancedBlogContent from "@/components/EnhancedBlogContent";
import { BlockRenderer } from "@/components/BlockRenderer";
import { Button } from "@/components/ui/button";
import { useBlogPost } from "@/hooks/useBlogPosts";
import { useEffect } from "react";

const BlogPostDetail = () => {
  const { slug } = useParams();
  const { data: post, isLoading } = useBlogPost(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // ── Loading skeleton ────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <PageLayout>
        <div className="pb-16">
          <div className="w-full h-[40vh] md:h-[50vh] bg-gradient-to-br from-black via-blue-900 to-indigo-900 animate-pulse" />
          <div className="w-full max-w-4xl mx-auto px-6 md:px-8 mt-8 space-y-4">
            <div className="h-6 bg-gray-100 rounded animate-pulse" />
            <div className="h-6 bg-gray-100 rounded w-3/4 animate-pulse" />
            <div className="h-96 bg-gray-100 rounded-lg animate-pulse mt-8" />
          </div>
        </div>
      </PageLayout>
    );
  }

  // ── Not found ───────────────────────────────────────────────────────────────
  if (!post) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-8">
            The blog post you're looking for doesn't exist.
          </p>
          <Link to="/blog">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </PageLayout>
    );
  }

  // ── Article ─────────────────────────────────────────────────────────────────
  return (
    <PageLayout>
      <SEO
        title={`${post.title} - Calterras`}
        description={post.excerpt}
        imageUrl={post.imageUrl}
        isBlogPost={true}
        publishDate={new Date(post.date).toISOString()}
        author={post.author}
        category={post.category}
        type="article"
      />

      <div className="pb-16">
        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden flex items-center justify-center"
        >
          {/* Cover image — lowest layer */}
          {post.imageUrl && (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${post.imageUrl})` }}
            />
          )}

          {/* Dark gradient overlay — keeps text readable */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

          {/* Hero text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 z-10">
            <motion.div
              className="flex flex-col items-center justify-center max-w-3xl text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Category badge */}
              <motion.span
                className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs text-white font-medium mb-4 backdrop-blur-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {post.category}
              </motion.span>

              <motion.h1
                className="text-3xl md:text-5xl font-bold mb-4 text-white leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {post.title}
              </motion.h1>

              <motion.div
                className="w-20 h-1 bg-white mb-5"
                initial={{ width: 0 }}
                animate={{ width: 80 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />

              <motion.p
                className="text-base md:text-lg text-gray-300 max-w-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {post.excerpt}
              </motion.p>

            </motion.div>
          </div>
        </motion.div>

        {/* ── Back button + meta row ─────────────────────────────────────────── */}
        <div className="w-full max-w-4xl mx-auto px-6 md:px-8 mt-8 flex items-center justify-between">
          <Link
            to="/blog"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span>Back to Blog</span>
          </Link>

          <div className="flex items-center gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <User className="h-3.5 w-3.5" />
              {post.author}
            </span>
          </div>
        </div>

        {/* ── Article content ───────────────────────────────────────────────── */}
        <div className="w-full max-w-4xl mx-auto px-6 md:px-8 py-12">
          <motion.div
            className="prose prose-lg max-w-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {post.source === "strapi" && post.strapiBlocks ? (
              <BlockRenderer blocks={post.strapiBlocks} />
            ) : post.staticContent ? (
              <EnhancedBlogContent content={post.staticContent} />
            ) : null}
          </motion.div>
        </div>

        {/* ── Footer nav ────────────────────────────────────────────────────── */}
        <div className="w-full max-w-4xl mx-auto px-6 md:px-8 border-t pt-8">
          <div className="flex items-center justify-between">
            <Link
              to="/blog"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              All Articles
            </Link>
            <span className="flex items-center gap-1.5 text-sm text-gray-400">
              <Tag className="h-3.5 w-3.5" />
              {post.category}
            </span>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default BlogPostDetail;
