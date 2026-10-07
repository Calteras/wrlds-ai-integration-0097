import { useState, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import { getStrapiMedia } from '@/lib/strapi';
import type { Block, StrapiMedia } from '@/types/strapi';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';
import type { CarouselApi } from 'embla-carousel-react';

// ── Typography components for react-markdown ────────────────────────────────

const MD: React.ComponentProps<typeof ReactMarkdown>['components'] = {
  h2: ({ children }) => (
    <h2 className="text-[1.75rem] md:text-[2rem] font-bold tracking-tight text-gray-950 mt-12 mb-4 leading-snug">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-[1.35rem] md:text-[1.5rem] font-semibold tracking-tight text-gray-900 mt-8 mb-3 leading-snug">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-[1.1rem] font-semibold text-gray-800 mt-6 mb-2 leading-snug">
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="text-[1.0625rem] text-gray-700 leading-[1.85] mb-6 tracking-[0.005em]">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="mb-6 space-y-2.5 pl-0">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-6 space-y-2.5 pl-0 list-decimal list-outside ml-5">{children}</ol>
  ),
  li: ({ children, ...props }) => {
    const isOrdered = (props as { ordered?: boolean }).ordered;
    return isOrdered ? (
      <li className="text-[1.0625rem] text-gray-700 leading-[1.75] pl-1">{children}</li>
    ) : (
      <li className="flex items-start gap-2.5 text-[1.0625rem] text-gray-700 leading-[1.75]">
        <span className="mt-[0.45em] h-[6px] w-[6px] flex-shrink-0 rounded-full bg-gray-400" />
        <span>{children}</span>
      </li>
    );
  },
  blockquote: ({ children }) => (
    <div
      className="relative my-10 pl-6 border-l-4 border-gray-300 rounded-r-xl py-4 pr-4"
      style={{ backgroundColor: 'rgba(156, 163, 175, 0.25)' }}
    >
      <p className="text-[1.175rem] italic leading-[1.8] text-gray-700 font-medium m-0">
        {children}
      </p>
    </div>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-gray-950">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="italic text-gray-700">{children}</em>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-blue-700 underline underline-offset-2 decoration-blue-300 hover:decoration-blue-700 transition-colors"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
  hr: () => (
    <hr className="my-10 border-0 border-t border-gray-200" />
  ),
  table: ({ children }) => (
    <div className="mb-8 overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-gray-950 text-white">{children}</thead>
  ),
  th: ({ children }) => (
    <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider">
      {children}
    </th>
  ),
  tbody: ({ children }) => <tbody className="divide-y divide-gray-100">{children}</tbody>,
  td: ({ children }) => (
    <td className="px-5 py-3.5 text-gray-700 align-top">{children}</td>
  ),
  tr: ({ children }) => (
    <tr className="even:bg-gray-50/60">{children}</tr>
  ),
  code: ({ children, className }) => {
    const isBlock = className?.startsWith('language-');
    return isBlock ? (
      <pre className="my-6 overflow-x-auto rounded-xl bg-gray-950 p-5 text-sm leading-relaxed text-gray-100">
        <code>{children}</code>
      </pre>
    ) : (
      <code className="rounded bg-gray-100 px-1.5 py-0.5 text-sm font-mono text-gray-800">
        {children}
      </code>
    );
  },
};

// ── Quote block ──────────────────────────────────────────────────────────────

function QuoteBlock({ body, title }: { body: string; title?: string }) {
  return (
    <figure
      className="relative my-10 overflow-hidden rounded-2xl px-8 py-10 md:px-12 md:py-12"
      style={{ backgroundColor: 'rgba(156, 163, 175, 0.25)' }}
    >
      {/* Decorative large quotation mark */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-4 left-6 select-none font-serif text-[9rem] leading-none text-gray-400/30"
      >
        &ldquo;
      </span>

      <blockquote className="relative z-10">
        <p className="text-[1.2rem] md:text-[1.35rem] font-medium italic leading-[1.75] text-gray-800">
          {body}
        </p>

        {title && (
          <>
            <div className="mt-6 h-px w-12 bg-gray-400/50" />
            <figcaption className="mt-3 text-sm font-medium tracking-wide text-gray-500 not-italic">
              {title}
            </figcaption>
          </>
        )}
      </blockquote>
    </figure>
  );
}

// ── Image carousel ───────────────────────────────────────────────────────────

function MediaCarousel({ files }: { files: StrapiMedia[] }) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const onSelect = useCallback((emblaApi: NonNullable<CarouselApi>) => {
    setCurrent(emblaApi.selectedScrollSnap());
  }, []);

  // Wire up the dot-indicator to the api once available
  const handleSetApi = useCallback(
    (newApi: CarouselApi) => {
      setApi(newApi);
      if (newApi) {
        newApi.on('select', () => onSelect(newApi));
        setCurrent(newApi.selectedScrollSnap());
      }
    },
    [onSelect],
  );

  const validFiles = files.filter((f) => getStrapiMedia(f.url));

  if (validFiles.length === 0) return null;
  if (validFiles.length === 1) {
    const src = getStrapiMedia(validFiles[0].url)!;
    return (
      <figure className="mb-10">
        <img
          src={src}
          alt={validFiles[0].alternativeText ?? ''}
          className="w-full rounded-xl object-cover"
        />
        {validFiles[0].alternativeText && (
          <figcaption className="mt-2 text-center text-sm text-gray-500">
            {validFiles[0].alternativeText}
          </figcaption>
        )}
      </figure>
    );
  }

  return (
    <figure className="mb-10">
      <Carousel setApi={handleSetApi} opts={{ loop: true }} className="w-full">
        <CarouselContent>
          {validFiles.map((file, j) => {
            const src = getStrapiMedia(file.url)!;
            return (
              <CarouselItem key={j}>
                <div className="overflow-hidden rounded-xl">
                  <img
                    src={src}
                    alt={file.alternativeText ?? ''}
                    className="w-full object-cover"
                    style={{ maxHeight: '520px' }}
                  />
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        <CarouselPrevious className="left-3 bg-white/90 hover:bg-white shadow-md" />
        <CarouselNext className="right-3 bg-white/90 hover:bg-white shadow-md" />
      </Carousel>

      {/* Dot indicators */}
      <div className="mt-4 flex items-center justify-center gap-1.5">
        {validFiles.map((_, j) => (
          <button
            key={j}
            aria-label={`Go to slide ${j + 1}`}
            onClick={() => api?.scrollTo(j)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              j === current ? 'w-6 bg-gray-900' : 'w-1.5 bg-gray-300 hover:bg-gray-500'
            }`}
          />
        ))}
      </div>

      {/* Caption from the current slide */}
      {validFiles[current]?.alternativeText && (
        <figcaption className="mt-2 text-center text-sm text-gray-500">
          {validFiles[current].alternativeText}
        </figcaption>
      )}
    </figure>
  );
}

// ── Main renderer ────────────────────────────────────────────────────────────

interface BlockRendererProps {
  blocks: Block[];
}

export function BlockRenderer({ blocks }: BlockRendererProps) {
  return (
    <div className="max-w-none">
      {blocks.map((block, i) => {
        switch (block.__component) {
          case 'shared.rich-text':
            return (
              <ReactMarkdown key={i} components={MD as never}>
                {block.body}
              </ReactMarkdown>
            );

          case 'shared.media': {
            const src = getStrapiMedia(block.file?.url);
            if (!src) return null;
            return (
              <figure key={i} className="mb-10">
                <img
                  src={src}
                  alt={block.file.alternativeText ?? ''}
                  className="w-full rounded-xl object-cover shadow-sm"
                />
                {block.file.alternativeText && (
                  <figcaption className="mt-2 text-center text-sm text-gray-500">
                    {block.file.alternativeText}
                  </figcaption>
                )}
              </figure>
            );
          }

          case 'shared.quote':
            return (
              <QuoteBlock key={i} body={block.body} title={block.title} />
            );

          case 'shared.slider':
            return <MediaCarousel key={i} files={block.files} />;

          default:
            return null;
        }
      })}
    </div>
  );
}
