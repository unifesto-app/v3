import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Blog | Unifesto",
  description: "Stories, insights, and updates from the Unifesto team about events, community life, and event management best practices.",
  keywords: ["unifesto blog", "community events blog", "event management tips", "community life", "event stories"],
  openGraph: {
    title: "Blog | Unifesto",
    description: "Stories, insights, and updates from the Unifesto team about events and community life.",
    type: "website",
    url: "https://www.unifesto.app/blog",
    siteName: "Unifesto",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Unifesto",
    description: "Stories, insights, and updates from the Unifesto team about events and community life.",
    site: "@unifestoapp",
  },
};

const categories = [
  { label: "All", value: "all" },
  { label: "Product Updates", value: "product" },
  { label: "Community Stories", value: "stories" },
  { label: "Event Tips", value: "tips" },
  { label: "Company News", value: "news" },
];

const blogPosts = [
  {
    id: "introducing-unifesto",
    title: "Introducing Unifesto: The Future of Events",
    excerpt: "We're on a mission to transform how institutions, clubs, communities, and startups discover, attend, and organize events. Here's why we built Unifesto.",
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
    title: "How to Organize a Successful Hackathon",
    excerpt: "From planning to execution, here's everything you need to know to host an amazing hackathon for your community.",
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
    category: "Community Stories",
    author: "Tej Reddy",
    date: "April 2, 2026",
    readTime: "6 min read",
    image: "/placeholder-blog-4.jpg",
    featured: false,
  },
  {
    id: "event-marketing-guide",
    title: "The Ultimate Guide to Marketing Your Event",
    excerpt: "Proven strategies to maximize attendance and engagement for your next event.",
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

function Meta({ post }: { post: (typeof blogPosts)[0] }) {
  return (
    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-slate-400">
      <span className="text-slate-300">{post.author}</span>
      <span aria-hidden>·</span>
      <span>{post.date}</span>
      <span aria-hidden>·</span>
      <span>{post.readTime}</span>
    </div>
  );
}

function FeaturedCard({ post }: { post: (typeof blogPosts)[0] }) {
  return (
    <a
      href={`/blog/${post.id}`}
      className="group grid overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-colors duration-200 hover:border-white/20 hover:bg-white/[0.05] md:grid-cols-2"
    >
      <div className="relative flex min-h-[220px] items-end bg-[#0a0a0d] p-6">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_80%_0%,rgba(52,145,255,0.22),transparent_60%)]"
        />
        <span className="relative rounded-full border border-primary/25 bg-primary/12 px-3 py-1 text-xs font-semibold text-primary">
          {post.category}
        </span>
      </div>
      <div className="flex flex-col justify-center gap-4 p-6 md:p-8">
        <h2 className="text-2xl font-bold leading-snug tracking-[-0.02em] text-white md:text-3xl">
          {post.title}
        </h2>
        <p className="text-pretty text-sm leading-relaxed text-slate-300 md:text-base">
          {post.excerpt}
        </p>
        <Meta post={post} />
        <span className="text-sm font-medium text-primary transition-transform duration-200 group-hover:translate-x-0.5">
          Read article →
        </span>
      </div>
    </a>
  );
}

function PostCard({ post }: { post: (typeof blogPosts)[0] }) {
  return (
    <a
      href={`/blog/${post.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-colors duration-200 hover:border-white/20 hover:bg-white/[0.05]"
    >
      <div className="relative flex aspect-video items-end bg-[#0a0a0d] p-5">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_80%_0%,rgba(52,145,255,0.18),transparent_60%)]"
        />
        <span className="relative rounded-full border border-primary/25 bg-primary/12 px-2.5 py-1 text-[11px] font-semibold text-primary">
          {post.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-lg font-semibold leading-snug text-white">{post.title}</h3>
        <p className="text-sm leading-relaxed text-slate-300">{post.excerpt}</p>
        <div className="mt-auto pt-1">
          <Meta post={post} />
        </div>
      </div>
    </a>
  );
}

export default function BlogPage() {
  const featuredPost = blogPosts.find((post) => post.featured);
  const regularPosts = blogPosts.filter((post) => !post.featured);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050507] text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative px-6 pt-36 pb-16 text-center">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-[360px] w-[640px] -translate-x-1/2 rounded-full bg-primary/12 blur-[130px]"
        />
        <div className="relative mx-auto max-w-3xl">
          <h1 className="text-balance text-4xl font-bold tracking-[-0.03em] sm:text-5xl md:text-6xl">
            Stories from the event revolution.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-slate-300 md:text-lg">
            Product updates, event tips, community stories, and insights from the team building the future of events.
          </p>
        </div>
      </section>

      {/* Category filter */}
      <section className="px-6 pb-12">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-2.5">
          {categories.map((category) => (
            <button
              key={category.value}
              className={
                category.value === "all"
                  ? "rounded-full bg-primary px-4 py-2 text-sm font-semibold text-[#050507]"
                  : "rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-slate-300 transition-colors duration-200 hover:border-white/20 hover:text-white"
              }
            >
              {category.label}
            </button>
          ))}
        </div>
      </section>

      {/* Featured */}
      {featuredPost && (
        <section className="px-6 pb-12">
          <div className="mx-auto max-w-6xl">
            <FeaturedCard post={featuredPost} />
          </div>
        </section>
      )}

      {/* Latest posts */}
      <section className="border-t border-white/5 px-6 py-14">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold tracking-[-0.02em] text-white">Latest posts</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {regularPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="border-t border-white/5 px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center md:p-12">
            <h2 className="text-2xl font-bold tracking-[-0.02em] text-white md:text-3xl">
              Never miss an update
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-slate-300 md:text-base">
              Subscribe for the latest product updates, event tips, and community stories.
            </p>
            <form className="mx-auto mt-6 flex max-w-md flex-col items-center gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="your@email.com"
                required
                aria-label="Email address"
                className="w-full rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors duration-200 hover:border-white/20 focus:border-primary sm:flex-1"
              />
              <button
                type="submit"
                className="w-full whitespace-nowrap rounded-full bg-primary px-7 py-3 text-sm font-semibold text-[#050507] transition-colors duration-200 hover:bg-[#1f83ff] sm:w-auto"
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
