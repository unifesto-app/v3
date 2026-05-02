import { gradientText, brandGradient } from "@/lib/styles";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Blog — Unifesto",
  description: "Stories, insights, and updates from the Unifesto team about campus events, student life, and event management best practices.",
  keywords: ["unifesto blog", "campus events blog", "event management tips", "student life", "event stories"],
  openGraph: {
    title: "Blog — Unifesto",
    description: "Stories, insights, and updates from the Unifesto team about campus events and student life.",
    type: "website",
    url: "https://www.unifesto.app/blog",
    siteName: "Unifesto",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — Unifesto",
    description: "Stories, insights, and updates from the Unifesto team about campus events and student life.",
    site: "@unifestoapp",
  },
};

const categories = [
  { label: "All", value: "all" },
  { label: "Product Updates", value: "product" },
  { label: "Campus Stories", value: "stories" },
  { label: "Event Tips", value: "tips" },
  { label: "Company News", value: "news" },
];

const blogPosts = [
  {
    id: "introducing-unifesto",
    title: "Introducing Unifesto: The Future of Campus Events",
    excerpt: "We're on a mission to transform how students discover, attend, and organize events across college campuses. Here's why we built Unifesto.",
    category: "Company News",
    author: "Unifesto Team",
    date: "April 10, 2026",
    readTime: "5 min read",
    image: "/placeholder-blog-1.jpg",
    featured: true,
  },
  {
    id: "qr-checkin-launch",
    title: "Launching QR Check-in: Seamless Event Entry for Everyone",
    excerpt: "Say goodbye to manual attendance tracking. Our new QR check-in app makes event entry faster and more reliable than ever.",
    category: "Product Updates",
    author: "Product Team",
    date: "April 8, 2026",
    readTime: "4 min read",
    image: "/placeholder-blog-2.jpg",
    featured: false,
  },
  {
    id: "organizing-successful-hackathon",
    title: "How to Organize a Successful Campus Hackathon",
    excerpt: "From planning to execution, here's everything you need to know to host an amazing hackathon at your college.",
    category: "Event Tips",
    author: "Sarah Johnson",
    date: "April 5, 2026",
    readTime: "8 min read",
    image: "/placeholder-blog-3.jpg",
    featured: false,
  },
  {
    id: "iit-delhi-tech-fest",
    title: "Inside IIT Delhi's Largest Tech Fest: A Case Study",
    excerpt: "How one of India's premier institutions used Unifesto to manage 10,000+ attendees across 50+ events.",
    category: "Campus Stories",
    author: "Tej Reddy",
    date: "April 2, 2026",
    readTime: "6 min read",
    image: "/placeholder-blog-4.jpg",
    featured: false,
  },
  {
    id: "event-marketing-guide",
    title: "The Ultimate Guide to Marketing Your Campus Event",
    excerpt: "Proven strategies to maximize attendance and engagement for your next college event.",
    category: "Event Tips",
    author: "Marketing Team",
    date: "March 28, 2026",
    readTime: "7 min read",
    image: "/placeholder-blog-5.jpg",
    featured: false,
  },
  {
    id: "analytics-dashboard-update",
    title: "New Analytics Dashboard: Better Insights for Organizers",
    excerpt: "We've completely redesigned our analytics dashboard with real-time metrics and exportable reports.",
    category: "Product Updates",
    author: "Product Team",
    date: "March 25, 2026",
    readTime: "3 min read",
    image: "/placeholder-blog-6.jpg",
    featured: false,
  },
];

function BlogCard({ post, featured = false }: { post: typeof blogPosts[0]; featured?: boolean }) {
  if (featured) {
    return (
      <a
        href={`/blog/${post.id}`}
        className="group block rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm overflow-hidden hover:border-white/20 transition-all duration-300"
      >
        <div className="grid md:grid-cols-2 gap-6 p-6">
          <div className="aspect-video rounded-xl flex items-center justify-center" style={{ background: brandGradient }}>
            <svg className="w-16 h-16 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="flex flex-col justify-center">
            <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-3 w-fit">
              {post.category}
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold mb-3" style={gradientText}>
              {post.title}
            </h2>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-4">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span>{post.author}</span>
              <span>•</span>
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </a>
    );
  }

  return (
    <a
      href={`/blog/${post.id}`}
      className="group block rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm overflow-hidden hover:border-white/20 transition-all duration-300"
    >
      <div className="aspect-video rounded-t-2xl flex items-center justify-center" style={{ background: brandGradient }}>
        <svg className="w-12 h-12 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      <div className="p-6">
        <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-3">
          {post.category}
        </span>
        <h3 className="text-lg font-bold text-white mb-2">
          {post.title}
        </h3>
        <p className="text-sm text-slate-400 leading-relaxed mb-4">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span>{post.author}</span>
          <span>•</span>
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>
      </div>
    </a>
  );
}

export default function BlogPage() {
  const featuredPost = blogPosts.find((post) => post.featured);
  const regularPosts = blogPosts.filter((post) => !post.featured);

  return (
    <main className="min-h-screen bg-black overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-36 pb-20 px-6 text-center overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(52,145,255,0.1) 0%, transparent 70%)" }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-4xl mx-auto">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-4" style={gradientText}>Unifesto Blog</p>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-5">
            Stories from the<br />
            <span style={gradientText}>campus event revolution.</span>
          </h1>
          <p className="text-slate-400 text-sm md:text-lg leading-relaxed max-w-2xl mx-auto">
            Product updates, event tips, campus stories, and insights from the team building the future of college events.
          </p>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="relative px-6 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.value}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  category.value === "all"
                    ? "text-black"
                    : "text-slate-400 border border-white/10 hover:border-white/20 hover:text-white"
                }`}
                style={category.value === "all" ? { background: brandGradient } : {}}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="relative px-6 pb-12">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={gradientText}>Featured</span>
            </div>
            <BlogCard post={featuredPost} featured />
          </div>
        </section>
      )}

      {/* All Posts Grid */}
      <section className="relative px-6 py-12 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white">Latest Posts</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="relative px-6 py-20 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <div className="p-8 md:p-12 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
              Never miss an update
            </h2>
            <p className="text-slate-400 text-sm md:text-base mb-6">
              Subscribe to our newsletter for the latest product updates, event tips, and campus stories.
            </p>
            <form className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                required
                className="w-full sm:flex-1 bg-white/5 border border-white/10 rounded-full px-5 py-3 text-sm text-white placeholder-slate-600 outline-none hover:border-white/20 focus:border-[#3491ff] transition-colors duration-200"
              />
              <button
                type="submit"
                className="w-full sm:w-auto rounded-full px-7 py-3 text-sm font-semibold text-black transition-all duration-300 hover:shadow-[0_0_20px_rgba(52,145,255,0.4)] whitespace-nowrap"
                style={{ background: brandGradient }}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
