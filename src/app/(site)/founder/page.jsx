import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Flower2,
  HeartHandshake,
  Leaf,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import heroImg from "@/assets/heroimage.webp";
// ImagePlaceholder ka path apne project ke hisaab se adjust karo
import ImagePlaceholder from "@/components/shared/ImagePlaceholder";
import founderImg from "@/assets/founder.jpg"

/* Portrait: real image ho to bas src daal do (null = placeholder) */
const IMAGES = {
  portrait: founderImg, // e.g. "/images/founder/dr-arti.webp"
};

const BOOKING_LINK = "/appointment";
const MEDICINES_LINK = "/products";

const BANNER = {
  eyebrow: "Meet the Founder",
  name: "Dr. Arti Panwar",
  qualification: "M.S. (Obstetrics & Gynaecology) (Ay.)",
  role: "Infertility Specialist | Founder – Raajanandam Aushadhi",
  tagline: "Dedicated to Women’s Health, Fertility Care & Healthy Motherhood",
};

const STATS = [
  { value: "7+", label: "Years", sub: "Clinical Experience" },
  { value: "10,000+", label: "Successful", sub: "Deliveries*" },
  { value: "1,000+", label: "Infertility", sub: "Patients Treated*" },
  { value: "2,000+", label: "High-Risk Pregnancy", sub: "Patients Managed*" },
];

const SPECIALISATIONS = [
  {
    title: "Male & Female Infertility",
    text: "Personalised assessment and treatment planning for couples experiencing difficulty conceiving.",
    Icon: HeartHandshake,
  },
  {
    title: "PCOS/PCOD Management",
    text: "Care for irregular periods, ovulatory concerns, and hormonal imbalances.",
    Icon: Flower2,
  },
  {
    title: "High-Risk Pregnancy Care",
    text: "Clinical monitoring and guidance for pregnancies requiring specialised attention.",
    Icon: ShieldCheck,
  },
  {
    title: "Female Reproductive Health",
    text: "Care for menstrual disorders and other gynaecological concerns.",
    Icon: Stethoscope,
  },
  {
    title: "Ayurvedic Fertility Care",
    text: "Individualised Ayurvedic treatment approaches and doctor-guided formulations, selected according to clinical needs.",
    Icon: Leaf,
  },
];

const PILLARS = [
  { title: "Understanding Concerns", text: "Every patient’s journey is different, so care begins with listening to each patient’s concerns." },
  { title: "Reviewing Investigations", text: "Relevant investigations are reviewed carefully before any treatment is recommended." },
  { title: "Individual Treatment", text: "Treatment options are recommended based on each patient’s individual needs." },
  { title: "Compassionate Guidance", text: "Patients from different locations seek consultation for infertility and women’s health concerns, and receive caring guidance throughout." },
  { title: "Realistic Expectations", text: "Responsible clinical care with honest, realistic expectations throughout the treatment journey." },
];

function SectionHeading({ eyebrow, children, center = false, light = false }) {
  return (
    <div className={center ? "text-center" : ""}>
      {eyebrow && (
        <p className="mb-2 text-sm font-semibold xl:text-base uppercase tracking-[0.15em] text-[#C5A84C]">
          {eyebrow}
        </p>
      )}
      <h2
        className={`text-2xl font-semibold leading-tight sm:text-3xl md:text-4xl ${
          light ? "text-white" : "text-[#1f2a44]"
        }`}
      >
        {children}
      </h2>
      <span className={`mt-4 block h-[3px] w-14 rounded-full bg-[#C5A84C] ${center ? "mx-auto" : ""}`} />
    </div>
  );
}

const Para = ({ children }) => (
  <p className="mb-4 text-base leading-7 text-slate-600 sm:text-[17px] sm:leading-8">{children}</p>
);

/* Banner text: mobile par image ke neeche, md+ par image ke upar overlay */
function BannerText({ mobile = false }) {
  const sub = mobile ? "text-slate-700" : "text-gray-800";
  return (
    <div className="max-w-2xl">
      <p className="mb-1 text-sm  font-bold uppercase tracking-[0.25em] text-[#947f41] sm:text-sm xl:test-lg">
        {BANNER.eyebrow}
      </p>
      <h1 className="text-3xl font-medium text-black md:text-[34px] lg:text-[44px]">{BANNER.name}</h1>
      <p className="mt-2 text-sm font-medium text-[#8a6f1f] sm:text-base">{BANNER.qualification}</p>
      <p className={`mt-2 text-sm sm:text-base ${sub}`}>{BANNER.role}</p>
      <p className={`mt-1 text-sm sm:text-base ${sub}`}>{BANNER.tagline}</p>
    </div>
  );
}

