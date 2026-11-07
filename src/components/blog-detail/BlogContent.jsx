import { BookOpen, Clock, User } from "lucide-react";

export default function BlogContent({ post }) {
  const { html = "", category, readTime = "", author } = post;

  const details = [
    { icon: BookOpen, label: "Category", value: category },
    {
      icon: Clock,
      label: "Reading Time",
      value: readTime.replace(" read", ""),
    },
    { icon: User, label: "Author", value: author },
  ];

  return (
    <section
      aria-label="Article"
      className="mx-auto grid  gap-8  py-8  sm:py-12 lg:grid-cols-[1fr_336px] px-4 sm:px-6 lg:px-8 lg:px-20 xl:px-40"
    >
      {/* Article */}
      <article
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {/* Sidebar */}
      <aside className="h-fit border  border-gray-200 bg-white p-4 sm:p-5">
        <dl className="space-y-4">
          {details.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="grid grid-cols-[auto_1fr] items-center gap-x-3"
            >
              {/* Icon: title + description dono ke beech me (vertical center) */}
              <Icon
                className="row-span-2 h-6 w-6 shrink-0 self-center"
                strokeWidth={2}
                aria-hidden="true"
              />

              {/* Title + description: ek hi left line se start */}
              <dt className="self-end text-left text-sm font-medium text-black sm:text-base lg:text-[18px]">
                {label}
              </dt>
              <dd className=" self-start text-left text-xs text-gray-800 sm:text-[15px]">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </aside>
    </section>
  );
}
