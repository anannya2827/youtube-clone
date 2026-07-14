import Link from "next/link";
import { BlogPost } from "@/types";
import { ArrowRight, MapPin } from "lucide-react";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="group bg-white border border-zinc-200/70 rounded-2xl p-6 shadow-[0_4px_25px_rgba(0,0,0,0.01)] hover:shadow-[0_15px_45px_rgba(40,30,20,0.035)] hover:border-zinc-300 transition-all duration-300 ease-out grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
      
      {/* Square Rounded Image Frame Container */}
      <div className="sm:col-span-4 relative aspect-[16/10] sm:aspect-square w-full overflow-hidden rounded-xl bg-zinc-50 border border-zinc-100 shadow-inner">
        <img
          src={post.coverImage}
          alt={post.title}
          className="object-cover w-full h-full filter grayscale contrast-[1.04] group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700 ease-out"
          loading="lazy"
        />
      </div>

      {/* Text Copy Column */}
      <div className="sm:col-span-8 flex flex-col justify-between h-full items-start space-y-4 text-left py-1">
        <div className="space-y-2.5 w-full">
          <div className="flex items-center justify-between font-sans text-[9px] uppercase tracking-[0.25em] text-zinc-400 font-bold">
            <span className="text-amber-800 bg-amber-50/60 px-2 py-0.5 rounded">{post.category}</span>
            <div className="flex items-center gap-1.5 font-medium">
              <MapPin className="w-3 h-3 text-zinc-300" />
              {post.location.split(",")[0]}
            </div>
          </div>

          <Link href={`/posts/${post.id}`} className="block">
            <h4 className="text-xl sm:text-2xl font-serif font-normal italic text-zinc-950 group-hover:text-amber-900 transition-colors leading-snug">
              {post.title}
            </h4>
          </Link>

          <p className="text-xs sm:text-sm font-serif text-zinc-500 leading-relaxed line-clamp-2">
            {post.description}
          </p>
        </div>

        {/* Lower Row Navigation Actions Info */}
        <div className="pt-4 w-full flex items-center justify-between border-t border-zinc-100 text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-semibold font-sans">
          <span className="text-zinc-500">By {post.author.name}</span>
          <Link href={`/posts/${post.id}`} className="inline-flex items-center gap-2 text-zinc-400 group-hover:text-zinc-950 transition-colors font-bold">
            Read Critique
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 text-zinc-400 group-hover:text-zinc-950" />
          </Link>
        </div>
      </div>

    </article>
  );
}
