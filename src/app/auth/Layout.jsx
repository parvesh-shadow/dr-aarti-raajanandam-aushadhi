import Image from "next/image";

const AUTH_IMAGE = "/authImage.jpg";

export default function AuthLayout({ children }) {
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-10 px-4  sm:px-6  lg:grid-cols-2 lg:gap-16 lg:px-8">
      {/* Left: login ya register form */}
      <div className="mx-auto w-full max-w-md lg:mx-0 lg:justify-self-center">
        {children}
      </div>

      {/* Right: image (dono page me same, lg+ par) */}
      <div className="relative hidden w-full overflow-hidden lg:block lg:aspect-square lg:max-w-[440px] lg:justify-self-center">
        <Image
          src={AUTH_IMAGE}
          alt="Raaj Anandam Aushadhi Ayurvedic products in a wicker basket"
          width={1000}
          height={1000}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="h-full w-full object-cover object-center"
        />
      </div>
    </section>
  );
}