export default function Founder() {
  return (
    <main className="bg-white font-sans text-slate-700">
      {/* ========================= BANNER ========================= */}
      <section className="bg-white">
        {/* Mobile: poori image (cut nahi) + neeche text. md+: image ke andar text overlay */}
        <div className="relative w-full overflow-hidden md:h-[240px] lg:h-[300px]">
          <Image
            src={heroImg}
            alt="Dr. Arti Panwar – Founder"
            priority
            quality={90}
            sizes="100vw"
            className="block h-auto  w-full md:absolute md:inset-0 md:h-full md:object-cover md:object-[center_40%]"
          />
          <div className="absolute inset-0 hidden bg-white/10 md:block" />

          <div className="hidden md:absolute md:inset-0 md:flex md:items-center md:justify-center md:px-6 md:text-center">
            <BannerText />
          </div>
        </div>

        <div className="px-4 py-8 text-center md:hidden">
          <BannerText mobile />
        </div>
      </section>

      {/* ========================= INTRO ========================= */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[5fr_7fr] lg:gap-16 lg:py-20">
        {/* portrait */}
        {/* <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <span className="absolute -bottom-3 -left-3 h-full w-full rounded-t-[999px] rounded-b-2xl border-2 border-[#C5A84C]" />
          <ImagePlaceholder
            src={IMAGES.portrait}
            alt="Dr. Arti Panwar"
            label="Dr. Arti Panwar"
            sizes="(min-width: 1024px) 40vw, 90vw"
            className="relative aspect-[4/5] w-full rounded-t-[999px] rounded-b-2xl shadow-xl"
          />
          <div className="absolute -bottom-5 left-1/2 w-max -translate-x-1/2 rounded-full bg-[#1f2a44] px-6 py-2.5 text-sm font-medium text-white shadow-lg">
            <span className="text-[#C5A84C]">7+ Years</span> of Clinical Care
          </div>
        </div> */}
        {/* portrait */}
<div className="relative mx-auto w-full max-w-xs sm:max-w-sm lg:max-w-md">
  {/* gold frame: image ke saath same arch shape, barabar gap */}
  <div className="rounded-t-[999px] rounded-b-3xl border-4 border-[#C5A84C] p-1 shadow-xl">
    <ImagePlaceholder
      src={IMAGES.portrait}
      alt="Dr. Arti Panwar"
      label="Dr. Arti Panwar"
      sizes="(min-width: 1024px) 35vw, 90vw"
      imageClassName="object-cover object-top"
      className="aspect-[4/4.6] w-full rounded-t-[999px] rounded-b-2xl"
    />
  </div>

  <div className="absolute -bottom-5 left-1/2 w-max -translate-x-1/2 rounded-full bg-[#1f2a44] px-6 py-2.5 text-sm font-medium text-white shadow-lg">
    <span className="text-[#cba72f]">7+ Years</span> of Clinical Care
  </div>
</div>

        {/* text */}
        <div className="mt-6 lg:mt-0">
          <SectionHeading eyebrow="About Dr. Arti">
            Your Dream of Parenthood Deserves Specialised Care
          </SectionHeading>
          <div className="mt-6">
            <Para>
              With over 7 years of clinical experience, Dr. Arti Panwar is dedicated to helping
              couples navigate infertility, supporting women through high-risk pregnancies, and
              providing personalised care for female reproductive health.
            </Para>
            <Para>
              As an Infertility Specialist and the founder of Raajanandam Aushadhi, she focuses on
              understanding the underlying causes of fertility challenges and developing
              individualised treatment plans that integrate Ayurvedic principles with appropriate
              modern diagnostic methods.
            </Para>
          </div>
        </div>
      </section>

      {/* ========================= STATS ========================= */}
      <section className=" py-14 lg:py-16" style={{ backgroundColor: "#6B1D2A" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading center light>
            Clinical Experience at a Glance
          </SectionHeading>
          <dl className="mt-10 grid grid-cols-2 gap-y-8 lg:grid-cols-4 lg:gap-y-0 lg:divide-x lg:divide-white/15">
            {STATS.map((s) => (
              <div key={s.sub} className="px-3 text-center">
                <dt className="text-3xl font-bold text-[#C5A84C] sm:text-4xl md:text-5xl">{s.value}</dt>
                <dd className="mt-2.5 text-xs font-semibold uppercase tracking-wider text-white sm:text-lg">
                  {s.label}
                </dd>
                <dd className="text-sm text-white/80 sm:text-[15px]">{s.sub}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 text-center text-sm  xl:text-base text-white/80">* Individual treatment outcomes may vary.</p>
        </div>
      </section>

      {/* ========================= SPECIALISATION ========================= */}
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[4fr_8fr] lg:gap-16 lg:py-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading eyebrow="What We Treat">Areas of Specialisation</SectionHeading>
          <p className="mt-6 text-base leading-7 text-slate-600">
            Focused care across fertility, hormonal health, pregnancy and Ayurvedic treatment,
            planned around each patient’s clinical needs.
          </p>
        </div>

        <ul className="divide-y divide-slate-200 border-y border-slate-200">
          {SPECIALISATIONS.map(({ title, text, Icon }, i) => (
            <li key={title} className="group flex gap-4 py-6 transition hover:bg-[#faf6ea] sm:gap-6 sm:px-4">
              <span className="w-8 shrink-0 pt-1 text-2xl font-semibold text-[#C5A84C]/60 sm:w-10">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-semibold text-[#1f2a44] sm:text-xl">{title}</h3>
                <p className="mt-1 leading-7 text-slate-600">{text}</p>
              </div>
              <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#C5A84C]/15 text-[#A88C35] transition group-hover:bg-[#C5A84C] group-hover:text-white sm:flex">
                <Icon className="h-6 w-6" strokeWidth={1.6} aria-hidden="true" />
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* ========================= BRAND ========================= */}
      <section className="bg-[#faf6ea] py-14 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[5fr_7fr] lg:gap-16">
          <SectionHeading eyebrow="The Brand">
            Founder of <span className="text-[#C5A84C]">Raajanandam Aushadhi</span>
          </SectionHeading>
          <div>
            <Para>
              Dr. Arti Panwar founded Raajanandam Aushadhi with a vision to develop doctor-guided
              Ayurvedic healthcare solutions focused on male and female reproductive wellness.
            </Para>
            <Para>
              The brand offers its own prepared Ayurvedic formulations, developed with a focus on
              quality and consistency and intended to support individual healthcare needs as part
              of an appropriate treatment plan.
            </Para>
            <Link
              href={MEDICINES_LINK}
              className="mt-2 inline-flex items-center gap-2 border-b-2 border-[#C5A84C] pb-1 font-medium text-[#1f2a44] transition hover:text-[#A88C35]"
            >
              Explore Ayurvedic Medicines <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================= APPROACH ========================= */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeading center>
            Compassionate Care. Personalised Treatment.{" "}
            <span className="text-[#C5A84C]">Informed Decisions.</span>
          </SectionHeading>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {PILLARS.map((p, i) => (
            <div
              key={p.title}
              className={`border-t-4 border-[#C5A84C] bg-white p-6 shadow-md transition-all duration-500 hover:-translate-y-1 hover:shadow-xl lg:col-span-2 ${
                i === 3 ? "lg:col-start-2" : ""
              }`}
            >
              <span className="text-sm font-semibold text-[#C5A84C]">0{i + 1}</span>
              <h3 className="mt-1 text-lg font-semibold text-[#1f2a44]">{p.title}</h3>
              <p className="mt-2 leading-7 text-slate-600">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================= CTA ========================= */}
      <section className=" py-12 lg:py-14" style={{ backgroundColor: "#6B1D2A" }}>
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl md:text-4xl ">
            Begin Your Parenthood Journey
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-6 text-white/90 sm:text-base sm:leading-6">
            Whether you are struggling with infertility, PCOS/PCOD, irregular periods, or require
            specialised high-risk pregnancy care, take the first step towards understanding your
            health with professional guidance.
          </p>
          <Link
            href={BOOKING_LINK}
            className="mt-8 inline-flex items-center gap-2 bg-[#1f2a44] px-6 py-3.5 text-sm font-medium text-white shadow-lg transition hover:bg-[#16203a] sm:px-8 sm:py-4 sm:text-base"
          >
            Book Your Appointment with Dr. Arti Panwar Today
            <ArrowRight className="h-4 w-4" aria-hidden="true" />

          </Link>
         <p className="mx-auto mt-5 max-w-4xl text-base leading-6 text-white/90 sm:text-base sm:leading-6">Individual treatment outcomes may vary. Clinical figures should be verified against practice records before publication. Treatment recommendations depend on individual assessment.</p>
        </div>
      </section>
    </main>
  );
}