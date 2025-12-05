import Image from "next/image";
import Link from "next/link";
import { type ReactNode, type ComponentPropsWithoutRef } from "react";
import { clsx } from "clsx";



interface CalloutProps {
  children: ReactNode;
  type?: "info" | "warning" | "error" | "success";
}


export function Callout({ children, type = "info" }: CalloutProps) {
  const styles = {
    info: "border-blue-500 bg-blue-50 text-blue-900 dark:bg-blue-900/20 dark:text-blue-200",
    warning: "border-yellow-500 bg-yellow-50 text-yellow-900 dark:bg-yellow-900/20 dark:text-yellow-200",
    error: "border-red-500 bg-red-50 text-red-900 dark:bg-red-900/20 dark:text-red-200",
    success: "border-green-500 bg-green-50 text-green-900 dark:bg-green-900/20 dark:text-green-200",
  };

  return (
    <div className={clsx("my-6 rounded-lg border-l-4 p-4", styles[type])}>
      {children}
    </div>
  );
}

interface NoteProps {
  children: ReactNode;
  title?: string;
}

export function Note({ children, title = "Note" }: NoteProps) {
  return (
    <aside className="my-6 rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
      <p className="mb-2 text-sm font-semibold text-zinc-900 dark:text-white">{title}</p>
      <div className="text-sm text-zinc-600 dark:text-zinc-400">{children}</div>
    </aside>
  );
}

interface CTAProps {
  href: string;
  children: ReactNode;
}

export function CTA({ href, children }: CTAProps) {
  const isExternal = href.startsWith("http");

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="my-4 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2.5 font-medium text-white shadow-lg shadow-indigo-500/25 transition-all hover:from-indigo-700 hover:to-purple-700 hover:shadow-xl"
      >
        {children}
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
        </svg>
      </a>
    );
  }

  return (
    <Link
      href={href}
      className="my-4 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2.5 font-medium text-white shadow-lg shadow-indigo-500/25 transition-all hover:from-indigo-700 hover:to-purple-700 hover:shadow-xl"
    >
      {children}
    </Link>
  );
}

function CodeBlock({ children, className, ...props }: ComponentPropsWithoutRef<"pre">) {
  return (
    <pre
      className={clsx(
        "my-6 overflow-x-auto rounded-xl border border-zinc-200 bg-zinc-900 p-4 text-sm text-zinc-100 dark:border-zinc-800",
        className
      )}
      {...props}
    >
      {children}
    </pre>
  );
}

function InlineCode({ children, ...props }: ComponentPropsWithoutRef<"code">) {
  const isCodeBlock = typeof children === "object";
  
  if (isCodeBlock) {
    return <code {...props}>{children}</code>;
  }

  return (
    <code
      className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm font-medium text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200"
      {...props}
    >
      {children}
    </code>
  );
}

function MDXImage({ src, alt }: { src?: string; alt?: string }) {
  if (!src || typeof src !== "string") return null;

  return (
    <figure className="my-8">
      <Image
        src={src}
        alt={alt || ""}
        width={800}
        height={450}
        className="rounded-lg"
        loading="lazy"
        sizes="(max-width: 768px) 100vw, 800px"
      />
      {alt && (
        <figcaption className="mt-2 text-center text-sm text-zinc-500 dark:text-zinc-400">
          {alt}
        </figcaption>
      )}
    </figure>
  );
}

function MDXLink({ href, children, ...props }: ComponentPropsWithoutRef<"a">) {
  if (!href) return <span {...props}>{children}</span>;

  const isExternal = href.startsWith("http");

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-indigo-600 underline decoration-indigo-300 underline-offset-2 transition-colors hover:decoration-indigo-600 dark:text-indigo-400 dark:decoration-indigo-700 dark:hover:decoration-indigo-400"
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className="text-indigo-600 underline decoration-indigo-300 underline-offset-2 transition-colors hover:decoration-indigo-600 dark:text-indigo-400 dark:decoration-indigo-700 dark:hover:decoration-indigo-400"
      {...props}
    >
      {children}
    </Link>
  );
}

function createHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
  const Tag = `h${level}` as const;
  
  return function Heading({ children, ...props }: ComponentPropsWithoutRef<typeof Tag>) {
    const id = typeof children === "string" 
      ? children.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "")
      : undefined;

    return (
      <Tag id={id} className="group scroll-mt-24" {...props}>
        {children}
        {id && (
          <a
            href={`#${id}`}
            className="ml-2 text-zinc-400 opacity-0 transition-opacity group-hover:opacity-100"
            aria-label={`Link to ${children}`}
          >
            #
          </a>
        )}
      </Tag>
    );
  };
}

export const mdxComponents = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  pre: CodeBlock,
  code: InlineCode,
  img: MDXImage,
  a: MDXLink,
  Callout,
  Note,
  CTA,
};
